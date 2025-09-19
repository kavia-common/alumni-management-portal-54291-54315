import React from "react";

/**
 * PUBLIC_INTERFACE
 * Simple surface container with soft glass style.
 */
export default function Card({ title, subtitle, actions, children }) {
  return (
    <div className="card p-4">
      {(title || subtitle || actions) && (
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="pt-3">{children}</div>
    </div>
  );
}
