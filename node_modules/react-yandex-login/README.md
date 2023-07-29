# react-yandex-login

> A Yandex Sign-in/Log-in Component for React

[![NPM](https://img.shields.io/npm/v/react-yandex-login.svg)](https://www.npmjs.com/package/react-yandex-login) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-yandex-login
```

## Usage

```jsx
import React, { useState } from 'react'

import { YandexLogin, YandexLogout } from 'react-yandex-login';

const clientID = '<<clientID of your Yandex application>>';

export default function App() {
  const [userData, setUserData] = useState(undefined);

  const loginSuccess = (userData) => {
    console.log('User Data: ', userData);
    setUserData(userData)
  }

  const logoutSuccess = () => {
    setUserData(null);
  }

  return (
    <div>
      {!userData && 
        <YandexLogin clientID={clientID} onSuccess={loginSuccess}>
          <button>Yandex Login</button>
        </YandexLogin>
      }
      {userData &&
        <div>
          <YandexLogout onSuccess={logoutSuccess}>
            <button>Yandex Logout</button>
          </YandexLogout>
          <ul>
            <li>access_token: {userData.access_token}</li>
            <li>expires_in: {userData.expires_in}</li>
            <li>token_type: {userData.token_type}</li>
          </ul>
        </div>
      }
    </div>
  );
}
```

## License

MIT © [DonTomato](https://github.com/DonTomato)
