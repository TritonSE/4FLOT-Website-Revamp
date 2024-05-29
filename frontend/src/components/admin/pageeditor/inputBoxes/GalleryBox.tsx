import { Reorder } from "framer-motion";
import Image from "next/image";
import { HiMiniMinusCircle } from "react-icons/hi2";

import { Field, GalleryData, updatePageData } from "../../../../api/pageeditor";
import { deleteFile } from "../../../../app/admin/util/pageeditUtil";
import DeleteModal from "../../storage/DeleteModal";
import GalleryDropzone from "../../storage/GalleryDropzone";
import { usePage, usePageDispatch } from "../PageProvider";

import styles from "./GalleryBox.module.css";

type GalleryBoxProps = { field: Field };

type GalleryImageProps = {
  imageUrl: string;
  handleDelete: () => void;
};

const GalleryImage = ({ imageUrl, handleDelete }: GalleryImageProps) => {
  return (
    <>
      <div className="w-44 h-44 flex justify-center items-center overflow-hidden shadow outline outline-gray-300/80 rounded-lg">
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt="Image gallery slot"
            layout="fill"
            objectFit="cover"
            className="absolute rounded-lg"
            sizes="33vw"
            draggable="false"
          />
        </div>
      </div>
      <div className="relative translate-x-[163px] -translate-y-[194px]">
        <DeleteModal handleDelete={handleDelete} disabled={false}>
          <HiMiniMinusCircle
            color="#B93B3B"
            className="w-8 h-8 hover:w-9 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:h-9 transition-all duration-300"
          />
        </DeleteModal>
      </div>
    </>
  );
};

export const GalleryBox = ({ field }: GalleryBoxProps) => {
  const page = usePage();
  const dispatch = usePageDispatch();
  const data = field.data as GalleryData;
  const imageCount = data.images.length;
  const hasMax = imageCount > 0;
  const maxImages = data.maxImages;

  function handleUpdateOrder(newOrder: string[]) {
    dispatch({
      type: "edit_field",
      setIsEdited: true,
      field: {
        ...field,
        data: {
          ...data,
          images: newOrder,
        },
      },
    });
  }

  function handleDelete(imageUrl: string) {
    // create shape of the edited field
    const newField = {
      ...field,
      data: {
        ...data, // remove the idx with imageUrl
        images: data.images.filter((url) => url !== imageUrl),
      },
    };
    // remove image from local state
    dispatch({
      type: "edit_field",
      setIsEdited: false,
      field: newField,
    });
    // remove image from mongodb
    updatePageData(page.name, {
      ...page,
      isEdited: false,
      fields: page.fields.map((f: Field) => (newField.name === f.name ? newField : f)),
    })
      .then(() => {
        deleteFile(imageUrl).catch(console.error);
      })
      .catch(console.error);
  }

  return (
    <div>
      <p className={styles.subtitle}>{field.name}</p>
      <Reorder.Group axis="x" values={data.images} onReorder={handleUpdateOrder}>
        <div className="flex flex-wrap gap-5 lg:gap-12 border-2 lg:justify-start md:justify-evenly border-gray-300/80 rounded-xl p-4">
          {data.images.map((imageUrl) => (
            <Reorder.Item key={imageUrl.split("&token=")[1]} value={imageUrl}>
              <div className="w-44 h-44 cursor-grab active:cursor-grabbing active:scale-110 transition-all duration-200">
                <GalleryImage
                  imageUrl={imageUrl}
                  handleDelete={() => {
                    handleDelete(imageUrl);
                  }}
                />
              </div>
            </Reorder.Item>
          ))}
          <div className="w-44 h-44 flex flex-col justify-center items-center rounded-lg hover:bg-gray-100 hover:shadow-xl outline outline-3 outline-transparent hover:outline-gray-300/80 transition-all duration-500 cursor-pointer">
            <GalleryDropzone field={field} />
          </div>
        </div>
      </Reorder.Group>
      {hasMax && (
        <p className="mt-2 font-normal font-['Open Sans'] leading-none">{`${imageCount}/${maxImages} Images`}</p>
      )}
    </div>
  );
};
