import { useState } from "react";
import { restockVehicle } from "../services/vehicleService";


export default function RestockForm({
  vehicle,
  refreshVehicles,
  closeRestock
}) {


  const [quantity,setQuantity] = useState("");



  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      await restockVehicle(
        vehicle.id,
        quantity
      );


      alert("Stock updated successfully");


      refreshVehicles();

      closeRestock();


    }
    catch(error){

      console.log(error);

      alert(
        error.response?.data?.error ||
        "Restock failed"
      );

    }

  };



  return (

    <form

      onSubmit={handleSubmit}

      className="bg-gray-100 mt-4 p-4 rounded"

    >


      <h3 className="font-bold mb-3">

        Add Stock

      </h3>



      <input

        type="number"

        min="1"

        value={quantity}

        onChange={(e)=>setQuantity(e.target.value)}

        placeholder="Quantity"

        className="border p-2 rounded w-full"

        required

      />



      <div className="flex gap-3 mt-3">


        <button

          className="bg-green-600 text-white px-4 py-2 rounded"

        >

          Add Stock

        </button>



        <button

          type="button"

          onClick={closeRestock}

          className="bg-gray-500 text-white px-4 py-2 rounded"

        >

          Cancel

        </button>


      </div>


    </form>

  );

}