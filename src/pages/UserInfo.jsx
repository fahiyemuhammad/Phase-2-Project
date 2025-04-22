import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserInfo({ user, setUser }) {
  const navigate = useNavigate();

  function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    fetch(`http://localhost:3001/users/${user.id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Account deleted");
        setUser(null);
        navigate("/signup");
      })
      .catch(() => {
        toast.error("Failed to delete account");
      });
  }

  function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to delete your account?")
    if(confirmLogout){
    setUser(null);
    toast.info("Logged out successfully!");
    navigate("/login");
    }
  }

  if (!user) return <p style={{ padding: "1rem" }}>Please log in to view your profile.</p>;

  return (
    <div className="user-info-container">
      <h2>👤 Your Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <div className="btn-container">
        <button className="logout-btn"onClick={handleLogout}>Logout</button>
        <button className="delete-btn"onClick={handleDelete}>Delete My Account</button>
      </div>
    </div>
  );
}

export default UserInfo;