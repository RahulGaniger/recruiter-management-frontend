export default function JobFilters({
  search,
  setSearch,
  status,
  setStatus,
  sortOrder,
  setSortOrder,
  resetFilters,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm  mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search title, location, description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 w-full"
        />

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 bg-white cursor-pointer"
        >
          <option value="">All Statuses</option>

          <option value="OPEN">Open</option>

          <option value="CLOSED">Closed</option>
        </select>

        {/* Date */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 bg-white cursor-pointer"
        >
          <option value="desc">Newest First</option>

          <option value="asc">Oldest First</option>
        </select>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="bg-slate-800 text-white rounded-lg px-4 py-2 hover:bg-slate-900 w-30 cursor-pointer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
