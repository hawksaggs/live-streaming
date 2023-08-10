import { Button, Modal } from "react-bootstrap";
import Sidebar from "../../components/sidebar/sidebar";
import "./dashboardHome.css";
import UpcomingLiveHomePage from "../../components/cards/upcomingLiveHomePage/upcomingLiveHomePage";
import image1 from "../../assets/images/Image 14.jpg";
import image2 from "../../assets/images/Image 11.jpg";
import image3 from "../../assets/images/Image 3.jpg";
import {
  LeftYellowIcon,
  RightYellowIcon,
  VideoPlayIcon,
} from "../../assets/icons";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import image4 from "../../assets/images/Image 19.jpg";
import image5 from "../../assets/images/Image 20.jpg";
import image6 from "../../assets/images/Image 5.jpg";
import CreateEvent from "../../components/createEvent/createEvent";
import { useState, useEffect } from "react";
import ControlRoom from "./controlRoom";
import axios from "axios";

let UpLiveImages = [
  image1,
  image2,
  image3,
  image1,
  image1,
  image2,
  image3,
  image1,
];

let LearnHowImages = [image4, image5, image6, image4, image5, image6];

const options1 = {
  loop: true,
  center: false,
  item: 4,
  margin: 10,
  autoplay: false,
  dots: false,
  autoplayTimeout: 8500,
  smartSpeed: 450,
  nav: true,
  navText: [`<img src=${LeftYellowIcon}>`, `<img src=${RightYellowIcon}>`],
  responsive: {
    0: { items: 1, dots: true, nav: false },
    600: { items: 1, dots: true, nav: false },
    1024: { items: 3 },
    1200: { items: 4 },
  },
};

const options2 = {
  ...options1,
  item: 3,
  responsive: {
    0: { items: 1, dots: true, nav: false },
    600: { items: 1, dots: true, nav: false },
    1024: { items: 2 },
    1200: { items: 3 },
  },
};

const DashboardHome = ({ controlRoom }) => {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showControlRoom, setShowControlRoom] = useState(false);

  const [showVideoPopUp, setShowVideoPopUp] = useState(false);

  const getEventLists = async () => {
    let config = {
      method: "GET",
      url: process.env.REACT_APP_API_URL + "/v1/event",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setEvents(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getEventLists();
  }, []);

  return (
    <>
      <div className="d-flex">
        <Sidebar active={showControlRoom ? "" : 1} />
        {showControlRoom ? (
          <ControlRoom setShowControlRoom={setShowControlRoom} />
        ) : (
          <div className="d_home_container w-100 mb-5">
            <div className="top_heading d-flex align-items-center justify-content-between mb-5">
              <div className="heading_name">Upcoming Live</div>
              <div className="create_event_btn">
                <Button onClick={() => setShowEventForm(true)}>
                  <span>+</span> &nbsp; Create Event
                </Button>
              </div>
            </div>

            <OwlCarousel className="owl-theme owl_carousel_1" {...options1}>
              {events.map((v) => {
                return (
                  <UpcomingLiveHomePage
                    controlRoom={controlRoom}
                    setShowControlRoom={setShowControlRoom}
                    data={v}
                    key={v._id}
                  />
                );
              })}
            </OwlCarousel>

            <div className="top_heading d-flex align-items-center justify-content-between my-5">
              <div className="heading_name">
                Learn how to get started Netikash Live.
              </div>
            </div>

            <OwlCarousel
              className="owl-theme owl_carousel_1 owl_carousel_2"
              {...options2}
            >
              {LearnHowImages.map((v, i) => {
                return (
                  <div className="learn_img_container position-relative">
                    <img
                      src={VideoPlayIcon}
                      className="video_icon"
                      alt=""
                      onClick={() => setShowVideoPopUp(true)}
                    />
                    <img src={v} alt="" className="main_img" />
                  </div>
                );
              })}
            </OwlCarousel>
          </div>
        )}
      </div>

      {/* {showEventForm ? (
        <CreateEvent showEventForm={showEventForm} handleClose={() => setShowEventForm(false)} />
      ) : null} */}
      <CreateEvent
        showEventForm={showEventForm}
        handleClose={() => setShowEventForm(false)}
      />

      {showVideoPopUp ? (
        <Modal
          show={showVideoPopUp}
          onHide={() => setShowVideoPopUp(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            {/* <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title> */}
          </Modal.Header>
          <Modal.Body className="d-flex justify-content-center align-items-center video_container">
            <iframe
              src="https://www.youtube.com/embed/E7wJTI-1dvQ"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => setShowVideoPopUp(false)}
              className="close_btn"
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};

export default DashboardHome;
