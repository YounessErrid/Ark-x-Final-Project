import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAgencies, fetchAgencies } from "../../../features/agenciesSlice";
import { Spinner } from "../../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./style.css";
export const Agencies = () => {
  const { agencies, totalPages } = useSelector(
    (state) => state.agencies.agencies
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // Initialize with currentPage from state if available
  const pageSize = 7;

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
    dispatch(fetchAgencies({ search: searchQuery, page: 1, pageSize }));
  };

  const handlePageChange = (data) => {
    const selectedPage = data.selected + 1; // ReactPaginate uses zero-based index
    setPage(selectedPage);
    dispatch(
      fetchAgencies({ search: searchQuery, page: selectedPage, pageSize }))
      // .then(()=> window.scrollTo(0,10));
  };

  useEffect(() => {
    dispatch(fetchAgencies({ search: searchQuery, page, pageSize }));
  }, [dispatch, searchQuery, page, pageSize]);
  // useEffect(() => {
  //   console.log("agencies", agencies);
  // }, [agencies]);



  return (
    <div>
      <div className="bg-secondary">
        <div className="bg-transparent">
          <div className="mx-auto flex flex-col items-center py-12 sm:py-24">
            <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl text-center text-white font-black leading-10">
                Let's find out your perfect match
                <span className="text-primary"> Agency </span>
                for your special event.
              </h1>
              <p className="mt-5 sm:mt-10 lg:w-10/12 text-white font-normal text-center text-xl">
                A Community build tailwind component library.
              </p>
            </div>
            <div className="flex w-11/12 md:w-8/12 xl:w-6/12">
              <div className="flex rounded-md w-full">
                <input
                  type="text"
                  name="q"
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-whiteDirty rounded-l placeholder-current focus:outline-none focus:text-gray-900 font-medium"
                />

                <button
                  onClick={handleSearch}
                  className="inline-flex items-center gap-2 bg-primary text-primary text-lg font-semibold py-3 px-6 rounded-r-md"
                >
                  <span className="text-white">Find</span>
                  <svg
                    className="text-gray-200 h-5 w-5 p-0 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    style={{ enableBackground: "new 0 0 56.966 56.966" }}
                    xmlSpace="preserve"
                  >
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Pitchfork Kickstarter Taxidermy
              </h1>
              <div className="h-1 w-20 bg-secondary rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven't heard of them man bun deep jianbing selfies heirloom prism
              food truck ugh squid celiac humblebrag.
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agencies &&
                agencies.map((serv) => (
                  <div
                    key={serv?.agencyId}
                    className="bg-white p-8 rounded-lg shadow-md relative"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-slate-900 font-bold">
                          {serv?.agencyName}
                        </h3>
                      </div>
                      <div className="text-gray-500 cursor-pointer absolute top-2 right-2"></div>
                    </div>
                    <div className="mb-4 overflow-hidden">
                      <Link to={`/client/portfolio/${serv?.agencyId}`}>
                        <img
                          src={
                            serv.logo
                              ? `http://localhost:3000/${serv?.logo}`
                              : "https://via.placeholder.com/800x400"
                          }
                          alt="Post Image"
                          className="w-full h-48 object-cover rounded-md cursor-pointer transform transition duration-500 hover:scale-110"
                        />
                      </Link>
                    </div>
                    <div className="flex items-center justify-end text-gray-500">
                      <Link to={`/client/portfolio/${serv?.agencyId}`}>
                        <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-100 rounded-full p-1">
                          <span>View details</span>
                          <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 fill-current"
                          >
                            <title />
                            <g data-name="Layer 2" id="Layer_2">
                              <path d="M1,16A15,15,0,1,1,16,31,15,15,0,0,1,1,16Zm28,0A13,13,0,1,0,16,29,13,13,0,0,0,29,16Z" />
                              <path d="M12.13,21.59,17.71,16l-5.58-5.59a1,1,0,0,1,0-1.41h0a1,1,0,0,1,1.41,0l6.36,6.36a.91.91,0,0,1,0,1.28L13.54,23a1,1,0,0,1-1.41,0h0A1,1,0,0,1,12.13,21.59Z" />
                            </g>
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
                activeLinkClassName={"page-link-active"}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
