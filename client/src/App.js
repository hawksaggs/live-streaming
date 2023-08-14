import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Routing from "./routes/routing";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { history } from "./helpers";
import { setAuthToken } from "./helpers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const authRoutes = [
  "/dashboard/home",
  "/dashboard/home/control-room",
  "/dashboard/event",
];

const footerRoutes = ["/", "/host", "/guests"];

function App() {
  // // init custom history object to allow navigation from
  // // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  //check jwt token
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  const logOut = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
    history.navigate("/login");
  };

  return (
    <>
      <Header
        auth={!authRoutes.includes(history.location.pathname)}
        logOut={logOut}
      />
      <Routing />
      <ToastContainer />
      {footerRoutes.includes(history.location.pathname) ? <Footer /> : null}
    </>
  );
}

export default App;
