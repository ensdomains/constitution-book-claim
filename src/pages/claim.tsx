import { Profile, tokens } from "@ensdomains/thorin";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { PurpleButton } from "../components/PurpleButton";
import { StyledIconEthTransparentInverted } from "../components/StyledIconEthTransparentInverted";
import { Basic } from "../layouts/Basic";
import { StepFour } from "../steps/Four";
import { StepOne } from "../steps/One";
import { StepThree } from "../steps/Three";
import { StepTwo } from "../steps/Two";
import mq from "../utils/mediaQuery";

const Heading = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: ${tokens.space["2"]};
  flex-gap: ${tokens.space["2"]};
  width: 95%;
  max-width: ${tokens.space["256"]};

  ${mq.large.min`
    width: 100%;
    align-items: center;
  `}
`;

const Title = styled.h1`
  font-size: ${tokens.fontSizes.headingThree};
  font-weight: 830;
  background: linear-gradient(323.31deg, #de82ff -15.56%, #7f6aff 108.43%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-align: left;
  line-height: ${tokens.lineHeights["1.25"]};

  ${mq.medium.min`
    font-size: ${tokens.fontSizes.headingOne};
  `}
`;

const Step = styled(Title)`
  font-weight: ${tokens.fontWeights["bold"]};
`;

const FadedTitle = styled(Title)`
  font-weight: ${tokens.fontWeights["bold"]};
  opacity: 0.5;
`;

const InnerContentFlex = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};
  width: 95vw;
  max-width: 95%;

  ${mq.medium.min`
    margin-bottom: max(15vh, ${tokens.space["8"]});
    gap: ${tokens.space["8"]};
    flex-gap: ${tokens.space["8"]};
    max-width: ${tokens.space["256"]};
  `}
`;

const HeadingState = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${tokens.space["4"]};
  flex-gap: ${tokens.space["4"]};

  ${mq.medium.min`
    gap: ${tokens.space["8"]};
    flex-gap: ${tokens.space["8"]};
  `}
`;

const ProfileWrapper = styled.div`
  & [aria-label="profile-avatar"] {
    background: linear-gradient(323.31deg, #de82ff -15.56%, #7f6aff 108.43%);
  }
`;

export type Form = {
  email: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  countryName: string;
  postalCode: string;
};

const steps = [
  {
    component: StepOne,
    title: "Connect your wallet",
  },
  {
    component: StepTwo,
    title: "Generate an order ID",
  },
  {
    component: StepThree,
    title: "Confirm your details",
  },
  {
    component: StepFour,
    title: "Transaction details",
  },
];

const Home: NextPage = () => {
  const [_, disconnect] = useAccount();
  const [step, setStep] = useState(0);
  const [orderID, setOrderID] = useState<string | null>(null);
  const [selectedCopy, setSelectedCopy] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "us",
    countryName: "United States",
    postalCode: "",
  });

  const Component = steps[step].component;

  return (
    <Basic
      withWrap={false}
      headerChildren={
        <ConnectButton.Custom>
          {({
            account,
            openConnectModal,
            openAccountModal,
            accountModalOpen,
          }) =>
            !account ? (
              <PurpleButton
                gradient={true}
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
              </PurpleButton>
            ) : (
              <ProfileWrapper>
                <Profile
                  address={account.address}
                  avatar={account.ensAvatar}
                  ensName={account.ensName}
                  dropdownItems={[
                    {
                      label: "Disconnect",
                      color: "red",
                      onClick: () => disconnect(),
                    },
                  ]}
                />
              </ProfileWrapper>
            )
          }
        </ConnectButton.Custom>
      }
    >
      <Content>
        <Heading>
          <FadedTitle style={{ alignSelf: "flex-start" }}>
            Claim your book
          </FadedTitle>
          <HeadingState>
            <Title style={{ alignSelf: "flex-start" }}>
              {steps[step].title}
            </Title>
            <Step>
              {step + 1}/{steps.length}
            </Step>
          </HeadingState>
        </Heading>
        <InnerContentFlex>
          <Component
            {...{
              formData,
              setFormData,
              setOrderID,
              orderID,
              setStep,
              setSelectedCopy,
              selectedCopy,
            }}
          />
        </InnerContentFlex>
      </Content>
    </Basic>
  );
};

export default Home;
