import { useNavigate, Link } from "react-router-dom";


export default function Navbar() {


  const navigate = useNavigate();


  const email = localStorage.getItem("email");

  const role = localStorage.getItem("role");



  const handleLogout = () => {


    localStorage.removeItem("access");

    localStorage.removeItem("refresh");

    localStorage.removeItem("email");

    localStorage.removeItem("role");


    navigate("/");


  };



  return (

    <nav className="bg-blue-600 text-white px-8 py-4 shadow-md">


      <div className="flex justify-between items-center">


        {/* Logo */}

        <Link

          to={
            role === "ADMIN"
              ? "/admin"
              : "/dashboard"
          }

          className="text-2xl font-bold"

        >

          🚗 CarDealership

        </Link>





        <div className="flex items-center gap-6">


          {
            role === "ADMIN" ? (


              <Link

                to="/admin"

                className="hover:text-gray-200"

              >

                Admin Dashboard

              </Link>


            ) : (


              <>


                <Link

                  to="/dashboard"

                  className="hover:text-gray-200"

                >

                  Vehicles

                </Link>



                <Link

                  to="/purchases"

                  className="hover:text-gray-200"

                >

                  My Purchases

                </Link>


              </>


            )

          }






          {
            email && (

              <span className="hidden md:block">

                {email}

              </span>

            )

          }






          <button

            onClick={handleLogout}

            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"

          >

            Logout

          </button>




        </div>


      </div>


    </nav>

  );

}