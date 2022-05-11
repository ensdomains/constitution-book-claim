import { renderToString } from "react-dom/server";
import { css, keyframes } from "styled-components";
import {
  LimitedEditionGradient,
  TwinkleType,
} from "../assets/LimitedEditionGradient";

const generateTwinkle = (): TwinkleType => {
  const gradient = [];
  for (let i = 0; i < 17; i++) {
    gradient.push(Math.random());
  }
  return gradient as TwinkleType;
};

const generateTwinkleFrame = () => css`
  background: url("data:image/svg+xml;base64,${Buffer.from(
    renderToString(LimitedEditionGradient(generateTwinkle()))
  ).toString("base64")}");
  background-size: cover;
  background-position: bottom;
`;

export const TwinkleKeyframes = keyframes`
  0% {
  ${generateTwinkleFrame()}
  }
  10% {
  ${generateTwinkleFrame()}
  }
  20% {
  ${generateTwinkleFrame()}
  }
  30% {
  ${generateTwinkleFrame()}
  }
  40% { 
  ${generateTwinkleFrame()}
  }
  50% {
  ${generateTwinkleFrame()}
  }
  60% {
  ${generateTwinkleFrame()}
  }
  70% {
  ${generateTwinkleFrame()}
  }
  80% {
  ${generateTwinkleFrame()}
  }
  90% {
  ${generateTwinkleFrame()}
  }
  100% {
  ${generateTwinkleFrame()}
  }
  `;
