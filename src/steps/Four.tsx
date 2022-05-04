import { Button, Input, Spinner, tokens, Typography } from "@ensdomains/thorin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContractWrite, useSigner, useWaitForTransaction } from "wagmi";
import abi from "../assets/abi.json";
import OutlinkSVG from "../assets/Outlink.svg";
import { Box } from "../components/Box";
import { ButtonBox } from "../components/ButtonBox";
import mq from "../utils/mediaQuery";

const StepFourBox = styled(Box)`
  & input,
  & textarea {
    color: ${({ theme }) => tokens.colors[theme.mode].textSecondary};
  }

  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};
`;

const EtherscanLink = styled.a`
  color: ${({ theme }) => tokens.colors[theme.mode].blue};
  font-weight: ${tokens.fontWeights.bold};
  transition: all 0.15s ease-in-out;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
`;

const Outlink = styled(OutlinkSVG)`
  width: ${tokens.space["3"]};
  height: ${tokens.space["3"]};
  margin-bottom: ${tokens.space["1"]};
  opacity: 0.5;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};

  ${mq.medium.min`
    flex-direction: row;
  `}
`;

const PendingTransaction = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.space["2"]};
  flex-gap: ${tokens.space["2"]};
  align-items: flex-start;
  justify-content: center;
  margin-bottom: ${tokens.space["4"]};

  & > div {
    line-height: ${tokens.lineHeights["1.5"]};
  }
`;

const PendingTransactionInner = styled(PendingTransaction)`
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};
  align-items: center;
  flex-direction: row;
  margin-bottom: 0;
`;

const TwitterButton = styled.a`
  background-color: #dfecff;
  color: ${({ theme }) => tokens.colors[theme.mode].blue};
  font-weight: ${tokens.fontWeights.bold};
  border-radius: ${tokens.radii["extraLarge"]};
  padding: ${tokens.space["3.5"]} ${tokens.space["4"]};
  box-shadow: ${({ theme }) => tokens.boxShadows[theme.mode]["0.02"]};
  font-size: ${tokens.fontSizes["large"]};
  line-height: ${tokens.lineHeights["1.25"]};
  transition: all 0.15s ease-in-out;

  &:hover {
    filter: brightness(1.0075);
    transform: translateY(-1px);
  }
`;

const twitterIntent =
  "I%20claimed%20a%20limited%20edition%20ENS%20DAO%20Constitution%21";

export const StepFour = ({
  setStep,
  orderID,
  selectedCopy,
}: {
  setStep: (step: number) => void;
  orderID: string | null;
  selectedCopy: string | null;
}) => {
  const router = useRouter();
  const [{ data: signer }] = useSigner();
  const [otherError, setOtherError] = useState("");
  const [contractWrite, write] = useContractWrite(
    {
      addressOrName: "0xfFC8ca4e83416B7E0443ff430Cc245646434B647",
      contractInterface: abi,
      signerOrProvider: signer,
    },
    "redeem",
    {
      args: ["0x" + orderID, selectedCopy],
    }
  );
  const [transaction] = useWaitForTransaction({
    hash: contractWrite.data?.hash,
  });

  const tryTransaction = async () =>
    write().catch((err) => setOtherError(err.message));

  useEffect(() => {
    if (!contractWrite.data && !contractWrite.loading) {
      tryTransaction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TransactionState = () => {
    if (transaction.data) {
      return (
        <PendingTransaction>
          <PendingTransactionInner>
            <Typography variant="extraLarge" weight="bold">
              Your transaction was successful!
            </Typography>
          </PendingTransactionInner>
          {contractWrite.data?.hash && (
            <EtherscanLink
              href={"https://etherscan.io/tx/" + contractWrite.data.hash}
            >
              View on Etherscan
              <Outlink />
            </EtherscanLink>
          )}
          <div style={{ marginTop: tokens.space["2"] }} />
          <Typography variant="large">
            Your limited edition constitution book was claimed, and will be sent
            to you shortly!
          </Typography>
        </PendingTransaction>
      );
    }

    if (contractWrite.data) {
      return (
        <PendingTransaction>
          <PendingTransactionInner>
            <Typography variant="extraLarge" weight="bold">
              Your transaction is pending
            </Typography>
            <Spinner />
          </PendingTransactionInner>
          {contractWrite.data?.hash && (
            <EtherscanLink
              href={"https://etherscan.io/tx/" + contractWrite.data.hash}
            >
              View on Etherscan
              <Outlink />
            </EtherscanLink>
          )}
        </PendingTransaction>
      );
    }

    return (
      <Typography variant="extraLarge" weight="bold">
        Please approve the transaction in your wallet
      </Typography>
    );
  };

  return (
    <>
      <StepFourBox>
        {(transaction.error || contractWrite.error || otherError !== "") && (
          <Typography color="red" variant="large" weight="bold">
            Error:{" "}
            {transaction.error?.message ||
              contractWrite.error?.message ||
              otherError}
          </Typography>
        )}
        <TransactionState />
        <FormGroup>
          <Input label="Order ID" value={orderID || "None"} readOnly />
          <Input
            label="Copy Number"
            value={parseInt(selectedCopy!) + 1 || "None"}
            readOnly
          />
        </FormGroup>
      </StepFourBox>
      <ButtonBox>
        {transaction.data ? (
          <TwitterButton
            href={`https://twitter.com/intent/tweet?text=${twitterIntent}`}
            target="_blank"
          >
            Share to Twitter
          </TwitterButton>
        ) : (
          <Button variant="secondary" onClick={() => setStep(2)}>
            Back
          </Button>
        )}
        {transaction.data ? (
          <Button variant="primary" onClick={() => router.push("/")}>
            Home
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={!!contractWrite.data || contractWrite.loading}
            onClick={() => tryTransaction()}
          >
            Retry
          </Button>
        )}
      </ButtonBox>
    </>
  );
};
