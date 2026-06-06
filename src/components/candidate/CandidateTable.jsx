import { useNavigate } from "react-router-dom";
import { formatISTDate } from "../../utils/dateFormatter";

export default function CandidatesTable({ candidates = [] }) {
  const navigate = useNavigate();

  const getStatus = (score) => {
    if (score >= 90)
      return {
        text: "Shortlisted",
        className: "bg-green-100 text-green-700",
      };

    if (score >= 75)
      return {
        text: "Review",
        className: "bg-blue-100 text-blue-700",
      };

    return {
      text: "Rejected",
      className: "bg-red-100 text-red-700",
    };
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 75) return "bg-blue-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm  overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-200">
            <tr className="text-xs uppercase text-slate-500">
              <th className="px-6 py-4 text-left">Candidate Name</th>

              <th className="px-6 py-4 text-left">Email</th>

              <th className="px-6 py-4 text-left">Experience</th>

              <th className="px-6 py-4 text-left">AI Match Score</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate) => {
              const status = getStatus(candidate.fit_score);

              return (
                <tr
                  key={candidate.id}
                  className=" hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                        {candidate.name?.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">
                          {candidate.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {candidate.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {candidate.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {candidate.experience_years} Years
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-2 ${getScoreColor(
                            candidate.fit_score,
                          )}`}
                          style={{
                            width: `${candidate.fit_score}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm font-semibold">
                        {candidate.fit_score}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${status.className}`}
                    >
                      {status.text}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${status.className}`}
                    >
                      {formatISTDate(candidate.created_at)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
