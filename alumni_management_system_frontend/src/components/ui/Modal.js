import React from "react";

/**
 * PUBLIC_INTERFACE
 * Modal overlay with centered content.
 */
export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative z-50 w-full max-w-lg card p-4">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
        </div>
        <div className="pt-3">{children}</div>
      </div>
    </div>
  );
}
