import { tokens, Typography } from "@ensdomains/thorin";
import type { NextPage } from "next";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import { EditionList } from "../components/EditionList";
import { ImageCarousell } from "../components/ImageCarousell";

const StyledLogo = styled(Logo)`
  width: 135px;
  height: 56px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${tokens.space["4"]};
  min-height: ${tokens.space["32"]};
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
  padding: 5%;
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

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};
  max-width: ${tokens.space["168"]};
`;

const Title = styled.h1`
  font-size: ${tokens.fontSizes.headingOne};
  font-weight: 830;
  background: linear-gradient(323.31deg, #de82ff -15.56%, #7f6aff 108.43%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-align: center;
  line-height: ${tokens.lineHeights["1.25"]};
`;

const Subtitle = styled.h3`
  color: #333333;
  font-weight: 700;
  font-size: ${tokens.fontSizes.extraLarge};
  line-height ${tokens.lineHeights["1.375"]};
  text-align: center;
  margin-bottom: ${tokens.space["4"]};
`;

const Flavour = styled(Typography)`
  font-weight: ${tokens.fontWeights["medium"]};
  line-height: ${tokens.lineHeights["1.375"]};
  font-size: ${tokens.fontSizes["small"]};
  color: #333333;
  opacity: 0.75;
  text-align: center;
`;

const Home: NextPage = () => {
  return (
    <BasicWrapper>
      <BasicContainer>
        <Header>
          <StyledLogo />
          <div style={{ flexGrow: "1" }} />
        </Header>
        <Content>
          <Heading>
            <Title>The ENS Constitution</Title>
            <Subtitle>
              A set of binding rules that determine what governance actions are
              legitimate for the DAO to take.
            </Subtitle>
            <Flavour>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dignissim enim mauris, quis viverra lacus feugiat in. Morbi et
              nibh lorem. Morbi lorem massa, ullamcorper dictum sagittis sit
              amet, dapibus vitae orci.
            </Flavour>
          </Heading>
          <ImageCarousell />
          <EditionList />
        </Content>
      </BasicContainer>
    </BasicWrapper>
  );
};

export default Home;
