import { useState } from "react";
import RestockForm from "./RestockForm";
import {
  deleteVehicle
} from "../services/vehicleService";

import EditVehicleForm from "./EditVehicleForm";


export default function AdminVehicleCard({

  vehicle,

  refreshVehicles

}) {


  const [editing, setEditing] = useState(false);
  const [restocking,setRestocking] = useState(false);


  const handleDelete = async () => {


    if(!window.confirm("Delete this vehicle?"))

      return;


    try {


      await deleteVehicle(vehicle.id);


      alert("Vehicle deleted");


      refreshVehicles();


    } catch(error) {


      console.log(error);


      alert("Delete failed");


    }


  };



  return (

    <div className="bg-white shadow-md rounded-xl p-5">


      <h2 className="text-xl font-bold">

        {vehicle.make}

      </h2>


      <p>
        Model: {vehicle.model}
      </p>


      <p>
        Category: {vehicle.category}
      </p>


      <p>
        Price:
        ₹{Number(vehicle.price).toLocaleString("en-IN")}
      </p>


      <p>
        Stock: {vehicle.quantity}
      </p>



      <div className="flex gap-3 mt-4">


        <button

          onClick={() => setEditing(!editing)}

          className="bg-blue-600 text-white px-4 py-2 rounded"

        >

          Edit

        </button>



        <button

          onClick={handleDelete}

          className="bg-red-600 text-white px-4 py-2 rounded"

        >

          Delete

        </button>

        <button

            onClick={()=>setRestocking(!restocking)}

            className="bg-green-600 text-white px-4 py-2 rounded"

            >

            Restock

            </button>


      </div>




      {editing && (

        <EditVehicleForm

          vehicle={vehicle}

          refreshVehicles={refreshVehicles}

          closeEdit={() => setEditing(false)}

        />

      )}

       {restocking && (

      <RestockForm

        vehicle={vehicle}

        refreshVehicles={refreshVehicles}

        closeRestock={() => setRestocking(false)}

      />

    )}



    </div>

  );

}