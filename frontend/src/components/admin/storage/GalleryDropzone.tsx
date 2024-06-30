"use client";

import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React from "react";
import Dropzone from "react-dropzone";
import { useUploadFile } from "react-firebase-hooks/storage";

import { Field, GalleryData, updatePageData } from "../../../api/pageeditor";
import { createUniqueFilename } from "../../../app/admin/util/pageeditUtil";
import { usePage, usePageDispatch } from "../pageeditor/PageProvider";

import { UploadIcon } from "./imageIcons";

type GalleryDropProps = {
  field: Field;
};

type IconTextProps = {
  capped: boolean;
  uploading: boolean;
  disabled: boolean;
};

function IconAndText({ capped, uploading, disabled }: IconTextProps) {
  const color = disabled ? "#D2D2D2" : "#0370BB";
  let message;
  if (capped) {
    message = "Maximum Reached";
  } else if (uploading) {
    message = "Uploading...";
  } else {
    message = "Add a Photo";
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <UploadIcon color={color} />
      <p
        className={
          `font-normal font-['Open Sans'] leading-none text-center` +
          (disabled ? " text-[#D8D8D8]" : " text-[#0370BB]")
        }
      >
        {message}
      </p>
    </div>
  );
}

export default function GalleryDropzone({ field }: GalleryDropProps) {
  const storage = getStorage();
  const [uploadFile, uploading, error] = useUploadFile();
  const accept = {
    "image/*": [".jpeg", ".jpg", ".png"],
  };

  const page = usePage();
  const dispatch = usePageDispatch();
  const folder = page.name.toLowerCase().replace(/\s/g, "");
  const data = field.data as GalleryData;

  const hasMax = data.maxImages > 0;
  const capped = hasMax && data.images.length >= data.maxImages;
  const disabled = capped || uploading;

  function handleAddImages(urls: string[]) {
    // create shape for new field
    const newField = {
      ...field,
      data: {
        ...data,
        images: [...data.images, ...urls],
      },
    };
    // add image to local state
    dispatch({
      type: "edit_field",
      field: newField,
    });
    // add image to mongodb
    updatePageData(page.name, {
      ...page,
      // replace newField into page
      fields: page.fields.map((f: Field) => (newField.name === f.name ? newField : f)),
    }).catch(console.error);
  }

  async function upload(file: File) {
    // Upload file at reference in Firebase storage then get its URL
    const fname = await createUniqueFilename(folder, file.name);
    const storageRef = ref(storage, `${folder}/${fname}`);
    await uploadFile(storageRef, file);
    const url = await getDownloadURL(storageRef);

    if (error) console.error(error);

    return url;
  }

  async function uploadFiles(files: File[]) {
    const urls = await Promise.all(
      files.map((file) => {
        return upload(file);
      }),
    );

    return urls;
  }

  function onDrop(files: File[]) {
    uploadFiles(files)
      .then((urls) => {
        if (urls) {
          handleAddImages(urls);
        }
      })
      .catch(console.error);
  }

  return (
    <div className="m-0 p-0">
      <Dropzone
        accept={accept}
        onDrop={(files) => {
          onDrop(files);
        }}
        disabled={disabled}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <IconAndText capped={capped} uploading={uploading} disabled={disabled} />
          </div>
        )}
      </Dropzone>
    </div>
  );
}
