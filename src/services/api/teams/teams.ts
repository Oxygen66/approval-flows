import axios, { AxiosResponse } from "axios";
import Config from "../../../config";
import { TeamsOutput } from "./teams.dto";

// eslint-disable-next-line import/prefer-default-export
export const getAllTeams = (): Promise<AxiosResponse<TeamsOutput>> =>
  axios.get<TeamsOutput>(Config.API_URLS.TEAMS);
