import { Button, tokens, Typography } from "@ensdomains/thorin";
import { ethers } from "ethers";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { Box } from "../components/Box";
import { ButtonBox } from "../components/ButtonBox";
import { PurpleButton } from "../components/PurpleButton";

export const StepOne = ({ setStep }: { setStep: (step: number) => void }) => {
  const router = useRouter();
  const { data: accountData, isLoading: accountLoading } = useAccount();
  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    addressOrName: accountData?.address,
    token: "0xfFC8ca4e83416B7E0443ff430Cc245646434B647",
    enabled: !!accountData?.address,
  });
  const hasBalance = balanceData?.value.gte(ethers.utils.parseEther("1"));
  const [unclaimedBalance, setUnclaimedBalance] = useState(0);

  useEffect(() => {
    const run = async () =>
      await fetch(
        "https://ido-api-mainnet.gnosis.io/api/v1/get_user_orders_without_canceled_or_claimed/231/" +
          accountData?.address
      )
        .then((res) => res.json())
        .then((arr: string[]) => setUnclaimedBalance(arr.length))
        .catch(() => setUnclaimedBalance(0));
    if (accountData?.address) {
      try {
        run();
      } catch {}
    }
  }, [accountData?.address]);

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
          You have {balanceData?.formatted.replace(/(.+\...).*/g, "$1")} 📘,
          meaning you are eligible to redeem a book!
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
        {unclaimedBalance > 0 && (
          <Link
            href="https://gnosis-auction.eth.link/#/auction?auctionId=231&chainId=1%23topAnchor"
            passHref
          >
            <a>
              <Typography color="blue">
                You have {unclaimedBalance} unclaimed $📘, click here to claim
              </Typography>
            </a>
          </Link>
        )}
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
