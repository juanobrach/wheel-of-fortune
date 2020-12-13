import React from "react";
import styled from "styled-components";
import { ReactComponent as PointerShadowSVG } from "./../../img/pointer-bg.svg";
import { ReactComponent as PointerFront } from "./../../img/pointer-front.svg";

const Pointer = () => {
  return (
    <>
      <Container>
        <PointerShadow />
      </Container>
      <Container>
        <PointerFront />
      </Container>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  top: 11%;
  right: -1%;
  width: 10%;
  height: 16%;
  transform-origin: 50% 28.44%;
  transform: rotate(50deg) !important;
`;

const PointerShadow = styled(PointerShadowSVG)`
  top: 14%;
  right: -3%;
  opacity: 0.3;
`;

export default Pointer;
