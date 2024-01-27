import Image from "next/image";
import React from "react";

import type { Member } from "../../api/member";

//Make an iterface for my props, take in a name - string, role - string, and profilePictureURL - string
type MemberInfoProps = {
  member: Member | null | undefined;
};

const MemberInfo = ({ member }: MemberInfoProps) => {
  if (member) {
    return (
      <div className="flex flex-col items-center py-6">
        <div className="rounded-full w-48 h-48 overflow-hidden">
          {member.profilePictureURL ? (
            <Image
              src={member.profilePictureURL}
              alt="Profile Picture"
              width={200}
              height={200}
              priority
            />
          ) : (
            <Image src="/volunteer.png" alt="Volunteer" width={200} height={200} priority />
          )}
        </div>
        <h1 className="text-xl font-bold pt-6">{member.name}</h1>
        <p>{member.role}</p>
      </div>
    );
  }
  return null;
};

export default MemberInfo;
