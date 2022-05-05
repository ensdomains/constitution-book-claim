import { Input as OriginalInput } from "@ensdomains/thorin";
import { ComponentProps } from "react";
import { css } from "styled-components";

export const InputStyles = css`
  border-radius: 12px !important;
`;

export const Input = (props: ComponentProps<typeof OriginalInput>) => (
  <OriginalInput {...props} parentStyles={InputStyles} />
);
