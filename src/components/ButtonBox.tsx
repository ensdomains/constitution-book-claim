import { tokens } from "@ensdomains/thorin";
import styled from "styled-components";

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${tokens.space["256"]};
`;
