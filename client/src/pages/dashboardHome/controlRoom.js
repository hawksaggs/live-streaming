import React, { useState } from "react";
import LeftChevron from "../../assets/icons/chevron-left.svg";
import UpcomingLiveHomePage from "../../components/cards/upcomingLiveHomePage/upcomingLiveHomePage";
import ProductImg from "../../assets/images/cntrl-room-card-img.png";
import OrderIcon from "../../assets/icons/orderIcon.svg";
import SalesIcon from "../../assets/icons/salesIcon.svg";
import LikesIcon from "../../assets/icons/likeIcon.svg";
import ViewerIcon from "../../assets/icons/viewerIcon.svg";
import YellowArrow from "../../assets/icons/downArrow.svg";

const reports = [
  { image: ViewerIcon, counts: 515, category: "Viewer" },
  { image: LikesIcon, counts: 458, category: "Likes" },
  { image: OrderIcon, counts: 56, category: "Order" },
  { image: SalesIcon, counts: 254, category: "Sales" },
];

function ControlRoom({ setShowControlRoom }) {

  const [activeKey, setActiveKey] = useState(1);

  return (
    <div className="d_home_container w-100 mb-5 d_home_container_height">
      <div className="top_heading d-flex align-items-center justify-content-between mb-4 pb-2">
        <div className="heading_name">Control Room</div>
        <div
          className="go_back_event d-flex align-items-center cursor_pointer"
          onClick={() => setShowControlRoom(false)}
        >
          <img src={LeftChevron} height={16} width={9} alt="" />
          <p className="m-0 ms-3 go_back_event_text">Go back to events</p>
        </div>
      </div>
      <UpcomingLiveHomePage isControlRoomView data={ProductImg} />
      <div className="d-md-flex justify-content-between mt-4 pt-3">
        <div className="report_card_section">
          <div className="d-flex justify-content-between">
            {reports.map((value, index) => (
              <div className="report_card" key={index}>
                <img
                  src={value.image}
                  alt="report_card_img"
                  className="report_card_img"
                />
                <p className="m-0 report_card_count mt-4">{value.counts}k</p>
                <p className="m-0 report_card_category">{value.category}</p>
              </div>
            ))}
          </div>
          <div className="stream_select_box">
            <div className="stream_select_box_inner d-flex flex-column justify-content-between">
              <div>
                <p className="m-0">
                  Select your favorite streaming app, <br /> it takes around
                  20-30 seconds for the stream to be received.
                </p>
                <div className="select_wrapper text-center d-flex justify-content-center mt-3">
                  <div className="select_div">
                    <select name="" id="">
                      <option value="Select">Select</option>
                      <option value="Larix">Larix</option>
                      <option value="Zoom">Zoom</option>
                      <option value="OBS">OBS</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="close_btn_wrapper text-end">
                <button className="closeBtn">Close </button>
              </div>
            </div>
          </div>
        </div>
        <div className="chat_product_box d-flex flex-column mt-5 mt-md-0 justify-content-between">
          <div className="d-flex">
            <p className={`m-0 option ${activeKey === 1 ? "active" : ""}`} onClick={() => setActiveKey(1)}>Chat</p>
            <p className={`m-0 option ms-4 ${activeKey === 2 ? "active" : ""}`} onClick={() => setActiveKey(2)}>Products</p>
          </div>
          <div className="d-flex justify-content-between">
            {/* <button className="button_add_comment">Add Comment</button> */}
            <input type="text" className="input_add_comment" placeholder="Add Comment" />
            <button className="button_add_comment">
              <img
                src={YellowArrow}
                alt=""
                style={{ transform: "rotate(270deg)" }}
                height={11}
                width={19}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlRoom;
