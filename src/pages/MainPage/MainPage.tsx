import styles from "./MainPage.module.scss";
import { Header } from "../../components/Header/Header";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { Content } from "../../components/Content/Content";

export const MainPage = () => {
  return (
    <div className={styles._}>
      <Header />
      <main className={styles.main}>
        <Sidebar className={styles.sidebar} />
        <Content className={styles.content} />
      </main>
    </div>
  );
};
