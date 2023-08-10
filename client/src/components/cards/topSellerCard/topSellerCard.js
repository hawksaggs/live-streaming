import { Button } from "react-bootstrap";
import "./topSellerCard.css";

const TopSellerCard = ({ data }) => {
  return (
    <div className="top_seller_card">
      <div className="card_section">
        <div className="position-relative">
          <img src={data?.img} className="card_img" alt="" />
          <div className="card_overlay"></div>
          <Button className="view_prod">View Product</Button>

          <div className="pill_section">
            <div className="pill bk1">-10%</div>
            <div className="pill bk2">New</div>
          </div>
        </div>
        <div className="user_image_name">
          <img src={data?.user?.img} alt="" className="pe-3" />
          {data?.user?.name}
        </div>

        <div className="desc">{data?.desc}</div>

        <div className="d-flex">
          {data?.price.map((v, i) => {
            return (
              <div className="price_text pe-3" key={i}>
                {v}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSellerCard;
