import { useEffect, useState } from "react";

import { getVehicles } from "../services/vehicleService";

import VehicleCard from "../components/VehicleCard";
import SearchFilter from "../components/SearchFilter";
import LoadingSpinner from "../components/LoadingSpinner";
export default function Dashboard() {

  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchVehicles();

  }, []);


  const fetchVehicles = async () => {

  setLoading(true);

  try {

    const data = await getVehicles();

    setVehicles(data);
    setFilteredVehicles(data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};


  const handleSearch = ({ search, category }) => {

    let result = vehicles;

    if (search) {

      result = result.filter(

        (vehicle) =>

          vehicle.make
            .toLowerCase()
            .includes(search.toLowerCase())

          ||

          vehicle.model
            .toLowerCase()
            .includes(search.toLowerCase())

      );

    }

    if (category) {

      result = result.filter(

        (vehicle) =>

          vehicle.category === category

      );

    }

    setFilteredVehicles(result);

  };


  return (

    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">

        <div className="max-w-6xl mx-auto text-center px-6">

          <h1 className="text-5xl font-bold mb-6">

            🚗 Find Your Dream Car

          </h1>

          <p className="text-xl mb-8">

            Browse SUVs, Sedans, Hatchbacks, Sports Cars and Electric Vehicles
            at the best prices.

          </p>

          <a
            href="#vehicles"
            className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
          >

            Browse Vehicles

          </a>

        </div>

      </section>



      {/* Vehicle Section */}

      <div
        id="vehicles"
        className="max-w-7xl mx-auto px-6 py-12"
      >

        <h2 className="text-4xl font-bold text-center mb-8">

          Available Vehicles

        </h2>


        <SearchFilter
          onSearch={handleSearch}
        />


        {loading ? (

  <LoadingSpinner />

) : (

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

    {filteredVehicles.length > 0 ? (

      filteredVehicles.map((vehicle) => (

        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
        />

      ))

    ) : (

      <p className="col-span-full text-center text-gray-500 text-xl">

        No vehicles found.

      </p>

    )}

  </div>

)}

      </div>

    </div>

  );

}