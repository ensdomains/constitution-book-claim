import { ArrowRightSVG, tokens } from "@ensdomains/thorin";
import { renderToString } from "react-dom/server";
import styled from "styled-components";
import { LimitedEditionGradient } from "../assets/LimitedEditionGradient";

const editions = [
  {
    name: "Digital Edition",
    tags: ["Free"],
    linkTitle: "Download",
  },
  {
    name: "Unlimited Edition",
    tags: ["$59.99", "72 Sold"],
  },
];

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
`;

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
  color: rgba(51, 51, 51, 0.4);
`;

const EditionArrow = styled(ArrowRightSVG)`
  width: 18px;
  height: 18px;
  stroke-width: 4px;
  color: #000000;
  opacity: 0.4;
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

const LimitedEditionContainer = styled(Edition)`
  background: url("data:image/svg+xml;base64,${Buffer.from(
    renderToString(LimitedEditionGradient())
  ).toString("base64")}");
  background-size: cover;
  background-position: bottom;
  border: 2px solid #7a59da;
`;

const LimitedEditionName = styled(EditionName)`
  color: white;
`;

const LimitedEditionTag = styled(EditionTag)`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.75);
`;

const LimitedEditionLinkTitle = styled(EditionLinkTitle)`
  color: #dfd5f9;
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

const LimitedEdition = () => {
  return (
    <div>
      <LimitedEditionContainer as="a" href="#">
        <EditionDetails>
          <LimitedEditionName>Limited Edition</LimitedEditionName>
          <EditionTagContainer>
            <LimitedEditionTag>Auction</LimitedEditionTag>
            <LimitedEditionTag>0/25 Sold</LimitedEditionTag>
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
