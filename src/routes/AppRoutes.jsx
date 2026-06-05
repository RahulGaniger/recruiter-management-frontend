import { Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import CreateJob from "../pages/CreateJob";
import Candidate from "../pages/Candidate";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Auth />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/create-job" element={<CreateJob />} />
      <Route path="/jobs/edit/:id" element={<CreateJob />} />

      <Route path="/candidates" element={<Candidate />} />
    </Routes>
  );
}

// import { Routes, Route } from "react-router-dom";

// function Auth() {
//   return <h1>Auth Page</h1>;
// }

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Auth />} />
//     </Routes>
//   );
// }
