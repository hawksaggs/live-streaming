import { Button } from "react-bootstrap";
import "./upcomingLiveCard.css";

const UpcomingLiveCard = ({ data }) => {
  return (
    <div className="upcoming_live_card">
      <div className="card_section">
        <div className="position-relative">
          <img src={data?.img} className="card_img" alt="" />
          <div className="card_overlay"></div>
          <Button className="quick_view_btn">QUICK VIEW</Button>
        </div>
        <div className="user_image_name">
          <img src={data?.user?.img} alt="" className="pe-3" />
          {data?.user?.name}
        </div>

        <div className="desc">{data?.desc}</div>

        <div className="date_text">{data?.date}</div>
      </div>
    </div>
  );
};

export default UpcomingLiveCard;
