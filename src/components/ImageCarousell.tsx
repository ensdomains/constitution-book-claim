import { tokens } from "@ensdomains/thorin";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import one from "../../public/img/one.png";
import two from "../../public/img/two.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: ${tokens.radii["2.5xLarge"]};
  background-color: ${tokens.colors.base.white};
  box-shadow: ${({ theme }) => tokens.boxShadows[theme.mode]["0.25"]};
  padding: ${tokens.space["4"]};
`;

const Preview = styled.div`
  padding: ${tokens.space["8"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${tokens.space["96"]};
`;

const ImageThumbnailContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: ${tokens.space["2"]};
  flex-gap: ${tokens.space["2"]};
  width: 100%;
`;

const ImageThumnail = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(51, 51, 51, 0.15);
  & > span {
    opacity: 0.25 !important;
  }
  ${({ $selected }) =>
    $selected &&
    `
    border: 1px solid rgba(51, 51, 51, 0.5); 
    & > span {
        opacity: 1 !important;
    }
`}
  border-radius: ${tokens.radii["extraLarge"]};
  width: ${tokens.space["12"]};
  height: ${tokens.space["16"]};
  padding: ${tokens.space["1"]};
`;

const images = [
  {
    src: one,
    alt: "Constitution Book front cover",
  },
  {
    src: two,
    alt: "Limited Edition Constitution Book",
  },
];

export const ImageCarousell = () => {
  const [selected, setSelected] = useState(0);

  return (
    <Container>
      <Preview>
        <Image alt={images[selected].alt} src={images[selected].src} />
      </Preview>
      <ImageThumbnailContainer>
        {images.map((image, index) => (
          <ImageThumnail
            $selected={selected === index}
            as="button"
            key={index}
            onClick={() => setSelected(index)}
          >
            <Image quality={25} alt={image.alt} src={image.src} />
          </ImageThumnail>
        ))}
      </ImageThumbnailContainer>
    </Container>
  );
};
