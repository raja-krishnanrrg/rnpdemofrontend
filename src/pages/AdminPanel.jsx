// import { useEffect, useState } from "react";
// import API from "../services/api";
// import "./Admin.css";

// const AdminPanel = () => {
//   const [users, setUsers] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("all");
//   const [loading, setLoading] = useState(false);

//   // 🔥 FIX: token only for safety (API interceptor handles it)
//   const token = localStorage.getItem("token");

//   // ✅ FETCH DATA
//   const fetchData = async () => {
//     if (!token) return;

//     try {
//       setLoading(true);

//       // 🔥 FIXED API PATH (NO /api PREFIX)
//       const userRes = await API.get("/api/admin/users");
//       const taskRes = await API.get("/api/tasks/all");
//       console.log(userRes);
//       console.log(taskRes)
//       setUsers(userRes.data || []);
//       setTasks(taskRes.data || []);
//       setFilteredTasks(taskRes.data || []);
//     } catch (err) {
      
//       alert(err.response?.data?.message || "Failed to load data ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ✅ FILTER TASKS
//   const handleFilter = (userId) => {
//     setSelectedUser(userId);

//     if (userId === "all") {
//       setFilteredTasks(tasks);
//     } else {
//       setFilteredTasks(tasks.filter((t) => t.user?._id === userId));
//     }
//   };

//   // ✅ UPDATE TASK STATUS
//   const updateTaskStatus = async (id, status) => {
//     try {
//       await API.put(`/tasks/status/${id}`, { status });
//       fetchData();
//     } catch (err) {
//       alert("Task update failed ❌");
//     }
//   };

//   // ✅ DELETE TASK
//   const deleteTask = async (id) => {
//     try {
//       await API.delete(`/tasks/${id}`);
//       fetchData();
//     } catch (err) {
//       alert("Task delete failed ❌");
//     }
//   };

//   // ✅ DELETE USER
//   const deleteUser = async (id) => {
//     try {
//       await API.delete(`/admin/user/${id}`);
//       fetchData();
//     } catch (err) {
//       alert("User delete failed ❌");
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h1>👑 Admin Dashboard</h1>

//       {loading && <p>Loading...</p>}

//       {/* USERS */}
//       <h2>Users</h2>
//       <div className="card-container">
//         {users.length > 0 ? (
//           users.map((u) => (
//             <div className="card user-card" key={u._id}>
//               <h3>{u.name}</h3>
//               <p>{u.email}</p>
              

//               <button onClick={() => deleteUser(u._id)}>
//                 Delete User
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No users found</p>
//         )}
//       </div>

//       {/* FILTER */}
//       <h2>Filter Tasks</h2>
//       <select value={selectedUser} onChange={(e) => handleFilter(e.target.value)}>
//         <option value="all">All Users</option>
//         {users.map((u) => (
//           <option key={u._id} value={u._id}>
//             {u.name}
//           </option>
//         ))}
//       </select>

//       {/* TASKS */}
//       <h2>Tasks</h2>
//       <div className="card-container">
//         {filteredTasks.length > 0 ? (
//           filteredTasks.map((t) => (
//             <div className="card task-card" key={t._id}>
//               <h3>{t.title}</h3>
//               <p>{t.description}</p>

//               <p><b>User:</b> {t.user?.name || "N/A"}</p>

//               <select
//                 value={t.status}
//                 onChange={(e) => updateTaskStatus(t._id, e.target.value)}
//               >
//                 <option value="pending">Pending</option>
//                 <option value="on_process">On Process</option>
//                 <option value="completed">Completed</option>
//               </select>

//               <button onClick={() => deleteTask(t._id)}>
//                 Delete Task
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No tasks found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;



import { useEffect, useState } from "react";
import API from "../services/api";
import "./Admin.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("all");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const userRes = await API.get("/api/admin/users");
      const taskRes = await API.get("/api/tasks/all");
      setUsers(userRes.data || []);
      setTasks(taskRes.data || []);
      setFilteredTasks(taskRes.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load data ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (userId) => {
    setSelectedUser(userId);
    if (userId === "all") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((t) => t.user?._id === userId));
    }
  };

  // ✅ FIXED: Added /api prefix
  const updateTaskStatus = async (id, status) => {
    try {
      await API.put(`/api/tasks/status/${id}`, { status });
      fetchData();
      alert("task updated")
    } catch (err) {
      alert("Task update failed ❌");
    }
  };

  // ✅ FIXED: Added /api prefix
  const deleteTask = async (id) => {
    try {
      await API.delete(`/api/tasks/${id}`);
      fetchData();
      alert("delete task")
    } catch (err) {
      alert("Task delete failed ❌");
    }
  };

  // ✅ FIXED: Added /api prefix
  const deleteUser = async (id) => {
    try {
      await API.delete(`/api/admin/user/${id}`);
      fetchData();
      alert("delete user")
    } catch (err) {
      alert("User delete failed ❌");
    }
  };

  return (
    <div className="admin-container">
      <h1>👑 Admin Dashboard</h1>
      {loading && <p>Loading...</p>}

      <h2>Users</h2>
      <div className="card-container">
        {users.map((u) => (
          <div className="card user-card" key={u._id}>
            <h3>{u.name}</h3>
            <p>{u.email}</p>
            <button className="delete-btn" onClick={() => deleteUser(u._id)}>Delete User</button>
          </div>
        ))}
      </div>

      <h2>Filter Tasks</h2>
      <select value={selectedUser} onChange={(e) => handleFilter(e.target.value)}>
        <option value="all">All Users</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>{u.name}</option>
        ))}
      </select>

      <h2>Tasks</h2>
      <div className="card-container">
        {filteredTasks.map((t) => (
          <div className="card task-card" key={t._id}>
            <h3>{t.title}</h3>
            <p>{t.description}</p>
            <p><b>User:</b> {t.user?.name || "N/A"}</p>
            <select class="dropdown" value={t.status} onChange={(e) => updateTaskStatus(t._id, e.target.value)}>
              <option value="pending">Pending</option>
              <option value="on_process">On Process</option>
              <option value="completed">Completed</option>
            </select>
            <button className="delete-btn" onClick={() => deleteTask(t._id)}>Delete Task</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;