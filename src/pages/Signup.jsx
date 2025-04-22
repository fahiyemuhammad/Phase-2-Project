import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup({ setUser }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((users) => {
        const usernameExists = users.some(
          (user) => user.username === form.username
        );
        const emailExists = users.some((user) => user.email === form.email);

        if (usernameExists || emailExists) {
          if (usernameExists) {
            toast.error("Username already taken!", {
              position: "top-right",
            });
          }
          if (emailExists) {
            toast.error("Email already registered!", {
              position: "top-right",
            });
          }
          return;
        }

        //  After  both are unique, proceed with signup
        fetch("http://localhost:3001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        })
          .then((res) => res.json())
          .then((newUser) => {
            setUser(newUser);
            toast.success("Account created successfully!", {
              position: "top-right",
              autoClose: 3000,
            });
            navigate("/login");
          });
      });
  }

  return (
    <div className="form-container">
      <h2 className="form-h2">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;