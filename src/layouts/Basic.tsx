import { tokens } from "@ensdomains/thorin";
import Head from "next/head";
import { ReactNode } from "react";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import mq from "../utils/mediaQuery";

const StyledLogo = styled(Logo)`
  width: 135px;
  height: 56px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${mq.medium.min`
    padding: ${tokens.space["4"]};
  `}
`;

const BasicWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BasicContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: min(10%, 40px) min(5%, 40px);
  flex-gap: ${tokens.space["8"]};
  gap: ${tokens.space["8"]};
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${tokens.space["8"]};
  flex-gap: ${tokens.space["8"]};
`;

export const Basic = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <BasicWrapper>
      <Head>
        <title>
          {title ? `${title} - ENS Constitution` : "ENS Constitution"}
        </title>
      </Head>
      <BasicContainer>
        <Header>
          <StyledLogo />
          <div style={{ flexGrow: "1" }} />
        </Header>
        <Content>{children}</Content>
      </BasicContainer>
    </BasicWrapper>
  );
};
