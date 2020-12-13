import {
  useCallback,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { API, graphqlOperation } from "aws-amplify";

import { getRotationDegrees, randomOption } from "../../utils";
import {
  STARTED_SPINNING,
  START_SPINNING_TIME,
  CONTINUE_SPINNING_TIME,
  STOP_SPINNING_TIME,
} from "./constants";
import options from "../../options.json";

export const useSpin = (gameOver) => {
  const [startRotationDegrees, setStartRotationDegrees] = useState(0);
  const [finalRotationDegrees, setFinalRotationDegrees] = useState(0);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
  const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false);
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const mustStopSpinning = useRef(false);
  const slides = options.length;

  const random = (min, max) => {
    return Math.floor(Math.random() * Math.floor(max - min) - min);
  };
  const selectedRandom = useMemo(() => {
    return randomOption(options);
  }, randomOption);

  const startSpinning = useCallback(() => {
    setHasStartedSpinning(true);
    setHasStoppedSpinning(false);
    mustStopSpinning.current = true;
    setTimeout(() => {
      if (mustStopSpinning.current) {
        mustStopSpinning.current = false;
        setHasStartedSpinning(false);
        setHasStoppedSpinning(true);
        setMustStartSpinning(false);

        setTimeout(() => {
          API.get("apirest", "/coupon").then((response) => {
            console.log("call to api");
            setCoupon(response.coupon[0]);
            console.log(response);
          });
          gameOver();
        }, 2000);

        // PASS AS PROP
      }
    }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300);
  }, [mustStopSpinning]);

  useEffect(() => {
    if (mustStartSpinning && !isCurrentlySpinning) {
      setIsCurrentlySpinning(true);
      startSpinning();
      console.log("selectedRandom:", selectedRandom);
      console.log("options:", options);
      console.log("options.length:", options.length);
      console.log("options.length:", options[selectedRandom]);

      const finalRotationDegreesCalculated = getRotationDegrees(
        selectedRandom,
        options.length
      );
      console.log(
        "finalRotationDegreesCalculated:",
        finalRotationDegreesCalculated
      );
      setFinalRotationDegrees(finalRotationDegreesCalculated);
    }
  }, [mustStartSpinning]);

  useEffect(() => {
    if (hasStoppedSpinning) {
      setIsCurrentlySpinning(false);
      setStartRotationDegrees(finalRotationDegrees);
    }
  }, [hasStoppedSpinning]);

  const getRouletteClass = () => {
    if (hasStartedSpinning) {
      return STARTED_SPINNING;
    }
    return "";
  };

  return {
    startRotationDegrees,
    finalRotationDegrees,
    setMustStartSpinning,
    getRouletteClass,
    options,
    gameOver,
    selectedRandom,
    coupon,
  };
};

export const useSize = () => {
  const [size, setSize] = useState(500);

  const updateSize = () => {
    let aspectRatio = document.getElementById("wof-wheel-aspect");
    if (aspectRatio.width > 0) {
      setSize(aspectRatio.width);
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return {
    size,
    updateSize,
  };
};
