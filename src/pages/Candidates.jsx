import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import { getCandidates } from "../services/candidateService";
import CandidatesTable from "../components/candidate/CandidateTable";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();

      setCandidates(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 ml-64 p-8">
      <Sidebar />

      <div className="mb-6">
        <h1 className="text-3xl font-bold">Candidates</h1>

        <p className="text-slate-500">Manage all candidate applications</p>
      </div>

      {loading ? (
        <div>Loading Candidates...</div>
      ) : (
        <CandidatesTable candidates={candidates} />
      )}
    </div>
  );
}
