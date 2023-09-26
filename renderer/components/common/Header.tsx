import { useRouter } from "next/router";
import React from "react";
import FONT from "../../constants/fonts";
import styles from "./Header.module.css";

const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.headerContainer} style={FONT.BODY1}>
      <div className={styles.logo} onClick={() => router.push("/home")}>
        로고
      </div>
      <div className={styles.login} onClick={() => router.push("/login")}>
        로그인
      </div>
    </div>
  );
};

export default Header;
