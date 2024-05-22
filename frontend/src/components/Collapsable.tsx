"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import styles from "./Collapsable.module.css";
import ImageDisplay from "./ImageDisplay";


export enum UploadImageTypes {
  SPONSORS = "Sponsors",
  OUR_MISSION = "Our_Mission",
  OUR_TEAM = "Our_Team",
  CONTACT_US = "Contact_Us"
}


type CollapsableProps = {
  title: string;
  subsection: string[];
  textbox: string[];
  imageUploadBox: UploadImageTypes | undefined;
  images: string[] | undefined;
  setImages : (images: string[]) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const Collapsable = ({ title, subsection, textbox, onChange, imageUploadBox, images, setImages }: CollapsableProps) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleSection = () => {
    setOpen(!open);
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Auto increase height when typing
    if(event && event.target){
    event.target.style.height = "auto";
    event.target.style.height = 2 + event.target.scrollHeight + "px";
    }
    // Call onChange function
    onChange(event);
  };

  useEffect(() => { 
    if(images){ //mark change in page when image is uploaded
    handleChange({} as React.ChangeEvent<HTMLTextAreaElement>);
    }
  }, [images])

  return (
    <div>
      <button onClick={toggleSection} className={styles.collapsible}>
        {open && (
          <Image
            style={{ transform: "rotate(180deg)" }}
            src="/ic_caretdown.svg"
            alt="^"
            width={24}
            height={24}
          />
        )}
        {!open && <Image src="/ic_caretdown.svg" alt="^" width={24} height={24} />}
        <a className={styles.title}>{title}</a>
      </button>
      {open && (
        <div className={styles.content}>
          {subsection.map((subtitle, index) => {
            const text = textbox[index];
            return (
              <div key={subtitle}>
                <p className={styles.subtitle}>{subtitle}</p>
                <textarea
                  className={styles.basicInput}
                  onInput={handleChange}
                  id={title + ": " + subtitle}
                  value={text}
                ></textarea>
              </div>
            );
          })}
          {imageUploadBox &&
           <div >
           <p className={styles.subtitle}>Image Upload</p>
           <ImageDisplay
            type = {imageUploadBox} 
            images = {images} setImages = {setImages}/> 
           </div>}
        </div>
      )}
    </div>
  );
};

export default Collapsable;
