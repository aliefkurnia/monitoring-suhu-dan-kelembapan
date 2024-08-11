import React, { useState, useEffect } from "react";
import { Col, Row, Card, CardTitle, CardGroup, CardFooter } from "reactstrap";
import tempico from "../assets/images/logos/temp.svg";
import humiico from "../assets/images/logos/kelembapan.svg";
import dateico from "../assets/images/logos/datetime.svg";
import GrafikChart from "../components/dashboard/GrafikChart";
import Loader from "../layouts/loader/Loader.js";

const CustomCards = () => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [latestData, setLatestData] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:8801/monitoring")
      .then((res) => res.json())
      .then((data) => {
        setMonitoringData(data);
        setLatestData(data[data.length - 1]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000); // Interval 5 detik

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen unmount
  }, []);

  if (!latestData) {
    return <Loader />;
  }

  const { suhu, kelembapan, tanggal } = latestData;

  const formattedDate = new Date(tanggal).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  // const formattedDate = new Date().toLocaleDateString("id-ID", {
  //   day: "2-digit",
  //   month: "short",
  //   year: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });
  return (
    <div>
      <Row>
        <Col>
          <CardGroup className="mb-3">
            <Card
              body
              style={{
                backgroundColor: "#03346E",
                color: "#fff",
                width: "50%",
                height: "10rem",
              }}
              className="mb-3"
              inverse
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <CardTitle style={{ fontSize: "50px" }} tag="h1">
                    {suhu}
                  </CardTitle>
                </div>
                <img
                  src={tempico}
                  alt="Tempico"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <CardFooter>Suhu Ruangan Burung Walet</CardFooter>
            </Card>
            <Card
              body
              style={{
                backgroundColor: "#6EACDA",
                color: "#fff",
                width: "50%",
                height: "10rem",
              }}
              className="mb-3"
              inverse
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <CardTitle style={{ fontSize: "50px" }} tag="h1">
                    {kelembapan}
                  </CardTitle>
                </div>
                <img
                  src={humiico}
                  alt="humiico"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <CardFooter>Kelembapan Ruangan Burung Walet</CardFooter>
            </Card>
          </CardGroup>
          <div>
            <Col sm="12" lg="12" xl="12" xxl="12">
              <GrafikChart monitoringData={monitoringData} />
            </Col>
          </div>
          <Card
            body
            style={{
              backgroundColor: "#E2E2B6",
              color: "#333",
              width: "100%",
              height: "10rem",
            }}
            className="mb-3"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <CardTitle style={{ fontSize: "50px" }} tag="h1">
                  {formattedDate}
                </CardTitle>
              </div>
              <img
                src={dateico}
                alt="dateico"
                style={{ width: "80px", height: "80px" }}
              />
            </div>
            <CardFooter>Last Update</CardFooter>
          </Card>
        </Col>
      </Row>
      <Row></Row>
    </div>
  );
};

export default CustomCards;
