import { Button } from "react-bootstrap";
import { CrossIcon } from "../../assets/icons";
import "./createEvent.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateEvent = ({ handleClose, showEventForm , updateEventsList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [imageDetail, setImageDetail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [events, setEvents] = useState([]);

  function submitForm() {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("scheduledDate", scheduledDate);
    formData.append("scheduledTime", scheduledTime);
    formData.append("file", imageDetail);
    let config = {
      method: "POST",
      url: process.env.REACT_APP_API_URL + "/v1/event",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      data: formData,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        toast("Success");
        handleClose();
        updateEventsList(response.data.data);

        //pass the data to dashboard page
        setEvents([...events, response.data.data]);

        // clear the form
        setTitle("");
        setDescription("");
        setScheduledDate("");
        setScheduledTime("");
        setImageDetail(null);
        setImageUrl("");

      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }

  return (
    <>
      <div
        className={`${
          showEventForm
            ? "d-block create_event_container requires-no-scroll"
            : "d-none"
        }`}
      ></div>
      <div
        className={`create_event_box ${
          showEventForm ? "create_event_box_show" : ""
        }`}
      >
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
          <div className="row m-0">
            <div className="col-lg-4 p-0 label_name_middle">
              <div className="label_name">Event image</div>
            </div>
            <div className="col-lg-8 p-0 d-flex align-items-center justify-content-between product_images">
              <div className="w-100">
                <label for="upload-photo" className="select_image">
                  {imageUrl ? (
                    <>
                      <img src={imageUrl} alt="" />
                    </>
                  ) : (
                    <>+</>
                  )}
                </label>
                <input
                  type="file"
                  className="d-none"
                  name="photo"
                  id="upload-photo"
                  onChange={(e) => {
                    setImageDetail(e.target.files[0]);
                    setImageUrl(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row m-0 mt_30">
            <div className="col-lg-4 p-0">
              <div className="label_name">Event Title/Name</div>
            </div>
            <div className="col-lg-8 p-0 d-flex align-items-center justify-content-between">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="row m-0 mt_30">
            <div className="col-lg-4 p-0">
              <div className="label_name">Event Description</div>
            </div>
            <div className="col-lg-8 p-0 d-flex align-items-center justify-content-between">
              <textarea
                cols="30"
                rows="10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="row m-0 mt_30">
            <div className="col-lg-4 p-0">
              <div className="label_name">Scheduled</div>
            </div>
            <div className="col-lg-8 p-0 date_time_input d-flex align-items-center justify-content-between">
              <div className="row m-0 w-100">
                <div className="col-lg-6 p-0">
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 p-0 ps-lg-4 mt-lg-0 mt-4">
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row m-0 mt_30 btn_section">
            <div className="col-lg-6 p-0">
              <Button className="cancel_btn" onClick={handleClose}>
                Cancel
              </Button>
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
