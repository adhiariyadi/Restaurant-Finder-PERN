import React from "react";
import Header from "../components/Header";
import AddRestaurant from "../components/AddRestaurant";
import Table from "../components/Table";

const Home = () => {
  return (
    <div>
      <Header title="Restaurant Finder" />
      <AddRestaurant />
      <Table />
    </div>
  );
};

export default Home;
