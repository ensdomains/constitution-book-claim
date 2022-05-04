import { Modal, Select, tokens } from "@ensdomains/thorin";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { DE, LE, UE } from "../assets/imgImports";
import mq from "../utils/mediaQuery";

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
  justify-content: center;
  gap: ${tokens.space["2"]};
  flex-gap: ${tokens.space["2"]};
  width: 100%;
  flex-wrap: wrap;

  ${mq.medium.min`
    justify-content: flex-start;
  `}
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

const mapFn =
  (type: "digital" | "unlimited" | "limited") =>
  (item: [StaticImageData, string]) => ({
    src: item[0],
    alt: item[1],
    type,
  });

const images = [
  ...DE.map(mapFn("digital")),
  ...LE.map(mapFn("limited")),
  ...UE.map(mapFn("unlimited")),
];

export const ImageCarousell = () => {
  const [edition, setEdition] = useState("limited");
  const [selected, setSelected] = useState(images[1]);
  const [modalOpen, setModalOpen] = useState(false);

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
      <Preview onClick={() => setModalOpen(true)}>
        <Image alt={selected.alt} src={selected.src} />
      </Preview>
      <Modal open={modalOpen} onDismiss={() => setModalOpen(false)}>
        <Image width={768} height={768} alt={selected.alt} src={selected.src} />
      </Modal>
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
