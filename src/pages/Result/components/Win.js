import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import styled from "styled-components";
import { motion } from "framer-motion";
import * as animationsVariants from "./animationsVariants";

export const Win = ({ coupon, prize, expirationDate }) => {
  return (
    <Container>
      <div>
        <Title
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationsVariants.title}
        >
          Has ganado{" "}
        </Title>
        <Result>{prize.name}</Result>
        <Voucher>{coupon}</Voucher>
        <ExpireAt>Valido hasta el {expirationDate}</ExpireAt>
      </div>
      <Illustration
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animationsVariants.illustration}
      >
        <Player
          autoplay={true}
          loop={true}
          controls={false}
          src="https://assets9.lottiefiles.com/packages/lf20_KyIVgm.json"
          style={{ height: "300px", width: "90%" }}
        ></Player>
      </Illustration>
    </Container>
  );
};

const Title = styled(motion.span)`
  font-size: 2em;
  display: block;
  margin-bottom: 1em;
  font-weight: bold;
  margin-top: 2em;
`;
const Result = styled.span`
  font-size: 50px;
  font-weight: bold;
  display: block;
  margin-bottom: 1.5em;
  font-weight: bold;
`;

const Container = styled(motion.div)`
  color: #48546c;
  background: white;
  width: 100vw;
  margin: 0;
  border-radius: 30px;
  height: 100vh;
  padding: 2em;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  max-width: 600px;
  margin: auto;
`;

const Illustration = styled(motion.span)`
  bottom: 0;
  left: 0;
  right: 0;
`;

const Voucher = styled.div`
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%23707070FF' stroke-width='2' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 25px;
  border-radius: 25px;
  margin-bottom: 1em;
  height: 50px;
  line-height: 50px;
  text-transform: uppercase;
`;

const ExpireAt = styled.p``;
