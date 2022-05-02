import { tokens, Typography } from "@ensdomains/thorin";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
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

  ${mq.medium.min`
    margin-bottom: max(15vh, ${tokens.space["8"]});
    gap: ${tokens.space["8"]};
    flex-gap: ${tokens.space["8"]};
    flex-direction: row;
    align-items: flex-start;
  `}
`;

const Home: NextPage = ({
  auction,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
              The constitution, along with all 48,823 signers who provided an ENS name,
              is available as a free digital download, as well as a quality hardcover
              book, and a beautiful no-expense-spared limited edition of 50 slipcased
              copies.
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const auctionRes = await fetch(
    "https://ido-api-mainnet.gnosis.io/api/v1/get_auction_with_details/219"
  );
  const auction = await auctionRes.json();

  return {
    props: {
      auction,
    },
  };
};

export default Home;
