import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [depts, setDepts] = useState([]);
  const [roles, setRole] = useState([]);
  const [subdepts, setSubDepts] = useState([]);
  const [subSubDepts, setSubSubDepts] = useState([]);
  const [users, setUsers] = useState([]);
  const [kpis, setKpis] = useState([]);
  const [actual, setActual] = useState(0);
  const [month, setMonth] = useState("m");
  const [loginId, setLoginId] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchData = async () => {
    try {
      const getDepts = await axios.get(
        `https://pms-apis.herokuapp.com/core/department/`
      );
      const getRole = await axios.get(
        `https://pms-apis.herokuapp.com/core/role/`
      );
      const getSubDept = await axios.get(
        `https://pms-apis.herokuapp.com/core/subdepartment/`
      );
      const getSubSubDept = await axios.get(
        `https://pms-apis.herokuapp.com/core/subsub/`
      );
      const getUsers = await axios.get(
        `https://pms-apis.herokuapp.com/core/users/`
      );
      const getKpis = await axios.get(
        `https://pms-apis.herokuapp.com/bsc/kpi/76ee057b-ad16-4582-8a2d-52f4e69d0abc/`
      );
      setDepts(getDepts.data);
      setRole(getRole.data);
      setSubDepts(getSubDept.data);
      setSubSubDepts(getSubSubDept.data);
      setUsers(getUsers.data);
      setKpis(getKpis.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoginUser = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };

  const handleLoginId = (loginId) => {
    setLoginId(loginId);
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  const changeActual = (actual) => {
    setActual(actual);
  };
  const changeMonth = (month) => {
    setMonth(month);
  };

  const changeKPIS = (kpis) => {
    setKpis(kpis);
  };
  const updateKpi = (kpi_id, updatedKpi) => {
    setKpis(kpis.map((kpi) => (kpi.kpi_id === kpi_id ? updatedKpi : kpi)));
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        isLoggedIn,
        handleLoginUser,
        loginId,
        handleLoginId,
        updateKpi,
        kpis,
        changeKPIS,
        month,
        kpis,
        depts,
        actual,
        changeActual,
        changeMonth,
        roles,
        subdepts,
        subSubDepts,
        users,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
