import { Select, tokens } from "@ensdomains/thorin";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import one from "../../public/img/one.png";
import three from "../../public/img/three.png";
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

  & [role="listbox"] {
    background-color: white;
    z-index: 20;
  }
`;

const Preview = styled.div`
  padding: ${tokens.space["8"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${tokens.space["80"]};
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
  background-color: white;
  justify-content: center;
  border: 1px solid rgba(51, 51, 51, 0.15);
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  & > span {
    opacity: 0.25 !important;
    transition: all 0.15s ease-in-out;
  }
  ${({ $selected }) =>
    $selected &&
    `
    border: 1px solid rgba(51, 51, 51, 0.5); 
    & > span {
        opacity: 1 !important;
    }
`}
  &:hover {
    filter: brightness(0.95);
    & > span {
      opacity: 0.8 !important;
    }
  }

  border-radius: ${tokens.radii["extraLarge"]};
  width: ${tokens.space["12"]};
  height: ${tokens.space["16"]};
  padding: ${tokens.space["1"]};
`;

const images = [
  {
    src: one,
    alt: "Constitution Book front cover",
    type: "unlimited",
  },
  {
    src: two,
    alt: "Limited Edition Constitution Book",
    type: "limited",
  },
  {
    src: three,
    alt: "Digital Edition Cover",
    type: "digital",
  },
];

export const ImageCarousell = () => {
  const [edition, setEdition] = useState("limited");
  const [selected, setSelected] = useState(images[1]);

  useEffect(() => {
    setSelected(images.filter((x) => x.type === edition)[0]);
  }, [edition]);

  return (
    <Container>
      <Select
        label="Edition"
        hideLabel
        selected={useMemo(
          () => ({ value: "limited", label: "Limited Edition" }),
          []
        )}
        options={[
          { value: "digital", label: "Digital Edition" },
          { value: "unlimited", label: "Unlimited Edition" },
          { value: "limited", label: "Limited Edition" },
        ]}
        onChange={(e) => e && setEdition(e.value)}
      />
      <Preview>
        <Image alt={selected.alt} src={selected.src} />
      </Preview>
      <ImageThumbnailContainer>
        {images
          .filter((x) => x.type === edition)
          .map((image, index) => (
            <ImageThumnail
              $selected={selected.src === image.src}
              as="button"
              key={index}
              onClick={() => setSelected(image)}
            >
              <Image quality={25} alt={image.alt} src={image.src} />
            </ImageThumnail>
          ))}
      </ImageThumbnailContainer>
    </Container>
  );
};
