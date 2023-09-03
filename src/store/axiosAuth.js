import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:7186",
  // headers: {
  //   "bearer token": {
  //     toString() {
  //       return `${localStorage.getItem("userData")}`;
  //     },
  //   },
  // },
});

export default instance;
