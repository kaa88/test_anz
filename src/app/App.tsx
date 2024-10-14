import { Provider } from "react-redux";
import { store } from "./store";

import "../styles/index.scss";

import { MainPage } from "../pages/MainPage/MainPage";

export const App = () => {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};
