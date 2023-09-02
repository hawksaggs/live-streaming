import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./hostPage.css";
import BackArrow from "../../assets/icons/left-arrow.svg";
import SoundIcon from "../../assets/icons/sound.svg";
import Insta from "../../assets/icons/yellow_insta.svg";
import Linkedin from "../../assets/icons/yellow_linkedin.svg";
import Facebook from "../../assets/icons/yellow_facebook.svg";
import Hart from "../../assets/icons/likeIcon.svg";
import HartRed from "../../assets/icons/redlike.svg";
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
import {
  Constants,
  MeetingProvider,
  useMeeting,
  usePubSub,
} from "@videosdk.live/react-sdk";
import Hls from "hls.js";
import axios from "axios";

function HostPage({ guestsPage }) {
  const { eventId } = useParams();
  const chatContainerRef = useRef(null);
  const mobile = window.screen.availWidth < 600;
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

  const [event, setEvent] = useState(null);
  const [eventToken, setEventToken] = useState(null);

  // State to store the user typed message
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const publishRef = useRef(null);

  const handleCarouselAction = (currentImg) => {
    setCurrentActiveCarousel(currentImg);
    console.log(currentImg);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };
  const getEvents = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/v1/event/" + eventId)
      .then((response) => response.data)
      .then((data) => {
        console.log("data: ", data);
        setEvent(data.data);
      })
      .catch((err) => console.log);
  };
  const getEventToken = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/v1/meeting/token")
      .then((response) => response.data)
      .then((data) => {
        console.log("data: ", data);
        setEventToken(data.data);
      })
      .catch((err) => console.log);
  };
  const handleSendMessage = () => {
    publishRef.current(message, { persist: true });
    setMessage("");

  };

  useEffect(() => {
    const fetchData = async () => {
      await getEvents();
      await getEventToken();
    };

    fetchData();
  }, []);

  useEffect(() => {

    scrollToBottom();
  }, [messages]);

  const handleSendMessageOnEnter = (e) => {
    if (e.key === 'Enter') {
      publishRef.current(message, { persist: true });
      setMessage("");
      scrollToBottom();
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

/// likes logics

  const handellike = (e) => {
    axios.post(process.env.REACT_APP_API_URL + "/v1/event/like/" + eventId).then((response) => {
      localStorage.setItem("like", true);
      localStorage.setItem("likeId", response.data.eventId);
      checkifuserlike();
    });
  };


    const checkifuserlike = () =>{
      if (localStorage.getItem("like") === "true" && localStorage.getItem("likeId") === eventId) {
        document.querySelector(".hart_icon").style.pointerEvents = "none";
        document.querySelector(".hart_icon").src = HartRed;
      }else{
        document.querySelector(".hart_icon").style.pointerEvents = "auto";
        document.querySelector(".hart_icon").src = Hart;
      }
    }
    useEffect(() => {
      checkifuserlike();
    }, []);

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
              src={Hart}
              alt="Heart"
              className="cursor_pointer hart_icon"
              width={30}
              onClick={(e) => handellike(e)}
            />

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
          {event && eventToken ? (
            <div>
              <MeetingProvider
                config={{
                  meetingId: event.meetingId,
                  micEnabled: false,
                  webcamEnabled: false,
                  name: "Org",
                  mode: Constants.modes.VIEWER,
                }}
                joinWithoutUserInteraction
                token={eventToken}
              >
                <ViewerView publishRef={publishRef} setMessages={setMessages} messages={messages}/>
              </MeetingProvider>
            </div>
          ) : null}

          {/*<div className="banner_img">*/}
          {/*  <img*/}
          {/*    src={HostBanner}*/}
          {/*    height={mobile ? 400 : 632}*/}
          {/*    className="d-block w-100 mt-4 pt-3"*/}
          {/*    alt="banner"*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        {/* <div className="d-flex flex-column justify-content-between mx-3 me-md-0 ms-md-5">
          <div className="top_right_text">
            {messages.map((message) => {
              return (
                <div className="mt-4">
                  <p className="m-0 upper_para">@{message.senderId}</p>
                  <p className="m-0 lower_para">{message.message}</p>
                </div>
              );
            })}
          </div>

          <div className="add_cmt_box">
            <input
              type="text"
              className="right_text_btn"
              placeholder="Add Comment"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />

            <img
              src={RightArrow}
              alt=""
              height={18}
              width={18}
              onClick={() => handleSendMessage()}
            />
          </div>
        </div> */}
        <div className="chat-container">
      <div className="messages-container" ref={chatContainerRef}>
        {messages.map((message, index) => (
          <div className={`message ${index % 2 === 0 ? "even" : "odd"}`} key={index}>
            <p className="sender">@{message.senderName}</p>
            <p className="message-text">{message.message}</p>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          className="right_text_btn"
          placeholder="Add Comment"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={handleSendMessageOnEnter}
        />

        <img
          src={RightArrow}
          alt="Send"
          height={18}
          width={18}
          className="send-button"
          onClick={() => handleSendMessage()}
        />
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
            {/* <div className="gray_barcode d-flex justify-content-between">
              <div>
                <p className="m-0 heading mt-2">Buy before the show ends.</p>
                <p className="m-0 para mt-2">
                  Scan the QR code with your phone to download{" "}
                  <br className="d-none d-md-block" /> the Netikash Live app
                </p>
              </div>
              <img src={Barcode} alt="" />
            </div> */}

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
                {/* <div className="gray_barcode d-flex justify-content-between">
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
                </div> */}
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
            {/* <div className="d-flex justify-content-center">
              <button type="button" className="add_product_btn">
                Add Product
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewerView({ publishRef, messages , setMessages }) {
  // States to store downstream url and current HLS state
  const playerRef = useRef(null);
  //Getting the hlsUrls
  const { hlsUrls, hlsState } = useMeeting();
  // destructure publish method from usePubSub hook
  const { publish, messages: chatMessages } = usePubSub("CHAT", {
    onMessageReceived: (message) => {
      setMessages([...messages, message])
    },
  });
  publishRef.current = publish;
  setMessages(chatMessages);
  
  // i want to show the previous chat messages in the chat container first on page load




  //Playing the HLS stream when the downstreamUrl is present and it is playable
  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState === "HLS_PLAYABLE") {
      if (Hls.isSupported()) {
        const hls = new Hls({
          capLevelToPlayerSize: true,
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          autoStartLoad: true,
          defaultAudioCodec: "mp4a.40.2",
        });
        let player = document.querySelector("#hlsPlayer");
        hls.loadSource(hlsUrls.downstreamUrl);
        hls.attachMedia(player);
      } else {
        if (typeof playerRef.current?.play === "function") {
          playerRef.current.src = hlsUrls.downstreamUrl;
          playerRef.current.play();
        }
      }
    }
  }, [hlsUrls, hlsState, playerRef.current]);
  return (
    <div>
      {/* Showing message if HLS is not started or is stopped by HOST */}
      {hlsState !== "HLS_PLAYABLE" ? (
        <div className="guestEventDisplay">
          {/*<p>Please Click Go Live Button to start HLS</p>*/}
          <p>Event will start shortly!!!</p>
        </div>
      ) : (
        hlsState === "HLS_PLAYABLE" && (
          <div>
            <video
              ref={playerRef}
              id="hlsPlayer"
              autoPlay={true}
              controls
              style={{ width: "100%", height: "100%" }}
              playsInline
              muted={true}
              playing
              onError={(err) => {
                console.log(err, "hls video error");
              }}
            ></video>
          </div>
        )
      )}
    </div>
  );
}

export default HostPage;
