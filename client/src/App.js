import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import Routing from "./routes/routing";
import { useLocation } from "react-router-dom";

const authRoutes = [
  "/dashboard/home",
  "/dashboard/home/control-room",
  "/dashboard/event",
];

const footerRoutes = ["/", "/host", "/guests"];

function App() {
  const location = useLocation();

  return (
    <>
      <Header auth={!authRoutes.includes(location.pathname)} />
      <Routing />
      {footerRoutes.includes(location.pathname) ? <Footer /> : null}
    </>
  );
}

export default App;
