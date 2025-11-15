import InterviewForm from "@/components/InterviewForm";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="root-layout">
      <h2>Create New Interview</h2>
      <p className="mt-2 mb-8">
        Fill in the details below to generate AI-powered interview questions
      </p>
      <InterviewForm userId={user?.id!} />
    </div>
  );
};

export default Page;
