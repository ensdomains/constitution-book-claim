import { EthTransparentInvertedSVG, tokens } from "@ensdomains/thorin";
import styled from "styled-components";
import mq from "../utils/mediaQuery";

export const StyledIconEthTransparentInverted = styled(
  EthTransparentInvertedSVG
)`
  color: white;
  display: block;
  margin-right: calc(${tokens.space["2"]} * -1);
  margin-left: calc(${tokens.space["2"]} * -1);
  height: ${tokens.space["4"]};
  width: ${tokens.space["4"]};
  ${mq.small.min`
    height: ${tokens.space["6"]};
    width: ${tokens.space["6"]};
  `}
`;
