import { YandexLogin } from "react-yandex-login";
import { useState } from "react";
import yandexIcon from "../../assets/yandexIcon.png";
import PropTypes from "prop-types";
import styles from "./YandexLogin.module.css";

const clientID = "2cc2f6180f214d629a8acbb271db568b";

export default function Login({ login }) {
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState(undefined);

  // const loginSuccess = (userData) => {
  //   console.log("User Data: ", userData);
  //   setUserData(userData);
  // };

  // const logoutSuccess = () => {
  //   setUserData(null);
  // };

  return (
    <div className={styles.container}>
      {!userData && (
        <YandexLogin clientID={clientID} onSuccess={login}>
          <button className={styles.login}>
            <img
              style={{ width: "25px", height: "25px", marginRight: "10px" }}
              src={yandexIcon}
              alt="yandex icon"
            />
            Sign in with Yandex id
          </button>
        </YandexLogin>
      )}
    </div>
  );
}
Login.propTypes = {
  login: PropTypes.func,
};
