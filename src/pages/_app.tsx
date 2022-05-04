import type { DefaultTheme } from "@ensdomains/thorin";
import { ThorinGlobalStyles } from "@ensdomains/thorin";
import {
  Chain,
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { providers } from "ethers";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { chain, WagmiProvider } from "wagmi";
import "../styles.css";

const theme: DefaultTheme = {
  mode: "light",
};

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
}

*, ::before, ::after {
  font-family: Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

body {
  background: radial-gradient(50% 50% at 50% 50%, rgba(183, 120, 255, 0.062) 0%, rgba(183, 120, 255, 0) 100%), #F6F6F6;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
  font-feature-settings: "ss01" on, "ss03" on, "ss04" on;
  -moz-font-feature-settings: "ss01" on, "ss03" on, "ss04" on;
}

.modal {
  position: relative;
  z-index: 20;
}

.modal > div > div {
  padding: 0 24px;
}

.modal > div svg {
  min-width: 1.5rem;
}
`;

const infuraId = process.env.INFURA_ID;

const provider = ({ chainId }: { chainId?: number }) =>
  new providers.InfuraProvider(chainId, infuraId);

const chains: Chain[] = [
  { ...chain.mainnet, name: "Ethereum" },
  { ...chain.polygonMainnet, name: "Polygon" },
  { ...chain.optimism, name: "Optimism" },
  { ...chain.arbitrumOne, name: "Arbitrum" },
];

const wallets = getDefaultWallets({
  chains,
  infuraId,
  appName: "My RainbowKit App",
  jsonRpcUrl: ({ chainId }) =>
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0],
});

const connectors = connectorsForWallets(wallets);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RainbowKitProvider chains={chains}>
        <WagmiProvider autoConnect connectors={connectors} provider={provider}>
          <GlobalStyle />
          <ThorinGlobalStyles />
          <Component {...pageProps} />
        </WagmiProvider>
      </RainbowKitProvider>
    </ThemeProvider>
  );
}

export default MyApp;
