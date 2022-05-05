import { tokens } from "@ensdomains/thorin";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import mq from "../utils/mediaQuery";

const StyledLogo = styled(Logo)<{ $enabled: boolean }>`
  width: 135px;
  height: 56px;
  ${({ $enabled }) =>
    $enabled &&
    `
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    filter: brightness(1.05);
    transform: translateY(-1px);
  }
  `}
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${mq.large.min`
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
  withWrap = true,
  headerChildren,
}: {
  title?: string;
  children: ReactNode;
  withWrap?: boolean;
  headerChildren?: ReactNode;
}) => {
  const router = useRouter();

  return (
    <BasicWrapper>
      <Head>
        <title>
          {title ? `${title} - ENS Constitution` : "ENS Constitution"}
        </title>
      </Head>
      <BasicContainer>
        <Header>
          <Link passHref href={router.asPath === "/" ? "" : "/"}>
            <StyledLogo $enabled={router.asPath !== "/"} />
          </Link>
          <div style={{ flexGrow: "1" }} />
          {headerChildren}
        </Header>
        {withWrap ? <Content>{children}</Content> : children}
      </BasicContainer>
    </BasicWrapper>
  );
};
