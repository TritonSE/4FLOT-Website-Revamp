"use client";

import React, { useEffect, useState } from "react";

import { getPageText } from "../../../api/pageeditor";

import styles from "./page.module.css";

import { BackgroundImage, BackgroundImagePages, getBackgroundImages } from "@/api/images";
import { Member, getAllMembers } from "@/api/member";
import BackgroundHeader from "@/components/BackgroundHeader";
import MemberInfo from "@/components/MemberInfo";


export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [images, setImages] = useState<BackgroundImage[]>([]);
  const [phSubtitle, setPhSubtitle] = useState<string>("");
  const [s1Subtitle, setS1Subtitle] = useState<string>("");
  const [s1Text, setS1Text] = useState<string>("");

  useEffect(() => {
    getBackgroundImages(BackgroundImagePages.TEAM)
      .then((result) => {
        if (result.success) {
          setImages(result.data);
        }
      })
      .catch((error) => {
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

  let pageText;
  useEffect(() => {
    getPageText("Our Team")
      .then((response) => {
        if (response.success) {
          pageText = response.data;
          setPhSubtitle(pageText.pageSections[0].subtitle ?? "");
          setS1Subtitle(pageText.pageSections[1].sectionTitle ?? "");
          setS1Text(pageText.pageSections[1].sectionSubtitle ?? "");
        } else {
          alert(response.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <div>
      <BackgroundHeader
        backgroundImageURIs={images.map((image) => image.imageURI)}
        header="OUR TEAM"
        title="Meet Our Team"
        description={phSubtitle}
      />
      <div className={styles.text}>
        <div className={styles.subtitle}>{s1Subtitle}</div>
        {/* <div>Hello.</div> */}
        <p className={styles.description}>{s1Text}</p>
      </div>
      <div className={styles.membersContainer}>
        {members.map((member) => (
          <MemberInfo key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
}
