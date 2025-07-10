import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
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
        const matchedUser = users.find(
          (user) => user.email === form.email && user.password === form.password
        );
        if (matchedUser) {
          setUser(matchedUser); // Save user to state
          toast.success("Logged in successfully!", {
            position: "top-center",
          });
          navigate("/"); // Redirect to Home page
        } else {
          toast.error("Invalid email or password", {
            position: "top-center",
          });
        }
      });
  }

  return (
    <div className="form-container">
      <h2 className="form-h2">Login</h2>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
        <p>
          Dont have an account? <Link to="/signup">SignUp</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
