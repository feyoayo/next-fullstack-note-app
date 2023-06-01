import axios from "axios";

const Axios = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

export default Axios;
