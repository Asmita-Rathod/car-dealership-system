import { useEffect, useState } from "react";
import { getMyPurchases } from "../services/vehicleService";

export default function PurchaseHistory() {

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const data = await getMyPurchases();
      setPurchases(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        My Purchase History
      </h1>

      {purchases.length === 0 ? (

        <p className="text-center text-gray-500 text-lg">
          No purchases found.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {purchases.map((purchase) => (

            <div
              key={purchase.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >

              <h2 className="text-2xl font-bold text-blue-700">

                🚗 {purchase.vehicle.make}

              </h2>

              <p className="text-gray-600 mb-3">

                {purchase.vehicle.model}

              </p>

              <p>

                <span className="font-semibold">
                  Category:
                </span>{" "}

                {purchase.vehicle.category}

              </p>

              <p>

                <span className="font-semibold">
                  Price:
                </span>{" "}

                ₹{Number(purchase.vehicle.price).toLocaleString("en-IN")}

              </p>

              <p>

                <span className="font-semibold">
                  Quantity Purchased:
                </span>{" "}

                {purchase.quantity}

              </p>

              <p>

                <span className="font-semibold">
                  Purchased On:
                </span>{" "}

                {new Date(
                  purchase.purchased_at
                ).toLocaleDateString("en-IN")}

              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}