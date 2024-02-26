import React from "react";
const appVersion = process.env.APP_VERSION || "Version not set";
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white h-screen">
      <h1>App Version</h1>
      <p>{appVersion}</p>
    </div>
  );
};

export default page;
