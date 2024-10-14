import { apiInstance } from "../../app/api";
import {
  GetUserAboutRequest,
  GetUserAboutResponse,
  GetUsersRequest,
  GetUsersResponse,
} from "./types";

export const api = {
  async getUsers(data: GetUsersRequest) {
    const queryItems: string[] = [];
    let hasId = false;
    let hasName = false;
    data.forEach((item) => {
      if (item) {
        if (typeof item === "number") {
          queryItems.push(`id=${item}`);
          hasId = true;
        } else {
          queryItems.push(`username=${item}`);
          hasName = true;
        }
      }
    });
    if (hasId && hasName)
      throw new Error("Неверный запрос. Введите Id или имя.");

    return await apiInstance.get<GetUsersResponse>(
      `/users?${queryItems.join("&")}`
    );
  },

  async getUserAbout(data: GetUserAboutRequest) {
    return await apiInstance.get<GetUserAboutResponse>(
      `/posts?userId=${data.userId}&_limit=1`
    );
  },
};
