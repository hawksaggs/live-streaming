import { Link } from "react-router-dom";
import facebook from "../../assets/images/faceBook.svg";
import twitter from "../../assets/images/twitter.svg";
import instagram from "../../assets/images/instagram.svg";
import linkedIn from "../../assets/images/linkedIn.svg";
import appStoreBtn from "../../assets/images/app_store_btn.svg";
import playStoreBtn from "../../assets/images/play_store_btn.svg";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="row m-0 align-items-center">
        <div className="col-lg-2 p-0"></div>
        <div className="col-lg-8 p-0">
          <div className="row m-0 align-items-lg-center">
            <div className="col-lg-5 col-7 p-lg-0 px-4">
              <div className="f_heading">
                <span>Netikash</span> <br /> Live
              </div>
              <div className="social_icons d-flex align-items-center mt-5">
                <img src={twitter} className="me-4 cursor_pointer" alt="" />
                <img src={linkedIn} className="me-4 cursor_pointer" alt="" />
                <img src={facebook} className="me-4 cursor_pointer" alt="" />
                <img src={instagram} className="cursor_pointer" alt="" />
              </div>
            </div>
            <div className="col-lg-3 col-3 p-0 footer_links d-flex flex-column">
              <Link to="#">Discover</Link>
              <Link to="#">Category</Link>
              <Link to="#">How it work</Link>
              <Link to="#">Privacy</Link>
              <Link to="#">Help</Link>
            </div>

            <div className="col-lg-4 p-lg-0 px-4 col-12 apk_btn d-flex justify-content-lg-end flex-column align-items-lg-end">
              <p>Download Our App</p>

              <img src={playStoreBtn} className="cursor_pointer" width={200} alt="" />
              <img src={appStoreBtn} width={200} className="mt-4 cursor_pointer" alt="" />
            </div>
          </div>
        </div>
        <div className="col-lg-2 p-0"></div>
      </div>
    </div>
  );
};

export default Footer;
