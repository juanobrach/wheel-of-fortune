import {
  useCallback,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useContext,
} from "react";
import { getRotationDegrees, randomOption } from "../../utils";
import {
  STARTED_SPINNING,
  START_SPINNING_TIME,
  CONTINUE_SPINNING_TIME,
  STOP_SPINNING_TIME,
} from "./constants";
// import options from "../../options.json";

import { useBussiness } from '../../hooks';
import { AuthContext, GameContext } from "../../context";

export const useSpin = () => {
  const { bussinessId } = useContext(AuthContext);

  const { setPrize, setCoupon } = useContext(GameContext);
  const {handleGetPrizes, handleCreateCoupon} = useBussiness();
  const [startRotationDegrees, setStartRotationDegrees] = useState(0);
  const [finalRotationDegrees, setFinalRotationDegrees] = useState(0);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasStoppedSpinning, setHasStoppedSpinning] = useState(false);
  const [isCurrentlySpinning, setIsCurrentlySpinning] = useState(false);
  const [mustStartSpinning, setMustStartSpinning] = useState(false);
  const [gameIsOver, setGameIsOver] = useState(null);
  const mustStopSpinning = useRef(false);
  const [options, setOptions ] = useState([]);

  const selectedRandom = useMemo(() => {
    return randomOption(options);
  }, []);

  const generateCoupon = async () => {
    const response = await handleCreateCoupon();
    if(response){
      setCoupon(response)
    }
  };

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
        whenSpinEnd();
      }
    }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME - 300);
  }, [mustStopSpinning]);

  const whenSpinEnd = () => {
    setGameIsOver(true);
  };
  useEffect(()=>{
    getPrizes()
  },[])


  const getPrizes = async ()=>{
    const response = await handleGetPrizes(bussinessId);
    if (response.prizes) {
      setOptions(response.prizes);
    } 
  }

  useEffect(() => {
    if (mustStartSpinning && !isCurrentlySpinning && options.length > 0 ) {
      generateCoupon();
      setIsCurrentlySpinning(true);
      startSpinning();
      setPrize(options[selectedRandom]);
      const finalRotationDegreesCalculated = getRotationDegrees(
        selectedRandom,
        options.length
      );
      setFinalRotationDegrees(finalRotationDegreesCalculated);
    }
  }, [
    options,
    mustStartSpinning,
    isCurrentlySpinning,
    selectedRandom,
    finalRotationDegrees,
    setPrize,
    setFinalRotationDegrees,
    startSpinning,
    setIsCurrentlySpinning,
  ]);

  useEffect(() => {
    if (hasStoppedSpinning) {
      setIsCurrentlySpinning(false);
      setStartRotationDegrees(finalRotationDegrees);
    }
  }, [hasStoppedSpinning, finalRotationDegrees]);

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
    gameIsOver,
    selectedRandom,
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
