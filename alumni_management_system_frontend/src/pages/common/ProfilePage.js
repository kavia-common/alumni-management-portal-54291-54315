import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { useAuth } from "../../context/AuthContext";
import { mockProfileApi } from "../../services/mockApi";

/**
 * PUBLIC_INTERFACE
 * Profile page for viewing/updating user info.
 */
export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;
    mockProfileApi.getProfile(user.id).then((p) => mounted && setProfile(p));
    return () => (mounted = false);
  }, [user.id]);

  const update = (k, v) => setProfile((s) => ({ ...s, [k]: v }));

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await mockProfileApi.updateProfile(user.id, profile);
      setProfile(updated);
    } finally {
      setSaving(false);
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="space-y-4">
      <Card title="My Profile" subtitle="Keep your details current">
        <form onSubmit={onSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input className="input" value={profile.name} onChange={(e)=>update("name", e.target.value)} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" value={profile.email} onChange={(e)=>update("email", e.target.value)} />
          </div>
          <div>
            <label className="label">Department</label>
            <input className="input" value={profile.department || ""} onChange={(e)=>update("department", e.target.value)} />
          </div>
          <div>
            <label className="label">Year</label>
            <input className="input" type="number" value={profile.year || ""} onChange={(e)=>update("year", Number(e.target.value))} />
          </div>
          <div className="sm:col-span-2">
            <button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
          </div>
        </form>
      </Card>
    </div>
  );
}
