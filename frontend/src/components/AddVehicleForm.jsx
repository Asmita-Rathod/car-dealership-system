import { useState } from "react";
import { addVehicle } from "../services/vehicleService";


export default function AddVehicleForm({ refreshVehicles }) {


  const [vehicle, setVehicle] = useState({

    make: "",
    model: "",
    category: "",
    price: "",
    quantity: "",

  });



  const handleChange = (e) => {

    setVehicle({

      ...vehicle,

      [e.target.name]: e.target.value,

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      await addVehicle(vehicle);


      alert("Vehicle Added Successfully");


      setVehicle({

        make: "",
        model: "",
        category: "",
        price: "",
        quantity: "",

      });


      refreshVehicles();


    } catch(error){

 console.log(
   error.response?.data
 );

 alert(
   JSON.stringify(
     error.response?.data
   )
 );

}

  };



  return (

    <form

      onSubmit={handleSubmit}

      className="bg-white shadow-md rounded-xl p-6 mb-8"

    >


      <h2 className="text-2xl font-bold mb-5">

        Add New Vehicle

      </h2>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


        <input

          name="make"

          value={vehicle.make}

          onChange={handleChange}

          placeholder="Make"

          className="border p-3 rounded"

          required

        />


        <input

          name="model"

          value={vehicle.model}

          onChange={handleChange}

          placeholder="Model"

          className="border p-3 rounded"

          required

        />


       <select

  name="category"

  value={vehicle.category}

  onChange={handleChange}

  className="border p-3 rounded"

  required

>

  <option value="">
    Select Category
  </option>

  <option value="SUV">
    SUV
  </option>

  <option value="SEDAN">
    Sedan
  </option>

  <option value="HATCHBACK">
    Hatchback
  </option>

  <option value="TRUCK">
    Truck
  </option>

  <option value="SPORTS">
    Sports
  </option>

  <option value="ELECTRIC">
    Electric
  </option>

</select>


        <input

          name="price"

          type="number"

          value={vehicle.price}

          onChange={handleChange}

          placeholder="Price"

          className="border p-3 rounded"

          required

        />


        <input

          name="quantity"

          type="number"

          value={vehicle.quantity}

          onChange={handleChange}

          placeholder="Quantity"

          className="border p-3 rounded"

          required

        />


      </div>



      <button

        className="mt-5 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"

      >

        Add Vehicle

      </button>



    </form>

  );

}