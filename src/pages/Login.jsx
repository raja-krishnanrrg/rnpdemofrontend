// import { useState, useEffect } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import API from "../services/api";
// import "./Login.css";

// const Login = () => {
//   const nav = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // Auto fill (optional)
//   useEffect(() => {
//     if (location.state) {
//       setForm({
//         email: location.state.email || "",
//         password: location.state.password || "",
//       });
//     }
//   }, [location.state]);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const login = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       // ✅ CORRECT API URL
//       const res = await API.post("/api/auth/login", form);

//       // ✅ Store data
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.user.role);
//       localStorage.setItem("name", res.data.user.name);

//       alert("Login Successful 🎉");

//       // ✅ Redirect
//       if (res.data.user.role === "admin") {
//         nav("/adminpans");
//       } else {
//         nav("/employedash");
//       }

//     } catch (err) {
//       console.log(err);

//       if (err.response) {
//         alert(err.response.data.message);
//       } else {
//         alert("Server not responding ❌");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form className="login-box" onSubmit={login}>
//         <h2>Login</h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p>
//           Don’t have an account?{" "}
//           <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;



import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

const Login = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Auto fill (optional)
  useEffect(() => {
    if (location.state) {
      setForm({
        email: location.state.email || "",
        password: location.state.password || "",
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ FIXED API CALL (NO /api prefix)
      const res = await API.post("/api/auth/login", form);;

      // Save data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      alert("Login Successful 🎉");

      // Redirect
      if (res.data.user.role === "admin") {
        nav("/adminpans");
      } else {
        nav("/employedash");
      }

    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message || "Server not responding ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={login}>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;