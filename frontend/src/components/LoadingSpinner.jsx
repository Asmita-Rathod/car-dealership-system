export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-20">

      <div className="flex flex-col items-center">

        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-gray-600 font-medium">
          Loading vehicles...
        </p>

      </div>

    </div>
  );
}