export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  about?: string;
};

export type UserAbout = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type GetUsersQuery = string;
export type GetUsersRequest = (string | number)[];
export type GetUsersResponse = User[];

export type GetUserAboutRequest = {
  userId: number;
};
export type GetUserAboutResponse = UserAbout[];

//?
export interface GetParams {
  searchFragment?: string;
  limit?: number;
  page?: number;
}
