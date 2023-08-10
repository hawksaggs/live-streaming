import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import {
  LeftYellowIcon,
  RightDarkIcon,
  RightYellowIcon,
  SearchIcon,
} from "../../assets/icons";
import VideoPlayIcon from "../../assets/icons/VideoPlayIcon.svg";
import "./dashboardEvent.css";
import CurrentLiveImg from "../../assets/images/currentLive-img.png";
import Barcode from "../../assets/images/barcode.png";
import Insta from "../../assets/icons/yellow_insta.svg";
import Linkedin from "../../assets/icons/yellow_linkedin.svg";
import Facebook from "../../assets/icons/yellow_facebook.svg";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function DashboardEvent() {
  const options = {
    loop: true,
    center: true,
    item: 1,
    margin: 10,
    autoplay: false,
    dots: false,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    nav: true,
    navText: [`<img src=${LeftYellowIcon}>`, `<img src=${RightYellowIcon}>`],
    responsive: {
      1000: { items: 1 },
      600: { items: 1 },
      300: { items: 1 },
    },
  };

  return (
    <div className="dashboard_event_main d-flex">
      <Sidebar active={2} />
      <div className="event_details_view">
        <div className="event_searchbox mt-4 mb-4 mb-md-5">
          <div className="searbox_input">
            <img src={SearchIcon} className="search_icon" alt="" />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="d-flex justify-content-between current_live_heading_wrapper">
          <p className="m-0 current_live_heading">Current Live</p>
          <div>
            <img src={Insta} alt="Insta" width={30} />
            <img src={Linkedin} alt="Linkedin" className="ms-4" width={30} />
            <img src={Facebook} alt="Facebook" className="ms-4" width={30} />
          </div>
        </div>
        <div className="recent_live_conatiner mb-5 mt-2">
          <OwlCarousel
            className="owl-theme owl_carousel_current_live"
            {...options}
          >
            {[1, 2, 3, 4, 5, 6].map((v, i) => (
              <div className="carousel_item position-relative" key={i}>
                <img src={CurrentLiveImg} alt="" />
                <div className="position-absolute play_btn_wrapper">
                  <img
                    src={VideoPlayIcon}
                    alt=""
                    className="w-100 d-block"
                    height={76}
                    width={76}
                  />
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
        <div className="gray_barcode d-flex justify-content-between px-3 px-md-5 my-5">
          <div>
            <p className="m-0 heading mt-2">
              Zwei flinke Boxer jagen die quirlige Eva und ihren Mops <br />{" "}
              durch Sylt. Franz jagt im komplett verwahrlosten Taxi
            </p>
            <p className="m-0 para mt-2">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam{" "}
              <br className="d-none d-md-block" />
              nonumy eirmod tempor invidunt ut labore et dolore magna
            </p>
          </div>
          <img src={Barcode} alt="" height={160} width={160} />
        </div>
        <div className="d-flex my-5 pt-4 justify-content-between">
          <p className="m-0 current_live_heading">Recent Live</p>
          <div>
            <img src={RightDarkIcon} alt="darkArrow" width={18} height={36} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardEvent;
