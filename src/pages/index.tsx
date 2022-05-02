import { tokens, Typography } from "@ensdomains/thorin";
import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Logo from "../assets/Logo.svg";
import { EditionList } from "../components/EditionList";
import { ImageCarousell } from "../components/ImageCarousell";
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
  padding: ${tokens.space["4"]};
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
  padding: min(5%, 40px);
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
  const auction = {
    auctionId: 219,
    order: { price: 0.0000875, volume: 4000000 },
    exactOrder:
      "0x000000000000000000000012f939c99edab8000000034f086f3b33b684000000",
    symbolAuctioningToken: "ALLUO",
    symbolBiddingToken: "WETH",
    addressAuctioningToken: "0x1e5193ccc53f25638aa22a940af899b692e10b09",
    addressBiddingToken: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    decimalsAuctioningToken: "0x12",
    decimalsBiddingToken: "0x12",
    endTimeTimestamp: 1651701540,
    orderCancellationEndDate: 1651097700,
    startingTimestamp: 1651095773,
    minimumBiddingAmountPerOrder: "0x3e2c284391c000",
    minFundingThreshold: "0x1e5b8fa8fe2ac0000",
    allowListManager: "0x0000000000000000000000000000000000000000",
    allowListSigner: "0x0000000000000000000000000000000000000000",
    currentClearingPrice: 0.0000875,
    currentBiddingAmount: "0x2e685921ee2fdbe00",
    isAtomicClosureAllowed: false,
    isPrivateAuction: false,
    chainId: "0x1",
    interestScore: 53.5043316094,
    usdAmountTraded: 0,
  };

  return (
    <BasicWrapper>
      <Head>
        <title>Constitution Book - ENS DAO</title>
      </Head>
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
              The constitution, along with all 48,823 signers who provided an
              ENS name, is available as a free digital download, as well as a
              quality hardcover book, and a beautiful no-expense-spared limited
              edition of 50 slipcased copies.
            </Flavour>
          </Heading>
          <InnerContentFlex>
            <ImageCarousell />
            <EditionList auction={auction} />
          </InnerContentFlex>
        </Content>
      </BasicContainer>
    </BasicWrapper>
  );
};

export default Home;
