import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Dropzone from "react-dropzone";
import { useUploadFile } from "react-firebase-hooks/storage";

import { Field, ImageData, updatePageData } from "../../../api/pageeditor";
import { createUniqueFilename, deleteFile } from "../../../app/admin/util/pageeditUtil";
import { WarningModule } from "../../../components/WarningModule";
import { usePage, usePageDispatch } from "../pageeditor/PageProvider";

import { DeleteIcon, PhotoIcon, UploadIcon } from "./imageIcons";

type ImageDropProps = {
  field: Field;
};

export default function ImageDropzone({ field }: ImageDropProps) {
  const storage = getStorage();
  const [uploadFile, uploading, snapshot, error] = useUploadFile();
  const accept = {
    "image/*": [".jpeg", ".jpg", ".png"],
  };

  const page = usePage();
  const dispatch = usePageDispatch();
  const folder = page.name.toLowerCase().replace(/\s/g, "");
  const data = field.data as ImageData;
  const hasImage = data.hasImage;

  function handleSetImage(url: string) {
    if (!hasImage) {
      // create shape of new field
      const newField = {
        ...field,
        data: {
          ...data,
          image: url,
          hasImage: true,
        },
      };
      // set image on local state
      dispatch({
        type: "edit_field",
        field: newField,
      });
      // set image on mongodb
      updatePageData(page.name, {
        ...page,
        fields: page.fields.map((f: Field) => (newField.name === f.name ? newField : f)),
      }).catch(console.error);
    }
  }

  // TODO: figure out if edited should be true or false after delete and add
  function handleUnsetImage() {
    // create shape of edited field
    const newField = {
      ...field,
      data: {
        ...data,
        image: "",
        hasImage: false,
      },
    };
    // remove image string from local state
    dispatch({
      type: "edit_field",
      field: newField,
    });
    // remove image string from mongodb
    updatePageData(page.name, {
      ...page,
      fields: page.fields.map((f: Field) => (newField.name === f.name ? newField : f)),
    })
      .then(() => {
        deleteFile(data.image).catch(console.error);
      })
      .catch(console.error);
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

  function onDrop(acceptedFiles: File[]) {
    const image = acceptedFiles[0];
    upload(image)
      .then((url) => {
        handleSetImage(url);
      })
      .catch(console.error);
  }

  if (hasImage) {
    return (
      <div className="flex flex-row items-center w-[469px] h-[56px] px-3 py-2 bg-[#e9eef7] rounded outline outline-1 outline-[#d8d8d8]">
        <PhotoIcon />
        <p className="ml-4 mr-auto text-[#484848] text-sm font-normal font-['Open Sans'] select-none">
          {ref(storage, data.image).name}
        </p>
        <WarningModule
          titleText="Are you sure you want to delete this photo?"
          subtitleText="This action is permanent and cannot be undone."
          cancelText="No, Cancel"
          actionText="Delete Photo"
          action={handleUnsetImage}
        >
          <DeleteIcon />
        </WarningModule>
      </div>
    );
  } else {
    return (
      <div className="m-0 p-0 w-[469px] h-[56px]">
        <Dropzone
          accept={accept}
          onDrop={(acceptedFiles) => {
            onDrop(acceptedFiles);
          }}
          disabled={hasImage || uploading}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: "dropzone w-full h-full" })}>
              <input {...getInputProps()} />
              <div className="m-0 flex flex-row items-center w-full h-full px-3 py-2 bg-violet-100 rounded outline-dashed outline-1 outline-sky-600 cursor-pointer">
                <PhotoIcon color="#B4B4B4" />
                <div className="ml-4 mr-auto text-sky-600 text-sm font-normal font-['Open Sans'] select-none">
                  {uploading ? (
                    <p className="m-0 p-0 animate-bounce text-sky-800">Uploading...</p>
                  ) : (
                    "Add a Photo"
                  )}
                </div>
                <UploadIcon color="#0370BB" />
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
