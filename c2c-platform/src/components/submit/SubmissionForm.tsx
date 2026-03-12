"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileAudio, CheckCircle, Loader } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Step = "details" | "participants" | "survey" | "upload" | "submitting" | "done";

interface FormData {
  // Session details
  listenerName: string;
  date: string;
  location: string;
  town: string;
  // Participant details
  ageGroup: string;
  gender: string;
  ethnicity: string;
  employmentStatus: string;
  // Exit survey
  belongingScore: string;
  participationScore: string;
  influenceScore: string;
  prideScore: string;
  // Files
  audioFile1: File | null;
  audioFile2: File | null;
}

const AGE_GROUPS = ["16-24", "25-34", "35-44", "45-54", "55-64", "65-74", "75+"];
const GENDERS = ["Woman", "Man", "Non-binary", "Prefer not to say", "Other"];
const ETHNICITIES = [
  "White British", "White Irish", "White Other",
  "Mixed/Multiple heritage", "Asian/Asian British",
  "Black/African/Caribbean/Black British",
  "Other ethnic group", "Prefer not to say",
];
const EMPLOYMENT = [
  "Employed full-time", "Employed part-time", "Self-employed",
  "Unemployed", "Retired", "Student", "Unable to work",
  "Looking after home/family", "Prefer not to say",
];

function AudioDropzone({
  label,
  file,
  onFile,
  onRemove,
}: {
  label: string;
  file: File | null;
  onFile: (f: File) => void;
  onRemove: () => void;
}) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted[0]) onFile(accepted[0]);
    },
    [onFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "audio/*": [".mp3", ".wav", ".m4a", ".ogg", ".webm"] },
    maxFiles: 1,
    maxSize: 200 * 1024 * 1024, // 200 MB
  });

  if (file) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
        <FileAudio className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-emerald-800 truncate">{file.name}</p>
          <p className="text-xs text-emerald-600">
            {(file.size / 1024 / 1024).toFixed(1)} MB
          </p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 rounded hover:bg-emerald-100 text-emerald-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-blue-400 bg-blue-50"
          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-1">
        MP3, WAV, M4A or OGG · max 200 MB
      </p>
    </div>
  );
}

function ScoreSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select…</option>
        {["1", "2", "3", "4", "5"].map((s) => (
          <option key={s} value={s}>
            {s} / 5
          </option>
        ))}
      </select>
    </div>
  );
}

const STEPS: Step[] = ["details", "participants", "survey", "upload"];
const STEP_LABELS: Record<Step, string> = {
  details: "Session",
  participants: "Participants",
  survey: "Survey",
  upload: "Upload",
  submitting: "Upload",
  done: "Done",
};

export function SubmissionForm() {
  const [step, setStep] = useState<Step>("details");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    listenerName: "",
    date: "",
    location: "",
    town: "",
    ageGroup: "",
    gender: "",
    ethnicity: "",
    employmentStatus: "",
    belongingScore: "",
    participationScore: "",
    influenceScore: "",
    prideScore: "",
    audioFile1: null,
    audioFile2: null,
  });

  const set = (key: keyof FormData) => (val: string | File | null) =>
    setForm((f) => ({ ...f, [key]: val }));

  const currentStepIndex = STEPS.indexOf(step as Step);

  const handleSubmit = async () => {
    setStep("submitting");
    setError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const supabase = createClient() as any;
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to submit a conversation.");
        setStep("upload");
        return;
      }

      // Upsert listener profile
      const { data: listener, error: listenerError } = await supabase
        .from("listeners")
        .upsert(
          { user_id: user.id, name: form.listenerName, email: user.email! },
          { onConflict: "email" }
        )
        .select()
        .single();

      if (listenerError) throw listenerError;

      // Upload audio files
      const uploadFile = async (file: File, index: number) => {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}-audio-${index}.${ext}`;
        const { error } = await supabase.storage
          .from("audio-files")
          .upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from("audio-files").getPublicUrl(path);
        return data.publicUrl;
      };

      const [url1, url2] = await Promise.all([
        form.audioFile1 ? uploadFile(form.audioFile1, 1) : Promise.resolve(null),
        form.audioFile2 ? uploadFile(form.audioFile2, 2) : Promise.resolve(null),
      ]);

      // Create conversation
      const { data: conversation, error: convError } = await supabase
        .from("conversations")
        .insert({
          listener_id: listener.id,
          date: form.date,
          location: form.location,
          town: form.town,
          audio_file_1_url: url1,
          audio_file_2_url: url2,
          processing_status: "pending",
        })
        .select()
        .single();

      if (convError) throw convError;

      // Insert survey data
      const scoreFields = {
        belonging_score: form.belongingScore ? parseFloat(form.belongingScore) : null,
        community_participation_score: form.participationScore
          ? parseFloat(form.participationScore)
          : null,
        influence_score: form.influenceScore ? parseFloat(form.influenceScore) : null,
        pride_score: form.prideScore ? parseFloat(form.prideScore) : null,
      };

      await supabase.from("survey_data").insert({
        conversation_id: conversation.id,
        age_group: form.ageGroup || null,
        gender: form.gender || null,
        ethnicity: form.ethnicity || null,
        employment_status: form.employmentStatus || null,
        ...scoreFields,
      });

      // Trigger processing
      await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: conversation.id }),
      });

      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStep("upload");
    }
  };

  if (step === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Conversation submitted!
        </h2>
        <p className="text-gray-600 mb-4">
          We&apos;re now transcribing your audio and extracting insights. This typically
          takes 5–10 minutes. You can track progress in your conversations list.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Back to dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Progress bar */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  i < currentStepIndex
                    ? "text-emerald-600"
                    : i === currentStepIndex
                    ? "text-blue-600"
                    : "text-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    i < currentStepIndex
                      ? "bg-emerald-100 text-emerald-600"
                      : i === currentStepIndex
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {i < currentStepIndex ? "✓" : i + 1}
                </div>
                <span className="hidden sm:block">{STEP_LABELS[s]}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 rounded-full ${
                    i < currentStepIndex ? "bg-emerald-200" : "bg-gray-100"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-6">
        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Step 1: Session details */}
        {step === "details" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Session details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your name
                </label>
                <input
                  type="text"
                  required
                  value={form.listenerName}
                  onChange={(e) => set("listenerName")(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of conversation
                </label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => set("date")(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location / area
                </label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => set("location")(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Town centre café"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Town / city
                </label>
                <input
                  type="text"
                  required
                  value={form.town}
                  onChange={(e) => set("town")(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Scarborough"
                />
              </div>
            </div>
            <button
              onClick={() => setStep("participants")}
              disabled={!form.listenerName || !form.date || !form.location || !form.town}
              className="w-full bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next: Participant details
            </button>
          </div>
        )}

        {/* Step 2: Participant details */}
        {step === "participants" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Participant details</h2>
            <p className="text-sm text-gray-500">
              Optional – helps us understand who we&apos;re hearing from.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                [
                  { key: "ageGroup", label: "Age group", options: AGE_GROUPS },
                  { key: "gender", label: "Gender", options: GENDERS },
                  { key: "ethnicity", label: "Ethnicity", options: ETHNICITIES },
                  { key: "employmentStatus", label: "Employment status", options: EMPLOYMENT },
                ] as const
              ).map(({ key, label, options }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <select
                    value={form[key]}
                    onChange={(e) => set(key)(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Prefer not to say</option>
                    {options.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("details")}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep("survey")}
                className="flex-1 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Next: Exit survey
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Exit survey */}
        {step === "survey" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Exit survey scores</h2>
            <p className="text-sm text-gray-500">
              Rate each question 1 (strongly disagree) to 5 (strongly agree).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScoreSelect
                label="Sense of belonging to this community"
                value={form.belongingScore}
                onChange={set("belongingScore")}
              />
              <ScoreSelect
                label="Active community participation"
                value={form.participationScore}
                onChange={set("participationScore")}
              />
              <ScoreSelect
                label="Influence in local decisions"
                value={form.influenceScore}
                onChange={set("influenceScore")}
              />
              <ScoreSelect
                label="Pride in this community"
                value={form.prideScore}
                onChange={set("prideScore")}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("participants")}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep("upload")}
                className="flex-1 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Next: Upload audio
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Upload audio */}
        {step === "upload" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Upload audio files</h2>
            <p className="text-sm text-gray-500">
              Upload up to two audio recordings from this conversation.
            </p>
            <AudioDropzone
              label="Audio file 1"
              file={form.audioFile1}
              onFile={set("audioFile1")}
              onRemove={() => set("audioFile1")(null)}
            />
            <AudioDropzone
              label="Audio file 2 (optional)"
              file={form.audioFile2}
              onFile={set("audioFile2")}
              onRemove={() => set("audioFile2")(null)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setStep("survey")}
                className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.audioFile1}
                className="flex-1 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit conversation
              </button>
            </div>
          </div>
        )}

        {/* Submitting */}
        {step === "submitting" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <Loader className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-gray-700 font-medium">Uploading and submitting…</p>
            <p className="text-sm text-gray-500">This may take a moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
