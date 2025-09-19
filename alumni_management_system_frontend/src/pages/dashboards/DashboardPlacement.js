import React from "react";
import Card from "../../components/ui/Card";

/**
 * PUBLIC_INTERFACE
 * Placement Incharge dashboard to manage job postings.
 */
export default function DashboardPlacement() {
  return (
    <div className="space-y-4">
      <Card title="Placement Overview" subtitle="Jobs and approvals">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Stat label="Open Jobs" value="6" />
          <Stat label="Pending Approvals" value="2" />
          <Stat label="Applications" value="24" />
        </div>
      </Card>
      <Card title="Quick Actions">
        <div className="flex flex-wrap gap-2">
          <a className="btn btn-primary" href="/jobs">Manage Jobs</a>
          <a className="btn btn-secondary" href="/approvals">Review Approvals</a>
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
