import { purchaseVehicle } from "../services/vehicleService";
export default function VehicleCard({ vehicle }) {
    const handlePurchase = async () => {
  try {
    await purchaseVehicle(vehicle.id);

    alert("Vehicle purchased successfully!");

    window.location.reload();
  } catch (error) {
    alert(error.response?.data?.error || "Purchase failed");
  }
};
  return (
    <div className="bg-white rounded-xl shadow-md p-5">

      <h2 className="text-2xl font-bold">
        {vehicle.make}
      </h2>

      <p className="text-gray-600">
        {vehicle.model}
      </p>

      <p className="mt-2">
        Category:
        <span className="font-semibold">
          {" "}
          {vehicle.category}
        </span>
      </p>

      <p>
        Price:
        <span className="font-semibold text-green-600">
          {" "}
          ₹{Number(vehicle.price).toLocaleString("en-IN")}
        </span>
      </p>

      <p>
        Stock:
        <span className="font-semibold">
          {" "}
          {vehicle.quantity}
        </span>
      </p>

      <button
    onClick={handlePurchase}
    disabled={vehicle.quantity === 0}
    className={`mt-4 w-full py-2 rounded text-white ${
        vehicle.quantity === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
    }`}
>
    Purchase
</button>

    </div>
  );
}