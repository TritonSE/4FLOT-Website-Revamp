import React, { ReactNode } from "react";

type DonateCardProps = {
  children: ReactNode;
};

export default function DonateCard({ children }: DonateCardProps) {
  return (
    <div className="justify-content-center container grid w-[90%] p-8 md:w-[616px]">
      <div className="bg-white p-10 rounded-lg shadow-xl">
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}
