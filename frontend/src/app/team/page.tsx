import React from "react";

import MemberInfo from "./MemberInfo";

export default function Team() {
  return (
    <main>
      <div>Christen Sophia</div>
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
