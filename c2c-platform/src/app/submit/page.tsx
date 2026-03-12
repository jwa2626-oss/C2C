import { SubmissionForm } from "@/components/submit/SubmissionForm";

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Submit a Conversation</h1>
        <p className="mt-1 text-gray-500">
          Upload your recorded conversation and fill in the session details. We&apos;ll
          automatically transcribe the audio and extract insights.
        </p>
      </div>
      <SubmissionForm />
    </div>
  );
}
