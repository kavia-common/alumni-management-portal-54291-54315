const roles = ["Student", "Alumni", "Coordinator", "PlacementIncharge", "OfficeIncharge"];

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

const makeUser = (overrides = {}) => ({
  id: cryptoRandom(),
  name: "Alex Morgan",
  email: "alex@example.com",
  role: "Student",
  department: "CSE",
  year: 2024,
  verified: false,
  ...overrides,
});

function cryptoRandom() {
  return Math.random().toString(36).slice(2, 10);
}

export const mockAuthApi = {
  async login(email, _password) {
    await delay();
    // For mock: infer role from email prefix
    let role = "Student";
    if (email.includes("+alumni")) role = "Alumni";
    if (email.includes("+coord")) role = "Coordinator";
    if (email.includes("+place")) role = "PlacementIncharge";
    if (email.includes("+office")) role = "OfficeIncharge";
    return makeUser({ email, role, name: email.split("@")[0] });
  },
  async register(payload) {
    await delay();
    const role = roles.includes(payload.role) ? payload.role : "Student";
    return makeUser({ ...payload, role, verified: role !== "Student" ? true : false });
  },
};

export const mockProfileApi = {
  async getProfile(userId) {
    await delay();
    return makeUser({ id: userId, name: "You", verified: true });
  },
  async updateProfile(userId, updates) {
    await delay();
    return makeUser({ id: userId, ...updates, verified: true });
  },
};

export const mockAlumniApi = {
  async collectFormList() {
    await delay();
    return [
      { id: "f1", title: "Graduation Details", status: "Open", fields: 6 },
      { id: "f2", title: "Contact & Employment", status: "Open", fields: 8 },
    ];
  },
  async submitForm(formId, payload) {
    await delay();
    return { formId, id: cryptoRandom(), submittedAt: new Date().toISOString(), payload };
  },
  async listSubmissions() {
    await delay();
    return [
      { id: "s1", form: "Graduation Details", status: "Pending", submittedBy: "john.alumni@example.com", submittedAt: "2024-03-01" },
      { id: "s2", form: "Contact & Employment", status: "Approved", submittedBy: "rita.alumni@example.com", submittedAt: "2024-02-10" },
    ];
  },
  async approveSubmission(id) {
    await delay();
    return { id, status: "Approved" };
  },
  async rejectSubmission(id, reason) {
    await delay();
    return { id, status: "Rejected", reason };
  },
};

export const mockRequestApi = {
  async listRequests() {
    await delay();
    return [
      { id: "r1", type: "Transcript", status: "In Review", createdAt: "2024-04-12" },
      { id: "r2", type: "ID Reissue", status: "Resolved", createdAt: "2024-02-01" },
    ];
  },
  async createRequest(payload) {
    await delay();
    return { ...payload, id: cryptoRandom(), status: "Submitted", createdAt: new Date().toISOString() };
  },
};

export const mockJobsApi = {
  async listJobs() {
    await delay();
    return [
      { id: "j1", title: "Frontend Engineer", company: "Oceanic Tech", location: "Remote", postedAt: "2024-03-11" },
      { id: "j2", title: "Data Analyst", company: "Seabreeze Analytics", location: "Chennai", postedAt: "2024-03-22" },
    ];
  },
  async postJob(payload) {
    await delay();
    return { id: cryptoRandom(), ...payload, postedAt: new Date().toISOString() };
  },
};
