// import { useState } from "react";
import BloodDone from "./BloodDone";
import UseDonorRequest from "../../../hooks/UseDonorRequest";

const Featured = () => {
  const [createRequest] = UseDonorRequest();
  const pendingallBlogs = createRequest.filter(
    (pendingBlogs) => pendingBlogs.status === "done"
  );

  return (
    <>
      <h1 className="text-3xl md:text-5xl font-bold text-lime-500 text-center mt-20 mb-10">
        Featured Section
      </h1>
      <div>
        <h1 className="text-xl md:text-5xl font-bold text-rose-500 text-center mt-20 mb-10">
          ....Who Have Already Given Blood!!....
        </h1>
        <div className="container mx-auto p-8 md:p-16 lg:p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {pendingallBlogs.map((blog, idx) => (
            <BloodDone key={idx} blog={blog}></BloodDone>
          ))}
        </div>
      </div>
    </>
  );
};

export default Featured;
