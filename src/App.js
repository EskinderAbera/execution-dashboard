import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import KPIList from "./pages/KPIList";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import SignInSide from "./pages/SignIn";
import LandingPage from "./pages/Landing";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    isLoggedIn,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        {!isLoggedIn ? (
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/" element={<Navigate to="/landing" />} />
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
            <Route path="/login" element={<SignInSide />} />
            <Route path="/kpi" element={<Navigate to="/landing" />} />
          </Routes>
        ) : (
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>

            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}

            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>

              <div>
                {themeSettings && <ThemeSettings />}

                <Routes>
                  {/* <Route path="/" element = { <Navigate replace to="/kpi" />}></Route> */}
                  <Route path="/login" element={<Navigate to="/" />} />
                  {/* <Route path="/login" element={<SignInSide />} /> */}
                  <Route path="/kpi" element={<KPIList />} />
                  <Route path="/" element={<Footer />} />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default App;
