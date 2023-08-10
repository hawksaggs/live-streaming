import { Link } from "react-router-dom";
import "./sidebar.css";
import {
  EventIcon,
  HelpIcon,
  HomeIcon,
  HomeIconActive,
  LogOutIcon,
} from "../../assets/icons";

import ActiveEventIcon from "../../assets/icons/event_Icon.svg"

const Sidebar = ({ active }) => {
  return (
    <div className="sidebar_container d-lg-flex d-none">
      <div className="link_conatiner">
        <div className={`link_item ${active === 1 ? "active" : ""}`}>
          <Link to="/dashboard/home/control-room">
            <img src={active === 1 ? HomeIconActive : HomeIcon} alt="" />
            <p>Home</p>
          </Link>
        </div>
        <div className={`link_item ${active === 2 ? "active" : ""}`}>
          <Link to="/dashboard/event">
            <img src={active === 2 ? ActiveEventIcon :EventIcon} alt="" />
            <p>Event</p>
          </Link>
        </div>
        <div className={`link_item ${active === 3 ? "active" : ""}`}>
          <Link to="#">
            <img src={HelpIcon} alt="" />
            <p>Help</p>
          </Link>
        </div>
      </div>

      <div className="logout_icon">
        <div className="link_item d-flex align-items-center cursor_pointer">
          <img src={LogOutIcon} alt="" />
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
