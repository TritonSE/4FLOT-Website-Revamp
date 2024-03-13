import React from "react";

export default function DonateCard({ children }) {
  return (
    <div className="justify-content-center container grid w-[90%] p-8 md:w-[616px]">
      <div className="bg-white p-10 rounded-lg shadow-xl">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}
