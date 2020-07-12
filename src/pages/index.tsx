import { Generator } from "generator";
import React from "react";

import { Layout, Navbar } from "../components";
import { DTGContext } from "../components/Context";

function Index() {
  return (
    <DTGContext.Provider value={{}}>
      <Layout>
        <Navbar />
        <Generator />
      </Layout>
    </DTGContext.Provider>
  );
}

export default Index;
