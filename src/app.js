import React from "react";
import { Routes, Link, Route } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Exchanges,
  Homepage,
  CryptoDetails,
  Cryptocurrencies,
  News,
  Favourite,
  Wallet
} from "./components";
import "./app.css";

export default function app() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/news" element={<News />} />
              <Route path="/favourite" element={<Favourite />} />
              <Route path="/wallet" element={<Wallet />} />

            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space />
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </div>
      </div>
    </div>
  );
}
