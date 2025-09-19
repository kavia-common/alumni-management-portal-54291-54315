import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import { mockRequestApi } from "../../services/mockApi";

/**
 * PUBLIC_INTERFACE
 * Requests page for creating and tracking service requests.
 */
export default function RequestsPage() {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({ type: "Transcript", details: "" });

  useEffect(() => {
    let mounted = true;
    mockRequestApi.listRequests().then((d) => mounted && setItems(d));
    return () => (mounted = false);
  }, []);

  const create = async () => {
    const res = await mockRequestApi.createRequest(payload);
    setItems((list) => [res, ...list]);
    setOpen(false);
    setPayload({ type: "Transcript", details: "" });
  };

  const columns = [
    { key: "type", header: "Type" },
    { key: "status", header: "Status" },
    { key: "createdAt", header: "Created" },
  ];

  return (
    <div className="space-y-4">
      <Card
        title="Requests"
        subtitle="Create and track service requests"
        actions={<button className="btn btn-primary" onClick={()=>setOpen(true)}>New Request</button>}
      >
        <Table columns={columns} data={items} getRowKey={(r)=>r.id} />
      </Card>

      <Modal open={open} onClose={()=>setOpen(false)} title="New Request">
        <div className="space-y-3">
          <div>
            <label className="label">Type</label>
            <select className="input" value={payload.type} onChange={(e)=>setPayload((s)=>({...s, type: e.target.value}))}>
              <option>Transcript</option>
              <option>ID Reissue</option>
              <option>Certificate</option>
            </select>
          </div>
          <div>
            <label className="label">Details</label>
            <textarea className="input min-h-[100px]" value={payload.details} onChange={(e)=>setPayload((s)=>({...s, details: e.target.value}))} />
          </div>
          <div className="flex justify-end gap-2">
            <button className="btn" onClick={()=>setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={create}>Submit</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
