import { purchaseVehicle } from "../services/vehicleService";

export default function VehicleCard({ vehicle }) {

  const handlePurchase = async () => {

    try {

      await purchaseVehicle(vehicle.id);

      alert("Vehicle purchased successfully!");

      window.location.reload();

    } catch (error) {

      alert(
        error.response?.data?.error ||
        "Purchase failed"
      );

    }

  };


  const images = {

    SUV:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",

    SEDAN:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",

    HATCHBACK:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",

    SPORTS:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",

    ELECTRIC:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",

    TRUCK:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800",

  };


  return (

    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      <img

        src={images[vehicle.category]}

        alt={vehicle.make}

        className="w-full h-56 object-cover"

      />



      <div className="p-5">

        <h2 className="text-2xl font-bold">

          {vehicle.make}

        </h2>


        <p className="text-gray-500">

          {vehicle.model}

        </p>



        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mt-3">

          {vehicle.category}

        </span>



        <p className="mt-4 text-2xl font-bold text-green-600">

          ₹{Number(vehicle.price).toLocaleString("en-IN")}

        </p>



        <p className="mt-2">

          {

            vehicle.quantity > 0 ?

            <span className="text-green-600 font-semibold">

              🟢 In Stock : {vehicle.quantity}

            </span>

            :

            <span className="text-red-600 font-semibold">

              🔴 Out of Stock

            </span>

          }

        </p>



        <button

          onClick={handlePurchase}

          disabled={vehicle.quantity === 0}

          className={`mt-5 w-full py-3 rounded-xl text-white font-semibold transition ${
            vehicle.quantity === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}

        >

          Purchase Vehicle

        </button>

      </div>

    </div>

  );

}