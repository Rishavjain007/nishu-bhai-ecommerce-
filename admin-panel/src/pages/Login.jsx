import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://nishu-bhai-ecommerce.onrender.com/api/auth/login",
        { email, password }
      );

      const data = res.data;

      if (data.role !== "admin") {
        setError("Admin only");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: data.token,
          role: data.role,
          name: data.name,
          email: data.email,
        })
      );

      console.log("Saved user:", JSON.parse(localStorage.getItem("user")));

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
