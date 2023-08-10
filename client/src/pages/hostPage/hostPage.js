import React, { useState } from "react";
import "./hostPage.css";
import BackArrow from "../../assets/icons/left-arrow.svg";
import SoundIcon from "../../assets/icons/sound.svg";
import Insta from "../../assets/icons/yellow_insta.svg";
import Linkedin from "../../assets/icons/yellow_linkedin.svg";
import Facebook from "../../assets/icons/yellow_facebook.svg";
import HostBanner from "../../assets/images/host_banner.png";
import RightArrow from "../../assets/icons/right_qrrow.svg";
import SellerImg from "../../assets/images/seller_profile.png";
import Barcode from "../../assets/images/barcode.png";
import ProductImg from "../../assets/images/product_img.png";
import ImageUploadIcon from "../../assets/icons/upload-img-plus-icon.svg";
import MistryBox from "../../assets/images/mistry-box.png";
import ModelFemale from "../../assets/images/model-girl.png";
import ClothProduct from "../../assets/images/cloth-showcase.png";
import CarouselPrev from "../../assets/icons/chevron-left.svg";
import CarouselNext from "../../assets/icons/chevron-right.svg";
import CarouselActiveImg from "../../assets/images/carousel-img.png";
import CarouselImg from "../../assets/images/Image 13.jpg";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import ProductCard from "../../components/cards/productCard/productCard";

function HostPage({ guestsPage }) {
  const options = {
    loop: true,
    center: true,
    item: 3,
    margin: 10,
    // autowidth: true,
    autoplay: false,
    dots: false,
    autoplayTimeout: 8500,
    smartSpeed: 450,
    nav: true,
    navText: [`<img src=${CarouselPrev}>`, `<img src=${CarouselNext}>`],
    responsive: {
      1000: { items: 3 },
      600: { items: 3 },
      300: { items: 3 },
      0: { items: 3 },
    },
  };

  const carouselImages = [ClothProduct, CarouselImg, ClothProduct];
  const [currectActiveCarousel, setCurrentActiveCarousel] = useState("");

  const handleCarouselAction = (currentImg) => {
    setCurrentActiveCarousel(currentImg);
    console.log(currentImg);
  };

  const [quantity, setQuantity] = useState(5);

  const [productDetails, setProductDetails] = useState({
    productTitle: "HLA x FATE Mystery Box",
    description:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna",
    quantity: 458,
    price: "980$",
  });

  const [imageDetail, setImageDetail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [imageDetail2, setImageDetail2] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");

  const [imageDetail3, setImageDetail3] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const mobile = window.screen.availWidth < 600;

  return (
    <div className="live_host_page">
      <div className="d-md-flex">
        <div className="upper_banner w-75">
          <div className="d-flex justify-content-between">
            <div className="banner_top_icons">
              <img src={BackArrow} alt="BackArrow" width={25} />
              <img
                src={SoundIcon}
                alt="SoundIcon"
                className="ms-4 ps-1"
                width={30}
                height={29}
              />
            </div>
            <div className="banner_top_social_icons">
              <img
                src={Insta}
                alt="Insta"
                className="cursor_pointer"
                width={30}
              />
              <img
                src={Linkedin}
                alt="Linkedin"
                className="ms-4 cursor_pointer"
                width={30}
              />
              <img
                src={Facebook}
                alt="Facebook"
                className="ms-4 cursor_pointer"
                width={30}
              />
            </div>
          </div>
          <div className="banner_img">
            <img
              src={HostBanner}
              height={mobile ? 400 : 632}
              className="d-block w-100 mt-4 pt-3"
              alt="banner"
            />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-between mx-3 me-md-0 ms-md-5">
          <div className="top_right_text">
            <div>
              <p className="m-0 upper_para">@Dorothy Freeman</p>
              <p className="m-0 lower_para">Lorem ipsum dolor sit.</p>
            </div>
            <div className="mt-4">
              <p className="m-0 upper_para">@Doris Coleman</p>
              <p className="m-0 lower_para">Lorem ipsum dolor sit.</p>
            </div>
            <div className="mt-4">
              <p className="m-0 upper_para">@Doris Coleman</p>
              <p className="m-0 lower_para">Lorem ipsum dolor sit.</p>
            </div>

            <div className="mt-4">
              <p className="m-0 upper_para">@Tom Ortiz</p>
              <p className="m-0 lower_para">
                Lorem ipsum dolor sit Lorem ipsum
              </p>
            </div>
            <div className="mt-4">
              <p className="m-0 upper_para">@Eliza Mendez</p>
              <p className="m-0 lower_para">Lorem ipsum dolor sit.</p>
            </div>
            <div className="mt-4">
              <p className="m-0 upper_para">@Joe Gilbert</p>
              <p className="m-0 lower_para">Lorem ipsum dolor sit.</p>
            </div>
            <div className="mt-4">
              <p className="m-0 upper_para">@Sara Miller</p>
              <p className="m-0 lower_para">
                Lorem ipsum dolor sit amet, <br /> consetetur sadipscing elitr,
                sed diam
              </p>
            </div>
            <div className="mt-4">
              <p className="m-0 upper_para">@Joe Gilbert</p>
              <p className="m-0 lower_para">Lorem ipsum dolor sit.</p>
            </div>
          </div>

          <div className="add_cmt_box">
            <input
              type="text"
              className="right_text_btn"
              placeholder="Add Comment"
            />

            <img src={RightArrow} alt="" height={18} width={18} />
          </div>
        </div>
      </div>
      <div className="row m-0 bottom_section">
        <div className="col-md-6 ps-md-0 pe-md-5">
          <div className="bottom_left_section">
            <div className="d-flex align-items-center">
              <img src={SellerImg} alt="" className="modal_img" />
              <p className="m-0 modal_name ms-4">Denise Barnett</p>
            </div>
            <p className="m-0 seller_bold_text">
              Custom Dress Modeling <br className="d-none d-md-block" /> Design
            </p>
            <div className="gray_barcode d-flex justify-content-between">
              <div>
                <p className="m-0 heading mt-2">Buy before the show ends.</p>
                <p className="m-0 para mt-2">
                  Scan the QR code with your phone to download{" "}
                  <br className="d-none d-md-block" /> the Netikash Live app
                </p>
              </div>
              <img src={Barcode} alt="" />
            </div>

            {/* carousel */}
            <div className="carousel_section mt-5 pt-4">
              <div className="current_active_img mb-4 pb-2">
                <img
                  src={
                    currectActiveCarousel
                      ? currectActiveCarousel
                      : CarouselActiveImg
                  }
                  alt=""
                  className="d-block w-100 main_img"
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "100 100",
                    marginTop: "-20px",
                  }}
                  // width={764}
                />
              </div>
              <div className="owl_carousel_host_guest_parent d-flex justify-content-center position-relative">
                <div className="owl_carousel_host_guest">
                  <OwlCarousel
                    className="owl-theme position-relative"
                    {...options}
                  >
                    {carouselImages.map((v, i) => (
                      <div
                        // key={i}
                        className="carousel_item"
                        onClick={() => handleCarouselAction(v)}
                      >
                        <img
                          src={v}
                          alt=""
                          className="d-block w-100"
                          height={74}
                        />
                      </div>
                    ))}
                  </OwlCarousel>
                </div>
              </div>
            </div>

            <div className="host_product_detail">
              <div className="d-flex align-items-center justify-content-between my-4 py-2">
                <p className="m-0 host_product_name">
                  Custom Black Mickey Bag by Sheron Barber
                </p>
                <span className="host_product_name">$980</span>
              </div>
              <p className="m-0 product_description w-75">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed{" "}
                diam nonumy eirmod
              </p>
              <ul className="product_other_details ps-4 my-4">
                <li className="product_description font_500">
                  Lorem ipsum dolor sit amet, consetetur
                </li>
                <li className="product_description font_500">
                  Lorem, ipsum dolor.
                </li>
                <li className="product_description font_500">
                  Lorem ipsum dolor sit.
                </li>
                <li className="product_description font_500">Lorem, ipsum.</li>
              </ul>
              <p className="m-0 product_description">
                Lorem ipsum dolor sit amet, consetetur
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 pe-md-0 mt-5 mt-md-0 ps-md-5">
          <div className="bottom_right_section">
            <ProductCard
              data={[
                {
                  ProductImg: ProductImg,
                  heading: "HLA x FATE Mystery Box",
                  description:
                    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                  amount: 145,
                },
              ]}
              guestsPage={guestsPage}
            />
            {guestsPage ? (
              <>
                <div className="gray_barcode d-flex justify-content-between">
                  <div>
                    <p className="m-0 heading mt-2">
                      Buy before the show ends.
                    </p>
                    <p className="m-0 para mt-2">
                      Scan the QR code with your phone to download <br /> the
                      Netikash Live app
                    </p>
                  </div>
                  <img src={Barcode} alt="" />
                </div>
                <div className="d-flex align-items-center mt-5">
                  <button className="counterBtn d-flex justify-content-between align-items-center">
                    <span
                      onClick={() => {
                        if (quantity > 0) {
                          setQuantity(quantity - 1);
                        }
                      }}
                    >
                      -
                    </span>
                    <span>{quantity}</span>
                    <span onClick={() => setQuantity(quantity + 1)}>+</span>
                  </button>
                  <button className="buynow_btn ms-5">Buy Now</button>
                </div>
              </>
            ) : (
              <>
                <p className="product_details_style mt-5">Product Title</p>
                {/* <p className="product_details_style_box">
                  HLA x FATE Mystery Box
                </p> */}
                <input
                  type="text"
                  className="product_details_style_box"
                  value={productDetails.productTitle}
                  name="productTitle"
                  onChange={handleChange}
                />
                <p className="product_details_style pt-3">Description</p>
                {/* <p className="product_details_style_box">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                </p> */}
                <textarea
                  id=""
                  className="product_details_style_box product_details_style_box_2"
                  value={productDetails.description}
                  name="description"
                  onChange={handleChange}
                ></textarea>
                <p className="product_details_style pt-3">Add image</p>
                <div className="d-flex justify-content-md-between uploadImgSection">
                  <div className="upload_img_box me-5 me-md-0">
                    <label htmlFor="imageUpload">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          className="main_img"
                          alt=""
                          height={37}
                          width={37}
                        />
                      ) : (
                        <img
                          src={ImageUploadIcon}
                          alt=""
                          height={37}
                          width={37}
                        />
                      )}
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      onChange={(e) => {
                        setImageDetail(e.target.files[0]);
                        setImageUrl(URL.createObjectURL(e.target.files[0]));
                      }}
                      hidden
                    />
                  </div>
                  <div className="upload_img_box me-5 me-md-0">
                    <label htmlFor="imageUpload2">
                      {imageUrl2 ? (
                        <img
                          src={imageUrl2}
                          className="main_img"
                          alt=""
                          height={37}
                          width={37}
                        />
                      ) : (
                        <img
                          src={ImageUploadIcon}
                          alt=""
                          height={37}
                          width={37}
                        />
                      )}
                    </label>
                    <input
                      type="file"
                      id="imageUpload2"
                      onChange={(e) => {
                        setImageDetail2(e.target.files[0]);
                        setImageUrl2(URL.createObjectURL(e.target.files[0]));
                      }}
                      hidden
                    />
                  </div>
                  <div className="upload_img_box me-5 me-md-0">
                    <label htmlFor="imageUpload3">
                      {imageUrl3 ? (
                        <img
                          src={imageUrl3}
                          className="main_img"
                          alt=""
                          height={37}
                          width={37}
                        />
                      ) : (
                        <img
                          src={ImageUploadIcon}
                          alt=""
                          height={37}
                          width={37}
                        />
                      )}
                    </label>
                    <input
                      type="file"
                      id="imageUpload3"
                      onChange={(e) => {
                        setImageDetail3(e.target.files[0]);
                        setImageUrl3(URL.createObjectURL(e.target.files[0]));
                      }}
                      hidden
                    />
                  </div>
                  <div className="quantity_input mt-5 mt-md-0 me-5 me-md-0">
                    <p className="product_details_style mb-2">Quantity</p>
                    <input
                      type="number"
                      value={productDetails.quantity}
                      name="quantity"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="price_input mt-5 mt-md-0">
                    <p className="product_details_style mb-2">Price</p>
                    <input
                      type="text"
                      value={productDetails.price}
                      name="price"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="d-flex mt-5">
                  <button className="cancel_btn me-2" type="button">
                    Cancel
                  </button>
                  <button className="save_btn ms-4" type="button">
                    Save
                  </button>
                </div>
              </>
            )}
            <div className={`${guestsPage ? "mt-5" : "mt-5 pt-4"}`}>
              <ProductCard
                data={[
                  {
                    ProductImg: MistryBox,
                    heading: "HLA x FATE Mystery Box",
                    description:
                      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                    amount: 145,
                  },
                  {
                    ProductImg: ModelFemale,
                    heading: "HLA x FATE Mystery Box",
                    description:
                      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                    amount: 145,
                  },
                  {
                    ProductImg: ClothProduct,
                    heading: "HLA x FATE Mystery Box",
                    description:
                      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
                    amount: 145,
                  },
                ]}
                guestsPage={guestsPage}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="button" className="add_product_btn">
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostPage;
