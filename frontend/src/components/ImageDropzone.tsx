"use client"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import {MdFileUpload} from 'react-icons/md';
import {useStorage} from 'reactfire';
type FileDropzoneProps = {
  setImages: (images: string[]) => void;
  type: string;
}
export default function FileDropzone({ setImages, type }: FileDropzoneProps) {

  const storage = useStorage();
  const [uploading, setUploading] = useState(false);

  async function uploadImageToFirebase(file: File) {
      setUploading(true);
      const storageRef = ref(storage, `${type}/${file.name}`);
      try {
          const uploadResult = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(uploadResult.ref);
          setImages((images) => [...images, downloadURL]);
      } catch (error) {
          console.error("Error uploading file:", error);
      } finally {
          setUploading(false);
      }
  }

 
return (
  <Dropzone onDrop={acceptedFiles => uploadImageToFirebase(acceptedFiles[0])}>
      {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: 'dropzone' })} className="w-150 h-150 flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-lg bg-gray-100 cursor-pointer hover:border-gray-500">
              <input {...getInputProps()} />
              <MdFileUpload size="24px" className="text-gray-700" /> {/* Arrow icon */}
              {uploading ? <p className="text-gray-700">Uploading...</p> : <p className="text-gray-700">Upload an Image</p>}
          </div>
      )}
  </Dropzone>
);
}