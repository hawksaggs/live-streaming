import { Button } from "react-bootstrap";
import { CrossIcon } from "../../assets/icons";
import "./createEvent.css";
import { useState } from "react";
import axios from "axios";

const CreateEvent = ({ handleClose, showEventForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [price, setPrice] = useState("");

  function submitForm() {
    console.log(title, description, scheduledDate, scheduledTime, price);
    let data = JSON.stringify({
      "title": title,
      "description": description,
      "scheduledDate": scheduledDate,
      "scheduledTime": scheduledTime,
      "price": price
    });

    let config = {
      method: 'POST',
      url: process.env.REACT_APP_API_URL + '/v1/event',
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

  }

  return (
    <>
      <div className={`${showEventForm ? 'd-block create_event_container requires-no-scroll' : 'd-none'}`}></div>
      <div className={`create_event_box ${showEventForm ? "create_event_box_show" : ""}`}>
        <div className="event_heading d-flex align-items-center justify-content-between">
          <div className="">
            <div className="title">Create Event</div>
            <div className="desc mt-2">
              Add your product necessary information from here
            </div>
          </div>

          <div className="yellow_bk cursor_pointer" onClick={handleClose}>
            <img src={CrossIcon} alt="" />
          </div>
        </div>

        <div className="event_form">
          <div className="row m-0 mt_30">
            <div className="col-lg-4 p-0">
              <div className="label_name">Event Title/Name</div>
            </div>
            <div className="col-lg-8 p-0 d-flex align-items-center justify-content-between">
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
          </div>

          <div className="row m-0 mt_30">
            <div className="col-lg-4 p-0">
              <div className="label_name">Event Description</div>
            </div>
            <div className="col-lg-8 p-0 d-flex align-items-center justify-content-between">
              <textarea cols="30" rows="10" value={description} onChange={e => setDescription(e.target.value)}></textarea>
            </div>
          </div>

          <div className="row m-0 mt_30">
            <div className="col-lg-4 p-0">
              <div className="label_name">Scheduled</div>
            </div>
            <div className="col-lg-8 p-0 date_time_input d-flex align-items-center justify-content-between">
              <div className="row m-0 w-100">
                <div className="col-lg-6 p-0">
                  <input type="time" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)}/>
                </div>
                <div className="col-lg-6 p-0 ps-lg-4 mt-lg-0 mt-4">
                  <input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)}/>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-0 mt_30">
            <div className="col-lg-4 p-0">
              <div className="label_name">Price</div>
            </div>
            <div className="col-lg-8 p-0 d-flex align-items-center justify-content-between">
              <input type="text" value={price} onChange={e => setPrice(e.target.value)}/>
            </div>
          </div>

          <div className="row m-0 mt_30 btn_section">
            <div className="col-lg-6 p-0">
              <Button className="cancel_btn" onClick={handleClose}>Cancel</Button>
            </div>
            <div className="col-lg-6 ps-lg-4 mt-lg-0 mt-4 p-0 d-flex align-items-center justify-content-between">
              <Button onClick={submitForm}>Add Event</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
