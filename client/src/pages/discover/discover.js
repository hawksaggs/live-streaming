import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./discover.css";

const Discover = () => {
    const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const getEvents = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/v1/event/public")
      .then((response) => response.data)
      .then((data) => {
        setEvents(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 403) {
          console.log("error");
        }
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="container-fluid space-4">
      <div className="row">
        {events.map((event) => (
          <div className="col-2" key={event.id}>
            <div className="upcoming_live_card"  onClick={() => navigate("/guests/" + event.id)}>
              <div className="card_section">
                <div className="position-relative">
                <img src={`${process.env.REACT_APP_API_URL}/static/images/${event?.image}`}
                        className="card_img"
                        alt=""
                />
                  <div className="card_overlay"></div>
                  <button type="button" className="quick_view_btn btn btn-primary">
                    QUICK VIEW
                  </button>
                </div>
                <div className="user_image_name">
                  <img alt="" className="pe-3" />
                </div>
                <div className="desc">{event?.description}</div>
                <div className="date_text">{event.scheduledDate}</div>
                <div className="date_text">{event.scheduledTime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
