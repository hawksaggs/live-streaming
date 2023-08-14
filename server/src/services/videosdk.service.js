const jwt = require("jsonwebtoken");
const axios = require("axios");
const config = require("../config");

const API_URL = `${config.videosdk.apiEndpoint}`;

const getToken = async (data) => {
  const API_KEY = process.env.VIDEOSDK_API_KEY;
  const SECRET_KEY = process.env.VIDEOSDK_SECRET_KEY;

  const options = { expiresIn: "1day", algorithm: "HS256" };

  /**
   * allow_join: The participant is allowed to join the meeting directly.
   * ask_join: The participant requires to ask for permission to join the meeting.
   * allow_mod: The participant is allowed to toggle webcam & mic of other participants.
   */
  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join"],
    version: 2,
    roles: ["CRAWLER"],
  };

  return jwt.sign(payload, SECRET_KEY, options);
};

const createRoom = async () => {
  let data = JSON.stringify({});

  let config = {
    method: "post",
    url: `${API_URL}/v2/rooms`,
    headers: {
      Authorization: await getToken(),
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios.request(config);
  return response.data;
};

const validateRoom = async (data) => {
  let config = {
    method: "get",
    url: `${API_URL}/v2/rooms/validate/${data.roomId}`,
    headers: {
      Authorization: await getToken(),
    },
  };

  const response = await axios.request(config);
  return response.data;
};

module.exports = {
  getToken,
  createRoom,
  validateRoom,
};
