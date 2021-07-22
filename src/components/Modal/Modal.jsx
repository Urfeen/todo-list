import { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import StyledModal from "./StyledModal.css.js";

const modalRoot = document.createElement("div");
modalRoot.id = "modal-root";
document.body.appendChild(modalRoot);

const Modal = ({ id, className, zIndexBox, children, onClose: close }) => {
  const [fadeType, setFadeType] = useState(null);

  const transitionEndHandler = (e) => {
    if (e.propertyName !== "opacity" || fadeType === "in") return;
    if (fadeType === "out") close();
  };

  const closeHandler = (e) => {
    e.preventDefault();
    setFadeType("out");
  };

  const onEscKeyDownHandler = (e) => {
    if (e.key !== "Escape") return;
    setFadeType("out");
  };

  useEffect(() => {
    setTimeout(setFadeType("in"), 0);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onEscKeyDownHandler);
    return () => {
      window.removeEventListener("keydown", onEscKeyDownHandler);
    };
  }, []);

  return createPortal(
    <StyledModal
      id={id ? id : ""}
      className={className ? className : ""}
      role="dialog"
      zIndexBox={typeof zIndexBox === "number" && zIndexBox > 0 ? zIndexBox : 2}
      fadeType={fadeType}
    >
      <div className="modal-box">
        <div className="modal-box__header">
          <h4 className="modal-box__title">Title Of Modal</h4>
          <button onClick={closeHandler} className="modal-box__close"></button>
        </div>
        <div className="modal-box__content">{children}</div>
        <div className="modal-box__footer">footer</div>
      </div>
      <div
        className="modal-background"
        onTransitionEnd={transitionEndHandler}
        onMouseDown={closeHandler}
      />
    </StyledModal>,
    modalRoot
  );
};

export default memo(Modal);
