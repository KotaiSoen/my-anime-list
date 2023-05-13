import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Montserrat } from 'next/font/google'
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"]
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>

  )

}
