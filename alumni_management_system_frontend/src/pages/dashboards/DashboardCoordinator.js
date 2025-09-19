import React from "react";
import Card from "../../components/ui/Card";

/**
 * PUBLIC_INTERFACE
 * Coordinator dashboard for data collection and approvals.
 */
export default function DashboardCoordinator() {
  return (
    <div className="space-y-4">
      <Card title="Coordinator Overview" subtitle="Manage alumni data and approvals">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Stat label="Pending Approvals" value="7" />
          <Stat label="Active Forms" value="2" />
          <Stat label="New Requests" value="3" />
        </div>
      </Card>
      <Card title="Quick Actions">
        <div className="flex flex-wrap gap-2">
          <a className="btn btn-primary" href="/alumni-collection">Open Alumni Collection</a>
          <a className="btn btn-secondary" href="/approvals">Review Approvals</a>
          <a className="btn btn-primary" href="/jobs">View Jobs</a>
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
