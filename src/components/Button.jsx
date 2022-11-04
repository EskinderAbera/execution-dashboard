import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const { setIsClicked, initialState, handleLoginUser } = useStateContext();

  const handleLogout = () => {
    setIsClicked(initialState);
    // !icon && handleLoginUser(false);
    !icon && (handleLoginUser(false), window.location.reload(true));
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
