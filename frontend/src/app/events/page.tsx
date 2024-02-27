"use client";
import Image from "next/image";
import React from "react";

import EventsList from "../components/EventsList";

import styles from "./page.module.css";

import VolunteerPopup from "../components/VolunteerPopup";
import { useState } from "react";

export default function UpcomingEvents() {
  const [popupOpen, setPopup] = useState(true);
  return (
    <VolunteerPopup open={popupOpen} setOpen={setPopup} />

  );
}
