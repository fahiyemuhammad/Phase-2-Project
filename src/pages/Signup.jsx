import { useState } from "react"

function Signup() {

   const [form, setForm ] = useState({
    username: "",
    email: "",
    password: "",
   });

   function handleChange(e){
    const {name, value } =e.target;
    setForm({...form, [name]: value });
   }

   function handleSubmit(e){
     e.preventDefault();
     console.log("signup data:", form)
     // put validation logic here
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
 
  
  export default Signup