import { tokens, Typography } from "@ensdomains/thorin";
import type { NextPage } from "next";
import styled from "styled-components";
import { EditionList } from "../components/EditionList";
import { ImageCarousell } from "../components/ImageCarousell";
import { Basic } from "../layouts/Basic";
import mq from "../utils/mediaQuery";

const Heading = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};
  max-width: ${tokens.space["168"]};

  ${mq.large.min`
    align-items: center;
  `}
`;

const Title = styled.h1`
  font-size: ${tokens.fontSizes.headingOne};
  font-weight: 830;
  background: linear-gradient(323.31deg, #de82ff -15.56%, #7f6aff 108.43%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-align: left;
  line-height: ${tokens.lineHeights["1.25"]};

  ${mq.large.min`
    text-align: center;
  `}
`;

const Subtitle = styled.h3`
  color: #333333;
  font-weight: 700;
  font-size: ${tokens.fontSizes.extraLarge};
  line-height: ${tokens.lineHeights["1.375"]};
  text-align: left;
  margin-bottom: ${tokens.space["4"]};

  ${mq.large.min`
    text-align: center;
  `}
`;

const Flavour = styled(Typography)`
  font-weight: ${tokens.fontWeights["medium"]};
  line-height: ${tokens.lineHeights["1.375"]};
  font-size: ${tokens.fontSizes["small"]};
  color: #333333;
  opacity: 0.75;
  text-align: left;

  ${mq.large.min`
    text-align: center;
  `}
`;

const InnerContentFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};
  max-width: ${tokens.space["256"]};

  ${mq.medium.min`
    margin-bottom: max(15vh, ${tokens.space["8"]});
    gap: ${tokens.space["8"]};
    flex-gap: ${tokens.space["8"]};
    flex-direction: row;
    align-items: flex-start;
  `}
`;

const Home: NextPage = () => {
  return (
    <Basic>
      <Heading>
        <Title>The ENS Constitution</Title>
        <Subtitle>
          A set of binding rules that determine what governance actions are
          legitimate for the DAO to take.
        </Subtitle>
        <Flavour>
          The constitution, along with all 48,823 signers who provided an ENS
          name, is available as a free digital download, as well as a quality
          hardcover book, and a beautiful no-expense-spared limited edition of
          50 slipcased copies.
        </Flavour>
      </Heading>
      <InnerContentFlex>
        <ImageCarousell />
        <EditionList />
      </InnerContentFlex>
    </Basic>
  );
};

export default Home;
