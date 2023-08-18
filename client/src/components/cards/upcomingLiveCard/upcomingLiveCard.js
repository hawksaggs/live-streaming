import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./upcomingLiveCard.css";

const UpcomingLiveCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="upcoming_live_card" onClick={() => navigate('/guests/' + data.id)}>
      <div className="card_section">
        <div className="position-relative">
          <img src={`${process.env.REACT_APP_API_URL}/static/images/${data?.image}`} className="card_img" alt="" />
          <div className="card_overlay"></div>
          <Button className="quick_view_btn">QUICK VIEW</Button>
        </div>
        <div className="user_image_name">
          <img src={data?.user?.img} alt="" className="pe-3" />
          {data?.user?.name}
        </div>

        <div className="desc">{data?.description}</div>

        <div className="date_text">{data?.scheduledDate}</div>
        <div className="date_text">{data?.scheduledTime}</div>
      </div>
    </div>
  );
};

export default UpcomingLiveCard;
