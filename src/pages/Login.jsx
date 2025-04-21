import { useState } from "react"




function Login() {
    const [form,setForm] = useState({email:"",password: "" });

    function  handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
     }

    function  handleSubmit(e){
        e.preventDefault();
        console.log("Login data:", form);
        //put validation logic here
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
        </form>
      </div>
      );
  }


  export default Login