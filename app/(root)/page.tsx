import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

async function Home() {
  const user = await getCurrentUser();

  const [userInterviews, allInterview] = await Promise.all([
    user?.id ? getInterviewsByUserId(user.id) : Promise.resolve([]),
    user?.id ? getLatestInterviews({ userId: user.id }) : Promise.resolve([]),
  ]);

  const now = new Date();

  // Filter scheduled interviews by time
  const upcomingScheduled = userInterviews?.filter((interview) => {
    if (interview.status !== "scheduled" || !interview.scheduledFor)
      return false;
    const scheduledTime = new Date(interview.scheduledFor);
    const timeDiff = scheduledTime.getTime() - now.getTime();
    return timeDiff > -300000; // Not more than 5 minutes past
  });

  const missedScheduled = userInterviews?.filter((interview) => {
    if (interview.status !== "scheduled" || !interview.scheduledFor)
      return false;
    const scheduledTime = new Date(interview.scheduledFor);
    const timeDiff = scheduledTime.getTime() - now.getTime();
    return timeDiff <= -300000; // More than 5 minutes past
  });

  const completedInterviews = userInterviews?.filter(
    (interview) =>
      interview.status === "completed" ||
      (interview.status === "ready" && !interview.scheduledFor)
  );

  const hasPastInterviews = completedInterviews?.length! > 0;
  const hasScheduledInterviews = upcomingScheduled?.length! > 0;
  const hasMissedInterviews = missedScheduled?.length! > 0;
  const hasUpcomingInterviews = allInterview?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview/create">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      {hasScheduledInterviews && (
        <section className="flex flex-col gap-6 mt-8">
          <h2>Scheduled Interviews</h2>

          <div className="interviews-section">
            {upcomingScheduled?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))}
          </div>
        </section>
      )}

      {hasMissedInterviews && (
        <section className="flex flex-col gap-6 mt-8">
          <h2>Incomplete Interviews</h2>
          <p className="text-light-400">
            These interviews were scheduled but not started on time. You can
            still take them now.
          </p>

          <div className="interviews-section">
            {missedScheduled?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            completedInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterview?.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
