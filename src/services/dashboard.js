import api from "./api";

export const getDashboardData = async () => {
  const res = await api.get("/dashboard-data");
  return res.data;
};