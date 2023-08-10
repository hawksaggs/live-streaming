import { Route, Routes } from 'react-router-dom';
import HomePage from "../pages/homePage/homePage";
import DashboardHome from '../pages/dashboardHome/dashboardHome';
import HostPage from '../pages/hostPage/hostPage';
import DashboardEvent from "../pages/dashboardEvent/dashboardEvent";
import SignUpPage from "../pages/signup/signupPage";
import LoginPage from "../pages/login/loginPage";

function Routing() {
    return (

        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/dashboard/home"
                    element={<DashboardHome />}
                />
                <Route
                    path="/dashboard/home/control-room"
                    element={<DashboardHome controlRoom={true} />}
                />
                <Route
                    path="/host"
                    element={<HostPage />}
                />
                <Route
                    path="/guests"
                    element={<HostPage guestsPage />}
                />
                <Route
                    path="/dashboard/event"
                    element={<DashboardEvent />}
                />
                <Route
                    path="/register"
                    element={<SignUpPage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
            </Routes>
        </div>

    );
}

export default Routing;
