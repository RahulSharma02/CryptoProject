import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";

export default function Favourites() {
  const favouriteArray = JSON.parse(localStorage.getItem("favourite")).filter(
    (currency) => currency.fav
  );
  console.log("favarray", favouriteArray);
  return (
    <>
      <Row gutters={[32, 32]} className="crypto-card-container">
        {Array.isArray(favouriteArray) &&
          favouriteArray?.map((currency) => {
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
                      // onClick={() => {
                      //   addFavourite(currency?.uuid);
                      // }}
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
