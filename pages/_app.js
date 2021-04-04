import Head from "next/head"
import '../styles/globals.scss'
import Layout from "../components/Layout/Layout"
import { motion } from "framer-motion"
import Router from 'next/router';
// SEO
import { DefaultSeo } from "next-seo"
import SEO from "../next-seo.config"

import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, router, navigation }) {

  return (
    <>
      <DefaultSeo {...SEO} />
      <Layout>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        </Head>
        <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
          pageInitial: {
            opacity: 0
          },
          pageAnimate: {
            opacity: 1
          }
        }}>
          <Component {...pageProps} />
        </motion.div>
      </Layout>
    </>
  )
}

export default MyApp