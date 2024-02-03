import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // list users
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${currentPage}`
      );
      const { data } = response.data;
      setUserData(data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      <h1>Hello ReqRes users!</h1>
      <div>
        {/* Content */}
        <div className="d-flex justify-content-center align-items-center flex-column my-3">
          <div class="row row-cols-1 row-cols-md-4 g-4">
            {userData?.map((item, key) => (
              <>
                <div key={key} class="col">
                  <div class="card h-100">
                      <div class="card-body text-center">
                        <h5>{item.first_name}</h5>
                        <p>{item.email}</p>
                        <img
                          src={item.avatar}
                          class="card-img-top"
                          alt="..."
                          style={{ width: "48%" }}
                        />
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        {/* pagination */}
        <nav aria-label="..." className="d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <span
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </span>
            </li>

            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <span
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </span>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <span
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Home

