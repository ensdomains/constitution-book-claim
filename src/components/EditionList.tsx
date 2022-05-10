import { ArrowRightSVG, largerThan, tokens } from "@ensdomains/thorin";
import Link from "next/link";
import styled from "styled-components";
import { TwinkleKeyframes } from "./TwinkleKeyframes";

const uniswapLink =
  "https://app.uniswap.org/#/swap?chain=mainnet&inputCurrency=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&outputCurrency=0xfFC8ca4e83416B7E0443ff430Cc245646434B647&exactAmount=1&exactField=output";

const EditionName = styled.h4`
  font-size: ${tokens.fontSizes.extraLarge};
  font-weight: ${tokens.fontWeights.bold};
  color: #333333;
`;

const EditionAction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${tokens.space["2"]};
  flex-gap: ${tokens.space["2"]};
`;

const EditionDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${tokens.space["3"]};
  flex-gap: ${tokens.space["3"]};
`;

const EditionTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: ${tokens.space["2"]};
  flex-gap: ${tokens.space["2"]};
`;

const EditionTag = styled.span`
  padding: ${tokens.space["2"]};
  border-radius: ${tokens.radii["almostExtraLarge"]};
  background: rgba(131, 131, 131, 0.1);
  color: rgba(0, 0, 0, 0.5);
  font-weight: ${tokens.fontWeights.bold};
  font-size: ${tokens.fontSizes.label};
`;

const EditionLinkTitle = styled.p`
  font-size: ${tokens.fontSizes.large};
  font-weight: ${tokens.fontWeights.bold};
  color: rgb(51, 51, 51);
  opacity: 0.4;
  transition: opacity 0.15s ease-in-out;
`;

const EditionArrow = styled(ArrowRightSVG)`
  width: 18px;
  height: 18px;
  stroke-width: 4px;
  color: #000000;
  opacity: 0.4;

  transition: opacity 0.15s ease-in-out;
`;

const Edition = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${tokens.space["28"]};
  background: ${tokens.colors.base.white};
  padding: 0 ${tokens.space["4"]};
  border-radius: ${tokens.radii["2.5xLarge"]};
  box-shadow: ${({ theme }) => tokens.boxShadows[theme.mode]["0.25"]};
  border: 1px solid rgba(51, 51, 51, 0.15);

  transition: background 0.15s ease-in-out, transform 0.15s ease-in-out;

  &:hover {
    transform: translateY(-1px);
    background-color: #f5f5f5;

    ${EditionArrow}, ${EditionLinkTitle} {
      opacity: 0.7;
    }
  }
`;

const EditionTemplate = ({
  tags,
  name,
  linkTitle,
  link,
}: {
  tags: string[];
  name: string;
  linkTitle: string;
  link: string;
}) => (
  <Edition as="a" href={link}>
    <EditionDetails>
      <EditionName>{name}</EditionName>
      <EditionTagContainer>
        {tags.map((tag, index) => (
          <EditionTag key={index}>{tag}</EditionTag>
        ))}
      </EditionTagContainer>
    </EditionDetails>
    <EditionAction>
      <EditionLinkTitle>{linkTitle}</EditionLinkTitle>
      <EditionArrow />
    </EditionAction>
  </Edition>
);

const LimitedEditionName = styled(EditionName)`
  color: white;
  width: max-content;
`;

const LimitedEditionTag = styled(EditionTag)`
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.75);
`;

const LimitedEditionTagContainer = styled(EditionTagContainer)`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  ${largerThan.sm`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  `}
`;

const LimitedEditionDescription = styled.p`
  color: #333333;
  font-weight: ${tokens.fontWeights.normal};
  font-style: italic;
  line-height: ${tokens.lineHeights["1.375"]};
  margin-top: ${tokens.space["2"]};
  padding: 0 ${tokens.space["2"]};
`;

const LimitedEditionContainer = styled(Edition)`
  animation: ${TwinkleKeyframes} 15s linear alternate infinite;
  background-color: none;
  background-size: cover;
  background-position: bottom;
  border: none;

  &:hover {
    transform: none;
  }

  padding: ${tokens.space["4"]};
  height: auto;

  ${largerThan.sm`
    height: ${tokens.space["28"]};
    flex-direction: column;
    justify-content: space-between;
    padding: ${tokens.space["4"]};
  `}
`;

const LimitedEditionActions = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: ${tokens.space["2"]};
  flex-gap: ${tokens.space["2"]};
  ${largerThan.sm`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
  `}
`;

const LimitedEditionDetails = styled(EditionDetails)`
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  ${largerThan.sm`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: ${tokens.space["1"]};
  margin-bottom: ${tokens.space["2"]};
  `}
`;

const LimitedEditionButton = styled.a`
  display: block;
  text-align: center;
  width: 100%;
  border: 2px solid #7a59da;
  background: rgba(67, 48, 118, 0.85);
  color: white;
  font-size: ${tokens.fontSizes.small};
  font-weight: ${tokens.fontWeights.bold};
  padding: ${tokens.space["3"]};
  border-radius: ${tokens.radii["2xLarge"]};
  transition: all 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
    transform: translateY(-1px);
  }

  ${largerThan.sm`
  padding: ${tokens.space["1.5"]};
  `}
`;

const LimitedEdition = ({
  price,
  remaining,
}: {
  price: string;
  remaining: number;
}) => {
  return (
    <div>
      <LimitedEditionContainer as="div">
        <LimitedEditionDetails>
          <LimitedEditionName>Limited Edition</LimitedEditionName>
          <LimitedEditionTagContainer>
            <LimitedEditionTag>{remaining} Unclaimed</LimitedEditionTag>
            <LimitedEditionTag>
              {price.replace(/(.+\...).*/g, "$1")} ENS
            </LimitedEditionTag>
          </LimitedEditionTagContainer>
        </LimitedEditionDetails>
        <LimitedEditionActions>
          <Link passHref href="/redeem">
            <LimitedEditionButton>Redeem</LimitedEditionButton>
          </Link>
          <Link passHref href={uniswapLink}>
            <LimitedEditionButton>Buy</LimitedEditionButton>
          </Link>
        </LimitedEditionActions>
      </LimitedEditionContainer>
      <LimitedEditionDescription>
        25 numbered copies from a limited edition of 50 were available for
        auction. Books can now be redeemed by any wallet with more than 1 📘,
        tokens can also be purchased on Uniswap.
      </LimitedEditionDescription>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};
  width: 100%;
`;

export type Price = {
  data: {
    pool: {
      token0Price: string;
    };
  };
};

export const EditionList = ({
  price,
  remaining,
}: {
  price: Price;
  remaining: number;
}) => {
  return (
    <Wrapper>
      <EditionTemplate
        tags={["Free"]}
        name="Digital Edition"
        linkTitle="Download"
        link="https://ensdao.eth.link/constitution.pdf"
      />
      <EditionTemplate
        tags={["$114.39"]}
        name="Unlimited Edition"
        linkTitle="Buy"
        link="https://www.blurb.com/b/11110201"
      />
      <LimitedEdition
        price={price.data.pool.token0Price}
        remaining={remaining}
      />
    </Wrapper>
  );
};
