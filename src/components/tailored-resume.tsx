import React from "react";
import { TailoredResume } from "@/app/actions/generate";
import { Button } from "./ui/button";
import { Printer } from "lucide-react";

interface TailoredResumeViewProps {
  resume: TailoredResume;
}

export function TailoredResumeView({ resume }: TailoredResumeViewProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex justify-end print:hidden">
        <Button onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print / Export PDF
        </Button>
      </div>

      <div className="resume-container bg-white text-black p-8 max-w-4xl mx-auto shadow-sm border rounded-sm font-sans">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-1">{resume.personalInfo.name}</h1>
          <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-2">
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>• {resume.personalInfo.phone}</span>}
            {resume.personalInfo.location && <span>• {resume.personalInfo.location}</span>}
          </div>
          <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-2 mt-1">
            {resume.personalInfo.linkedin && (
              <a href={resume.personalInfo.linkedin} className="hover:underline">
                {resume.personalInfo.linkedin.replace(/^https?:\/\//, '')}
              </a>
            )}
            {resume.personalInfo.github && (
              <>
                <span>•</span>
                <a href={resume.personalInfo.github} className="hover:underline">
                  {resume.personalInfo.github.replace(/^https?:\/\//, '')}
                </a>
              </>
            )}
            {resume.personalInfo.website && (
              <>
                <span>•</span>
                <a href={resume.personalInfo.website} className="hover:underline">
                  {resume.personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </>
            )}
          </div>
        </header>

        {/* Summary */}
        {resume.personalInfo.summary && (
          <section className="mb-6">
            <p className="text-sm">{resume.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Experience</h2>
            <div className="space-y-4">
              {resume.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{exp.position}</h3>
                    <span className="text-sm text-gray-600 font-medium">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="italic">{exp.company}</span>
                    <span className="text-sm text-gray-600">{exp.location}</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {exp.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Education</h2>
            <div className="space-y-4">
              {resume.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold">{edu.institution}</h3>
                    <span className="text-sm text-gray-600 font-medium">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="italic">{edu.degree} in {edu.field}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Skills</h2>
            <div className="text-sm flex flex-wrap gap-x-4 gap-y-2">
              {/* Simple grouping could be done here, for now just list them */}
              {Array.from(new Set(resume.skills.map(s => s.category))).map(category => (
                <div key={category} className="w-full">
                  <span className="font-bold">{category}: </span>
                  <span>{resume.skills.filter(s => s.category === category).map(s => s.name).join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
