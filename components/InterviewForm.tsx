"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface InterviewFormProps {
  userId: string;
}

const InterviewForm = ({ userId }: InterviewFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    level: "Junior",
    type: "Technical",
    techstack: "",
    amount: "5",
    scheduleType: "now",
    scheduledDate: "",
    scheduledTime: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const techArray = formData.techstack
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      let scheduledDateTime = null;
      if (formData.scheduleType === "later" && formData.scheduledDate && formData.scheduledTime) {
        scheduledDateTime = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`).toISOString();
      }

      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          role: formData.role,
          level: formData.level,
          type: formData.type,
          techstack: techArray,
          amount: parseInt(formData.amount),
          scheduledFor: scheduledDateTime,
        }),
      });

      const data = await response.json();

      if (data.success && data.interviewId) {
        if (formData.scheduleType === "later") {
          alert("Interview scheduled successfully!");
          router.push("/");
        } else {
          router.push(`/interview/${data.interviewId}`);
        }
      } else {
        alert("Failed to create interview. Please try again.");
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form max-w-2xl">
      <div className="space-y-6">
        <div>
          <label htmlFor="role" className="label block mb-2">
            Job Role *
          </label>
          <input
            id="role"
            type="text"
            required
            className="input w-full"
            placeholder="e.g., Frontend Developer"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="level" className="label block mb-2">
            Experience Level *
          </label>
          <select
            id="level"
            required
            className="input w-full"
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          >
            <option value="Junior">Junior</option>
            <option value="Mid">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div>
          <label htmlFor="type" className="label block mb-2">
            Interview Type *
          </label>
          <select
            id="type"
            required
            className="input w-full"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Technical">Technical</option>
            <option value="Behavioral">Behavioral</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label htmlFor="techstack" className="label block mb-2">
            Tech Stack (comma-separated) *
          </label>
          <input
            id="techstack"
            type="text"
            required
            className="input w-full"
            placeholder="e.g., React, TypeScript, Node.js"
            value={formData.techstack}
            onChange={(e) =>
              setFormData({ ...formData, techstack: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="amount" className="label block mb-2">
            Number of Questions *
          </label>
          <select
            id="amount"
            required
            className="input w-full"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          >
            <option value="3">3 Questions</option>
            <option value="5">5 Questions</option>
            <option value="7">7 Questions</option>
            <option value="10">10 Questions</option>
          </select>
        </div>

        <div>
          <label className="label block mb-2">When do you want to take this interview? *</label>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="scheduleType"
                value="now"
                checked={formData.scheduleType === "now"}
                onChange={(e) =>
                  setFormData({ ...formData, scheduleType: e.target.value })
                }
                className="w-4 h-4"
              />
              <span className="text-light-100">Start Now</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="scheduleType"
                value="later"
                checked={formData.scheduleType === "later"}
                onChange={(e) =>
                  setFormData({ ...formData, scheduleType: e.target.value })
                }
                className="w-4 h-4"
              />
              <span className="text-light-100">Schedule for Later</span>
            </label>
          </div>

          {formData.scheduleType === "later" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="scheduledDate" className="label block mb-2">
                  Date *
                </label>
                <input
                  id="scheduledDate"
                  type="date"
                  required
                  className="input w-full"
                  min={new Date().toISOString().split("T")[0]}
                  value={formData.scheduledDate}
                  onChange={(e) =>
                    setFormData({ ...formData, scheduledDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="scheduledTime" className="label block mb-2">
                  Time *
                </label>
                <input
                  id="scheduledTime"
                  type="time"
                  required
                  className="input w-full"
                  value={formData.scheduledTime}
                  onChange={(e) =>
                    setFormData({ ...formData, scheduledTime: e.target.value })
                  }
                />
              </div>
            </div>
          )}
        </div>

        <Button type="submit" className="btn w-full" disabled={loading}>
          {loading
            ? "Generating..."
            : formData.scheduleType === "later"
            ? "Schedule Interview"
            : "Generate Interview Questions"}
        </Button>
      </div>
    </form>
  );
};

export default InterviewForm;
