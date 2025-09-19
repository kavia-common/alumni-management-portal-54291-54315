import React from "react";
import Card from "../../components/ui/Card";

/**
 * PUBLIC_INTERFACE
 * Office Incharge dashboard for approvals and requests.
 */
export default function DashboardOffice() {
  return (
    <div className="space-y-4">
      <Card title="Office Overview" subtitle="Institute-level operations">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Stat label="Pending Requests" value="5" />
          <Stat label="Approvals" value="4" />
          <Stat label="Alumni Forms" value="3" />
        </div>
      </Card>
      <Card title="Quick Actions">
        <div className="flex flex-wrap gap-2">
          <a className="btn btn-primary" href="/approvals">Review Approvals</a>
          <a className="btn btn-secondary" href="/alumni-collection">Manage Alumni Collection</a>
          <a className="btn btn-primary" href="/requests">Requests</a>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-4 rounded-xl bg-white border border-gray-100">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );
}
