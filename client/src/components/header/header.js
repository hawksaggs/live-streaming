import { Link, useNavigate } from "react-router-dom";
import {
  CrossIcon,
  DayLightIcon,
  DownYellowArrow,
  EventIcon,
  HamburgerIcon,
  HamburgerIconDark,
  HomeIcon,
  LogOutIcon,
  NotificationIcon,
  SettingIcon,
} from "../../assets/icons";
import logo from "../../assets/images/Netikash_Live_Logo.svg";
import logoDark from "../../assets/images/Netikash_Live_PNG.png";
import sellerProfile from "../../assets/images/seller_profile.png";
import "./header.css";
import { Button } from "react-bootstrap";
import { useRef, useState } from "react";
import useOutsideClick from "../outsideClick/outsideClick";

const Header = ({ auth, logOut }) => {
  const navigate = useNavigate();

  const [showDropdownLinks, setShowDropdownLinks] = useState(false);

  const [showMobileHeader, setShowMobileHeader] = useState(false);

  const ref = useRef();

  useOutsideClick(ref, () => {
    setShowDropdownLinks(false);
  });

  return (
    <>
      {auth ? (
        <>
          <div className="header_bk">
            <img src={HamburgerIcon} className="cursor_pointer" alt="" />

            <img
              src={logo}
              alt=""
              className="logo cursor_pointer"
              onClick={() => {
                navigate("/");
                setShowMobileHeader(false);
              }}
            />

            <div
              className={`${
                window.location.pathname === "/live-host"
                  ? "live_host_space_alignment"
                  : ""
              } header_links d-flex align-items-center`}
            >
              {window.location.pathname === "/live-host" ? (
                <>
                  <Link to="#">Live</Link>
                  <Link to="#">Creators</Link>
                  <Link to="#">FAQ</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard/home/control-room">Discover</Link>
                  <Link to="#" className="bold_text_500">
                    Live Category
                  </Link>
                  <Link to="#" className="bold_text_500">
                    How to work
                  </Link>
                  <Link to="#" className="bold_text_500">
                    Blog
                  </Link>
                </>
              )}
            </div>

            <div className="header_auth_btn d-flex align-items-center">
              {window.location.pathname === "/live-host" ? (
                <Button>Download</Button>
              ) : (
                <>
                  <Link to="/login">Log in</Link>
                  <Link to="/register">Sign Up</Link>
                  {/*<Button>Sign Up</Button>{" "}*/}
                </>
              )}
            </div>
          </div>

          <div className="header_mobile_responsive">
            <img
              src={logo}
              alt=""
              className="logo cursor_pointer"
              onClick={() => navigate("/")}
            />

            <img
              src={HamburgerIcon}
              onClick={() => setShowMobileHeader(!showMobileHeader)}
              className="cursor_pointer"
              alt=""
            />
            {showMobileHeader ? (
              <div className="header_box">
                <div
                  className="cross_icon cursor_pointer"
                  onClick={() => setShowMobileHeader(false)}
                >
                  <img src={CrossIcon} alt="" />
                </div>

                <div className="mobile_link_buttons">
                  {window.location.pathname === "/live-host" ? (
                    <>
                      <Link to="#">Live</Link>
                      <Link to="#">Creators</Link>
                      <Link to="#">FAQ</Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/dashboard/home/control-room"
                        onClick={() => setShowMobileHeader(false)}
                      >
                        Discover
                      </Link>
                      <Link to="#" className="bold_text_500">
                        Live Category
                      </Link>
                      <Link to="#" className="bold_text_500">
                        How to work
                      </Link>
                      <Link to="#" className="bold_text_500">
                        Blog
                      </Link>
                    </>
                  )}
                  <div className="mt-4">
                    {" "}
                    {window.location.pathname === "/live-host" ? (
                      <Button>Download</Button>
                    ) : (
                      <>
                        <Link to="#">Log in</Link>
                        <Button>Sign Up</Button>{" "}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div className="header_bk_dark">
            <div>
              <img src={HamburgerIconDark} className="cursor_pointer" alt="" />
              <img
                src={logoDark}
                alt=""
                className="logo cursor_pointer"
                onClick={() => navigate("/")}
              />
            </div>

            <div className="header_links d-flex align-items-center">
              <Link to="#">
                <img src={DayLightIcon} className="cursor_pointer" alt="" />
              </Link>
              <Link to="#">
                <img src={NotificationIcon} className="cursor_pointer" alt="" />
              </Link>

              <div ref={ref}>
                <div
                  className="user_name_box d-flex align-items-center cursor_pointer"
                  onClick={() => setShowDropdownLinks(!showDropdownLinks)}
                >
                  <img src={sellerProfile} width={40} alt="" />
                  <p className="mb-0 ms-3">Kathy Hayes</p>
                </div>
                {showDropdownLinks ? (
                  <div className="drodown_box">
                    <div className="link_conatiner">
                      <div className={`link_item`}>
                        <Link
                          to="/dashboard/home/control-room"
                          onClick={() => setShowDropdownLinks(false)}
                        >
                          <img src={HomeIcon} alt="" />
                          <p>Home</p>
                        </Link>
                      </div>
                      <div
                        className={`link_item`}
                        onClick={() => setShowDropdownLinks(false)}
                      >
                        <Link to="#">
                          <img src={SettingIcon} alt="" />
                          <p>Edit Profile</p>
                        </Link>
                      </div>
                      <div
                        className={`link_item`}
                        onClick={() => {
                          setShowDropdownLinks(false);
                          logOut();
                        }}
                      >
                        <Link to="/">
                          <img src={LogOutIcon} alt="" />
                          <p>Log Out</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <Link
                to="#"
                onClick={() => setShowDropdownLinks(!showDropdownLinks)}
              >
                <img
                  src={DownYellowArrow}
                  className={`cursor_pointer ${
                    showDropdownLinks ? "rotate_img" : ""
                  }`}
                  alt=""
                />
              </Link>
            </div>
          </div>

          <div className="header_dark_mobile_responsive">
            <img
              src={logoDark}
              alt=""
              className="logo cursor_pointer"
              onClick={() => navigate("/")}
            />

            <div className="header_dark_mobile_responsive_icons">
              <Link to="#">
                <img src={DayLightIcon} className="cursor_pointer" alt="" />
              </Link>
              <Link to="#">
                <img src={NotificationIcon} className="cursor_pointer" alt="" />
              </Link>
              <img
                src={HamburgerIconDark}
                onClick={() => setShowMobileHeader(!showMobileHeader)}
                className="cursor_pointer"
                alt=""
              />
            </div>

            {showMobileHeader ? (
              <div className="header_box">
                <div
                  className="cross_icon cursor_pointer"
                  onClick={() => setShowMobileHeader(false)}
                >
                  <img src={CrossIcon} alt="" />
                </div>

                <div className="mobile_link_buttons">
                  <div className="user_name_box d-flex align-items-center cursor_pointer">
                    <img src={sellerProfile} width={40} alt="" />
                    <p className="mb-0 ms-3">Kathy Hayes</p>
                  </div>
                  <div className="link_container">
                    <div className={`link_item`}>
                      <Link
                        to="/dashboard/home/control-room"
                        onClick={() => setShowMobileHeader(false)}
                      >
                        <img src={HomeIcon} alt="" />
                        <p>Home</p>
                      </Link>
                    </div>
                    <div className={`link_item`}>
                      <Link
                        to="/dashboard/event"
                        onClick={() => setShowMobileHeader(false)}
                      >
                        <img src={EventIcon} alt="" />
                        <p>Event</p>
                      </Link>
                    </div>
                    <div className={`link_item`}>
                      <Link to="#" onClick={() => setShowMobileHeader(false)}>
                        <img src={SettingIcon} alt="" />
                        <p>Edit Profile</p>
                      </Link>
                    </div>
                    <div className={`link_item`}>
                      <Link to="/" onClick={() => setShowMobileHeader(false)}>
                        <img src={LogOutIcon} alt="" />
                        <p>Log Out</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default Header;
