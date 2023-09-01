import { Button } from "react-bootstrap";
import {
  LeftDarkIcon,
  LeftYellowIcon,
  RightDarkIcon,
  RightYellowIcon,
  SearchIcon,
} from "../../assets/icons";
import sellerProfile from "../../assets/images/seller_profile.png";
import sliderImg from "../../assets/images/image_01.jpg";
import "./homePage.css";
import UpcomingLiveCard from "../../components/cards/upcomingLiveCard/upcomingLiveCard";
import {
  topSellerCards,
  trendingProduct,
  upcomingCards,
} from "../../constant/constant";
import TrendingCard from "../../components/cards/trendingCard/trendingCard";
import miniTrendImage1 from "../../assets/images/Image 2.jpg";
import miniTrendImage2 from "../../assets/images/Image 12.jpg";
import miniTrendImage3 from "../../assets/images/Image 13.jpg";
import miniTrendImage4 from "../../assets/images/Image 14.jpg";
import recentLiveImg from "../../assets/images/Image 5.jpg";
import TopSellerCard from "../../components/cards/topSellerCard/topSellerCard";

import appStoreBtn from "../../assets/images/app_store_btn.svg";
import playStoreBtn from "../../assets/images/play_store_btn.svg";

import liveSectionImage from "../../assets/images/Image 18.jpg";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import ourBrandImg1 from "../../assets/images/Image 22.jpg";
import ourBrandImg2 from "../../assets/images/Image 23.jpg";
import ourBrandImg3 from "../../assets/images/Image 24.jpg";
import ourBrandImg4 from "../../assets/images/Image 25.jpg";
import ourBrandImg5 from "../../assets/images/Image 26.jpg";
import ourBrandImg6 from "../../assets/images/Image 27.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { clearData } from "../../helpers";

const TredingCardMiniImages = [
  miniTrendImage1,
  miniTrendImage2,
  miniTrendImage3,
  miniTrendImage4,
];

const ourBrandProdImages = [
  {
    image: ourBrandImg1,
    name: "Nike",
  },
  {
    image: ourBrandImg2,
    name: "Addidas",
  },
  {
    image: ourBrandImg3,
    name: "Amani Black",
  },
  {
    image: ourBrandImg4,
    name: "Samsung",
  },
  {
    image: ourBrandImg5,
    name: "Intel",
  },
  {
    image: ourBrandImg6,
    name: "Levi's",
  },
  {
    image: ourBrandImg1,
    name: "Nike",
  },
  {
    image: ourBrandImg2,
    name: "Addidas",
  },
  {
    image: ourBrandImg3,
    name: "Amani Black",
  },
  {
    image: ourBrandImg4,
    name: "Samsung",
  },
  {
    image: ourBrandImg5,
    name: "Intel",
  },
  {
    image: ourBrandImg6,
    name: "Levi's",
  },
];

const options1 = {
  loop: false,
  center: true,
  item: 1,
  margin: 10,
  autoplay: false,
  dots: false,
  autoplayTimeout: 8500,
  smartSpeed: 450,
  nav: true,
  navText: [`<img src=${LeftDarkIcon}>`, `<img src=${RightDarkIcon}>`],
  responsive: {
    1000: { items: 1 },
    600: { items: 1 },
    300: { items: 1 },
  },
};

const options2 = {
  ...options1,
  navText: [`<img src=${LeftYellowIcon}>`, `<img src=${RightYellowIcon}>`],
};

const options3 = {
  ...options1,
  center: false,
  item: 6,
  nav: true,
  smartSpeed: 200,
  navText: [`<img src=${LeftYellowIcon}>`, `<img src=${RightYellowIcon}>`],
  responsive: {
    0: { items: 2 },
    600: { items: 2 },
    1024: { items: 4 },
    1200: { items: 6 },
  },
};

const optionsUpcoming = {
  ...options1,
  center: false,
  item: 6,
  nav: false,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  smartSpeed: 200,
  navText: [`<img src=${LeftDarkIcon}>`, `<img src=${RightDarkIcon}>`],
  responsive: {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 5 },
    1200: { items: 6 },
  },
};

const TredingCardMini = ({ img }) => {
  return (
    <div className="trending_card_mini d-flex mb-4">
      <img src={img} alt="" />

      <div>
        <div className="desc">Lorem ipsum dolor sit amet...</div>
        <div className="price_1">$180.00</div>
        <div className="price_2">$188.00</div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [eventToken, setEventToken] = useState(null);
  const getEvents = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/v1/event/public")
      .then((response) => response.data)
      .then((data) => {
        data.data = data.data.slice(0, 6);
        setEvents(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 403) {
          clearData();
        }
      });
  };
  const getEventToken = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/v1/meeting/token")
      .then((response) => response.data)
      .then((data) => {
        console.log("data: ", data);
        setEventToken(data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 403) {
          clearData();
        }
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getEvents();
      await getEventToken();
    };

    fetchData();
  }, []);

  return (
    <div className="homepage_container">
      <div className="homepage_searchbox">
        <div className="searbox_input">
          <img src={SearchIcon} className="search_icon" alt="" />
          <input type="text" placeholder="Search Category, Trending, Profile" />
        </div>
      </div>
      <OwlCarousel className="owl-theme owl_carousel_home_1" {...options1}>
        {[1, 2, 3, 4, 5, 6].map((v, i) => (
          <div className="homepage_slider" key={i}>
            <div className="slider_card d-flex align-items-center justify-content-between">
              <div className="left_section">
                <div className="user_image_name d-flex align-items-center">
                  <img src={sellerProfile} alt="" className="me-4" />
                  Denise Barnett
                </div>

                <div className="main_heading">
                  Custom Dress Modeling <br /> Design
                </div>

                <div className="date_text">June 25,2022</div>

                <Button className="watch_btn">Watch Now</Button>
              </div>

              <div className="right_section">
                <img src={sliderImg} alt="" />
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>

      <div className="upcoming_live_sec">
        <div className="d-flex align-items-center heading_container justify-content-between">
          <div className="heading">Upcoming Live</div>
          {/* <img src={RightDarkIcon} className="cursor_pointer" alt="" /> */}
        </div>

        {events?.length ? (
          <div className="d-flex align-items-center flex-wrap justify-content-lg-start justify-content-between mx-lg-0 mx-4">
            <OwlCarousel
              className="owl-theme owl_carousel_upcoming"
              {...optionsUpcoming}
            >
              {events.map((v, i) => {
                return <UpcomingLiveCard data={v} key={i} />;
              })}
            </OwlCarousel>
          </div>
        ) : null}
      </div>
      <div className="seemore-upcoming-event">
            <Link to="/upcoming-events">See More</Link>
          </div>
      <div className="trending_sec position-relative">
        <div className="d-flex align-items-center heading_container justify-content-between">
          <div className="heading">Trending Product</div>
        </div>

        <div className="d-flex align-items-center flex-wrap justify-content-lg-start justify-content-between mx-lg-0 mx-4">
          {trendingProduct.map((v, i) => {
            return <TrendingCard data={v} key={i} />;
          })}
        </div>

        <div className="right_icon_container cursor_pointer d-flex flex-column align-items-center justify-content-center">
          <img src={RightYellowIcon} alt="" />
          <p className="mb-0 mt-1">See All</p>
        </div>
        {/* 
        <div className="mini_treding_cards mt-lg-5">
          <div className="row m-0">
            <div className="col-lg-2 p-0"></div>
            <div className="col-lg-5 col-12 px-4 d-flex flex-wrap justify-content-between">
              {TredingCardMiniImages.map((v, i) => {
                return <TredingCardMini img={v} key={i} />;
              })}
            </div>
            <div className="col-lg-3 col-12 d-flex justify-content-lg-end justify-content-center p-0 px-lg-0 px-4 mt-lg-0 mt-4">
              <div className="brand_name_card">
                <img src={sliderImg} alt="" />
                <div>
                  <p>BRAND NAME</p>
                  <p className="middle_text">New in this week</p>
                  <p>
                    <Link to="#">DISCOVER NOW</Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-2 p-0"></div>
          </div>
        </div> */}
      </div>
      {/* <div className="recent_live_sec">
        <div className="d-flex align-items-center heading_container justify-content-between">
          <div className="heading">Recent Live</div>
        </div>

        <div className="recent_live_conatiner">
          <OwlCarousel className="owl-theme owl_carousel_home_2" {...options2}>
            {[1, 2, 3, 4, 5, 6].map((v, i) => (
              <div className="row m-0 align-items-center px-lg-0 px-4" key={i}>
                <div className="col-lg-6 col-12 p-0">
                  <img src={recentLiveImg} className="main_img" alt="" />
                </div>
                <div className="col-lg-6 col-12 p-0 ps-lg-5 mt-lg-0 mt-4">
                  <div className="date_text">MAR 21, 2022</div>
                  <div className="heading_text">
                    Lorem ipsum dolor sit amet, consetetur dfgdf sadipscing
                    elitr, sed diam nonumy...
                  </div>
                  <div className="desc_text">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  </div>
                  <div className="view_button">
                    <Button>View Product</Button>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div> */}
      <div className="top_seller_sec">
        <div className="heading1">Top Seller</div>
        <div className="heading2">Top sale in this week. See & buy</div>

        <div className="row m-0">
          <div className="col-lg-1 p-0"></div>
          <div className="col-lg-10 col-12 p-0 d-flex top_seller_cards">
            {topSellerCards.map((v, i) => {
              return <TopSellerCard data={v} key={i} />;
            })}
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>

      <div className="our_product_sec">
        <div className="d-flex align-items-center heading_container justify-content-between">
          <div className="heading">Our Product Brand</div>
        </div>

        <div className="our_product_sec_container">
          <OwlCarousel className="owl-theme owl_carousel_home_3" {...options3}>
            {ourBrandProdImages.map((v, i) => (
              <div className="our_brand_item d-flex align-items-center justify-content-center flex-column">
                <img src={v.image} alt="" />
                <p className="mb-0 mt-4">{v.name}</p>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>

      <div className="apk_btn_section">
        <div className="row m-0">
          <div className="col-lg-1 p-0"></div>
          <div className="col-lg-10 p-0">
            <div className="row m-0">
              <div className="col-lg-6 p-0">
                <div className="heading_text">
                  Netikash Live Differently <br /> Shop Watch
                </div>
                <div className="details_sec mt-lg-5 mx-lg-0 d-flex align-items-center flex-wrap justify-content-lg-between">
                  <div className="details_card">
                    <div className="heading_text">Easy to use</div>
                    <p>
                      Lorem ipsum dolor sit amet, cons etetur sadi pscing elitr,
                      sed diam
                    </p>
                  </div>
                  <div className="details_card">
                    <div className="heading_text">Live streming</div>
                    <p>
                      Lorem ipsum dolor sit amet, cons etetur sadi pscing elitr,
                      sed diam
                    </p>
                  </div>
                  <div className="details_card">
                    <div className="heading_text">Sell on online</div>
                    <p>
                      Lorem ipsum dolor sit amet, cons etetur sadi pscing elitr,
                      sed diam
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 ply_btn_sec p-0 d-flex flex-column align-items-end justify-content-start">
                <img src={playStoreBtn} className="cursor_pointer" alt="" />
                <img src={appStoreBtn} className="mt-4 cursor_pointer" alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>

      <div className="netikash_live_sec row m-0 align-items-center">
        <div className="col-lg-2 p-0"></div>
        <div className="col-lg-4 col-12 p-lg-0 p-4">
          <div className="heading_text">See on Netikash Live</div>
          <div className="desc_text">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore etc...
          </div>
          <div className="apply_now_link">Apply Now</div>
        </div>
        <div className="col-lg-4 col-12 d-flex justify-content-end">
          <img src={liveSectionImage} alt="" />
        </div>
        <div className="col-lg-2 p-0"></div>
      </div>
    </div>
  );
};

export default HomePage;
