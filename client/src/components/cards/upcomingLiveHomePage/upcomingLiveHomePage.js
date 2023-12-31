import "./upcomingLiveHomePage.css";
// import image1 from "../../../assets/images/Image 14.jpg";
import { Button } from "react-bootstrap";
import axios from 'axios';

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
import {useNavigate} from "react-router-dom";
import CreateEvent from "../../createEvent/createEvent";

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
  const navigate = useNavigate();
  const [showMoreOpt, setShowMoreOpt] = useState(false);

  const deleteEvent = async () => {
    try {
      await axios.delete(`${baseUrl}/v1/event/${data._id}`);
      window.location.reload(true);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  return (
    <div className="upcmg_home_card_container">
      <div
        className={`${
          isControlRoomView ? "control_room_card" : "upcmg_home_card"
        }`}
      >
        <div className="position-relative image-card-for-crtl">
        <img
            src={`${process.env.REACT_APP_API_URL}/static/images/${data?.image}`}
            className="card_img img-fluid"
            alt=""
          /> 
          <div className="image_content">
            <div className="d-flex justify-content-between align-items-center">
            </div>
        
          </div>
        </div>

        <div
          className={`${
            isControlRoomView
              ? "detail_container"
              : "detail_container my-4 mx-3"
          }`}
        >
          {/* {console.log("isControlRoomView: ", isControlRoomView, data)} */}
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
                  onClick={() => window.open('/guests/' + data.id, '_blank')}
                  >
                    <img src={EarthIcon} alt="" height={12} width={12} />
                    <p className="m-0 ms-2">Public URL</p>
                  </li>

                  <li className="d-flex align-items-center py-1 px-3 cursor_pointer" onClick={() => setShowEventForm(true)}>
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
          <div className="desc_title">{data.title}</div>
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
        {/* {console.log("controlRoom: ", data)} */}
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
