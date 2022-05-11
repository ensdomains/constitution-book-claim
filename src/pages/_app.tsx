import type { DefaultTheme } from "@ensdomains/thorin";
import { ThorinGlobalStyles } from "@ensdomains/thorin";
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { chain, createClient, WagmiProvider } from "wagmi";
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

mapbox-search-listbox > div > div[aria-hidden="true"] {
  max-width: 0;
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

const { provider, chains } = configureChains(
  [chain.mainnet],
  [
    apiProvider.infura("90f210707d3c450f847659dc9a3436ea"),
    apiProvider.jsonRpc(() => ({ rpcUrl: "https://cloudflare-eth.com" })),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "ENS Constitution Claim",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WagmiProvider client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <GlobalStyle />
          <ThorinGlobalStyles />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}

export default MyApp;
