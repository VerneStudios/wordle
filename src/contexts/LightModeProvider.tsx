import { createContext, useState, useEffect } from "react";
import CookiesManager from "../js/CookiesManager";

const LightModeContext = createContext<any>(true);

const LightModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [lightMode, setLightMode] = useState(true);
  const [bgColor, setBgColor] = useState("bg-white");
  const [bgNavbarColor, setNavbarColor] = useState("bg-gray-100");
  const [textColor, setTextColor] = useState("text-gray-800");
  const [bgKeyColor, setBgKeyColor] = useState("bg-gray-200");

  const cookiesManager = new CookiesManager();

  function toggleLightMode() {
    const newLightMode = !lightMode;

    cookiesManager.setCookie({
      name: "darkMode",
      value: newLightMode ? "false" : "true",
      expiration: 365 * 24 * 60 * 60 * 1000,
    });

    setLightMode(newLightMode);
  }

  function getLightModeFromCookies() {
    const cookie = cookiesManager.getCookie("darkMode");

    if (cookie && cookie.value === "true") {
      setLightMode(false);
    }
  }

  useEffect(() => {
    getLightModeFromCookies();
  }, []);

  useEffect(() => {
    if (lightMode) {
      setBgColor("transition ease-in-out bg-white");
      setNavbarColor("transition ease-in-out bg-gray-100");
      setTextColor("transition ease-in-out text-gray-800");
      setBgKeyColor("transition ease-in-out bg-gray-200");
    } else {
      setBgColor("transition ease-in-out bg-gray-900");
      setNavbarColor("transition ease-in-out bg-gray-800");
      setTextColor("transition ease-in-out text-gray-200");
      setBgKeyColor("transition ease-in-out bg-gray-600");
    }
  }, [lightMode]);

  return (
    <LightModeContext.Provider
      value={{
        lightMode,
        toggleLightMode,
        bgColor,
        bgNavbarColor,
        textColor,
        bgKeyColor,
      }}
    >
      {children}
    </LightModeContext.Provider>
  );
};

export { LightModeProvider, LightModeContext };
