import api from "./api";

// fetch all jobs
export const getJobs = async () => {
  const res = await api.get("/jobs");
  return res.data;
};

// create a new job
export const createJob = async (data) => {
  const res = await api.post("/jobs", data);
  return res.data;
};

// fetch a job by id
export const getJobById = async (id) => {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
};

// update a job by id
export const updateJob = async (
  id,
  data
) => {
  const res = await api.patch(
    `/jobs/${id}`,
    data
  );

  return res.data;
};

// delete a job by id
export const deleteJob = async (id) => {
  const res = await api.delete(
    `/jobs/${id}`
  );

  return res.data;
};

//closed a job by id
export const closeJob = async (id) => {
  const res = await api.patch(
    `/jobs/${id}/close`
  );

  return res.data;
};