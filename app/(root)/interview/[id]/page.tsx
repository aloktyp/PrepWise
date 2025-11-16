import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getRandomInterviewCover } from "@/lib/utils";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import DisplayTechIcons from "@/components/DisplayTechIcons";

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = user?.id ? await getFeedbackByInterviewId({
    interviewId: id,
    userId: user.id,
  }) : null;

  // Check if interview is scheduled and if it's time to start
  const now = new Date();
  const scheduledTime = interview.scheduledFor
    ? new Date(interview.scheduledFor)
    : null;
  const isScheduled = interview.status === "scheduled" && scheduledTime;
  const timeUntilStart = scheduledTime
    ? scheduledTime.getTime() - now.getTime()
    : 0;
  const minutesUntilStart = Math.floor(timeUntilStart / 60000);
  const isTimeToStart = timeUntilStart <= 0;
  const isMissed = timeUntilStart < -300000; // 5 minutes past scheduled time

  // Format scheduled time
  const scheduledTimeFormatted = scheduledTime
    ? scheduledTime.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  return (
    <div className="root-layout">
      <div className="flex flex-row gap-4 justify-between items-center mb-8">
        <div className="flex flex-row gap-4 items-center max-sm:flex-col">
          <div className="flex flex-row gap-4 items-center">
            <Image
              src={getRandomInterviewCover()}
              alt="cover-image"
              width={40}
              height={40}
              className="rounded-full object-cover size-[40px]"
            />
            <h3 className="capitalize">{interview.role} Interview</h3>
          </div>

          <DisplayTechIcons techStack={interview.techstack} />
        </div>

        <p className="bg-dark-200 px-4 py-2 rounded-lg h-fit">
          {interview.type}
        </p>
      </div>

      <div className="card-border">
        <div className="card p-8">
          {isScheduled && !isTimeToStart && !isMissed ? (
            // Interview is scheduled but not yet time to start
            <div className="text-center py-12">
              <h2 className="mb-4">Interview Scheduled</h2>
              <p className="text-light-100 text-lg mb-6">
                This interview is scheduled for:
              </p>
              <p className="text-primary-200 text-2xl font-bold mb-6">
                {scheduledTimeFormatted}
              </p>
              <p className="text-light-100 mb-8">
                {minutesUntilStart > 60
                  ? `Starts in ${Math.floor(minutesUntilStart / 60)} hours ${
                      minutesUntilStart % 60
                    } minutes`
                  : `Starts in ${minutesUntilStart} minutes`}
              </p>
              <p className="text-light-400 text-sm mb-8">
                Questions will be available when the interview time begins.
              </p>
              <Button asChild className="btn-secondary">
                <Link href="/">Back to Dashboard</Link>
              </Button>
            </div>
          ) : (
            // Interview is ready to start or time has passed
            <>
              <h2 className="mb-6">Interview Questions</h2>

              {isMissed && isScheduled && (
                <div className="bg-destructive-100/10 border border-destructive-100 rounded-lg p-4 mb-6">
                  <p className="text-destructive-100 font-semibold">
                    ⚠️ Missed Scheduled Time
                  </p>
                  <p className="text-light-100 text-sm mt-2">
                    This interview was scheduled for {scheduledTimeFormatted}.
                    You can still take it now.
                  </p>
                </div>
              )}

              <div className="space-y-4 mb-8">
                {interview.questions.map((question: string, index: number) => (
                  <div key={index} className="p-4 bg-dark-200 rounded-lg">
                    <p className="text-primary-200 font-semibold mb-2">
                      Question {index + 1}
                    </p>
                    <p className="text-light-100">{question}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 max-sm:flex-col">
                <Button asChild className="btn-secondary flex-1">
                  <Link href="/">Back to Dashboard</Link>
                </Button>

                {feedback ? (
                  <Button asChild className="btn-primary flex-1">
                    <Link href={`/interview/${id}/feedback`}>
                      View Feedback
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="btn-primary flex-1">
                    <Link href={`/interview/${id}/start`}>
                      Start Voice Interview
                    </Link>
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
