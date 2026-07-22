import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import PurchaseHistory from "./pages/PurchaseHistory";
function Layout({ children }) {

  return (
    <>
      <Navbar />

      {children}
       <Footer />
    </>
  );

}



function App() {

  return (

    <BrowserRouter>

      <Routes>


        <Route 
          path="/" 
          element={<Login />} 
        />


        <Route 
          path="/register" 
          element={<Register />} 
        />



        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="CUSTOMER">
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />



        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route

          path="/purchases"

          element={

            <ProtectedRoute role="CUSTOMER">

              <Layout>

                <PurchaseHistory />

              </Layout>

            </ProtectedRoute>

          }

          />

        <Route 
          path="*" 
          element={<NotFound />} 
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;