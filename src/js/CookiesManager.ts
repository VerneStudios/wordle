//A class to control the cookies

import { CookieType } from "../types";

class CookiesManager {
  setCookie({
    name,
    value,
    expiration,
  }: {
    name: string;
    value: string;
    expiration: number;
  }) {
    let cookie: string = `${name}=${value}`;

    if (expiration) {
      cookie += `; expires=${new Date(
        new Date().getTime() + expiration
      ).toUTCString()}`;
    }

    document.cookie = cookie;
  }

  getCookies() {
    const cookiesArray: string[] = document.cookie.split(";");

    const cookies = cookiesArray.map((cookie) => {
      const [name, value] = cookie.split("=");

      if (name && value) {
        return {
          name: name.trim(),
          value: value.trim(),
        };
      }

      return null;
    });

    return cookies;
  }

  getCookie(cookie: string) {
    const cookies = this.getCookies();

    //find if cookies has the cookie name

    const cookieFound = cookies.find((cookieItem) => {
      if (cookieItem && cookieItem.name && cookieItem.name === cookie) {
        return true;
      }

      return null;
    });

    if (cookieFound) {
      return cookieFound;
    } else {
      return null;
    }
  }

  deleteCookie() {}
}

export default CookiesManager;
