import React from "react";
const appVersion = process.env.APP_VERSION || "Version not set";
const page = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white h-screen">
      <h1>App Version</h1>
      <h2>{appVersion}</h2>
    </div>
  );
};

export default page;
