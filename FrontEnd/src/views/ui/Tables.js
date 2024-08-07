import React, { useState, useEffect } from "react";
import { Row, Col, Table, Card, CardTitle, CardBody, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

const Tables = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "no",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:8801/monitoring")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  // Search filter
  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  // Sorting
  const sortedData = filteredData.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Pagination
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSearch = (event) => setSearch(event.target.value);
  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => ({
      key,
      direction:
        prevSortConfig.direction === "ascending" ? "descending" : "ascending",
    }));
  };
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
    }
    return faSort;
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Data Suhu Dan Kelembapan Ruangan Burung Walet
          </CardTitle>
          <CardBody className="">
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearch}
              className="mb-3"
            />
            <Table bordered hover>
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("no")}
                    style={{
                      backgroundColor: "#E2E2B6",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                  >
                    No <FontAwesomeIcon icon={getSortIcon("no")} />
                  </th>
                  <th
                    onClick={() => handleSort("suhu")}
                    style={{
                      backgroundColor: "#E2E2B6",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                  >
                    Suhu <FontAwesomeIcon icon={getSortIcon("suhu")} />
                  </th>
                  <th
                    onClick={() => handleSort("kelembapan")}
                    style={{
                      backgroundColor: "#E2E2B6",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                  >
                    Kelembapan{" "}
                    <FontAwesomeIcon icon={getSortIcon("kelembapan")} />
                  </th>
                  <th
                    onClick={() => handleSort("tanggal")}
                    style={{
                      backgroundColor: "#E2E2B6",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                  >
                    Tanggal <FontAwesomeIcon icon={getSortIcon("tanggal")} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item.no}</th>
                    <td>{item.suhu}°C</td>
                    <td>{item.kelembapan}%</td>
                    <td>
                      {new Date(item.tanggal).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
