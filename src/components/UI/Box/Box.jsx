import { useRef } from "react";
import "./box.css";
import { KEYBOARD_CONTROLS } from "../../constants/keyboardControls";
const OFFSET = 15;

const Box = (props) => {
  const { id, onDelete, enableKeyboardControls, fencing } = props;
  const boxRef = useRef(null);

  const handleOnBlur = (e) => {
    boxRef.current.style.border = "1px solid black";
  };

  const handleOnFocus = (e) => {
    boxRef.current.style.border = "2px solid red";
    console.log("select");
  };

  const handleKeyPress = (event) => {
    if (!enableKeyboardControls) return;

    let viewPortData = boxRef.current.getBoundingClientRect();

    let currentLeftPosition = Number(boxRef.current.style.left.split("px")[0]);
    let currentTopPosition = Number(boxRef.current.style.top.split("px")[0]);
    let newPosition = 0;

    switch (event.key) {
      case KEYBOARD_CONTROLS.MOVE_LEFT:
        newPosition = currentLeftPosition - OFFSET;
        if (newPosition >= 0) {
          boxRef.current.style.left = newPosition + "px";
        }
        break;

      case KEYBOARD_CONTROLS.MOVE_RIGHT:
        newPosition = currentLeftPosition + OFFSET;
        if (
          newPosition >= 0 &&
          newPosition + viewPortData.width < fencing.width
        ) {
          boxRef.current.style.left = newPosition + "px";
        }
        break;

      case KEYBOARD_CONTROLS.MOVE_UP:
        newPosition = currentTopPosition - OFFSET;
        if (newPosition >= 0) {
          boxRef.current.style.top = newPosition + "px";
        }
        break;

      case KEYBOARD_CONTROLS.MOVE_DOWN:
        newPosition = currentTopPosition + OFFSET;

        if (
          newPosition >= 0 &&
          newPosition + viewPortData.height < fencing.height
        ) {
          boxRef.current.style.top = newPosition + "px";
        }
        break;

      case KEYBOARD_CONTROLS.DELETE:
        onDelete(event.target.id);
        break;

      default:
        console.warn("Unhandled keyCode", event.key);
    }
  };

  return (
    <div
      className="box"
      id={id}
      tabIndex={0}
      ref={boxRef}
      onBlur={handleOnBlur}
      onKeyDown={handleKeyPress}
      onFocus={handleOnFocus}
      style={{ zIndex: Number(id) }}
    >
      {`ID: ${id}`}
    </div>
  );
};

export default Box;
