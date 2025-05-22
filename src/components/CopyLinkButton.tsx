// components/CopyLinkButton.tsx
"use client";

import { useState } from "react";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

export default function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/collections/shared/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {copied ? (
        <ClipboardDocumentCheckIcon className="w-5 h-5" />
      ) : (
        <ClipboardDocumentIcon className="w-5 h-5" />
      )}
      <span className="text-sm">{copied ? "Copied!" : "Copy Link"}</span>
    </button>
  );
}
