import axios from "axios";
import { toast } from "react-toastify";

const Axios = axios.create({
  baseURL: "/api",
  timeout: 5000,
});
export default Axios;
