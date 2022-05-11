import { tokens } from "@ensdomains/thorin";
import styled from "styled-components";

export const SelectWrapper = styled.div`
  & [role="listbox"] {
    max-height: ${tokens.space["48"]};
    overflow-y: auto;
    overflow-x: hidden;
    background-color: white;
    line-height: ${tokens.lineHeights["2"]};
    z-index: 20;
  }
`;
