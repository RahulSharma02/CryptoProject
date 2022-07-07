import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Select } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

import Loader from "./Loader";
import { useGetCryptosQuery } from "../services/cryptoApi";

export default function Cryptocurrencies({ simplified }) {
  const { Option } = Select;
  const [favourite, setFavourite] = useState(true);
  const [favouriteList, setFavouriteList] = useState([]);

  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [searchTerm, setSearchTerm] = useState("");
  const [cryptos, setCryptos] = useState();

  const sortOptions = [
    { value: "name", name: "By name" },
    { value: "highPrice", name: "Price high to low" },
    { value: "lowPrice", name: "Price low to high" },
    { value: "change", name: "By change" },
  ];

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  const sortCurrency = (Attr) => {
    const List = cryptosList?.data?.coins;
    let sortedCrypto;
    if (Attr === "highPrice") {
      sortedCrypto = List.slice().sort((a, b) =>
        parseFloat(a?.price) > parseFloat(b?.price) ? -1 : 1
      );

      setCryptos(sortedCrypto);
    } else if (Attr === "lowPrice") {
      sortedCrypto = List.slice().sort((a, b) =>
        parseFloat(a?.price) > parseFloat(b?.price) ? 1 : -1
      );

      setCryptos(sortedCrypto);
    } else if (Attr === "name") {
      sortedCrypto = List.slice().sort((a, b) => a.name.localeCompare(b.name));

      setCryptos(sortedCrypto);
    } else if (Attr === "change") {
      sortedCrypto = List.slice().sort((a, b) =>
        parseFloat(a?.change) > parseFloat(b?.change) ? -1 : 1
      );

      setCryptos(sortedCrypto);
    }
  };
  const addFavourite = (id) => {
    setFavourite(!favourite);
    setFavouriteList([...favouriteList, id]);

    const favouriteArr = cryptos.map((currency) => {
      if (currency.uuid === id) {
        console.log("if is run");
        return { ...currency, fav: favourite };
      } else {
        console.log("if is run");

        return { ...currency };
      }
    });
    setCryptos(favouriteArr);
    const favs = JSON.stringify(favouriteArr);
    localStorage.setItem("favourite", favs);

    console.log("favourite id", id, favouriteArr);
  };

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <>
          <div className="crypto-container">
            <div className="sort-crypto">
              <Select
                placeholder="Sort currency"
                optionFilterProp="children"
                onChange={(value) => sortCurrency(value)}
              >
                {sortOptions.map((data, i) => (
                  <Option key={i} value={data.value}>
                    {data.name}
                  </Option>
                ))}
              </Select>{" "}
            </div>

            <div className="search-crypto">
              <Input
                placeholder="Search cryptocurrency"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
            </div>
          </div>
        </>
      )}
      <Row gutters={[32, 32]} className="crypto-card-container">
        {Array.isArray(cryptos) &&
          cryptos?.map((currency) => {
            return (
              <Col
                xs={24}
                sm={12}
                lg={6}
                className="crypto-card"
                key={currency?.uuid}
              >
                <Card
                  title={`${currency?.rank}. ${currency?.name}`}
                  extra={
                    <>
                      <Link to={`/crypto/${currency?.uuid}`}>
                        <img
                          className="crypto-image"
                          src={currency?.iconUrl}
                          alt="cuurencyIcon"
                        />
                      </Link>
                      <span
                        onClick={() => {
                          addFavourite(currency?.uuid);
                        }}
                      >
                        {" "}
                        {currency.fav ? <StarFilled /> : <StarOutlined />}
                      </span>
                    </>
                  }
                  hoverable
                >
                  <Link to={`/crypto/${currency?.uuid}`}>
                    <p>Price: {millify(currency?.price)}</p>
                    <p>Market Cap: {millify(currency?.marketCap)}</p>
                    <p>Daily Change: {millify(currency?.change)}</p>
                  </Link>
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
}
