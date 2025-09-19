import React from "react";

/**
 * PUBLIC_INTERFACE
 * A lightweight table component with minimal styling.
 */
export default function Table({ columns, data, getRowKey }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-gray-600">
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2">{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={getRowKey ? getRowKey(row) : idx} className="border-t border-gray-100 hover:bg-gray-50">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-2 align-top">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
