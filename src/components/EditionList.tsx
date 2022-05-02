import { ArrowRightSVG, tokens } from "@ensdomains/thorin";
import dynamic from "next/dynamic";
import { renderToString } from "react-dom/server";
import styled, { css, keyframes } from "styled-components";
import { TwinkleType } from "../assets/LimitedEditionGradient";

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
`;

const LimitedEditionTag = styled(EditionTag)`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.75);
`;

const LimitedEditionLinkTitle = styled(EditionLinkTitle)`
  color: #dfd5f9;
  opacity: 1;
`;

const LimitedEditionArrow = styled(EditionArrow)`
  color: #ffffff;
  opacity: 0.85;
`;

const LimitedEditionAuctionDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  font-weight: ${tokens.fontWeights.medium};
`;

const LimitedEditionBidTime = styled.p`
  color: #aea8bd;
`;

const LimitedEditionDescription = styled.p`
  color: #333333;
  font-weight: ${tokens.fontWeights.normal};
  font-style: italic;
  line-height: ${tokens.lineHeights["1.375"]};
  margin-top: ${tokens.space["2"]};
  padding: 0 ${tokens.space["2"]};
`;

const LimitedEditionContainer = dynamic<any>(
  () =>
    import("../assets/LimitedEditionGradient").then((mod) => {
      const LimitedEditionGradient = mod.LimitedEditionGradient;
      const generateTwinkle = (): TwinkleType => {
        const gradient = [];
        for (let i = 0; i < 17; i++) {
          gradient.push(Math.random());
        }
        return gradient as TwinkleType;
      };

      const generateTwinkleFrame = () => css`
        background: url("data:image/svg+xml;base64,${Buffer.from(
          renderToString(LimitedEditionGradient(generateTwinkle()))
        ).toString("base64")}");
        background-size: cover;
        background-position: bottom;
      `;

      const TwinkleKeyframes = keyframes`
    0% {
      ${generateTwinkleFrame()}
    }
    10% {
      ${generateTwinkleFrame()}
    }
    20% {
      ${generateTwinkleFrame()}
    }
    30% {
      ${generateTwinkleFrame()}
    }
    40% { 
      ${generateTwinkleFrame()}
    }
    50% {
      ${generateTwinkleFrame()}
    }
    60% {
      ${generateTwinkleFrame()}
    }
    70% {
      ${generateTwinkleFrame()}
    }
    80% {
      ${generateTwinkleFrame()}
    }
    90% {
      ${generateTwinkleFrame()}
    }
    100% {
      ${generateTwinkleFrame()}
    }
`;

      return styled(Edition)`
        animation: ${TwinkleKeyframes} 15s linear alternate infinite;
        background-color: none;
        background-size: cover;
        background-position: bottom;
        border: 2px solid #7a59da;
        transition: all 0.15s ease-in-out;

        &:hover {
          filter: brightness(1.2);

          ${LimitedEditionArrow}, ${LimitedEditionLinkTitle} {
            opacity: 1;
          }
        }
      `;
    }),
  {
    ssr: false,
  }
);

const LimitedEdition = () => {
  return (
    <div>
      <LimitedEditionContainer as="a" href="#">
        <EditionDetails>
          <LimitedEditionName>Limited Edition</LimitedEditionName>
          <EditionTagContainer>
            <LimitedEditionTag>Auction</LimitedEditionTag>
            <LimitedEditionTag>33.52ETH Each</LimitedEditionTag>
          </EditionTagContainer>
        </EditionDetails>
        <EditionAction>
          <LimitedEditionAuctionDetails>
            <LimitedEditionLinkTitle>Bid</LimitedEditionLinkTitle>
            <LimitedEditionBidTime>Ends in 9 days</LimitedEditionBidTime>
          </LimitedEditionAuctionDetails>
          <LimitedEditionArrow />
        </EditionAction>
      </LimitedEditionContainer>
      <LimitedEditionDescription>
        There are 25 copies available for auction, with the edition’s total
        production limited to 50.
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

export const EditionList = () => {
  return (
    <Wrapper>
      <EditionTemplate
        tags={["Free"]}
        name="Digital Edition"
        linkTitle="Download"
        link="https://ensdao.eth.link/constitution.pdf"
      />
      <EditionTemplate
        tags={["$59.99", "72 Sold"]}
        name="Unlimited Edition"
        linkTitle="Buy"
        link="#"
      />
      <LimitedEdition />
    </Wrapper>
  );
};
