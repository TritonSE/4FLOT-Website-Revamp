"use client"

import Image from "next/image";
import { useState } from "react";

import { UploadImageTypes } from "./Collapsable";
import ImageDropzone from "./ImageDropzone";


type ImageDisplayProps = {
  type : UploadImageTypes
  images: string[]
  setImages : (images: string[]) => void
}


export default function ImageDisplay({type, images, setImages} : ImageDisplayProps) { 
  
    return (
      <div className="flex flex-wrap gap-4 border-2 border-gray-300 rounded-lg p-4">
        {images.map((image, index) => (
          <div key={index} className="w-48 h-48 flex justify-center items-center overflow-hidden">
            <div className="relative w-full h-full">
              <Image
              src={image}
                alt={`Image ${index}`}
                layout="fill"
                objectFit="cover"
                className="absolute"
              />
            </div>
          </div>
        ))}
        <div className="w-48 h-48 flex justify-center items-center">
          <ImageDropzone setImages={setImages}
          type = {type} />
        </div>
      </div>
    );
  }