import React, { useState } from "react";
import Accounts from "../components/Social/Accounts";
import SearchBar from "../components/Social/SearchBar";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <section className="social">
        <div className="container">
          <SearchBar />
          <Accounts />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
