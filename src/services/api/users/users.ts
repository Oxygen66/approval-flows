import axios, { AxiosResponse } from "axios";
import { UsersOutput } from "./users.dto";
import Config from "../../../config";

// eslint-disable-next-line import/prefer-default-export
export const getAllUsers = (): Promise<AxiosResponse<UsersOutput>> =>
  axios.get(Config.API_URLS.USERS);
