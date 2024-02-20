"use client";

import React, { useEffect, useState } from "react";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import { Member, getAllMembers } from "@/api/member";
import BackgroundHeader from "@/components/BackgroundHeader";
import MemberInfo from "@/components/MemberInfo";

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [images, setImages] = useState<BackgroundImage[]>([]);

  useEffect(() => {
    getBackgroundImages(BackgroundImagePages.TEAM).then((result) => {
      if (result.success) {
        setImages(result.data);
      }
    }).catch((error) => {
      alert(error);
    });
  }, []);

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
    <div>
      <BackgroundHeader
        backgroundImageURIs= {images.map((image) => image.imageURI)}
        header="About Us"
        title="Meet Our Team"
        description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit
          sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
      />
      <div className={styles.text}>
        <div className={styles.subtitle}>Our Team</div>
        {/* <div>Hello.</div> */}
        <p className={styles.description}>
          Our dedicated team @ 4 Future Leaders of Tomorrow is a non-profit charitable organization
          committed in preventing and ending homelessness, hunger and disparity in underprivileged
          communities. Everyone deserves a chance for a better future!. We are reaching out by
          providing resources in needed communities - whether it be a delicious meal, warm clothing,
          educational supplies, referrals, toys or even bus passes
        </p>
      </div>
      <div className={styles.membersContainer}>
        {members.map((member) => (
          <MemberInfo key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
}
