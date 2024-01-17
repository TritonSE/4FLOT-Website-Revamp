import Image from "next/image";
import React from "react";

const MemberInfo = () => {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="rounded-full w-48 h-48 overflow-hidden">
        <Image src="/volunteer.png" alt="Volunteer" width={200} height={200} priority />
      </div>
      <h1 className="text-xl font-bold pt-6">Staff Name</h1>
      <p>Officer</p>
    </div>
  );
};

export default MemberInfo;
