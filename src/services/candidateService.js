import api from "./api";


// get Candidate APIs
export const getCandidates = async () => {
  const res = await api.get(
    "/candidates"
  );

  return res.data;
};

//  Create a new candidate
export const createCandidate = async (
  data
) => {
  const res = await api.post(
    "/candidates",
    data
  );

  return res.data;
};


//  Get a single candidate by ID
export const getCandidate = async (
  id
) => {
  const res = await api.get(
    `/candidates/${id}`
  );

  return res.data;
};

//  Update a candidate by ID
export const updateCandidate = async (
  id,
  data
) => {
  const res = await api.patch(
    `/candidates/${id}`,
    data
  );

  return res.data;
};

//  Delete a candidate by ID
export const deleteCandidate = async (
  id
) => {
  const res = await api.delete(
    `/candidates/${id}`
  );

  return res.data;
};

// Analyze resume
export const analyzeResume = async (formData) => {
  const res = await api.post(
    "/analyze/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};