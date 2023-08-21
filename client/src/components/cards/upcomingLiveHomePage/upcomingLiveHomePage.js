import "./upcomingLiveHomePage.css";
// import image1 from "../../../assets/images/Image 14.jpg";
import { Button } from "react-bootstrap";
import {
  CalendarIcon,
  MoreItemIcon,
  ShopIcon,
  TimeIcon,
} from "../../../assets/icons";
import Ellipse from "../../../assets/icons/ellipse-yellow.svg";
import EarthIcon from "../../../assets/icons/earthIcon.svg";
import EditIcon from "../../../assets/icons/editIcon.svg";
import CancelIcon from "../../../assets/icons/cancelIcon.svg";
import sellerProfile from "../../../assets/images/seller_profile.png";
import { useState } from "react";
import moment from "moment";
import { history, fetchWrapper } from "../../../helpers";

const baseUrl = `${process.env.REACT_APP_API_URL}`;

const UpcomingLiveHomePage = ({
  data,
  controlRoom,
  setShowControlRoom,
  isControlRoomView,
  setControlRoomData,
  eventToken,
  setShowEventForm,
}) => {
  {
    console.log("UpcomingLiveHomePage: ", data);
  }
  const [showMoreOpt, setShowMoreOpt] = useState(false);

  const deleteEvent = async () => {
    await fetchWrapper.delete(`${baseUrl}/v1/event/${data._id}`);
    window.location.href = "/";
  };

  return (
    <div className="upcmg_home_card_container">
      <div
        className={`${
          isControlRoomView ? "control_room_card" : "upcmg_home_card"
        }`}
      >
        <div className="position-relative">
          <img
            src={`${process.env.REACT_APP_API_URL}/static/images/${data.image}`}
            alt=""
            className="main_img"
          />

          <div className="image_content">
            <div className="d-flex justify-content-between align-items-center">
              {/*<Button>Scheduled</Button>*/}
              {/*{!isControlRoomView && (*/}
              {/*  <img src={MoreItemIcon} alt="" className="cursor_pointer" />*/}
              {/*)}*/}
            </div>
            {/*<p className="mb-0">Welcome to a Live Shopping Event</p>*/}
          </div>
        </div>

        <div
          className={`${
            isControlRoomView
              ? "detail_container"
              : "detail_container my-4 mx-3"
          }`}
        >
          {console.log("isControlRoomView: ", isControlRoomView, data)}
          {isControlRoomView ? (
            <div className="d-flex justify-content-between position-relative">
              <div className="d-flex">
                <div className="yellow_text d-flex align-items-center mb-2">
                  <img src={TimeIcon} alt="" width={16} />
                  <p className="mb-0 ms-3">{data.scheduledTime}</p>
                </div>
                <div className="yellow_text d-flex align-items-center mb-2 ms-4">
                  <img src={CalendarIcon} width={16} alt="" />
                  <p className="mb-0 ms-3">
                    {moment(data.scheduledDate).format("dddd, MMMM Do, YYYY")}
                  </p>
                </div>
              </div>
              <img
                src={Ellipse}
                alt=""
                className="cursor_pointer"
                onClick={() => setShowMoreOpt(!showMoreOpt)}
              />
              {showMoreOpt && (
                <ul className="more_options position-absolute">
                  <li
                    className="d-flex align-items-center py-1 px-3 cursor_pointer"
                    onClick={() => setShowEventForm(true)}
                  >
                    <img src={EarthIcon} alt="" height={12} width={12} />
                    <p className="m-0 ms-2">Public URL</p>
                  </li>
                  <li className="d-flex align-items-center py-1 px-3 cursor_pointer">
                    <img src={EditIcon} alt="" height={12} width={12} />
                    <p className="m-0 ms-2">Edit</p>
                  </li>
                  <li
                    className="d-flex align-items-center py-1 px-3 cursor_pointer"
                    onClick={deleteEvent}
                  >
                    <img src={CancelIcon} alt="" height={12} width={12} />
                    <p className="m-0 ms-2">Cancel</p>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <div className="yellow_text d-flex align-items-center mb-2">
                <img
                  src={CalendarIcon}
                  width={16}
                  className="detail_container_icon"
                  alt=""
                />
                <p className="mb-0 ms-3">
                  {moment(data.scheduledDate).format("dddd, MMMM Do, YYYY")}
                </p>
              </div>
              <div className="yellow_text d-flex align-items-center mb-2">
                <img
                  src={TimeIcon}
                  alt=""
                  width={16}
                  className="detail_container_icon"
                />
                <p className="mb-0 ms-3">{data.scheduledTime}</p>
              </div>
            </>
          )}
          <div
            className={`${
              isControlRoomView ? "control_room_card_desc mb-3 pt-1" : "desc"
            }`}
          >
            {data.description}
            {/*Sed ut perspiciatis unde omnis iste natus error{" "}*/}
            <br
              className={`${
                isControlRoomView ? "d-none d-md-block" : "d-none"
              }`}
            />{" "}
            {/*sit voluptatem accusantium doloremque*/}
          </div>
          {/*<div className={`${isControlRoomView ? "d-flex" : ""}`}>*/}
          {/*  <div className="yellow_text d-flex align-items-center mb-2">*/}
          {/*    <img*/}
          {/*      src={sellerProfile}*/}
          {/*      width={isControlRoomView ? 20 : 16}*/}
          {/*      alt=""*/}
          {/*      className={!isControlRoomView && "detail_container_icon"}*/}
          {/*    />*/}
          {/*    <p className="mb-0 ms-3">Patricia Cooper</p>*/}
          {/*  </div>*/}
          {/*  <div*/}
          {/*    className={`${*/}
          {/*      isControlRoomView ? "ms-3" : ""*/}
          {/*    } yellow_text d-flex align-items-center mb-2`}*/}
          {/*  >*/}
          {/*    <img*/}
          {/*      src={ShopIcon}*/}
          {/*      alt=""*/}
          {/*      width={18}*/}
          {/*      className={!isControlRoomView && "detail_container_icon"}*/}
          {/*    />*/}
          {/*    <p className="mb-0 ms-3">#356945</p>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        {console.log("controlRoom: ", data)}
        {controlRoom ? (
          <div
            className="ctr_room_btn"
            onClick={() => {
              setShowControlRoom(true);
              setControlRoomData(data);
            }}
          >
            <Button>Control Room</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UpcomingLiveHomePage;
