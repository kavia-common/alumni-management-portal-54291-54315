import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import { mockAlumniApi } from "../../services/mockApi";

/**
 * PUBLIC_INTERFACE
 * Approvals workflow for submissions.
 */
export default function ApprovalsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    mockAlumniApi.listSubmissions().then((d) => mounted && setItems(d));
    return () => (mounted = false);
  }, []);

  const approve = async (id) => {
    const res = await mockAlumniApi.approveSubmission(id);
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status: res.status } : i)));
  };

  const reject = async (id) => {
    const res = await mockAlumniApi.rejectSubmission(id, "Insufficient data");
    setItems((list) => list.map((i) => (i.id === id ? { ...i, status: res.status } : i)));
  };

  const columns = [
    { key: "form", header: "Form" },
    { key: "submittedBy", header: "Submitted By" },
    { key: "submittedAt", header: "Submitted At" },
    { key: "status", header: "Status", render: (r)=> <span className="px-2 py-1 rounded-full text-xs bg-gray-100">{r.status}</span> },
    { key: "actions", header: "Actions", render: (r)=> (
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={()=>approve(r.id)}>Approve</button>
        <button className="btn btn-secondary" onClick={()=>reject(r.id)}>Reject</button>
      </div>
    ) },
  ];

  return (
    <Card title="Approvals" subtitle="Review alumni submissions">
      <Table columns={columns} data={items} getRowKey={(r)=>r.id} />
    </Card>
  );
}
