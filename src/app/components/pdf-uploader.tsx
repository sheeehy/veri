"use client";

import { useState } from "react";
import { uploadPdfAndExtractText } from "@/app/actions/pdf-actions";

export function PdfUploader() {
  const [pdfText, setPdfText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await uploadPdfAndExtractText(formData);

    if (result.success) {
      setPdfText(result.text ?? null);
    } else {
      setError(result.error ?? "An unknown error occurred");
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            required
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
          <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
            {isLoading ? "Processing..." : "Upload and Extract Text"}
          </button>
        </div>
      </form>

      {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">Error: {error}</div>}

      {pdfText && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Extracted Text:</h2>
          <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{pdfText}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
