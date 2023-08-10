import React from "react";
import "./productCard.css";

function ProductCard({ data, guestsPage }) {
  return (
    <>
      {data.map((value, index) => {
        return (
          <div className="d-flex product_card mb-5" key={index}>
            <img
              src={value.ProductImg}
              alt=""
              className="d-block"
              width={200}
            />
            <div className="product_card_content">
              <p className="m-0 heading">{value.heading}</p>
              <p className="description">{value.description}</p>
              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex align-items-center">
                  <p className="m-0 ylw_price_text">${value.amount}</p>
                  <p className="m-0 dark_price_text ms-5">${value.amount}</p>
                </div>
                {!guestsPage && (
                  <button type="button" className="card_edit_btn">
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ProductCard;
