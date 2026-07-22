import { useEffect, useState } from "react";

import { getVehicles } from "../services/vehicleService";

import VehicleCard from "../components/VehicleCard";

import Navbar from "../components/Navbar";

import SearchFilter from "../components/SearchFilter";


export default function Dashboard() {


  const [vehicles, setVehicles] = useState([]);

  const [filteredVehicles, setFilteredVehicles] = useState([]);



  useEffect(() => {

    fetchVehicles();

  }, []);



  const fetchVehicles = async () => {

    try {

      const data = await getVehicles();

      setVehicles(data);

      setFilteredVehicles(data);


    } catch(error) {

      console.log(error);

    }

  };



  const handleSearch = ({ search, category }) => {


    let result = vehicles;



    if(search) {

  result = result.filter(

    (vehicle)=>

      vehicle.make
      .toLowerCase()
      .includes(search.toLowerCase())

      ||

      vehicle.model
      .toLowerCase()
      .includes(search.toLowerCase())

      ||

      vehicle.category
      .toLowerCase()
      .includes(search.toLowerCase())

  );

}

    if(category) {

      result = result.filter(

        (vehicle)=>

          vehicle.category === category

      );

    }



    setFilteredVehicles(result);


  };



  return (

    <>


      <div className="min-h-screen bg-gray-100 p-10">


        <h1 className="text-4xl font-bold text-center mb-10">

          Available Vehicles

        </h1>



        <SearchFilter
          onSearch={handleSearch}
        />



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


          {filteredVehicles.length > 0 ? (

            filteredVehicles.map((vehicle)=>(

              <VehicleCard

                key={vehicle.id}

                vehicle={vehicle}

              />

            ))

          ) : (

            <p className="text-center col-span-full text-gray-500">

              No vehicles found

            </p>

          )}


        </div>


      </div>


    </>

  );

}