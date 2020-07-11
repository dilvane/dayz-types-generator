import { Generator } from "generator";
import React from "react";

import { Layout, Footer, Navbar } from "../components";
import { DTGContext } from "../components/Context";

function Index() {
  return (
    <DTGContext.Provider value={{}}>
      <Layout>
        <Navbar />
        <Generator />
        <Footer />
      </Layout>
    </DTGContext.Provider>
  );
}

export default Index;
