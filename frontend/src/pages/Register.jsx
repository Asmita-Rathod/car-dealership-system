import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        {error && (
          <p className="text-red-500 mb-3">
            {error}
          </p>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
        >
          <option value="CUSTOMER">Customer</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}