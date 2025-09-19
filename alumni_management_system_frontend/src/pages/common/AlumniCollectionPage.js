import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import { mockAlumniApi } from "../../services/mockApi";

/**
 * PUBLIC_INTERFACE
 * Alumni data collection management page.
 */
export default function AlumniCollectionPage() {
  const [forms, setForms] = useState([]);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({ title: "", fields: 5 });

  useEffect(() => {
    let mounted = true;
    mockAlumniApi.collectFormList().then((list) => mounted && setForms(list));
    return () => (mounted = false);
  }, []);

  const columns = [
    { key: "title", header: "Form" },
    { key: "status", header: "Status" },
    { key: "fields", header: "Fields" },
    { key: "actions", header: "Actions", render: () => <button className="btn btn-secondary">Open</button> },
  ];

  return (
    <div className="space-y-4">
      <Card
        title="Alumni Collection Forms"
        subtitle="Create and manage data collection"
        actions={<button onClick={()=>setOpen(true)} className="btn btn-primary">New Form</button>}
      >
        <Table columns={columns} data={forms} getRowKey={(r)=>r.id} />
      </Card>

      <Modal open={open} onClose={()=>setOpen(false)} title="Create New Form">
        <div className="space-y-3">
          <div>
            <label className="label">Title</label>
            <input className="input" value={payload.title} onChange={(e)=>setPayload((s)=>({...s, title: e.target.value}))} />
          </div>
          <div>
            <label className="label">Fields</label>
            <input className="input" type="number" value={payload.fields} onChange={(e)=>setPayload((s)=>({...s, fields: Number(e.target.value)}))} />
          </div>
          <div className="flex justify-end gap-2">
            <button className="btn" onClick={()=>setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={()=>setOpen(false)}>Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
