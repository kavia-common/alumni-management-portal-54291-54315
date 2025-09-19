import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import { mockJobsApi } from "../../services/mockApi";
import { useAuth } from "../../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Jobs listing and posting page.
 */
export default function JobsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({ title: "", company: "", location: "" });

  useEffect(() => {
    let mounted = true;
    mockJobsApi.listJobs().then((d) => mounted && setItems(d));
    return () => (mounted = false);
  }, []);

  const canPost = user.role === "PlacementIncharge" || user.role === "Coordinator" || user.role === "OfficeIncharge";

  const create = async () => {
    const res = await mockJobsApi.postJob(payload);
    setItems((list) => [res, ...list]);
    setOpen(false);
    setPayload({ title: "", company: "", location: "" });
  };

  const columns = [
    { key: "title", header: "Title" },
    { key: "company", header: "Company" },
    { key: "location", header: "Location" },
    { key: "postedAt", header: "Posted" },
  ];

  return (
    <div className="space-y-4">
      <Card
        title="Jobs"
        subtitle="Explore opportunities"
        actions={canPost ? <button className="btn btn-primary" onClick={()=>setOpen(true)}>Post Job</button> : null}
      >
        <Table columns={columns} data={items} getRowKey={(r)=>r.id} />
      </Card>

      <Modal open={open} onClose={()=>setOpen(false)} title="Post Job">
        <div className="space-y-3">
          <div>
            <label className="label">Title</label>
            <input className="input" value={payload.title} onChange={(e)=>setPayload((s)=>({...s, title: e.target.value}))} />
          </div>
          <div>
            <label className="label">Company</label>
            <input className="input" value={payload.company} onChange={(e)=>setPayload((s)=>({...s, company: e.target.value}))} />
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input" value={payload.location} onChange={(e)=>setPayload((s)=>({...s, location: e.target.value}))} />
          </div>
          <div className="flex justify-end gap-2">
            <button className="btn" onClick={()=>setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={create}>Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
