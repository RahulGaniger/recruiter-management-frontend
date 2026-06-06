import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
      <AppRoutes />
    </>
  );
}

export default App;
