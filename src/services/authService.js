import api from "./api";

// login recruiter
export const loginRecruiter = async (data) => {
  const res = await api.post("/login/login", data);
  return res.data;
};

// register recruiter
export const registerRecruiter = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
