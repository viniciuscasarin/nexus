import { getSavedJobs } from "@/app/actions/job-history";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default async function HistoryPage() {
  const jobs = await getSavedJobs();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold mb-8">Job History</h1>
      
      {jobs.length === 0 ? (
        <p className="text-zinc-500">No saved jobs yet.</p>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => {
            let analysis = null;
            try {
              analysis = JSON.parse(job.analysisResult);
            } catch (e) {
              // ignore
            }
            
            return (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-lg mt-1">{job.company}</CardDescription>
                    </div>
                    {analysis && (
                      <div className={`px-3 py-1 rounded-full font-medium ${analysis.score >= 70 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                        {analysis.score}/100
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-zinc-500 mt-2">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent>
                  {analysis && analysis.missingSkills && analysis.missingSkills.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold mb-1">Missing Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingSkills.map((skill: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-zinc-100 text-zinc-800 text-xs rounded-md">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
