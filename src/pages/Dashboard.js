import React from "react";
import Accounts from "../components/Social/Accounts";
import SearchBar from "../components/Social/SearchBar";
import Header from "../components/Header";
import SearchKeyProvider from "../Context/SearchKeyProvider";

const Dashboard = () => {
  return (
    <>
      <Header />
      <section className="social">
        <div className="container">
          <SearchKeyProvider>
            <SearchBar />
            <Accounts />
          </SearchKeyProvider>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
