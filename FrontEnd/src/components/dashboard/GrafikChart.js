import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const GrafikChart = ({ monitoringData }) => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      line: {
        curve: "smooth",
      },
    },
    colors: ["#0d6efd", "#009efb"],
    xaxis: {
      categories: monitoringData.map((data) =>
        new Date(data.tanggal).toLocaleString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      ),
    },
  };

  const series = [
    {
      name: "Suhu",
      data: monitoringData.map((data) => parseInt(data.suhu)),
    },
    {
      name: "Kelembapan",
      data: monitoringData.map((data) => parseInt(data.kelembapan)),
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Statistik Suhu Dan Kelembapan</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          Ruangan Burung Walet
        </CardSubtitle>

        <Chart options={options} series={series} type="area" height="300" />
      </CardBody>
    </Card>
  );
};

export default GrafikChart;
