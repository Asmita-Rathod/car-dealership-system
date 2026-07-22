import { useEffect, useState } from "react";
import { getVehicles } from "../services/vehicleService";
import VehicleCard from "../components/VehicleCard";

export default function Dashboard() {

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {

    fetchVehicles();

  }, []);

  const fetchVehicles = async () => {

    try {

      const data = await getVehicles();

      setVehicles(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Available Vehicles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {vehicles.map((vehicle) => (

          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
          />

        ))}

      </div>

    </div>

  );

}