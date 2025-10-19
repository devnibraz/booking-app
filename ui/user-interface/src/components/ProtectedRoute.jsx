// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import api from "../api";

// const ProtectedRoute = ({ children }) => {
//   const [loading, setLoading] = useState(true);
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await api.get("me/");
//         setLoggedIn(true);
//       } catch (err) {
//         setLoggedIn(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkAuth();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   return loggedIn ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
