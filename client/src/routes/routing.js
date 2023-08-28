// import { Route, Routes, create, Router } from "react-router-dom";
// import HomePage from "../pages/homePage/homePage";
// import DashboardHome from "../pages/dashboardHome/dashboardHome";
// // import HostPage from "../pages/hostPage/hostPage";
// import HostPage from "../pages/hostPage/hostPage";
// import DashboardEvent from "../pages/dashboardEvent/dashboardEvent";
// import SignUpPage from "../pages/signup/signupPage";
// import LoginPage from "../pages/login/loginPage";
// import LivePage from "../pages/livePage/livePage";

// //history
// import { history } from "../helpers";
// import RouteGuard from "./RouteGuard";

// function Routing() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/dashboard/home" element={<DashboardHome />} />
//         <Route
//           path="/dashboard/home/control-room"
//           element={
//             <RouteGuard>
//               <DashboardHome controlRoom={true} />
//             </RouteGuard>
//           }
//         />
//         <Route path="/host" element={<HostPage />} />
//         <Route path="/guests/:eventId" element={<HostPage guestsPage />} />
//         <Route path="/dashboard/event" element={<DashboardEvent />} />
//         <Route path="/register" element={<SignUpPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/live" element={<LivePage />} />
//       </Routes>
//     </div>
//   );
// }

// export default Routing;

import { Route, Routes, Router } from "react-router-dom";
import HomePage from "../pages/homePage/homePage";
import DashboardHome from "../pages/dashboardHome/dashboardHome";
import HostPage from "../pages/hostPage/hostPage";
import DashboardEvent from "../pages/dashboardEvent/dashboardEvent";
import SignUpPage from "../pages/signup/signupPage";
import LoginPage from "../pages/login/loginPage";
import LivePage from "../pages/livePage/livePage";

// history
// import { createBrowserHistory } from "history";
import RouteGuard from "./RouteGuard";

// const history = createBrowserHistory();

function Routing() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/home" element={<DashboardHome />} />
          <Route
            path="/dashboard/home/control-room"
            element={
              <RouteGuard>
                <DashboardHome controlRoom={true} />
              </RouteGuard>
            }
          />
          <Route path="/host" element={<HostPage />} />
          <Route path="/guests/:eventId" element={<HostPage guestsPage />} />
          <Route path="/dashboard/event" element={<DashboardEvent />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/live" element={<LivePage />} />
        </Routes>
    </div>
  );
}

export default Routing;
