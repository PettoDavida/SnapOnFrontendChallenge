import CatCardPanel from "../components/catCardPanel";
import CatCardCreator from "../components/catCardCreator";
import DemoFooter from "../components/demoFooter";
import {Inter} from "next/font/google";
import styles from "@/styles/Home.module.css";
import {UserData} from "@/types/global";
import {useContext, useEffect, useState} from "react";
import {Context} from "./context";
const DB_API_URI = "http://localhost:3001";
const inter = Inter({subsets: ["latin"]});

export default function App() {
  const {userID} = useContext(Context);
  const endpoint = `${DB_API_URI}/users/${userID}`;
  const [user, setUser] = useState<UserData>();
  const fetchUser = async () => {
    const data = await fetch(endpoint)
      .then((res) => res.json())
      .then((data) => data);
    setUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, [userID]);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.row}>
          <div className={styles.description}>
            <h1 className={inter.className}>Cat Club 🐱</h1>
          </div>
        </div>
        <div style={{justifyContent: "space-around"}} className={styles.row}>
          <div className={styles.col}>
            <CatCardCreator currentUser={user} />
          </div>
          <div className={styles.col}>
            <CatCardPanel herd={user?.herd} name={user?.firstName} />
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            justifyContent: "center",
          }}
          className={styles.row}
        >
          <DemoFooter />
        </div>
      </div>
    </>
  );
}
