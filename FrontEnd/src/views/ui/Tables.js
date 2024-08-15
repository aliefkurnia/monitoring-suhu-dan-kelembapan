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
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
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

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? faSortUp : faSortDown;
    }
    return faSort;
  };

  // Pagination Controls
  const paginationRange = () => {
    const range = [];
    const maxPagesToShow = 4;
    const startPage = 1;
    const endPage = totalPages;

    // Always show the first page
    range.push(startPage);

    // Calculate the page range to show around the current page
    if (totalPages > maxPagesToShow) {
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      // Show pages around the current page
      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      // Add ellipsis before the last page
      if (end < totalPages - 1) {
        range.push("...");
      }

      // Always show the last page
      range.push(endPage);
    } else {
      // If the total number of pages is within the limit, show all pages
      for (let i = startPage + 1; i <= endPage; i++) {
        range.push(i);
      }
    }

    return range;
  };

  // Inline styles
  const paginationStyles = {
    container: {
      display: "flex",
      gap: "4px",
      alignItems: "center",
    },
    button: {
      margin: "0 3px",
      border: "0px",
      backgroundColor: "#fff",
      color: "#007bff",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "background-color 0.3s, color 0.3s, transform 0.2s",
      fontWeight: "bold",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    activeButton: {
      backgroundColor: "#007bff",
      color: "#fff",
    },
    disabledButton: {
      cursor: "not-allowed",
      opacity: "0.5",
      backgroundColor: "#e9ecef",
      borderColor: "#e9ecef",
      backgroundColor: "#fff",
      color: "#007bff",
      cursor: "pointer",
      borderRadius: "4px",
      transition: "background-color 0.3s, color 0.3s, transform 0.2s",
      fontWeight: "bold",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    buttonHover: {
      backgroundColor: "#f1f1f1",
      transform: "scale(1.05)",
    },
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Data Suhu Dan Kelembapan Ruangan Burung Walet
          </CardTitle>
          <CardBody>
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
                    onClick={() => handleSort("motor_kipas")}
                    style={{
                      backgroundColor: "#E2E2B6",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                  >
                    Motor Kipas{" "}
                    <FontAwesomeIcon icon={getSortIcon("motor_kipas")} />
                  </th>
                  <th
                    onClick={() => handleSort("motor_humidifier")}
                    style={{
                      backgroundColor: "#E2E2B6",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                  >
                    Motor Humidifier{" "}
                    <FontAwesomeIcon icon={getSortIcon("motor_humidifier")} />
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
                    <td>{item.motor_kipas ? "ON" : "OFF"}</td>
                    <td>{item.motor_humidifier ? "ON" : "OFF"}</td>
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
            <div className="d-flex justify-content-between align-items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={
                  currentPage === 1
                    ? paginationStyles.disabledButton
                    : paginationStyles.button
                }
              >
                Previous
              </button>
              <div style={paginationStyles.container}>
                {paginationRange().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (page !== "...") handlePageChange(page);
                    }}
                    style={{
                      ...paginationStyles.button,
                      ...(currentPage === page
                        ? paginationStyles.activeButton
                        : {}),
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={
                  currentPage === totalPages
                    ? paginationStyles.disabledButton
                    : paginationStyles.button
                }
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
