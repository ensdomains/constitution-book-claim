import {
  Button,
  Input,
  Textarea,
  tokens,
  Typography,
} from "@ensdomains/thorin";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContract, useProvider } from "wagmi";
import abi from "../assets/abi.json";
import { Box } from "../components/Box";
import { ButtonBox } from "../components/ButtonBox";
import { Form } from "../pages/claim";

const StepThreeBox = styled(Box)`
  & input,
  & textarea {
    color: ${({ theme }) => tokens.colors[theme.mode].textSecondary};
  }

  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};
`;

const TextareaWrapper = styled.div`
  & textarea {
    border-color: transparent;
    border-width: ${tokens.borderWidths["0.75"]};
    background: rgb(246, 246, 248);
  }
  & textarea:focus,
  & textarea:focus-visible {
    border-color: rgba(82, 152, 255, 0.15) !important;
    outline: none;
  }
`;

const CopyNumWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${tokens.space["11"]}, 1fr));
  gap: ${tokens.space["2"]};
`;

const CopyNumButton = styled.button<{ $pressed?: boolean }>`
  background-color: ${({ theme }) =>
    tokens.colors[theme.mode].foregroundTertiary};
  border-radius: ${tokens.radii["extraLarge"]};
  border: none;
  outline: none;
  cursor: pointer;
  height: ${tokens.space["11"]};
  width: ${tokens.space["11"]};
  font-weight: ${tokens.fontWeights["bold"]};
  color: #333333;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
    box-shadow: none;
  }

  ${({ $pressed }) =>
    $pressed &&
    `
    background-color: rgba(0,0,0,0.1);
    transform: translateY(-2px) !important;
    `}
`;

const CopyLabelContainer = styled.div`
  padding: 0 ${tokens.space["4"]};
`;

const CopyNumLabel = styled(Typography)`
  font-size: ${tokens.fontSizes["root"]};
  color: rgba(0, 0, 0, 0.4);
`;

export const StepThree = ({
  formData,
  orderID,
  setStep,
  setSelectedCopy: setParentSelectedCopy,
}: {
  formData: Form;
  orderID: string | null;
  setStep: (step: number) => void;
  setSelectedCopy: (copy: string) => void;
}) => {
  const provider = useProvider();
  const bookContract = useContract({
    addressOrName: "0xfFC8ca4e83416B7E0443ff430Cc245646434B647",
    contractInterface: abi,
    signerOrProvider: provider,
  });

  const [availableCopies, setAvailableCopies] = useState(
    Array.from({ length: 50 }, () => false)
  );
  const [selectedCopy, setSelectedCopy] = useState<number | null>(null);

  useEffect(() => {
    const run = async () => {
      const currentCopies = (await bookContract.purchasedCopies()) as BigNumber;
      const binary = currentCopies.toNumber().toString(2).padStart(50, "0");
      setAvailableCopies((copies) => {
        const ret = copies.map((_, i) =>
          binary[49 - i] === "1" ? false : true
        );
        return ret;
      });
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StepThreeBox>
        <div
          style={{
            marginBottom: tokens.space["4"],
          }}
        >
          <Typography variant="extraLarge" weight="bold">
            Please make sure your details are correct!
          </Typography>
          <Typography>
            The on-chain transaction only includes your order ID and copy
            number, but your order ID is directly linked to these details. If
            any details are incorrect you may not be able to redeem the book.
          </Typography>
        </div>
        <TextareaWrapper>
          <Textarea
            rows={4}
            label="Mailing Address"
            readOnly
            value={`${formData.name}
${formData.addressLine1}${
              formData.addressLine2 !== "" ? `, ${formData.addressLine2}` : ""
            }
${formData.city}, ${formData.state} ${formData.postalCode}
${formData.countryName}`}
          />
        </TextareaWrapper>
        <Input label="Email" value={formData.email} readOnly />
        <Input label="Order ID" value={orderID || "None"} readOnly />
        <CopyLabelContainer>
          <CopyNumLabel variant="labelHeading">Copy Number</CopyNumLabel>
          <p>The copy number you would like to redeem</p>
        </CopyLabelContainer>
        <CopyNumWrapper>
          {availableCopies.map((available, i) => (
            <CopyNumButton
              $pressed={selectedCopy === i}
              onClick={() => setSelectedCopy(i)}
              disabled={!available}
              key={i}
            >
              {i + 1}
            </CopyNumButton>
          ))}
        </CopyNumWrapper>
      </StepThreeBox>
      <ButtonBox>
        <Button variant="secondary" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button
          variant="primary"
          disabled={typeof selectedCopy !== "number"}
          onClick={() => {
            selectedCopy && setParentSelectedCopy(selectedCopy.toString());
            setStep(3);
          }}
        >
          Next
        </Button>
      </ButtonBox>
    </>
  );
};
