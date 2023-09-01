import React, { useEffect, useMemo, useRef, useState } from "react";
import LeftChevron from "../../assets/icons/chevron-left.svg";
import UpcomingLiveHomePage from "../../components/cards/upcomingLiveHomePage/upcomingLiveHomePage";
import OrderIcon from "../../assets/icons/orderIcon.svg";
import SalesIcon from "../../assets/icons/salesIcon.svg";
import LikesIcon from "../../assets/icons/likeIcon.svg";
import ViewerIcon from "../../assets/icons/viewerIcon.svg";
import YellowArrow from "../../assets/icons/downArrow.svg";
import axios from "axios";
import {
  Constants,
  MeetingProvider,
  useMeeting,
  useParticipant,
  usePubSub,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import Hls from "hls.js";
import { isLoggedIn } from "../../helpers";
import * as punycode from "punycode";

function ControlRoom({
  setShowControlRoom,
  data,
  eventToken,
  setShowEventForm,
}) {
  const [activeKey, setActiveKey] = useState(1);
  const [participantCount, setParticipantCount] = useState(0);
  const chatContainerRef = useRef(null);

  const [reports, setReports] = useState([
    // { image: ViewerIcon, counts: participantCount, category: "Viewer" },
    { image: LikesIcon, counts: data.like, category: "Likes" },
    { image: OrderIcon, counts: 56, category: "Order" },
    { image: SalesIcon, counts: 254, category: "Sales" },
  ]);
  // State to store the user typed message
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const publishRef = useRef(null);

  const handleSendMessage = () => {
    // Sending the Message using the publish method
    publishRef.current(message, { persist: true });
    // Clearing the message input
    setMessage("");
    scrollToBottom();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessageOnEnter = (e) => {
    if (e.key === "Enter") {
      // Sending the Message using the publish method
      publishRef.current(message, { persist: true });
      // Clearing the message input
      setMessage("");
      scrollToBottom();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // get the host name
  const [hostName, setHostName] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/user/${localStorage.getItem("userId")}`)
      .then((res) => {
        setHostName(res.data.users.fullName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


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
        setShowEventForm={setShowEventForm}
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
              mode: Constants.modes.CONFERENCE,
              senderName: hostName,
            }}
            joinWithoutUserInteraction
            token={eventToken}
          >
            {isLoggedIn() ? (
              <SpeakerView
                setParticipantCount={setParticipantCount}
                messages={messages}
                publishRef={publishRef}
                setMessages={setMessages}
              />
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
        {/*   <div className="chat_product_box d-flex flex-column mt-5 mt-md-0 justify-content-between">
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
          {messages.map((message) => {
            return (
                <div className="mt-4">
                  <p className="m-0 upper_para">@{message.senderId}</p>
                  <p className="m-0 lower_para">{message.message}</p>
                </div>
            );
          })}
        <div className="d-flex justify-content-between">
            {/* <button className="button_add_comment">Add Comment</button>}

            <input
              type="text"
              className="input_add_comment"
              placeholder="Add Comment"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              className="button_add_comment"
              onClick={() => handleSendMessage()}
            >
              <img
                src={YellowArrow}
                alt=""
                style={{ transform: "rotate(270deg)" }}
                height={11}
                width={19}
              />
            </button>
          </div>
        </div> */}

        {/* new chat box */}
        <div className="chat_product_box d-flex flex-column mt-5 mt-md-0 justify-content-between">
          <div className="d-flex options">
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

          <div className="messages-container" ref={chatContainerRef}>
            {messages.map((message, index) => (
              console.log("message: ", message),
              <div
                className={`message ${index % 2 === 0 ? "even" : "odd"}`}
                key={index}
              >
                <p className="upper_para">@{message.senderName}</p>
                <p className="lower_para">{message.message}</p>
              </div>
            ))}
          </div>

          <div className="d-flex align-items-center add-comment-section">
            <input
              type="text"
              className="input_add_comment"
              placeholder="Add Comment"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyDown={handleSendMessageOnEnter}
            />
            <button
              className="button_add_comment"
              onClick={() => handleSendMessage()}
            >
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
    <>
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
          width="100%"
          height="100%"
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </>
  );
}

function Controls() {
  const { hlsState, startHls, stopHls } = useMeeting();
  const _handleHLS = () => {
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
    <div className="host-session-button">
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
    </div>
  );
}

function SpeakerView({
  setParticipantCount,
  messages,
  publishRef,
  setMessages,
}) {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participant list to display all participants
  const { participants, localParticipant } = useMeeting();
  console.log("participants: ", participants);
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
  const { publish, messages: chatMessages } = usePubSub("CHAT", {
    onMessageReceived: (message) => {
      setMessages([...messages, message]);
    },
  });
  setMessages(chatMessages);
  publishRef.current = publish;

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

  return (
    <div className="container remove-ext-host-cont-space">
      {joined && joined === "JOINED" ? (
        <div>
          <ParticipantView participantId={speaker.id} key={speaker.id} />
          <Controls />
        </div>
      ) : (
        <div className="host-display-area">
          {/* <p>Session Will Start Soon ...</p> */}
        </div>
      )}
    </div>
  );
}

export default ControlRoom;
