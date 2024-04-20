import React from "react";
import { TanstackTable } from "../components/TanstackTable";

export const Agencies = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Hello Evano,👋🏼</h1>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="my-8 py-12 bg-whiteDirty flex justify-between align-middle content-center">
        <div> card 1</div>
        <div> card 2</div>
        <div> card 3</div>
      </div>
      <h1 className="font-bold text-2xl">All Agencies</h1>
      <p className="text-green-500">Active Members</p>
      <TanstackTable />
    </div>
  );
};
