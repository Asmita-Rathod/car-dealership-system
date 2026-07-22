import { useEffect, useState } from "react";

import api from "../services/api";

import AddVehicleForm from "../components/AddVehicleForm";

import AdminVehicleCard from "../components/AdminVehicleCard";

import { getVehicles } from "../services/vehicleService";


export default function AdminDashboard() {


  const [stats, setStats] = useState({

    total_vehicles: 0,
    total_stock: 0,
    total_purchases: 0,
    total_customers: 0,

  });


  const [vehicles, setVehicles] = useState([]);



  useEffect(() => {

    fetchStats();

    fetchVehicles();

  }, []);




  const fetchStats = async () => {

    try {

      const response = await api.get(
        "vehicles/admin/stats/"
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }

  };




  const fetchVehicles = async () => {

    try {

      const data = await getVehicles();

      setVehicles(data);

    } catch (error) {

      console.log(error);

    }

  };




  const refreshData = () => {

    fetchStats();

    fetchVehicles();

  };



  return (

    <div className="min-h-screen bg-gray-100 p-8">


      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">

          Admin Dashboard

        </h1>

        <p className="text-gray-600 mt-2">

          Manage vehicles, inventory, and monitor dealership activity.

        </p>

      </div>





      {/* Statistics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-600">

          <div className="flex items-center gap-4">

            <div className="text-4xl">
              🚗
            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Total Vehicles
              </p>

              <h2 className="text-3xl font-bold">
                {stats.total_vehicles}
              </h2>

            </div>

          </div>

        </div>



        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-600">

          <div className="flex items-center gap-4">

            <div className="text-4xl">
              📦
            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Total Stock
              </p>

              <h2 className="text-3xl font-bold">
                {stats.total_stock}
              </h2>

            </div>

          </div>

        </div>



        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-purple-600">

          <div className="flex items-center gap-4">

            <div className="text-4xl">
              🛒
            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Total Purchases
              </p>

              <h2 className="text-3xl font-bold">
                {stats.total_purchases}
              </h2>

            </div>

          </div>

        </div>



        <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-orange-500">

          <div className="flex items-center gap-4">

            <div className="text-4xl">
              👥
            </div>

            <div>

              <p className="text-gray-500 text-sm">
                Total Customers
              </p>

              <h2 className="text-3xl font-bold">
                {stats.total_customers}
              </h2>

            </div>

          </div>

        </div>


      </div>





      {/* Add Vehicle Form */}

      <AddVehicleForm refreshVehicles={refreshData} />





      {/* Vehicle Management */}

      <div className="mt-10">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl font-bold text-gray-800">

            Vehicle Inventory

          </h2>

          <span className="text-gray-500">

            {vehicles.length} vehicles

          </span>

        </div>



        {vehicles.length === 0 ? (

          <div className="bg-white rounded-xl shadow-md p-10 text-center text-gray-500">

            No vehicles available.

          </div>

        ) : (

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {vehicles.map((vehicle) => (

              <AdminVehicleCard

                key={vehicle.id}

                vehicle={vehicle}

                refreshVehicles={refreshData}

              />

            ))}

          </div>

        )}

      </div>


    </div>

  );

}