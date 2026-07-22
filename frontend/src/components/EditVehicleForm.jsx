import { useState } from "react";
import { updateVehicle } from "../services/vehicleService";


export default function EditVehicleForm({
  vehicle,
  refreshVehicles,
  closeEdit
}) {


  const [formData, setFormData] = useState({

    make: vehicle.make,
    model: vehicle.model,
    category: vehicle.category,
    price: vehicle.price,
    quantity: vehicle.quantity,

  });



  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      await updateVehicle(
        vehicle.id,
        formData
      );


      alert("Vehicle updated successfully");


      refreshVehicles();


      closeEdit();


    } catch(error) {


      console.log(error);


      alert("Update failed");


    }

  };



  return (

    <div className="bg-gray-100 p-5 rounded-xl mt-4">


      <h3 className="text-xl font-bold mb-4">

        Edit Vehicle

      </h3>



      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >


        <input

          name="make"

          value={formData.make}

          onChange={handleChange}

          className="border p-2 rounded"

          placeholder="Make"

          required

        />



        <input

          name="model"

          value={formData.model}

          onChange={handleChange}

          className="border p-2 rounded"

          placeholder="Model"

          required

        />



        <input

          name="category"

          value={formData.category}

          onChange={handleChange}

          className="border p-2 rounded"

          placeholder="Category"

          required

        />



        <input

          type="number"

          name="price"

          value={formData.price}

          onChange={handleChange}

          className="border p-2 rounded"

          placeholder="Price"

          required

        />



        <input

          type="number"

          name="quantity"

          value={formData.quantity}

          onChange={handleChange}

          className="border p-2 rounded"

          placeholder="Quantity"

          required

        />




        <div className="md:col-span-2 flex gap-4">


          <button

            type="submit"

            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"

          >

            Save Changes

          </button>



          <button

            type="button"

            onClick={closeEdit}

            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"

          >

            Cancel

          </button>


        </div>



      </form>


    </div>

  );

}