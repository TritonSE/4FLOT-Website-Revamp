"use client";

import React, { useEffect, useState } from "react";

import BackgroundHeader from "./BackgroundHeader";
import MemberInfo from "./MemberInfo";

import { Member, getAllMembers } from "@/api/member";

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    getAllMembers()
      .then((result) => {
        if (result.success) {
          console.log(result.data);
          setMembers(result.data);
        } else {
          alert(result.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <main>
      <BackgroundHeader
        backgroundImage="/image 18.png"
        header="About Us"
        title="Meet Our Team"
        description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit
          sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
      />
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
        {members.map((member) => (
          <MemberInfo key={member._id} member={member} />
        ))}
      </div>
    </main>
  );
}
