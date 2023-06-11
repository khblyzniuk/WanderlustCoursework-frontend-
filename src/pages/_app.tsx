import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import {ThemeProvider} from "@mui/material";
import theme from "@/helpers/theme";
import {CookiesProvider} from "react-cookie";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return <>
      <Head>
          <title>WanderlustUA</title>
      </Head>
      <ThemeProvider theme={theme}>
          <CookiesProvider>
              <Component {...pageProps} />
          </CookiesProvider>
      </ThemeProvider>
    </>
}
