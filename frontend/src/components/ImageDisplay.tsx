"use client"

import Image from "next/image";
import { useState } from "react";

import ImageDropzone from "./ImageDropzone";


export default function ImageDisplay() {
    const [images, setImages] = useState<string[]>([]);
  
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
          <ImageDropzone setImages={setImages} />
        </div>
      </div>
    );
  }