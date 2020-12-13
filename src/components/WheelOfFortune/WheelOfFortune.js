import React, { useLayoutEffect, useState } from "react";
import { ReactComponent as RotorTop } from "./../../img/front.svg";
import { ReactComponent as RotorBackground } from "./../../img/background.svg";
import Pointer from "./Pointer";
import { Rotor } from "./styles";
import { useSize } from "./hooks";
import "./Wof.scss";
import {
  START_SPINNING_TIME,
  CONTINUE_SPINNING_TIME,
  STOP_SPINNING_TIME,
} from "../../constants";

export const WheelOfFortune = ({
  options,
  className,
  startRotationDegrees,
  finalRotationDegrees,
}) => {
  const { size, updateSize } = useSize();

  return (
    <div
      style={{ width: `${size}px` }}
      className={`wof-container wof-animated`}
    >
      <div className="wof-wheel-outer">
        <div className={`wof-wheel ${size < 500 ? "small" : ""}`}>
          <img
            onLoad={() => updateSize()}
            alt="aspect radio"
            id="wof-wheel-aspect"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          />
          <div className="wheel-inner" style={{ width: `${size}px` }}>
            <div className="wheel-rotor-shadow">
              <div className="wheel-rotor-shadow-inner wof-animated">
                <RotorBackground />
              </div>
            </div>
            <Rotor
              className={`${className} wheel-rotor wof-animated`}
              startSpinningTime={START_SPINNING_TIME}
              continueSpinningTime={CONTINUE_SPINNING_TIME}
              stopSpinningTime={STOP_SPINNING_TIME}
              startRotationDegrees={startRotationDegrees}
              finalRotationDegrees={finalRotationDegrees}
            >
              <RotorTop />
              {options.map((option, index) => {
                let deg = (360 / options.length) * index;
                return (
                  <div
                    key={index}
                    className="wheel-label"
                    style={{
                      transform: `rotate(-${deg}deg) translate(0px, -50%)`,
                    }}
                  >
                    {option}
                  </div>
                );
              })}
            </Rotor>
            <Pointer />
          </div>
        </div>
      </div>
    </div>
  );
};
