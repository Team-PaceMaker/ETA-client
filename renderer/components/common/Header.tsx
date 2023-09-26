import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div>로고</div>
      <div>로그인</div>
    </div>
  );
};

export default Header;
