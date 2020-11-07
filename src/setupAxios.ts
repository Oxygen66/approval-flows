import axios from "axios";
import Config from "./config";

export default function setupAxios(): void {
  axios.defaults.baseURL = Config.API_BASE_URL;
}
