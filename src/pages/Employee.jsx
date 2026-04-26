



// import { useState } from "react";
// import API from "../services/api";
// import "./Employee.css";

// const Employee = () => {
//   const [task, setTask] = useState({
//     title: "",
//     description: "",
//     status: "pending",
//   });

//   const name = localStorage.getItem("name"); // ✅ get name

//   const handleChange = (e) => {
//     setTask({ ...task, [e.target.name]: e.target.value });
//   };

//   const createTask = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       await API.post("/tasks", task, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("Task Created ✅");

//       setTask({
//         title: "",
//         description: "",
//         status: "pending",
//       });

//     } catch (err) {
//       alert("Error ❌");
//     }
//   };

//   return (
//     <div className="emp-container">
//       <form className="emp-box" onSubmit={createTask}>
//         <h2>Welcome {name} 👋</h2>

//         {/* 👇 USER NAME AUTO */}
//         <input value={name} readOnly />

//         <input
//           name="title"
//           placeholder="Task Title"
//           value={task.title}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Task Description"
//           value={task.description}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="status"
//           value={task.status}
//           onChange={handleChange}
//         >
//           <option value="pending">Pending</option>
//           <option value="on_process">On Process</option>
//           <option value="completed">Completed</option>
//         </select>

//         <button type="submit">Submit Task</button>
//       </form>
//     </div>
//   );
// };

// export default Employee;








import { useState } from "react";
import API from "../services/api";
import "./Employee.css";

const Employee = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(false);

  const name = localStorage.getItem("name");

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      // ✅ FIXED API URL
      await API.post("/api/tasks", task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Task Created Successfully ✅");

      setTask({
        title: "",
        description: "",
        status: "pending",
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error creating task ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="emp-container">
      <form className="emp-box" onSubmit={createTask}>
        <h2>Welcome {name || "User"} 👋</h2>

        {/* 👇 USER NAME */}
        <input value={name || ""} readOnly />

        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="on_process">On Process</option>
          <option value="completed">Completed</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Task"}
        </button>
      </form>
    </div>
  );
};

export default Employee;