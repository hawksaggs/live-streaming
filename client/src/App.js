// import Footer from "./components/footer/footer";
// import Header from "./components/header/header";
// import Routing from "./routes/routing";
// import { useNavigate, useLocation } from "react-router-dom";
// import { history } from "./helpers";
// import { setAuthToken } from "./helpers";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

// const authRoutes = [
//   "/dashboard/home",
//   "/dashboard/home/control-room",
//   "/dashboard/event",
// ];

// const footerRoutes = ["/", "/host", "/guests"];

// function App() {
//   // // init custom history object to allow navigation from
//   // // anywhere in the react app (inside or outside components)
//   history.navigate = useNavigate();
//   history.location = useLocation();

//   //check jwt token
//   const token = localStorage.getItem("token");
//   if (token) {
//     setAuthToken(token);
//   }

//   const logOut = () => {
//     localStorage.setItem("token", null);
//     localStorage.setItem("userId", null);
//     history.navigate("/login");
//   };

//   return (
//     <>
//       <Header
//         auth={!authRoutes.includes(history.location.pathname)}
//         logOut={logOut}
//       />
//       <Routing />
//       <ToastContainer />
//       {footerRoutes.includes(history.location.pathname) ? <Footer /> : null}
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate, useLocation , Navigate} from 'react-router-dom';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Routing from './routes/routing';
import { setAuthToken } from './helpers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { history } from "./helpers";

const authRoutes = [
  '/dashboard/home',
  '/dashboard/home/control-room',
  '/dashboard/event',
];

const footerRoutes = ['/', '/host', '/guests'];

function App() {
   history.navigate = useNavigate();
   history.location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const checkTokenExpiry = () => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          performLogout(); // Automatically logout when token expires
        }
      } catch (error) {
        console.error('Error decoding token:', error.message);
      }
    }
  };

  const performLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    history.navigate("/login"); // Redirect the user to the login page
  };

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      checkTokenExpiry();
    }
  }, [token]);

  useEffect(() => {
    const timer = setInterval(checkTokenExpiry, 10000);
    return () => clearInterval(timer);
  }, [token]);

  useEffect(() => {
    if (token) {
      checkTokenExpiry(); // Initial check when the component mounts
    }
  }, []);

  return (
    <>
      {history.location && (
        <Header auth={!authRoutes.includes(history.location.pathname)} logOut={performLogout} />
      )}
      <Routing />
      <ToastContainer />
      {footerRoutes.includes(history.location.pathname) ? <Footer /> : null}
    </>
  );
}

export default App;
