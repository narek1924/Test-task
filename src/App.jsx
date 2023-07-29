import { useEffect, useState } from "react";
import YandexDiskUpload from "./components/YandexDiskUpload/YandexDiskUpload";
import YandexLogin from "./components/YandexLogin/YandexLogin";
import "./App.css";
function App() {
  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      const data = JSON.parse(user);
      const userData = {
        token: data.token,
        expiresIn: new Date(data.expiresIn),
      };
      if (userData.expiresIn > new Date()) {
        setUserData(userData);
        setLogin(true);
      }
    }
  }, []);
  const loginHandler = (data) => {
    setLogin(true);
    const userData = {
      token: data.access_token,
      expiresIn: new Date(new Date().getTime() + +data.expires_in),
    };
    setUserData(userData);
    console.log(data);
    localStorage.setItem("userData", JSON.stringify(userData));
  };
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState();

  return (
    <>
      {!login && <YandexLogin login={loginHandler} />}
      {login && <YandexDiskUpload token={userData.token} />}
    </>
  );
}

export default App;
