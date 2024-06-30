"use client";

import React, { useEffect, useState } from "react";

import { Member, getAllMembers } from "../../../api/member";
import { getPageData } from "../../../api/pageeditor";
import { generatePageMap } from "../../../app/admin/util/pageeditUtil";
import BackgroundHeader from "../../../components/BackgroundHeader";
import MemberInfo from "../../../components/MemberInfo";
import LoadingSpinner from "../../../components/admin/LoadingSpinner";

import styles from "./page.module.css";

export default function Team() {
  const [members, setMembers] = useState<Member[]>([]);
  const [pageMap, setPageMap] = useState<Map<string, string | string[]>>();
  const [loading, setLoading] = useState(false);

  const loadMembers = () => {
    setLoading(true);
    getAllMembers()
      .then((result) => {
        if (result.success) {
          setMembers(result.data);
        } else {
          alert(result.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
  };

  const loadPage = () => {
    setLoading(true);
    getPageData("team")
      .then((response) => {
        if (response.success) setPageMap(generatePageMap(response.data));
        else throw new Error(response.error);
      })
      .catch((error) => {
        alert(error);
      });
    setLoading(false);
  };

  useEffect(() => {
    loadMembers();
    loadPage();
  }, []);

  if (loading || !pageMap) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <BackgroundHeader
        backgroundImageURIs={pageMap.get("Header Image Carousel") as string[]}
        header="OUR TEAM"
        title="Meet Our Team"
        description={pageMap.get("Subtitle") as string}
      />
      <div className={styles.text}>
        <div className={styles.subtitle}>{pageMap.get("Section Title") as string}</div>
        {/* <div>Hello.</div> */}
        {/* <div>👋</div> */}
        <p className={styles.description}>{pageMap.get("Body Text") as string}</p>
      </div>
      <div className={styles.membersContainer}>
        {members.map((member) => (
          <MemberInfo key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
}
