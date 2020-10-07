/* /pages/_app.js */

import Layout from "../components/Layout";
import withData from "../lib/apollo";
import AppProvider from "../components/Context/AppProvider";
import App, { Container } from "next/app";
import React from "react";
// import Router from "next/router";

// import * as gtag from "../lib/gtag";
// // Notice how we track pageview when route is changed
// Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps, isAuthenticated, ctx } = this.props;
    return (
      <Container>
        <AppProvider>
          <Layout isAuthenticated={isAuthenticated} {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
        <style jsx global>
          {`
            a {
              color: white !important;
            }
            a:link {
              text-decoration: none !important;
              color: white !important;
            }
            a:hover {
              color: white;
            }
            .card {
              display: inline-block !important;
              background-color: white;
            }
            .card-columns {
              column-count: 3;
            }
          `}
        </style>
      </Container>
    );
  }
}
export default withData(MyApp);
