"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  duration?: number;
}

export default function Toast({ message, duration = 1800 }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [message, duration]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[999] transition duration-300 ${
        visible && message
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-6 pointer-events-none"
      }`}
      aria-live="polite"
    >
      <div className="rounded-xl bg-gray-900 text-white px-4 py-3 shadow-2xl border border-emerald-400/30 border-l-4 border-l-emerald-400 flex items-center gap-3">
        <span
          className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white text-sm"
          aria-hidden="true"
        >
          ✓
        </span>
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
}
