import {
  Button,
  EthTransparentInvertedSVG,
  tokens,
  Typography,
} from "@ensdomains/thorin";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import styled from "styled-components";
import { useAccount, useBalance } from "wagmi";
import { Box } from "../components/Box";
import { ButtonBox } from "../components/ButtonBox";
import mq from "../utils/mediaQuery";

const StyledIconEthTransparentInverted = styled(EthTransparentInvertedSVG)`
  color: white;
  display: block;
  margin-right: calc(${tokens.space["2"]} * -1);
  margin-left: calc(${tokens.space["2"]} * -1);
  height: ${tokens.space["4"]};
  width: ${tokens.space["4"]};
  ${mq.small.min`
    height: ${tokens.space["6"]};
    width: ${tokens.space["6"]};
  `}
`;

export const StepOne = ({ setStep }: { setStep: (step: number) => void }) => {
  const [{ data: accountData, loading: accountLoading }] = useAccount();
  const [{ data: balanceData, loading: balanceLoading }] = useBalance({
    addressOrName: accountData?.address,
    token: "0xfFC8ca4e83416B7E0443ff430Cc245646434B647",
    skip: !accountData?.address,
  });
  const hasBalance = balanceData?.value.gt(ethers.utils.parseEther("1"));

  const Main = () => {
    if (!accountData?.address && !accountLoading) {
      return (
        <Typography>Please connect your wallet before continuing</Typography>
      );
    }
    if (accountLoading || balanceLoading) {
      return <Typography variant="extraLarge">Loading...</Typography>;
    }
    if (hasBalance) {
      return (
        <Typography variant="extraLarge">
          You have {balanceData?.formatted} $📘, meaning you are eligible to
          claim a book!
        </Typography>
      );
    }
    return (
      <Typography variant="extraLarge">
        You need at least 1 $📘 to claim!
      </Typography>
    );
  };

  return (
    <>
      <Box>
        <div style={{ marginBottom: tokens.space["4"] }}>
          <Typography variant="extraLarge" weight="bold">
            Claim Status
          </Typography>
          <Typography>Only eligible wallets can claim</Typography>
        </div>
        <Main />
      </Box>
      <ButtonBox>
        <Button variant="secondary">Back</Button>
        <ConnectButton.Custom>
          {({ account, openConnectModal }) =>
            !account ? (
              <Button
                onClick={() => openConnectModal()}
                prefix={
                  <StyledIconEthTransparentInverted
                    size={{ xs: "4", sm: "6" }}
                  />
                }
                variant="action"
                size="medium"
              >
                Connect
              </Button>
            ) : (
              <Button
                variant="primary"
                disabled={!hasBalance}
                onClick={() => setStep(1)}
              >
                Next
              </Button>
            )
          }
        </ConnectButton.Custom>
      </ButtonBox>
    </>
  );
};
