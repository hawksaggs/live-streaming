import React, { useEffect, useMemo, useRef, useState } from "react";
import LeftChevron from "../../assets/icons/chevron-left.svg";
import UpcomingLiveHomePage from "../../components/cards/upcomingLiveHomePage/upcomingLiveHomePage";
import OrderIcon from "../../assets/icons/orderIcon.svg";
import SalesIcon from "../../assets/icons/salesIcon.svg";
import LikesIcon from "../../assets/icons/likeIcon.svg";
import ViewerIcon from "../../assets/icons/viewerIcon.svg";
import YellowArrow from "../../assets/icons/downArrow.svg";
import {
  Constants,
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import Hls from "hls.js";
import { isLoggedIn } from "../../helpers";

function ControlRoom({ setShowControlRoom, data, eventToken }) {
  console.log("controlRoom data: ", data);
  console.log("isLoggedIn: ", isLoggedIn());
  const [activeKey, setActiveKey] = useState(1);
  const [participantCount, setParticipantCount] = useState(0);
  const [reports, setReports] = useState([
    // { image: ViewerIcon, counts: participantCount, category: "Viewer" },
    { image: LikesIcon, counts: 458, category: "Likes" },
    { image: OrderIcon, counts: 56, category: "Order" },
    { image: SalesIcon, counts: 254, category: "Sales" },
  ]);
  // useEffect(() => {}, [participantCount]);

  return (
    <div className="d_home_container w-100 mb-5 d_home_container_height">
      <div className="top_heading d-flex align-items-center justify-content-between mb-4 pb-2">
        <div className="heading_name">Control Room</div>
        <div
          className="go_back_event d-flex align-items-center cursor_pointer"
          onClick={() => setShowControlRoom(false)}
        >
          <img src={LeftChevron} height={16} width={9} alt="" />
          <p className="m-0 ms-3 go_back_event_text">Go back to events</p>
        </div>
      </div>
      <UpcomingLiveHomePage
        isControlRoomView
        data={data}
        eventToken={eventToken}
      />

      <div className="d-md-flex justify-content-between mt-4 pt-3">
        <div className="report_card_section">
          <div className="d-flex justify-content-between">
            <div className="report_card">
              <img
                src={ViewerIcon}
                alt="report_card_img"
                className="report_card_img"
              />
              <p className="m-0 report_card_count mt-4">{participantCount}</p>
              <p className="m-0 report_card_category">Viewer</p>
            </div>
            {reports.map((value, index) => (
              <div className="report_card" key={index}>
                <img
                  src={value.image}
                  alt="report_card_img"
                  className="report_card_img"
                />
                <p className="m-0 report_card_count mt-4">{value.counts}</p>
                <p className="m-0 report_card_category">{value.category}</p>
              </div>
            ))}
          </div>
          <MeetingProvider
            config={{
              meetingId: data.meetingId,
              micEnabled: !!isLoggedIn(),
              webcamEnabled: !!isLoggedIn(),
              name: "Ayush's Org",
              mode: Constants.modes.CONFERENCE,
            }}
            joinWithoutUserInteraction
            token={eventToken}
          >
            {isLoggedIn() ? (
              <SpeakerView setParticipantCount={setParticipantCount} />
            ) : (
              <ViewerView />
            )}
          </MeetingProvider>

          {/*Stream Screen*/}
          {/*<div className="stream_select_box">*/}
          {/*  <div className="stream_select_box_inner d-flex flex-column justify-content-between">*/}
          {/*    <div>*/}
          {/*      <p className="m-0">*/}
          {/*        Select your favorite streaming app, <br /> it takes around*/}
          {/*        20-30 seconds for the stream to be received.*/}
          {/*      </p>*/}
          {/*      <div className="select_wrapper text-center d-flex justify-content-center mt-3">*/}
          {/*        <div className="select_div">*/}
          {/*          <select name="" id="">*/}
          {/*            <option value="Select">Select</option>*/}
          {/*            <option value="Larix">Larix</option>*/}
          {/*            <option value="Zoom">Zoom</option>*/}
          {/*            <option value="OBS">OBS</option>*/}
          {/*            <option value="Other">Other</option>*/}
          {/*          </select>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="close_btn_wrapper text-end">*/}
          {/*      <button className="closeBtn">Close </button>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        {/*Chat Box*/}
        <div className="chat_product_box d-flex flex-column mt-5 mt-md-0 justify-content-between">
          <div className="d-flex">
            <p
              className={`m-0 option ${activeKey === 1 ? "active" : ""}`}
              onClick={() => setActiveKey(1)}
            >
              Chat
            </p>
            <p
              className={`m-0 option ms-4 ${activeKey === 2 ? "active" : ""}`}
              onClick={() => setActiveKey(2)}
            >
              Products
            </p>
          </div>
          <div className="d-flex justify-content-between">
            {/* <button className="button_add_comment">Add Comment</button> */}
            <input
              type="text"
              className="input_add_comment"
              placeholder="Add Comment"
            />
            <button className="button_add_comment">
              <img
                src={YellowArrow}
                alt=""
                style={{ transform: "rotate(270deg)" }}
                height={11}
                width={19}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewerView() {
  // States to store downstream url and current HLS state
  const playerRef = useRef(null);
  //Getting the hlsUrls
  const { hlsUrls, hlsState } = useMeeting();
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
        <div>
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

function ParticipantView(props) {
  console.log("ParticipantView: ", props);
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);
  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);
  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);
  return (
    <div>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          url={videoStream}
          // height={"300px"}
          // width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}

function Controls() {
  const { hlsState, startHls, stopHls } = useMeeting();
  const _handleHLS = () => {
    console.log("hlsState", hlsState);
    if (!hlsState || hlsState === "HLS_STOPPED") {
      startHls({
        layout: {
          type: "SPOTLIGHT",
          priority: "PIN",
          gridSize: 4,
        },
        theme: "DARK",
        orientation: "landscape",
      });
    } else if (hlsState === "HLS_STARTED" || hlsState === "HLS_PLAYABLE") {
      stopHls();
    }
  };
  return (
    <>
      {hlsState === "HLS_STARTED" ||
      hlsState === "HLS_STOPPING" ||
      hlsState === "HLS_STARTING" ||
      hlsState === "HLS_PLAYABLE" ? (
        <button
          onClick={() => {
            _handleHLS();
          }}
          style={{
            backgroundColor: "#FF5D5D",
          }}
        >
          {hlsState === "HLS_STARTED"
            ? "Live Starting"
            : hlsState === "HLS_STOPPING"
            ? "Live Stopping"
            : hlsState === "HLS_PLAYABLE"
            ? "Stop Live"
            : "Loading..."}
        </button>
      ) : (
        <button
          onClick={() => {
            _handleHLS();
          }}
          style={{
            backgroundColor: "#FF5D5D",
          }}
        >
          Go Live
        </button>
      )}
    </>
  );
}

function SpeakerView({ setParticipantCount }) {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participant list to display all participants
  const { participants, meetingId, activeSpeakerId, localParticipant } =
    useMeeting();
  console.log("meetingId: ", meetingId);
  console.log("activeSpeakerId: ", activeSpeakerId);
  console.log("participants: ", participants);
  console.log("localParticipant: ", localParticipant);
  console.log("participant size: ", participants.size);
  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
      //we will pin the local participant if he joins in CONFERENCE mode
      if (mMeetingRef.current.localParticipant.mode === "CONFERENCE") {
        mMeetingRef.current.localParticipant.pin();
      }
    },
    onParticipantJoined: (participant) => {
      console.log("onParticipantJoined: ", participant);
    },
    onParticipantLeft: (participant) => {
      console.log("onParticipantLeft: ", participant);
    },
  });
  console.log("useMeeting: ", mMeeting);
  //We will create a ref to meeting object so that when used inside the
  //Callback functions, meeting state is maintained
  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  //Filtering the host/speakers from all the participants
  const speaker = useMemo(() => {
    if (localParticipant?.mode === Constants.modes.CONFERENCE)
      return localParticipant;
  }, [localParticipant]);

  const attendeesCount = useMemo(() => {
    const attendees = [...participants.values()].filter((participant) => {
      return participant.mode == "VIEWER";
    });
    return attendees.length || 0;
  }, [participants]);
  setParticipantCount(attendeesCount);

  console.log("speaker: ", speaker);
  return (
    <div className="container">
      {joined && joined === "JOINED" ? (
        <div>
          <ParticipantView participantId={speaker.id} key={speaker.id} />
          <Controls />
        </div>
      ) : (
        <p>Joining the meeting...</p>
      )}
    </div>
  );
}

export default ControlRoom;
