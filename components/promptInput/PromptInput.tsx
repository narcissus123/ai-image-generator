"use client";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import React, { useState } from "react";
import useSWR from "swr";
import fetchImages from "../../lib/fetchImages";

function PromptInput() {
  const [input, setInput] = useState("");
  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const { mutate: updateImages } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  console.log("suggestion: ", suggestion);
  const loading = isLoading || isValidating;

  const submitPrompt = async (useSuggestion?: boolean) => {
    // Get image desc from user.
    const inputPrompt = input;
    console.log(inputPrompt);
    setInput("");

    // If there is a suggestion, use that as prompt.
    const p = useSuggestion
      ? suggestion
      : inputPrompt || (!isLoading && !isValidating && suggestion);

    // Make a call to our local api for image creation.
    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: p,
      }),
    });
    const data = await res.json();

    if (data.error) {
      console.log(data.error);
    } else {
      console.log(`Your AI Art has been Generated!`);
    }

    // Adding image when we click on use Suggestion.
    updateImages();
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitPrompt();
  };

  
  return (
    <div className="m-10">
      <form
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
        onSubmit={handleSubmit}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 outline-none rounded-md"
          placeholder={
            (loading && "ChatGPT is thinking of a suggestion...") ||
            suggestion ||
            "Eneter a prompt..."
          }
        />
        <div className="flex flex-row justify-around border-t lg:border-t-0">
          <button
            className={`flex-1 p-4 font-bold ${
              input
                ? "bg-violet-500 text-white transition-colors duration-200"
                : "text-gray-300 cursor-not-allowed"
            } `}
            type="submit"
            disabled={!input}
          >
            Generate
          </button>
          <button
            className="flex-1 p-4 bg-violet-400 text-white transition-colors duration-200 font-bold diabled-text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
            type="button"
            onClick={() => submitPrompt(true)}
          >
            Use Suggestion
          </button>
          <button
            className="flex-1 p-4 bg-white text-violet-200 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold"
            type="button"
            onClick={mutate}
          >
            New Suggestion
          </button>
        </div>
      </form>
      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "ChatGPT is Thinking..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;
