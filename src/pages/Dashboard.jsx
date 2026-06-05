import Sidebar from "../components/layout/Sidebar";

export default function Dashboard() {
  const topCandidates = [
    {
      id: 1,
      name: "John Doe",
      role: "Python Developer",
      score: 96,
      status: "Shortlisted",
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Frontend Developer",
      score: 91,
      status: "Interview",
    },
    {
      id: 3,
      name: "Marcus Kim",
      role: "Product Manager",
      score: 88,
      status: "Review",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100 ml-64">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

          <p className="text-slate-500 mt-1">Welcome back recruiter</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <p className="text-sm text-slate-500">Active Jobs</p>

            <div className="flex items-end justify-between mt-3">
              <h2 className="text-3xl font-bold">12</h2>

              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                +3 this week
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <p className="text-sm text-slate-500">Candidates</p>

            <div className="flex items-end justify-between mt-3">
              <h2 className="text-3xl font-bold">450</h2>

              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                +28 today
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <p className="text-sm text-slate-500">Closed Jobs</p>

            <div className="flex items-end justify-between mt-3">
              <h2 className="text-3xl font-bold">8</h2>

              <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full">
                All Time
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <p className="text-sm text-slate-500">Avg AI Score</p>

            <div className="flex items-end justify-between mt-3">
              <h2 className="text-3xl font-bold text-blue-600">82%</h2>

              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                Excellent
              </span>
            </div>
          </div>
        </div>

        {/* Top Candidates */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">Top Candidates</h2>

            <button className="text-blue-600 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-500 text-sm border-b">
                  <th className="p-4">Candidate</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">AI Score</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {topCandidates.map((candidate) => (
                  <tr key={candidate.id} className="border-b hover:bg-slate-50">
                    <td className="p-4 font-medium">{candidate.name}</td>

                    <td className="p-4 text-slate-600">{candidate.role}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-200 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{
                              width: `${candidate.score}%`,
                            }}
                          />
                        </div>

                        <span className="font-semibold">
                          {candidate.score}%
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                        {candidate.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
