import styled from "styled-components";

export const Rotor = styled.div`
  transform: rotate(${(props) => props.startRotationDegrees}deg);
  &.started-spinning {
    animation: spin ${({ startSpinningTime }) => startSpinningTime / 1000}s
        cubic-bezier(0.71, -0.29, 0.96, 0.9) 0s 1 normal forwards running,
      continueSpin 0.75s linear
        ${({ startSpinningTime }) => startSpinningTime / 1000}s 1 normal
        forwards running,
      stopSpin ${({ stopSpinningTime }) => stopSpinningTime / 1000}s
        cubic-bezier(0, 0, 0.35, 1.02)
        ${({ startSpinningTime, continueSpinningTime }) =>
          (startSpinningTime + continueSpinningTime) / 1000}s
        1 normal forwards running;

    -webkit-animation: spin
        ${({ startSpinningTime }) => startSpinningTime / 1000}s
        cubic-bezier(0.71, -0.29, 0.96, 0.9) 0s 1 normal forwards running,
      continueSpin 0.75s linear
        ${({ startSpinningTime }) => startSpinningTime / 1000}s 1 normal
        forwards running,
      stopSpin ${({ stopSpinningTime }) => stopSpinningTime / 1000}s
        cubic-bezier(0, 0, 0.35, 1.02)
        ${({ startSpinningTime, continueSpinningTime }) =>
          (startSpinningTime + continueSpinningTime) / 1000}s
        1 normal forwards running;
  }
  @keyframes spin {
    from {
      transform: rotate(${(props) => props.startRotationDegrees}deg);
      -webkit-transform: rotate(${(props) => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${(props) => props.startRotationDegrees + 360}deg);
      -webkit-transform: rotate(
        ${(props) => props.startRotationDegrees + 360}deg
      );
    }
  }
  @keyframes continueSpin {
    from {
      transform: rotate(${(props) => props.startRotationDegrees}deg);
      -webkit-transform: rotate(${(props) => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${(props) => props.startRotationDegrees + 360}deg);
      -webkit-transform: rotate(
        ${(props) => props.startRotationDegrees + 360}deg
      );
    }
  }
  @keyframes stopSpin {
    from {
      transform: rotate(${(props) => props.startRotationDegrees}deg);
      -webkit-transform: rotate(${(props) => props.startRotationDegrees}deg);
    }
    to {
      transform: rotate(${(props) => 1440 + props.finalRotationDegrees}deg);
      -webkit-transform: rotate(
        ${(props) => 1440 + props.finalRotationDegrees}deg
      );
    }

    @-webkit-keyframes spin {
      from {
        transform: rotate(${(props) => props.startRotationDegrees}deg);
        -webkit-transform: rotate(${(props) => props.startRotationDegrees}deg);
      }
      to {
        transform: rotate(${(props) => props.startRotationDegrees + 360}deg);
        -webkit-transform: rotate(
          ${(props) => props.startRotationDegrees + 360}deg
        );
      }
    }
    @-webkit-keyframes continueSpin {
      from {
        transform: rotate(${(props) => props.startRotationDegrees}deg);
        -webkit-transform: rotate(${(props) => props.startRotationDegrees}deg);
      }
      to {
        transform: rotate(${(props) => props.startRotationDegrees + 360}deg);
        -webkit-transform: rotate(
          ${(props) => props.startRotationDegrees + 360}deg
        );
      }
    }
    @-webkit-keyframes stopSpin {
      from {
        transform: rotate(${(props) => props.startRotationDegrees}deg);
        -webkit-transform: rotate(${(props) => props.startRotationDegrees}deg);
      }
      to {
        transform: rotate(${(props) => 1440 + props.finalRotationDegrees}deg);
        -webkit-transform: rotate(
          ${(props) => 1440 + props.finalRotationDegrees}deg
        );
      }
  }
`;
