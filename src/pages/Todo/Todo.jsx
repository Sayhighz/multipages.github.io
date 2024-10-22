import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Todo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsToShow, setItemsToShow] = useState(10);
  const [showWaiting, setShowWaiting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleAddNewItem = () => {
    const newId = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const newItem = {
      id: newId,
      title: newTitle,
      completed: false,
    };
    setData([...data, newItem]);
    setShowModal(false);
    setNewTitle("");
  };

  const handleToggleStatus = (id) => {
    const updatedData = data.map((item) =>
      item.id === id
        ? {
            ...item,
            completed: item.completed ? item.completed : !item.completed,
          }
        : item
    );
    setData(updatedData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredData = showWaiting
    ? data.filter((item) => !item.completed)
    : data;

  const totalPages = Math.ceil(filteredData.length / itemsToShow);

  const startIndex = (currentPage - 1) * itemsToShow;
  const currentData = filteredData.slice(startIndex, startIndex + itemsToShow);

  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="container border" style={{ width: "1020px" }}>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="form-check form-switch d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={showWaiting}
              onChange={(e) => setShowWaiting(e.target.checked)}
            />
            <label
              className="form-check-label ms-2"
              htmlFor="flexSwitchCheckDefault"
            >
              Show Only{" "}
              <div className="badge rounded-pill text-bg-warning d-inline-block ms-1">
                <span className="bi bi-clock"></span> Waiting
              </div>
            </label>
          </div>

          {/* Show Page Section */}
          <div className="d-flex align-items-center">
            <label htmlFor="itemsToShow" className="me-2">
              Show:
            </label>
            <select
              id="itemsToShow"
              value={itemsToShow}
              onChange={(e) => {
                setItemsToShow(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="form-select"
              style={{ width: "80px" }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={100}>100</option>
            </select>
          </div>

        </div>

        <table className="table mt-3">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
              <th>
                <Button
                  variant="outline-primary"
                  onClick={() => setShowModal(true)}
                >
                  <span className="bi bi-plus"></span>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td onClick={() => handleToggleStatus(item.id)} style={{ cursor: 'pointer' }}>
                  {item.completed ? (
                    <span className="badge rounded-pill text-bg-success">
                      <span className="bi bi-check-lg"></span> Done
                    </span>
                  ) : (
                    <span className="badge rounded-pill text-bg-warning">
                      <span className="bi bi-clock"></span> Waiting
                    </span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <span className="bi bi-trash"></span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav className="d-flex justify-content-center align-items-center">
          <ul className="pagination m-3">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handleFirstPage}>
                First
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePreviousPage}>
                Previous
              </button>
            </li>
          </ul>

          <span>
            {currentPage} / {totalPages}
          </span>

          <ul className="pagination m-3">
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={handleNextPage}>
                Next
              </button>
            </li>
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={handleLastPage}>
                Last
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="newId" className="form-label">
                ID
              </label>
              <input
                type="number"
                className="form-control"
                id="newId"
                value={data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1} // แสดง ID ที่ใหม่
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="newTitle"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddNewItem}>
            Add Todo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Todo;
