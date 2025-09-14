"use client";

import React, { useState } from "react";
import { generateBackgrounds } from "@/app/logic/action"; // Adjust import path if needed
import Link from "next/link";
import { Button } from "@/components/ui/button";

// --- Type Definitions ---
type ResultData = {
  variation_number: number;
  image_url: string;
  creative_concept: {
    background_theme?: string;
    rationale?: string;
  };
  prompt_source: string;
};


// --- A Functional Download Button Component ---
// This component handles the CORS issue by fetching the image client-side.
const DownloadButton = ({ imageUrl, filename }: { imageUrl: string, filename: string }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // 1. Fetch the image from the URL
      const response = await fetch(imageUrl);
      // 2. Get the data as a Blob (a file-like object)
      const blob = await response.blob();
      // 3. Create a temporary URL for this blob
      const url = window.URL.createObjectURL(blob);
      
      // 4. Create a hidden link element
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename; // Use the filename provided
      
      // 5. Add the link to the page, click it, and then remove it
      document.body.appendChild(a);
      a.click();
      
      // 6. Clean up the temporary URL
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download image.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-md text-xs hover:bg-blue-700 shadow disabled:bg-gray-400"
    >
      {downloading ? '...' : 'Download'}
    </button>
  );
};


// --- The Main Component ---
export default function ImageGenerator() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResultData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setResults([]);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;
    const numVariations = parseInt(formData.get("numVariations") as string);

    if (!file || file.size === 0) {
      setError("Please select an image file to upload.");
      setLoading(false);
      return;
    }

    // Validate number of variations
    if (isNaN(numVariations) || numVariations < 1 || numVariations > 3) {
      setError("Number of variations must be between 1 and 3.");
      setLoading(false);
      return;
    }

    try {
      const response = await generateBackgrounds(null, formData);
      if (response.data && response.data.results && response.data.results.length > 0) {
        setResults(response.data.results);
      } else {
        setError(response.message || "An unknown error occurred.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-xl p-8">
      <Link href="/dashboard">
      <Button 
          
         
        >
          <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
      </Link>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Product Background Studio
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Upload an image and let AI create professional backgrounds for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              1. Upload Your Product Image
            </label>
            <input
              type="file"
              id="file"
              name="file"
              required
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div>
            <label htmlFor="numVariations" className="block text-sm font-medium text-gray-700 mb-2">
              2. Choose Number of Variations (1-3)
            </label>
            <input
              type="number"
              id="numVariations"
              name="numVariations"
              defaultValue={3}
              min={1}
              max={3}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Maximum 3 variations allowed per generation</p>
          </div>
          <br />
          <Button
            type="submit"
            disabled={loading}
            size={'lg'}
            className="w-full py-3 px-4 text-white font-bold rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Generating, please wait..." : "Generate Backgrounds"}
          </Button>
        </form>

        {error && (
          <div className="mt-6 text-center p-3 rounded-md text-sm bg-red-100 text-red-700">
            <p>{error}</p>
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Your Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {results.map((item) => (
              <div
                key={item.variation_number}
                className="bg-white rounded-lg shadow-md overflow-hidden group"
              >
                <div className="relative w-full h-64">
                  
                  {/* Use the new DownloadButton component */}
                  <DownloadButton 
                    imageUrl={item.image_url} 
                    filename={`variation-${item.variation_number}.png`}
                  />

                  <img
                    src={item.image_url}
                    alt={`Variation ${item.variation_number}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-xs text-gray-600 bg-gray-50">
                  <p><strong>Theme:</strong> {item.creative_concept?.background_theme || "N/A"}</p>
                  <p><strong>Rationale:</strong> {item.creative_concept?.rationale || "N/A"}</p>
                  <p><strong>Source:</strong> {item.prompt_source}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}