
import { useState } from "react";

export function useGeminiCompletion() {
  const [input, setInput] = useState("");
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/suggest-message/", {
      method: "POST",
      body: JSON.stringify({ prompt: input }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setCompletion(data.completion);
    setIsLoading(false);
  };

  return {
    input,
    setInput,
    completion,
    isLoading,
    handleSubmit,
  };
}