import React, { useState } from 'react';

import styles from "./MemberList.module.css";

//Make an iterface for my props, take in a name - string, role - string, and profilePictureURL - string
type MemberInfoProps = {
    key: string;
    idx: string;
    name: string;
    role: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const MembersList = ({ idx, name, role, onChange }: MemberInfoProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Auto increase height when typing
        event.target.style.height = "auto";
        event.target.style.height = 2 + event.target.scrollHeight + "px";
        // Call onChange function
        onChange(event);
        console.log(idx)
    };


    return (
        <div>
            <p>{idx}</p>
            <p> name: </p>
            <textarea
                id={idx+": name"}
                onInput={handleChange} // Make sure to properly handle the event
                value={name}
            ></textarea>
            <p>role: </p>
            <textarea
                id={idx+ ": role"}
                onInput={handleChange} // As above, ensure event handling is correct
                value={role}
            ></textarea>
        </div>
    );
};
  
export default MembersList;
