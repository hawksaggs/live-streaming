import { Button } from "react-bootstrap";
import "./trendingCard.css";

const TrendingCard = ({ data }) => {
  return (
    <div className="trending_card">
      <div className="card_section">
        <div className="position-relative">
          <img src={data?.img} className="card_img" alt="" />
        </div>
        <div className="user_image_name">
          <img src={data?.user?.img} alt="" className="pe-3" />
          {data?.user?.name}
        </div>

        <div className="desc">{data?.desc}</div>

        <div className="pills_sec d-flex align-items-center">
          <div className="pe-3">
            <div className="pill">Sell 451</div>
            <div className="price_text">254$</div>
          </div>
          <div className="">
            <div className="pill">Views 452k</div>
            <div className="price_text">312$</div>
          </div>
        </div>

        <div className="view_product_btn">
          <Button>View Product</Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
