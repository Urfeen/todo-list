import "./InputCheckbox.scss";
import React from "react";

const InputCheckbox = ({ defaultChecked, disabled, onChange: action }) => {
  return (
    <div className="check">
      <input
        defaultChecked={!!defaultChecked}
        onChange={typeof action === "function" ? action : ""}
        type="checkbox"
        className="check__input"
        disabled={!!disabled}
      />
      <span className="check__box" />
    </div>
  );
};

export default InputCheckbox;
