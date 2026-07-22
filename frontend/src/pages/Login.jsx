import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    setError("");


    try {

      const response = await loginUser(formData);


      console.log("LOGIN RESPONSE:", response);



      // Save tokens

      localStorage.setItem(
        "access",
        response.access
      );


      localStorage.setItem(
        "refresh",
        response.refresh
      );


      // Save email

      localStorage.setItem(
  "role",
  response.role
);



      alert("Login Successful!");



      // Check role

      const role =
        response.role ||
        response.user?.role;



      if (role === "ADMIN") {

        navigate("/admin");

      } 
      else {

        navigate("/dashboard");

      }



    } catch (err) {


      console.log("FULL ERROR:", err);



      if (err.response) {


        setError(
          err.response.data.detail ||
          "Invalid email or password"
        );


      } 
      else if (err.request) {


        setError(
          "Cannot connect to backend server"
        );


      } 
      else {


        setError(
          "Something went wrong"
        );


      }


    }


  };



  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <form

        onSubmit={handleSubmit}

        className="bg-white p-8 rounded-lg shadow-lg w-96"

      >


        <h2 className="text-3xl font-bold text-center mb-6">

          Login

        </h2>



        {error && (

          <p className="text-red-500 mb-4 text-center">

            {error}

          </p>

        )}



        <input

          type="email"

          name="email"

          placeholder="Email"

          value={formData.email}

          onChange={handleChange}

          className="w-full border rounded p-2 mb-4"

          required

        />



        <input

          type="password"

          name="password"

          placeholder="Password"

          value={formData.password}

          onChange={handleChange}

          className="w-full border rounded p-2 mb-4"

          required

        />



        <button

          type="submit"

          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"

        >

          Login

        </button>



        <p className="text-center mt-4">

          Don't have an account?{" "}


          <Link

            to="/register"

            className="text-blue-600 hover:underline"

          >

            Register

          </Link>


        </p>



      </form>


    </div>

  );

}