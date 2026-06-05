// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginRecruiter, registerRecruiter } from "../services/authService";

// export default function Auth() {
//   const navigate = useNavigate();

//   const [isLogin, setIsLogin] = useState(true);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (isLogin) {
//         const res = await loginRecruiter({
//           email: form.email,
//           password: form.password,
//         });

//         localStorage.setItem("access_token", res.access_token);

//         navigate("/dashboard");
//       } else {
//         await registerRecruiter(form);

//         alert("Registration successful. Please login.");

//         setIsLogin(true);

//         setForm({
//           name: "",
//           email: "",
//           password: "",
//         });
//       }
//     } catch (err) {
//       console.log(err);

//       const message =
//         err?.response?.data?.detail ||
//         err?.response?.data?.message ||
//         "Something went wrong";

//       alert(message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <div className="flex items-center justify-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
//             ✓
//           </div>

//           <h1 className="text-4xl font-bold text-slate-900">
//             Recruiter Management
//           </h1>
//         </div>

//         <p className="text-slate-500 mt-2">Professional Recruitment Platform</p>
//       </div>

//       {/* Card */}
//       <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-8">
//         {/* Tabs */}
//         <div className="bg-slate-100 p-1 rounded-xl flex mb-8">
//           <button
//             type="button"
//             onClick={() => setIsLogin(true)}
//             className={`flex-1 py-3 rounded-lg transition-all ${
//               isLogin ? "bg-white shadow text-black" : "text-slate-500"
//             }`}
//           >
//             Login
//           </button>

//           <button
//             type="button"
//             onClick={() => setIsLogin(false)}
//             className={`flex-1 py-3 rounded-lg transition-all ${
//               !isLogin ? "bg-white shadow text-black" : "text-slate-500"
//             }`}
//           >
//             Sign Up
//           </button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <>
//               <label className="block text-left mb-2 text-slate-700 font-medium">
//                 Full Name
//               </label>

//               <input
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={form.name}
//                 className="w-full border border-slate-300 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     name: e.target.value,
//                   })
//                 }
//               />
//             </>
//           )}

//           <label className="block text-left mb-2 text-slate-700 font-medium">
//             Email
//           </label>

//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={form.email}
//             className="w-full border border-slate-300 rounded-xl p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 email: e.target.value,
//               })
//             }
//           />

//           <label className="block text-left mb-2 text-slate-700 font-medium">
//             Password
//           </label>

//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={form.password}
//             className="w-full border border-slate-300 rounded-xl p-4 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 password: e.target.value,
//               })
//             }
//           />

//           <p className="text-left text-sm text-slate-500 mb-6">
//             Password must be at least 8 characters
//           </p>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium transition"
//           >
//             {isLogin ? "Sign In" : "Create Account"}
//           </button>
//         </form>

//         <p className="text-xs text-slate-500 text-center mt-6">
//           By continuing, you agree to our{" "}
//           <span className="text-blue-600 cursor-pointer">Terms of Service</span>{" "}
//           and{" "}
//           <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRecruiter, registerRecruiter } from "../services/authService";

export default function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      if (isLogin) {
        const res = await loginRecruiter({
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("recruiter_id", res.recruiter_id);

        navigate("/dashboard");
      } else {
        const res = await registerRecruiter(form);

        alert(res?.message || "Registration successful. Please login.");

        setIsLogin(true);

        setForm({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      const message =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        "Something went wrong";

      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-2">
            {/* <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
              ✓
            </div> */}

            <h1 className="text-4xl font-bold text-slate-900">
              Recruiter Management
            </h1>
          </div>

          <p className="text-slate-500">Professional Recruitment Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          {/* Tabs */}
          <div className="grid grid-cols-2 bg-slate-100 rounded-xl p-1 mb-2 ">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`h-11 rounded-lg font-medium transition ${
                isLogin ? "bg-white shadow text-slate-900" : "text-slate-500"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`h-11 rounded-lg font-medium transition ${
                !isLogin ? "bg-white shadow text-slate-900" : "text-slate-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4 mt-2">
                <label className="block mb-2 text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </div>
            )}

            <div className="mb-4 mt-2">
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-2">
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                className="w-full h-12 px-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 mt-6">
            By continuing, you agree to our{" "}
            <span className="text-blue-600 cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
