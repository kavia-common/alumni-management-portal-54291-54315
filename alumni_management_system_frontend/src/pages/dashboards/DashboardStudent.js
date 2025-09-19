import React from "react";
import Card from "../../components/ui/Card";

/**
 * PUBLIC_INTERFACE
 * Student dashboard with quick links and stats.
 */
export default function DashboardStudent() {
  return (
    <div className="space-y-4">
      <Card title="Overview" subtitle="Your recent activity">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Stat label="Profile Completeness" value="85%" />
          <Stat label="Pending Requests" value="1" />
          <Stat label="Recommended Jobs" value="3" />
        </div>
      </Card>
      <Card title="Quick Actions">
        <div className="flex flex-wrap gap-2">
          <a className="btn btn-primary" href="/profile">Update Profile</a>
          <a className="btn btn-secondary" href="/requests">New Request</a>
          <a className="btn btn-primary" href="/jobs">Browse Jobs</a>
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
