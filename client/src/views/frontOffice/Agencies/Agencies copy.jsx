import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAgencies, fetchAgencies } from "../../../features/agenciesSlice";
import { Spinner } from "../../../components/Spinner";
import { Link, useNavigate } from "react-router-dom";

export const Agencies = () => {
  const { loading, error, agencies } = useSelector((state) => state.agencies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    // Dispatch search action with searchQuery
    dispatch(searchAgencies(searchQuery));
  };
  const agencyHero = (id) => {
    // dispatch(fetchAgency(id))
    navigate(`/portfolio/${id}`);
  };

  useEffect(() => {
    dispatch(fetchAgencies(searchQuery));
    setDataLoaded(true);
  }, [dispatch]);

  useEffect(()=>{
    console.log("agencies", agencies);
  }, [agencies])

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
                  className="inline-flex items-center gap-2 bg-primary  text-primary text-lg font-semibold py-3 px-6 rounded-r-md"
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
          <div className="flex flex-wrap -m-4">
            {loading && !dataLoaded && <Spinner />}
            {agencies &&
              agencies.map((agency) => (
                <div key={agency._id} className="xl:w-1/4 md:w-1/2 p-4">
                  <div
                    onClick={(e) => agencyHero(agency._id)}
                    className="cursor-pointer"
                  >
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <img
                        className="h-40 rounded w-full object-cover object-center mb-6"
                        src={`http://localhost:3000/${agency.profile_image}`}
                        alt="content"
                      />
                      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                        {/* {agency.portfolio.description} */}
                      </h3>
                      <h2 className=" text-gray-900 font-medium  mb-4">
                        {agency.agencyName}
                      </h2>
                      <p className="leading-relaxed text-base">
                        {/* {agency.portfolio[0]?.description} */}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            {/* Répétez la structure ci-dessus pour chaque produit */}
          </div>
        </div>
      </section>
    </div>
   
  );
};
