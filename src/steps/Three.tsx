import {
  Button,
  Input,
  Select,
  Textarea,
  tokens,
  Typography,
} from "@ensdomains/thorin";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useContract, useProvider } from "wagmi";
import abi from "../assets/abi.json";
import { Box } from "../components/Box";
import { ButtonBox } from "../components/ButtonBox";
import { SelectWrapper } from "../components/SelectWrapper";
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
    Array.from({ length: 50 }, () => true)
  );
  const [selectedCopy, setSelectedCopy] = useState<{
    value: string;
    label?: string;
  }>({
    value: "Loading Available Copies",
    label: "Loading Available Copies",
  });

  useEffect(() => {
    const run = async () => {
      const currentCopies = (await bookContract.purchasedCopies()) as BigNumber;
      const binary = currentCopies.toNumber().toString(2).padStart(50, "0");
      setAvailableCopies((copies) => {
        const ret = copies.map((_, i) =>
          binary[49 - i] === "1" ? false : true
        );
        const firstAvailable = ret.findIndex((x) => x);
        setSelectedCopy({
          value: firstAvailable.toString(),
          label: (firstAvailable + 1).toString(),
        });
        setParentSelectedCopy(firstAvailable.toString());
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
        <SelectWrapper>
          <Select
            label="Copy Number"
            description="The copy number you would like to redeem"
            selected={useMemo(() => selectedCopy, [selectedCopy])}
            options={availableCopies.map((available, i) => ({
              value: i.toString(),
              label: (i + 1).toString(),
              disabled: !available,
            }))}
            onChange={(e) => e && setSelectedCopy(e)}
          />
        </SelectWrapper>
      </StepThreeBox>
      <ButtonBox>
        <Button variant="secondary" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button
          variant="primary"
          disabled={selectedCopy.value === "Loading Available Copies"}
          onClick={() => {
            setParentSelectedCopy(selectedCopy.value);
            setStep(3);
          }}
        >
          Next
        </Button>
      </ButtonBox>
    </>
  );
};
