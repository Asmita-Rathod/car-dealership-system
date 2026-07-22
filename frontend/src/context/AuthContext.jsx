import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();


export default function AuthProvider({ children }) {

  const [user, setUser] = useState(null);


  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if (savedUser && savedUser !== "undefined") {

      setUser(JSON.parse(savedUser));

    }

  }, []);



  const login = (data) => {

    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);


    // Only save user if backend provides it
    if (data.user) {

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

    }

  };



  const logout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setUser(null);

  };



  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}