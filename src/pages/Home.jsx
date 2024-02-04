import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearData } from "../features/counter/counterAuth";
import { clearUser } from "../features/counter/counterName";
 
function Home() {
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");

  // search id user
  const [searchId, setSearchId] = useState()
  const [singleSearch, setSingleSearch] = useState()


  useEffect(() => {
    if (state.auth.value === 0) {
      window.location.href = "/";
    } else {
      fetchData();
      setUserName(state.userName.value);
    }
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

  const handleSearch = () => {
      if(!searchId) {
        setSingleSearch("Masukan ID User")
      }else {
         axios.get(
          `https://reqres.in/api/users/${searchId}`
        )
        .then( (response) => {
          const data = response.data.data
          setSingleSearch(data)
        })
        .catch((error) => {
          console.log(error.message);
        }) 
      }
  }

 const handleLogout = () => {
   dispatch(clearData());
   dispatch(clearUser());
   navigation("/");
 }

  return (
    <>
        <div className="container d-flex justify-content-center align-items-center flex-column">
          <h1>Hello {userName}!</h1>
          <div>
            <button
              className="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Pencarian ID
            </button>
            <button className="btn btn-danger ms-2" onClick={handleLogout}>
              Log Out
            </button>

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Single User ID Search
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3 d-flex gap-3">
                      <input
                        type="number"
                        className="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Masukan ID user"
                        onChange={(e) => setSearchId(e.target.value)}
                      />
                      <button className="btn btn-light" onClick={handleSearch}>
                        Cari
                      </button>
                    </div>
                    {/* hasil pencarian */}
                    {/*  searchId >= 1 */}
                    <div className="d-flex justify-content-center align-content-center">
                      {searchId <= 12 && searchId >= 1 ? (
                        <>
                          <div class="card" style={{ width: " 18rem" }}>
                            <img
                              src={singleSearch?.avatar}
                              class="card-img-top"
                              alt="Photo User"
                            />
                            <div class="card-body">
                              <h6>ID : {singleSearch?.id}</h6>
                              <label class="card-text">
                                Name : {singleSearch?.first_name}
                                {singleSearch?.last_name}
                              </label>
                              <p> Email : {singleSearch?.email}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <p>Not Found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Content */}
            <div className="d-flex justify-content-center align-items-center flex-column my-3">
              <div className="row row-cols-1 row-cols-md-4 g-4 justify-content-center">
                {userData?.map((item, key) => (
                  <>
                    <div key={key} className="col text-center ">
                      <div className="card h-100">
                        <div
                          clasNames="card-body"
                          style={{ marginTop: "2rem", marginBottom: "2rem" }}
                        >
                          <h5>{item.first_name}</h5>
                          <p>{item.email}</p>
                          <img
                            src={item.avatar}
                            className="card-img-top object-fit-cover"
                            alt="..."
                            style={{ width: "48%", height: "48%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>

            {/* pagination */}
            <nav aria-label="" className="d-flex justify-content-center">
              <ul className="pagination">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
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
    </>
  );
}

export default Home

