export default function TopCandidatesCard({ candidates = [] }) {
  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-blue-500";
    return "bg-red-500";
  };

  const getStatusStyle = (score) => {
    if (score >= 90) return "bg-green-100 text-green-700";

    if (score >= 75) return "bg-blue-100 text-blue-700";

    return "bg-red-100 text-red-700";
  };

  const getStatusText = (score) => {
    if (score >= 90) return "Shortlisted";
    if (score >= 75) return "Review";
    return "Rejected";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm  overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 ">
        <h2 className="text-xl font-semibold">Top Candidates</h2>

        <p className="text-sm text-slate-500 mt-1">
          Highest AI matched candidates
        </p>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead className="bg-slate-200 rounded-xl">
          <tr className="text-xs uppercase tracking-wide text-slate-500">
            <th className="px-6 py-4 text-left">Candidate Name</th>

            <th className="px-6 py-4 text-left">Email</th>

            <th className="px-6 py-4 text-left">Phone</th>

            <th className="px-6 py-4 text-left">AI Match Score</th>

            <th className="px-6 py-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index} className=" hover:bg-slate-50 transition">
              {/* Candidate */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                    {candidate.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">
                      {candidate.name}
                    </p>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="px-6 py-4 text-sm text-slate-600">
                {candidate.email}
              </td>

              {/* Phone */}
              <td className="px-6 py-4 text-sm text-slate-600">
                {candidate.phone}
              </td>

              {/* AI Score */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-2 ${getScoreColor(candidate.score)}`}
                      style={{
                        width: `${candidate.score}%`,
                      }}
                    />
                  </div>

                  <span className="text-sm font-semibold">
                    {candidate.score}%
                  </span>
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                    candidate.score,
                  )}`}
                >
                  {getStatusText(candidate.score)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
