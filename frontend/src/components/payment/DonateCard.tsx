import React, { ReactNode } from "react";

type DonateCardProps = {
  children: ReactNode;
};

export default function DonateCard({ children }: DonateCardProps) {
  return (
    <div className="container grid w-[100%] p-8 md:w-[850px] mx-auto">
      <div className="bg-white p-10 rounded-lg shadow-xl">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}
