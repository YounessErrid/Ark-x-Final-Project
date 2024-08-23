import React from "react";

export const Hero = () => {
  return (
    <>
      {/* start hero */}
      <div className=" flex flex-wrap bg-gradient-to-t from-lightBlue via-orange-100  to-whiteDirty  ">
        <div className=" w-full sm:w-8/12 mb-10">
          <div className=" h-full sm:p-10">
            <header className="container px-4 lg:flex mt-10 items-center h-full lg:mt-0">
              <div className="w-full">
                <div className="text-3xl font-bold text-primary">
                  ALL<span className="text-secondary ">-</span>IN
                  <span className="text-secondary ">-</span>ONE EVENT MANAGEMENT
                  <span className="text-secondary ">.</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-600 my-6">
                  Manage your events <br />
                  of today—and
                  <br />
                  <span className="text-secondary">tomorrow</span>
                </h1>
                <div className="w-20 h-2 bg-secondary my-6 "></div>
                <p className="text-xl mb-10 max-w-lg text-gray-500">
                  Everything you need to craft impactful event experiences all
                  while staying technologically relevant, now and always.
                </p>
                <button className="bg-secondary text-white text-2xl font-medium px-4 py-2 rounded shadow">
                  Discover Events
                </button>
              </div>
            </header>
          </div>
        </div>

        <div className="w-full  object-cover sm:h-screen sm:w-4/12 carousel rounded-box max-h-dvh overflow-hidden ">
          <div className="carousel-item w-full items-center">
            <img
              src="https://images.pexels.com/photos/1940583/pexels-photo-1940583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-3/4 w-full object-cover rounded"
              alt="Tailwind CSS Carousel component"
            />
          </div>
        </div>
      </div>

      <section className="text-gray-600 body-font bg-white">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      <h2 className="text-xs text-secondary tracking-widest font-medium title-font mb-1">
        ROOF PARTY POLAROID
      </h2>
      <h1 className="sm:text-3xl text-3xl font-medium title-font mb-4 text-gray-900">
        The simplest way to host all your events
      </h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
        Elevate your event management with [Your Platform Name], the ultimate tool designed for agencies and professionals to streamline every aspect of event planning. From ideation to execution, our platform empowers you to create memorable experiences with ease.
      </p>
    </div>
    <div className="flex flex-wrap">
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
          Seamless Event Management
        </h2>
        <p className="leading-relaxed text-base mb-4">
          Centralize all your planning tasks in one intuitive platform. No more juggling between tools—manage everything from schedules to vendor coordination effortlessly.
        </p>
        <a className="text-secondary inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
          Customizable Solutions
        </h2>
        <p className="leading-relaxed text-base mb-4">
          Tailor your event management to fit your needs. Whether it's a corporate gathering, wedding, or concert, our platform adapts to your requirements.
        </p>
        <a className="text-secondary inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
          Collaborative Planning
        </h2>
        <p className="leading-relaxed text-base mb-4">
          Work together with your team and clients in real-time. Share updates, feedback, and tasks without missing a beat.
        </p>
        <a className="text-secondary inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">
          Data-Driven Decisions
        </h2>
        <p className="leading-relaxed text-base mb-4">
          Utilize our analytics tools to monitor your event's progress and make informed decisions to ensure success.
        </p>
        <a className="text-secondary inline-flex items-center">
          Learn More
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

    </>
  );
};
