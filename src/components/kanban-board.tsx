"use client";

import React, { useState, useTransition } from "react";
import { JobApplication, Comment } from "@prisma/client";

export type JobApplicationWithComments = JobApplication & {
  comments: Comment[];
};
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateJobApplicationStatus } from "@/app/actions/job-application";
import { JobApplicationDetails } from "./job-application-details";

export const KANBAN_COLUMNS = [
  "INTERESTED",
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "FINAL STAGE",
  "OFFER",
  "HIRED",
];

function SortableItem({ item, onClick }: { item: JobApplicationWithComments, onClick: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: item });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white dark:bg-zinc-900 p-4 rounded-md shadow-sm border border-zinc-200 dark:border-zinc-800 cursor-grab active:cursor-grabbing hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
    >
      <h4 className="font-medium text-sm mb-1">{item.title}</h4>
      <p className="text-xs text-zinc-500 mb-3">{item.company}</p>
      <div className="text-[10px] text-zinc-400">
        {new Date(item.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

function Column({ id, items, onCardClick }: { id: string; items: JobApplicationWithComments[], onCardClick: (job: JobApplicationWithComments) => void }) {
  const { setNodeRef } = useSortable({
    id,
    data: {
      type: "Column",
      status: id,
    }
  });

  return (
    <div className="flex-shrink-0 w-80 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-4 flex flex-col gap-4">
      <h3 className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
        {id}
        <span className="text-xs font-normal bg-zinc-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full text-zinc-600 dark:text-zinc-400">
          {items.length}
        </span>
      </h3>
      <div ref={setNodeRef} className="flex-1 flex flex-col gap-3 min-h-[200px]">
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableItem key={item.id} item={item} onClick={() => onCardClick(item)} />
          ))}
        </SortableContext>
        {items.length === 0 && (
          <div className="flex-1 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg flex items-center justify-center">
            <span className="text-sm text-zinc-400">Empty</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function KanbanBoard({ initialApplications }: { initialApplications: JobApplicationWithComments[] }) {
  const [applications, setApplications] = useState<JobApplicationWithComments[]>(initialApplications);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobApplicationWithComments | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeItem = React.useMemo(
    () => applications.find((app) => app.id === activeId),
    [activeId, applications]
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as number);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type !== "Column";
    const isOverTask = over.data.current?.type !== "Column";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    // Dropping a task over another task
    if (isActiveTask && isOverTask) {
      setApplications((apps) => {
        const activeIndex = apps.findIndex((t) => t.id === activeId);
        const overIndex = apps.findIndex((t) => t.id === overId);
        
        if (apps[activeIndex].status !== apps[overIndex].status) {
          const newApps = [...apps];
          newApps[activeIndex].status = apps[overIndex].status;
          return arrayMove(newApps, activeIndex, overIndex);
        }
        
        return arrayMove(apps, activeIndex, overIndex);
      });
    }

    // Dropping a task over an empty column
    if (isActiveTask && isOverColumn) {
      setApplications((apps) => {
        const activeIndex = apps.findIndex((t) => t.id === activeId);
        const newApps = [...apps];
        newApps[activeIndex].status = overId as string;
        return arrayMove(newApps, activeIndex, activeIndex);
      });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const activeApp = applications.find(a => a.id === active.id);
    if (!activeApp) return;

    // Optimistically update
    startTransition(async () => {
      try {
        await updateJobApplicationStatus(activeApp.id, activeApp.status);
      } catch (error) {
        console.error("Failed to update status", error);
        // We could revert the state here if we kept previous state
      }
    });
  }

  const id = React.useId();

  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-[calc(100vh-200px)] gap-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((status) => (
          <Column
            key={status}
            id={status}
            items={applications.filter((app) => app.status === status)}
            onCardClick={setSelectedJob}
          />
        ))}
      </div>
      <DragOverlay>
        {activeItem ? (
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-md shadow-lg border border-zinc-300 dark:border-zinc-700 opacity-90 scale-105 cursor-grabbing">
            <h4 className="font-medium text-sm mb-1">{activeItem.title}</h4>
            <p className="text-xs text-zinc-500 mb-3">{activeItem.company}</p>
            <div className="text-[10px] text-zinc-400">
              {new Date(activeItem.createdAt).toLocaleDateString()}
            </div>
          </div>
        ) : null}
      </DragOverlay>

      <JobApplicationDetails 
        job={selectedJob} 
        isOpen={selectedJob !== null} 
        onClose={() => setSelectedJob(null)} 
      />
    </DndContext>
  );
}
