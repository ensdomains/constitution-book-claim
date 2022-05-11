import { tokens } from "@ensdomains/thorin";
import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${tokens.radii["2.5xLarge"]};
  background-color: white;
  padding: ${tokens.space["4"]};
  width: 100%;
  max-width: ${tokens.space["256"]};
  padding: ${tokens.space["8"]};
`;
