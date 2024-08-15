import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  CardTitle,
  CardGroup,
  CardFooter,
  Button,
} from "reactstrap";
import tempico from "../assets/images/logos/temp.svg";
import humiico from "../assets/images/logos/kelembapan.svg";
import dateico from "../assets/images/logos/datetime.svg";
import GrafikChart from "../components/dashboard/GrafikChart";
import Loader from "../layouts/loader/Loader.js";

const CustomCards = () => {
  const [monitoringData, setMonitoringData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [motorKipas, setMotorKipas] = useState(false);
  const [motorHumidifier, setMotorHumidifier] = useState(false);

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
    const intervalId = setInterval(fetchData, 1000); // Interval 1 detik

    return () => clearInterval(intervalId); // Bersihkan interval saat komponen unmount
  }, []);

  useEffect(() => {
    if (latestData) {
      setMotorKipas(!!latestData.motor_kipas);
      setMotorHumidifier(!!latestData.motor_humidifier);
    }
  }, [latestData]);

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

  const handleToggleMotorKipas = () => {
    setMotorKipas((prevState) => !prevState);
    // Add logic to handle the toggle action, e.g., send a request to the server
  };

  const handleToggleMotorHumidifier = () => {
    setMotorHumidifier((prevState) => !prevState);
    // Add logic to handle the toggle action, e.g., send a request to the server
  };

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
              backgroundColor: "#ededd7",
              color: "#333",
              width: "100%",
              height: "10rem",
            }}
            className="mb-3"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <CardTitle style={{ fontSize: "35px" }} tag="h1">
                  <img
                    src={dateico}
                    alt="dateico"
                    style={{ width: "80px", height: "80px" }}
                  />
                  {formattedDate}
                </CardTitle>
              </div>
              <div className="d-flex align-items-center">
                <div className="ml-3">
                  <Button
                    style={{
                      backgroundColor: motorKipas ? "#28a745" : "#dc3545", // Warna background untuk "success" dan "danger"
                      borderColor: motorKipas ? "#28a745" : "#dc3545", // Warna border untuk "success" dan "danger"
                      color: "#fff", // Warna teks
                      cursor: "not-allowed", // Cursor yang menandakan tombol tidak dapat diklik
                      opacity: 1, // Jaga agar tombol tidak transparan saat dinonaktifkan
                      marginRight: "10px", // Jarak antar tombol, atur sesuai kebutuhan
                    }}
                    onClick={handleToggleMotorKipas}
                    disabled={true} // Menonaktifkan tombol
                  >
                    Motor Kipas {motorKipas ? "ON" : "OFF"}
                  </Button>
                  <Button
                    style={{
                      backgroundColor: motorHumidifier ? "#28a745" : "#dc3545", // Warna background untuk "success" dan "danger"
                      borderColor: motorHumidifier ? "#28a745" : "#dc3545", // Warna border untuk "success" dan "danger"
                      color: "#fff", // Warna teks
                      cursor: "not-allowed", // Cursor yang menandakan tombol tidak dapat diklik
                      opacity: 1, // Jaga agar tombol tidak transparan saat dinonaktifkan
                    }}
                    onClick={handleToggleMotorHumidifier}
                    disabled={true} // Menonaktifkan tombol
                  >
                    Motor Humidifier {motorHumidifier ? "ON" : "OFF"}
                  </Button>
                </div>
              </div>
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
