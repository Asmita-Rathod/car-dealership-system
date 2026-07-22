import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import AddVehicleForm from "../components/AddVehicleForm";

import AdminVehicleCard from "../components/AdminVehicleCard";

import { getVehicles } from "../services/vehicleService";



export default function AdminDashboard(){


const [vehicles,setVehicles]=useState([]);



const fetchVehicles = async()=>{


try{


const data = await getVehicles();


setVehicles(data);


}

catch(error){

console.log(error);

}


};



useEffect(()=>{


fetchVehicles();


},[]);




return (

<>





<div className="min-h-screen bg-gray-100 p-10">


<h1 className="text-4xl font-bold text-center mb-10">

Admin Dashboard

</h1>



<AddVehicleForm

refreshVehicles={fetchVehicles}

/>



<h2 className="text-3xl font-bold mb-5">

Manage Vehicles

</h2>



<div className="grid grid-cols-1 md:grid-cols-3 gap-6">


{

vehicles.map((vehicle)=>(


<AdminVehicleCard

key={vehicle.id}

vehicle={vehicle}

refreshVehicles={fetchVehicles}

/>


))

}


</div>



</div>


</>

);


}