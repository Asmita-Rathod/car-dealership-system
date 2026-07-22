export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-2xl font-bold mb-3">
              🚗 CarDealership
            </h2>

            <p className="text-gray-400">
              Your trusted destination for premium cars.
              Browse SUVs, Sedans, Hatchbacks,
              Sports Cars and Electric Vehicles.
            </p>
          </div>


          <div>

            <h3 className="text-xl font-semibold mb-3">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-400">

              <li>Home</li>

              <li>Vehicles</li>

              <li>Purchase History</li>

              <li>Admin Dashboard</li>

            </ul>

          </div>


          <div>

            <h3 className="text-xl font-semibold mb-3">
              Contact
            </h3>

            <p className="text-gray-400">
              📧 support@cardealership.com
            </p>

            <p className="text-gray-400">
              📞 +91 98765 43210
            </p>

          </div>

        </div>


        <hr className="my-8 border-gray-700" />


        <p className="text-center text-gray-500">

          © 2026 CarDealership.
          All Rights Reserved.

        </p>

      </div>

    </footer>
  );
}