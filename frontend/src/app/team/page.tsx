import React from "react";

import BackgroundHeader from "./BackgroundHeader";
import MemberInfo from "./MemberInfo";

export default function Team() {
  return (
    <main>
      <BackgroundHeader />
      <div className="py-10 px-20">
        <h1 className="text-white text-2xl py-8 font-bold">Our Team</h1>
        <p className="w-5/6">
          Our dedicated team @ 4 Future Leaders of Tomorrow is a non-profit charitable organization
          committed in preventing and ending homelessness, hunger and disparity in underprivileged
          communities. Everyone deserves a chance for a better future!. We are reaching out by
          providing resources in needed communities - whether it be a delicious meal, warm clothing,
          educational supplies, referrals, toys or even bus passes
        </p>
      </div>
      <div className="grid grid-cols-4">
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
        <MemberInfo />
      </div>
    </main>
  );
}
