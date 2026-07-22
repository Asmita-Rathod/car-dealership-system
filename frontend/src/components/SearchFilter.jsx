import { useState } from "react";

export default function SearchFilter({ onSearch }) {

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");


  const handleSearch = () => {

    onSearch({
      search,
      category,
    });

  };


  return (

    <div className="bg-white shadow-md rounded-xl p-5 mb-8">


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


        <input

          type="text"

          placeholder="Search vehicle..."

          value={search}

          onChange={(e) => setSearch(e.target.value)}

          className="border rounded p-3"

        />



        <select

          value={category}

          onChange={(e) => setCategory(e.target.value)}

          className="border rounded p-3"

        >

          <option value="">
            All Categories
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



        <button

          onClick={handleSearch}

          className="bg-blue-600 text-white rounded hover:bg-blue-700"

        >

          Search

        </button>


      </div>


    </div>

  );

}