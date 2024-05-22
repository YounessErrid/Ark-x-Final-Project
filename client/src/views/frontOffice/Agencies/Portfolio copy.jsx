import React from "react";
import logo from "../../../assets/logo.svg";
import "./style.css";

const Portfolio = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="p-5">
        <div className="container grid grid-cols-12 gap-6">
          {/* profile */}

          <div className="border-n30 col-span-12 rounded-xl border px-6 py-8 lg:col-span-4">
            <div className="flex flex-col items-center justify-center">
              <div className="relative max-md:overflow-hidden">
                {/* Replacing hexagon with the provided image */}
                <div className="avatar">
                  <div className="w-32 mask mask-hexagon">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 pt-6">
                <h4 className="heading-4">Albert Flores</h4>
                <p className="p bg-y300 rounded-full px-3 py-1 text-sm font-medium">
                  PRO
                </p>
              </div>
              <p className="text-n300 pt-3 text-center text-sm">
                Brooklyn, NY, USA
              </p>
              <div className="w-full pt-8 sm:px-12">
                <a
                  className="bg-n700 hover:text-n900 relative block w-full overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-yellow-400 after:duration-700 hover:after:w-[calc(100%+2px)]"
                  href="/chat"
                >
                  <div className="relative z-20 flex items-center justify-center gap-3">
                    <span className="text-xl !leading-none">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth={0}
                        viewBox="0 0 256 256"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.42,29.84l85.62,40.55,40.55,85.62A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14L118.42,148.9l47.24-47.25a8,8,0,0,0-11.31-11.31L107.1,137.58,24,98.22l.14,0L216,40Z" />
                      </svg>
                    </span>
                    <span>Get in touch</span>
                  </div>
                </a>
              </div>
              <a
                className="border-n30 mt-5 flex w-full items-center justify-between rounded-xl border px-5 py-3"
                href="/worker-portfolio"
              >
                <p className="font-semibold">View My Portfolio</p>
                <span className="text-xl !leading-none">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 256 256"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                  </svg>
                </span>
              </a>
              <div className="border-n30 mt-5 flex w-full items-center justify-between rounded-xl border px-5 py-3">
                <div className="flex items-center justify-start gap-2">
                  <span className="text-xl !leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
                    </svg>
                  </span>
                  <p className="font-medium">Recommended</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <div className="flex items-center justify-start max-xl:hidden">
                    <img
                      alt=""
                      loading="lazy"
                      width={60}
                      height={60}
                      decoding="async"
                      data-nimg={1}
                      className="bg-g75 relative -z-10 flex size-7 items-center justify-center overflow-hidden rounded-full"
                      src="/_next/static/media/review_people_1.705a44cb.png"
                      style={{ color: "transparent" }}
                    />
                    <img
                      alt=""
                      loading="lazy"
                      width={60}
                      height={60}
                      decoding="async"
                      data-nimg={1}
                      className="-z-9 bg-g75 relative -ml-2 flex size-7 items-center justify-center overflow-hidden rounded-full"
                      src="/_next/static/media/review_people_2.982aa938.png"
                      style={{ color: "transparent" }}
                    />
                    <img
                      alt=""
                      loading="lazy"
                      width={60}
                      height={60}
                      decoding="async"
                      data-nimg={1}
                      className="-z-8 bg-g75 relative -ml-2 flex size-7 items-center justify-center overflow-hidden rounded-full"
                      src="/_next/static/media/review_people_3.ca5b455c.png"
                      style={{ color: "transparent" }}
                    />
                    <p className="-z-7 bg-g75 relative -ml-2 flex size-7 items-center justify-center rounded-full">
                      +8
                    </p>
                  </div>
                  <span className="text-xl !leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-3 pt-8">
              <p className="text-sm font-medium">RATE</p>
              <p className="bg-r50 text-r300 rounded-full px-3 py-1 text-[13px]">
                $75 - &amp;100/hr
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-3 pt-8">
              <p className="text-sm font-medium">SERVICES</p>
              <div className="text-n400 flex flex-wrap gap-1">
                <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                  <span>Handyman</span>
                </p>
                <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                  <span>Clening </span>
                </p>
                <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                  <span>Plumber </span>
                </p>
                <p className="bg-b50 rounded-xl px-3 py-2 font-medium">+3</p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-3 pt-8">
              <p className="text-sm font-medium">BADGES</p>
              <div className="text-n400 flex flex-wrap gap-1">
                <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                  <img
                    alt=""
                    loading="lazy"
                    width={24}
                    height={24}
                    decoding="async"
                    data-nimg={1}
                    src="/_next/static/media/settings_icon.3e895ca7.png"
                    style={{ color: "transparent" }}
                  />
                  <span>Cleaning Expert</span>
                </p>
                <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                  <img
                    alt=""
                    loading="lazy"
                    width={24}
                    height={24}
                    decoding="async"
                    data-nimg={1}
                    src="/_next/static/media/tap_icon.33a640b0.png"
                    style={{ color: "transparent" }}
                  />
                  <span>Best Plumber</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-3 pt-8">
              <p className="text-sm font-medium">ABOUT</p>
              <p className="text-n300">
                Welcome to Servibe where convenience meets quality. Discover a
                seamless platform connecting you with trusted service providers
                effortlessly.
              </p>
            </div>
            <div className="flex flex-col items-start justify-start gap-3 pt-8">
              <p className="text-sm font-medium">LINKS</p>
              <div className="flex items-center justify-start gap-3">
                <a
                  className="border-n700 hover:border-b300 hover:bg-b300 flex cursor-pointer items-center justify-center rounded-full border p-2.5 duration-500 hover:text-white"
                  href="#"
                >
                  <span className="!leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z" />
                    </svg>
                  </span>
                </a>
                <a
                  className="border-n700 hover:border-b300 hover:bg-b300 flex cursor-pointer items-center justify-center rounded-full border p-2.5 duration-500 hover:text-white"
                  href="#"
                >
                  <span className="!leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z" />
                    </svg>
                  </span>
                </a>
                <a
                  className="border-n700 hover:border-b300 hover:bg-b300 flex cursor-pointer items-center justify-center rounded-full border p-2.5 duration-500 hover:text-white"
                  href="#"
                >
                  <span className="!leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                    </svg>
                  </span>
                </a>
                <a
                  className="border-n700 hover:border-b300 hover:bg-b300 flex cursor-pointer items-center justify-center rounded-full border p-2.5 duration-500 hover:text-white"
                  href="#"
                >
                  <span className="!leading-none">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 256 256"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M160,80a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H168A8,8,0,0,1,160,80Zm-24,78a42,42,0,0,1-42,42H32a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H90a38,38,0,0,1,25.65,66A42,42,0,0,1,136,158ZM40,116H90a22,22,0,0,0,0-44H40Zm80,42a26,26,0,0,0-26-26H40v52H94A26,26,0,0,0,120,158Zm128-6a8,8,0,0,1-8,8H169a32,32,0,0,0,56.59,11.2,8,8,0,0,1,12.8,9.61A48,48,0,1,1,248,152Zm-17-8a32,32,0,0,0-62,0Z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* service */}

          <div className="border-n30 col-span-12 rounded-xl border p-4 sm:p-8 lg:col-span-8">
            <h3 className="heading-3">
              Elevating Cleanliness Standards with Professional Cleaning
              Services
            </h3>
            <p className="text-bg-n300 pt-3 font-medium">
              Elevate cleanliness standards with our professional cleaning
              services. Experience spotless spaces and impeccable results every
              time you book with us.
            </p>
            <div className="flex flex-col gap-4 pt-10">
              <ul className="border-n30 text-n100 flex items-center justify-start gap-5 border-b pb-5 max-md:flex-wrap">
                <li className="heading-5 text-n900 hover:text-n900 cursor-pointer duration-500">
                  Services
                </li>
                <li className="heading-5 hover:text-n900 cursor-pointer duration-500">
                  Works
                </li>
                <li className="heading-5 hover:text-n900 cursor-pointer duration-500">
                  Jobs
                </li>
                <li className="heading-5 hover:text-n900 cursor-pointer duration-500">
                  Recommendations
                </li>
              </ul>
              <div className="flex flex-col gap-5">
                <div className="border-n30 flex items-center justify-between gap-3 rounded-2xl border p-3 max-md:flex-col">
                  <div className="max-xxl:gap-2 flex items-center justify-start max-sm:flex-col">
                    <div className="flex items-center justify-center self-stretch sm:w-[80%] sm:justify-start">
                      <img
                        alt=""
                        loading="lazy"
                        width={274}
                        height={202}
                        decoding="async"
                        data-nimg={1}
                        className="rounded-2xl object-cover"
                        src="/_next/static/media/workers_profile_service_img1.8b227d1d.png"
                        style={{ color: "transparent" }}
                      />
                    </div>
                    <div className="">
                      <h5 className="heading-5">
                        Sparkle Ease Cleaning Solutions
                      </h5>
                      <div className="text-n400 xxl:pt-6 flex flex-wrap gap-1 pt-3 text-sm">
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/settings_icon.3e895ca7.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Handyman</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/tap_icon.33a640b0.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Cleaning</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/tap_icon.33a640b0.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Plumber</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <span>+4</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="felx border-n30 text-n300 h-full w-full flex-col items-center justify-center rounded-2xl border px-6 py-8 text-center md:max-w-[176px]">
                    <p className="text-sm font-semibold">STARTING AT</p>
                    <p className="text-r300 py-1 font-semibold">
                      $75 - &amp;100/hr
                    </p>
                    <p className="pb-5 text-sm font-semibold">Fixed Price</p>
                    <a
                      className="bg-b300 hover:text-n900 relative flex items-center justify-center overflow-hidden rounded-full px-3 py-2 text-sm font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-yellow-400 after:duration-700 hover:after:w-[calc(100%+2px)] lg:px-4 lg:py-3"
                      href="/services/service-details"
                    >
                      <span className="relative z-10">View Details</span>
                    </a>
                  </div>
                </div>
                <div className="border-n30 flex items-center justify-between gap-3 rounded-2xl border p-3 max-md:flex-col">
                  <div className="max-xxl:gap-2 flex items-center justify-start max-sm:flex-col">
                    <div className="flex items-center justify-center self-stretch sm:w-[80%] sm:justify-start">
                      <img
                        alt=""
                        loading="lazy"
                        width={274}
                        height={202}
                        decoding="async"
                        data-nimg={1}
                        className="rounded-2xl object-cover"
                        src="/_next/static/media/workers_profile_service_img2.e935f3ac.png"
                        style={{ color: "transparent" }}
                      />
                    </div>
                    <div className="">
                      <h5 className="heading-5">
                        Home Complete Cleaning Solutions
                      </h5>
                      <div className="text-n400 xxl:pt-6 flex flex-wrap gap-1 pt-3 text-sm">
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/settings_icon.3e895ca7.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Handyman</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/tap_icon.33a640b0.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Cleaning</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/tap_icon.33a640b0.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Plumber</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <span>+4</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="felx border-n30 text-n300 h-full w-full flex-col items-center justify-center rounded-2xl border px-6 py-8 text-center md:max-w-[176px]">
                    <p className="text-sm font-semibold">STARTING AT</p>
                    <p className="text-r300 py-1 font-semibold">
                      $50 - &amp;100/hr
                    </p>
                    <p className="pb-5 text-sm font-semibold">Fixed Price</p>
                    <a
                      className="bg-b300 hover:text-n900 relative flex items-center justify-center overflow-hidden rounded-full px-3 py-2 text-sm font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-yellow-400 after:duration-700 hover:after:w-[calc(100%+2px)] lg:px-4 lg:py-3"
                      href="/services/service-details"
                    >
                      <span className="relative z-10">View Details</span>
                    </a>
                  </div>
                </div>
                <div className="border-n30 flex items-center justify-between gap-3 rounded-2xl border p-3 max-md:flex-col">
                  <div className="max-xxl:gap-2 flex items-center justify-start max-sm:flex-col">
                    <div className="flex items-center justify-center self-stretch sm:w-[80%] sm:justify-start">
                      <img
                        alt=""
                        loading="lazy"
                        width={274}
                        height={202}
                        decoding="async"
                        data-nimg={1}
                        className="rounded-2xl object-cover"
                        src="/_next/static/media/workers_profile_service_img3.84667d53.png"
                        style={{ color: "transparent" }}
                      />
                    </div>
                    <div className="">
                      <h5 className="heading-5">
                        Office New Cleaning Solution
                      </h5>
                      <div className="text-n400 xxl:pt-6 flex flex-wrap gap-1 pt-3 text-sm">
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/settings_icon.3e895ca7.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Handyman</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/tap_icon.33a640b0.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Cleaning</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/tap_icon.33a640b0.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Plumber</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <span>+4</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="felx border-n30 text-n300 h-full w-full flex-col items-center justify-center rounded-2xl border px-6 py-8 text-center md:max-w-[176px]">
                    <p className="text-sm font-semibold">STARTING AT</p>
                    <p className="text-r300 py-1 font-semibold">
                      $50 - &amp;150/hr
                    </p>
                    <p className="pb-5 text-sm font-semibold">Fixed Price</p>
                    <a
                      className="bg-b300 hover:text-n900 relative flex items-center justify-center overflow-hidden rounded-full px-3 py-2 text-sm font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-yellow-400 after:duration-700 hover:after:w-[calc(100%+2px)] lg:px-4 lg:py-3"
                      href="/services/service-details"
                    >
                      <span className="relative z-10">View Details</span>
                    </a>
                  </div>
                </div>
                <div className="border-n30 flex items-center justify-between gap-3 rounded-2xl border p-3 max-md:flex-col">
                  <div className="max-xxl:gap-2 flex items-center justify-start max-sm:flex-col">
                    <div className="flex items-center justify-center self-stretch sm:w-[80%] sm:justify-start">
                      <img
                        alt=""
                        loading="lazy"
                        width={274}
                        height={202}
                        decoding="async"
                        data-nimg={1}
                        className="rounded-2xl object-cover"
                        src="/_next/static/media/workers_profile_service_img4.84667d53.png"
                        style={{ color: "transparent" }}
                      />
                    </div>
                    <div className="">
                      <h5 className="heading-5">
                        Setup Kitchen Appience Easily
                      </h5>
                      <div className="text-n400 xxl:pt-6 flex flex-wrap gap-1 pt-3 text-sm">
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/settings_icon.3e895ca7.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Handyman</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/tap_icon.33a640b0.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Cleaning</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <img
                            alt=""
                            loading="lazy"
                            width={24}
                            height={24}
                            decoding="async"
                            data-nimg={1}
                            src="/_next/static/media/tap_icon.33a640b0.png"
                            style={{ color: "transparent" }}
                          />
                          <span>Plumber</span>
                        </p>
                        <p className="bg-b50 flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-medium">
                          <span>+4</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="felx border-n30 text-n300 h-full w-full flex-col items-center justify-center rounded-2xl border px-6 py-8 text-center md:max-w-[176px]">
                    <p className="text-sm font-semibold">STARTING AT</p>
                    <p className="text-r300 py-1 font-semibold">
                      $25 - &amp;100/hr
                    </p>
                    <p className="pb-5 text-sm font-semibold">Fixed Price</p>
                    <a
                      className="bg-b300 hover:text-n900 relative flex items-center justify-center overflow-hidden rounded-full px-3 py-2 text-sm font-medium text-white duration-700 after:absolute after:inset-0 after:left-0 after:w-0 after:rounded-full after:bg-yellow-400 after:duration-700 hover:after:w-[calc(100%+2px)] lg:px-4 lg:py-3"
                      href="/services/service-details"
                    >
                      <span className="relative z-10">View Details</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
