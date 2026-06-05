export default function DashboardCard({ title, value, icon, color = "blue" }) {
  const colors = {
    blue: {
      icon: "bg-blue-100 text-blue-600",
      border: "border-blue-500",
    },
    green: {
      icon: "bg-green-100 text-green-600",
      border: "border-green-500",
    },
    red: {
      icon: "bg-red-100 text-red-600",
      border: "border-red-500",
    },
    purple: {
      icon: "bg-purple-100 text-purple-600",
      border: "border-purple-500",
    },
    yellow: {
      icon: "bg-yellow-100 text-yellow-600",
      border: "border-yellow-500",
    },
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border-l-4 ${colors[color].border} p-6 hover:shadow-md transition`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-3">{value}</h2>
        </div>

        <div className={`p-3 rounded-xl ${colors[color].icon}`}>{icon}</div>
      </div>
    </div>
  );
}
