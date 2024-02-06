import Image from "next/image";
import React from "react";

import styles from "./MemberInfo.module.css";

import type { Member } from "../api/member";

//Make an iterface for my props, take in a name - string, role - string, and profilePictureURL - string
type MemberInfoProps = {
  member: Member | null | undefined;
};

const MemberInfo = ({ member }: MemberInfoProps) => {
  if (member) {
    return (
      <div className={styles.container}>
        <div className={styles.profile}>
          {member.profilePictureURL ? (
            <Image
              src={member.profilePictureURL}
              alt="Profile Picture"
              width={248}
              height={248}
              priority
            />
          ) : (
            <Image src="/volunteer.png" alt="Volunteer" width={248} height={248} priority />
          )}
        </div>
        <h1 className={styles.name}>{member.name}</h1>
        <p className={styles.role}>{member.role}</p>
      </div>
    );
  }
  return null;
};

export default MemberInfo;
