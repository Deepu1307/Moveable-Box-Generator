import { useState, useEffect } from "react";
import "./home.css";
import Button from "../UI/Button/Button";
import Box from "../UI/Box/Box";
import { useRef } from "react";

const Home = () => {
  // USESTATE HOOKS
  const [keyboardControl, setKeyboardControl] = useState("enable");
  const [boxList, setBoxList] = useState([{ boxID: 1 }]);

  // USEREF HOOK
  const boxContainerRef = useRef(null);

  const [fencingDimensions, setFencingDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handleEnableDisable = (e) => {
    console.log(e);
    setKeyboardControl(e.currentTarget.value);
  };

  const addBoxHandler = () => {
    console.log(boxList[0].boxID);
    let id = boxList[0].boxID++;
    setBoxList((prevState) => {
      return [...prevState, { boxID: id }];
    });
  };

  const deleteBoxHandler = (id) => {
    setBoxList((value) => value.filter((box) => box.boxID !== Number(id)));
  };

  useEffect(() => {
    localStorage.removeItem("key");
    setFencingDimensions({
      height: boxContainerRef.current.offsetHeight,
      width: boxContainerRef.current.offsetWidth,
    });
  }, [boxList]);

  const renderBoxes = () => {
    if (boxList.length)
      return boxList.map((box) => {
        return (
          <Box
            id={box.boxID}
            key={box.boxID}
            onDelete={deleteBoxHandler}
            enableKeyboardControls={keyboardControl === "enable"}
            fencing={fencingDimensions}
          />
        );
      });

    return <></>;
  };

  return (
    <>
      <div className="navContainer">
        <Button type="button" onClick={addBoxHandler}>
          +Add Box
        </Button>
        <div className="keyboardContainer">
          <span>Keyboard Controls:</span>

          {/* ENABLE BUTTON */}
          <input
            type="radio"
            id="enabling"
            name="controls"
            value={"enable"}
            onClick={handleEnableDisable}
            checked={keyboardControl === "enable"}
          />
          <label htmlFor="enabling">Enable</label>

          {/* DISABLE BUTTON */}

          <input
            type="radio"
            id="disabling"
            name="controls"
            value={"disable"}
            onClick={handleEnableDisable}
            checked={keyboardControl === "disable"}
          />
          <label htmlFor="disabling">Disable</label>
        </div>
      </div>
      <div className="rectangularContainer" ref={boxContainerRef}>
        {renderBoxes()}
      </div>
      ;
    </>
  );
};

export default Home;

/*
<div className={classes.marLeftAuto}>
          Keyboard Controls
          <label>
            <input
              type={"radio"}
              name={"controls"}
              value={"enable"}
              onClick={handleKeyBoardControls}
              checked={isKeyboardControl === "enable"}
            />{" "}
            Enable
          </label>

          <label>
            <input
              type={"radio"}
              name={"controls"}
              value={"disabled"}
              onClick={handleKeyBoardControls}
              checked={isKeyboardControl === "disabled"}
            />{" "}
            Disable
          </label>
        </div>
      </div>
*/
