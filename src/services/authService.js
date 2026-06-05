import api from "./api";

export const loginRecruiter = async (data) => {
  const res = await api.post("/login/login", data);
  return res.data;
};

export const registerRecruiter = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
