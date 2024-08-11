import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgency, updateAgecny } from "../../../features/agenciesSlice";
import { useParams } from "react-router-dom";
import { updateUser, updateUserAgency } from "../../../features/userSlice";
import { updatePortfolio } from "../../../features/porfolioSlice";

const AgencyProfile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [profileForm, setProfileForm] = useState({
    agencyName: "",
    email: "",
    address: "",
    phone: "",
  });

  const [logo, setLogo] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const logoRef = useRef(null);
  const coverRef = useRef(null);

  const { agency } = useSelector((state) => state.agencies);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };
  const handleCancelEditProfile = () => {
    setEditProfile(!editProfile);
    setProfileForm({
      agencyName: agency.agencyName,
      address: agency.address,
      email: agency.email,
    });
  };

  const handleEditDescription = () => {
    setEditDescription(!editDescription);
  };

  const handleCancelEditDescription = () => {
    setEditDescription(!editDescription);
    setDescription(agency.description);
  };

  const handleProfileFormChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };
  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setDescription(value);
  };

  // cover change
  const handleCoverButtonClick = (e) => {
    coverRef.current.click();
  };
  const handleCoverChange = (e) => {
    // setLogo(e.target.files[0])
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("cover", file);
      const portfolioId = agency?.portfolioId;
      dispatch(updatePortfolio({ id: portfolioId, formData })).then(() =>
        dispatch(fetchAgency(id))
      );
    }
  };

  // Logo change
  const handleLogoButtonClick = () => {
    logoRef.current.click();
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("logo", file);
      const portfolioId = agency?.portfolioId;
      dispatch(updatePortfolio({ id: portfolioId, formData })).then(() =>
        dispatch(fetchAgency(id))
      );
    }
  };

  const submitprofileChange = (e) => {
    e.preventDefault();
    if (
      profileForm.agencyName !== agency.agencyName ||
      profileForm.address !== agency.address
    ) {
      // here dispatch to the update agency that contains address and agency name
      const data = {
        agencyName: profileForm.agencyName,
        addresse: profileForm.address,
      };
      // console.log('this is data sent', data);
      dispatch(updateAgecny({ id, data }))
        .then(() => dispatch(fetchAgency(id)))
        .then(() => setEditProfile(!editProfile));
    }
    if (
      profileForm.email !== agency.email ||
      profileForm.phone !== agency.phone
    ) {
      // if the email changed send request to the user and deal with the user schema
      const userCredentials = {
        email: profileForm.email,
        phone: profileForm.phone,
      };
      const userId = user?.id;
      dispatch(updateUserAgency({ id: userId, userCredentials }))
        .then(() => dispatch(fetchAgency(id)))
        // .then(()=> console.log("its hereeeeee"))
        .then(() => setEditProfile(!editProfile));
    }
  };

  // useEffect(()=>{
  //   console.log("user", user);
  // }, [user])

  const submitDescriptionChange = (e) => {
    e.preventDefault();
    if (description !== agency.description) {
      // send request to the portfolio update
      const formData = new FormData();
      formData.append("infos", description);
      const portfolioId = agency?.portfolioId;
      dispatch(updatePortfolio({ id: portfolioId, formData }))
        .then(() => dispatch(fetchAgency(id)))
        .then(() => setEditDescription(!editDescription));
    }
  };

  useEffect(() => {
    dispatch(fetchAgency(id));
  }, []);

  useEffect(() => {
    // console.log("agency", agency);
    if (agency) {
      setProfileForm({
        agencyName: agency.agencyName,
        address: agency.address,
        email: agency.email,
        phone: agency.phone,
      });
      setDescription(agency.description);
      setLogo(agency.logo);
      setCoverPhoto(agency.cover);
    }
  }, [agency]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="relative pt-40 pb-24">
      <img
        src={coverPhoto ? `http://localhost:3000/${coverPhoto}` : 'https://via.placeholder.com/800x400'}
        alt="cover-image"
        className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
      />
      <input
        type="file"
        className="hidden"
        ref={coverRef}
        onChange={handleCoverChange}
      />

      <div className="absolute top-2 right-2">
        <button
          className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
          onClick={handleCoverButtonClick}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </span>
          <span className="hidden md:inline-block">Edit</span>
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center sm:justify-start relative z-10 mb-5">
          <div className="relative">
            <img
              src={logo ? `http://localhost:3000/${logo}` : 'https://i.pravatar.cc/4'}
              alt="user-avatar-image"
              className="border-4 border-solid border-white rounded-full h-[150px] w-[150px] object-cover"
            />
            <input
              type="file"
              className="hidden"
              ref={logoRef}
              onChange={handleLogoChange}
            />

            <div className="absolute top-0 right-2">
              <button
                className="text-slate-800 hover:text-blue-600 text-sm font-medium mt-4 inline-flex space-x-1 items-center bg-white"
                onClick={handleLogoButtonClick}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto relative mb-7">
            {!editProfile ? (
              <div className="profile">
                <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-4">
                  {agency?.agencyName}
                </h3>
                <div className="space-y-2">
                  <p className="font-normal text-base leading-7 text-gray-500">
                    {agency?.address}
                  </p>
                  <p className="font-normal text-base leading-7 text-gray-500">
                    {agency?.email}
                  </p>
                  <p className="font-normal text-base leading-7 text-gray-500">
                    {agency?.phone}
                  </p>
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                    onClick={handleEditProfile}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </span>
                    <span className="hidden md:inline-block">Edit</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <form className="">
                  <div className="flex flex-wrap rounded-lg p-3 dark:bg-gray-600">
                    <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">
                      Account settings:
                    </h2>

                    <div className="flex flex-col gap-2 w-full border-gray-400">
                      <div>
                        <label className="text-gray-600 dark:text-gray-400">
                          agencyName
                        </label>
                        <input
                          className="w-full py-3 border bg-white border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                          type="text"
                          name="agencyName"
                          value={profileForm.agencyName}
                          onChange={handleProfileFormChange}
                        />
                      </div>

                      <div>
                        <label className="text-gray-600 dark:text-gray-400">
                          Address
                        </label>
                        <input
                          className="w-full py-3 border bg-white border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                          type="text"
                          name="address"
                          value={profileForm.address}
                          onChange={handleProfileFormChange}
                        />
                      </div>

                      <div>
                        <label className="text-gray-600 dark:text-gray-400">
                          Email
                        </label>
                        <input
                          className="w-full py-3 border bg-white border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                          type="text"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileFormChange}
                        />
                      </div>
                      <div>
                        <label className="text-gray-600 dark:text-gray-400">
                          Phone
                        </label>
                        <input
                          className="w-full py-3 border bg-white border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                          type="tel"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileFormChange}
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          className="py-1.5 px-3 m-1 text-center bg-gray-400 border rounded-md text-white  hover:bg-gray-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                          onClick={handleCancelEditProfile}
                        >
                          Cancel change
                        </button>
                        <button
                          className="py-1.5 px-3 m-1 text-center bg-blue-400 border rounded-md text-white  hover:bg-blue-300 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                          type="submit"
                          onClick={submitprofileChange}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto relative mb-7">
            {!editDescription ? (
              <div className="description">
                <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-4">
                  description
                </h3>
                <div className="space-y-2">
                  <p className="font-normal text-base leading-7 text-gray-500">
                    {agency?.description}
                  </p>
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                    onClick={handleEditDescription}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </span>
                    <span className="hidden md:inline-block">Edit</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <form className="">
                  <div className="flex flex-wrap rounded-lg p-3 dark:bg-gray-600">
                    <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">
                      Description:
                    </h2>

                    <div className="flex flex-col gap-2 w-full border-gray-400">
                      <div>
                        <textarea
                          className="w-full py-3 border bg-white border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                          name="description"
                          value={description}
                          onChange={handleDescriptionChange}
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="py-1.5 px-3 m-1 text-center bg-gray-400 border rounded-md text-white  hover:bg-gray-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                          onClick={handleCancelEditDescription}
                        >
                          Cancel change
                        </button>
                        <button
                          className="py-1.5 px-3 m-1 text-center bg-blue-400 border rounded-md text-white  hover:bg-blue-300 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                          type="submit"
                          onClick={submitDescriptionChange}
                        >
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyProfile;
