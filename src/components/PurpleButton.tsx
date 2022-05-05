import { Button, tokens } from "@ensdomains/thorin";
import { ComponentProps } from "react";
import styled, { css, keyframes } from "styled-components";
import { TwinkleKeyframes } from "./TwinkleKeyframes";

const ScaleInOutKeyframes = keyframes`
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(0.95);
  }
`;

const PurpleButtonWrapper = styled.div<{ $gradient?: boolean }>`
  & > button {
    background: ${({ theme, $gradient }) =>
      $gradient
        ? css`
        linear-gradient(323.31deg, #de82ff -15.56%, #7f6aff 108.43%);
        animation: ${ScaleInOutKeyframes} 2.5s ease-in-out infinite;
        `
        : tokens.colors[theme.mode].purple + ";"};
  }
`;

const SparkleButtonWrapper = styled.div<{ $disabled?: boolean }>`
  ${({ $disabled }) =>
    !$disabled &&
    css`
      & > button {
        animation: ${TwinkleKeyframes} 15s linear alternate infinite;
        background-color: none;
        background-size: cover;
        background-position: bottom;
        outline: 2px solid #7a59da;
        outline-offset: -2px;
        transition: all 0.15s ease-in-out;
      }
    `}
`;

export const SparkleButton = (props: ComponentProps<typeof Button>) => (
  <SparkleButtonWrapper $disabled={props.disabled}>
    <Button {...props} />
  </SparkleButtonWrapper>
);

export const PurpleButton = (
  props: ComponentProps<typeof Button> & { gradient?: boolean }
) => (
  <PurpleButtonWrapper $gradient={props.gradient}>
    <Button {...{ ...props, gradient: undefined }} />
  </PurpleButtonWrapper>
);
