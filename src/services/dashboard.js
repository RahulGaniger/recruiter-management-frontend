import api from "./api";

// Fetch dashboard data
export const getDashboardData = async () => {
  const res = await api.get("/dashboard-data");
  return res.data;
};