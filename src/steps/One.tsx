import { Button, tokens, Typography } from "@ensdomains/thorin";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useAccount, useBalance } from "wagmi";
import { Box } from "../components/Box";
import { ButtonBox } from "../components/ButtonBox";
import { PurpleButton } from "../components/PurpleButton";

export const StepOne = ({ setStep }: { setStep: (step: number) => void }) => {
  const router = useRouter();
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
        <Typography variant="extraLarge">
          Please connect your wallet before continuing
        </Typography>
      );
    }
    if (accountLoading || balanceLoading) {
      return <Typography variant="extraLarge">Loading...</Typography>;
    }
    if (hasBalance) {
      return (
        <Typography variant="extraLarge">
          You have {balanceData?.formatted.replace(/(?<=\.[0-9][0-9]).*/g, "")}{" "}
          📘, meaning you are eligible to redeem a book!
        </Typography>
      );
    }
    return (
      <Typography variant="extraLarge">
        You need at least 1 $📘 to redeem!
      </Typography>
    );
  };

  return (
    <>
      <Box>
        <div style={{ marginBottom: tokens.space["4"] }}>
          <Typography variant="extraLarge" weight="bold">
            Redemption Status
          </Typography>
          <Typography>Only eligible wallets can redeem</Typography>
        </div>
        <Main />
      </Box>
      <ButtonBox>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Back
        </Button>
        <PurpleButton
          variant="primary"
          disabled={
            !hasBalance ||
            !accountData ||
            accountLoading ||
            !balanceData ||
            balanceLoading
          }
          onClick={() => setStep(1)}
        >
          Next
        </PurpleButton>
      </ButtonBox>
    </>
  );
};
