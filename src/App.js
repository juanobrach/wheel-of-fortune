import React from "react";
import WheelOfFortune from "./components/WhelOfFortune/WheelOfFortune";
import { useSpin } from "./components/WhelOfFortune/hooks";
import "./styles.scss";

export default function App() {
  const {
    startRotationDegrees,
    finalRotationDegrees,
    getRouletteClass,
    setMustStartSpinning,
    options,
  } = useSpin();

  return (
    <div className="App">
      <div className="wof-form-container">
        <div>
          <WheelOfFortune
            className={getRouletteClass()}
            options={options}
            startRotationDegrees={startRotationDegrees}
            finalRotationDegrees={finalRotationDegrees}
          />
        </div>
        <div>
          <h1>Wheel of fortune</h1>
          <button onClick={() => setMustStartSpinning(true)}>
            Spin the wheel!
          </button>
        </div>
      </div>
    </div>
  );
}
