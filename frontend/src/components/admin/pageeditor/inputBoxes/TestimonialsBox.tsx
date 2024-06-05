import { TextareaAutosize } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

import { Testimonial, updateTestimonial } from "../../../../api/testimonial";
import { deleteFile } from "../../../../app/admin/util/pageeditUtil";
import { WarningModule } from "../../../WarningModule";
import SimpleImageDropzone from "../../storage/SimpleImageDropzone";

type TestimonialsBoxProps = {
  idx: number;
  testimonial: Testimonial;
  handleEdit: (t: Testimonial, isTextEdit: boolean) => void;
  handleRemove: (t: Testimonial) => void;
};

export default function TestimonialsBox({
  idx,
  testimonial,
  handleEdit,
  handleRemove,
}: TestimonialsBoxProps) {
  const [testimonialState, setTestimonialState] = useState(testimonial);

  const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedTestimonial = {
      ...testimonial,
      title: e.target.value,
    };
    handleEdit(updatedTestimonial, true);
    setTestimonialState(updatedTestimonial);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedTestimonial = {
      ...testimonial,
      description: e.target.value,
    };
    handleEdit(updatedTestimonial, true);
    setTestimonialState(updatedTestimonial);
  };

  const handleSetUrl = (_url: string) => {
    const updatedTestimonial = {
      ...testimonial,
      image: _url,
    };
    // update members directly to avoid having
    // member URL point to an image that doesn't exist
    handleEdit(updatedTestimonial, false);
    updateTestimonial(updatedTestimonial).catch(console.error);
    setTestimonialState(updatedTestimonial);
  };

  const handleDelete = () => {
    // if url exists and is not "" delete it
    if (testimonialState.image && testimonialState.image !== "") {
      deleteFile(testimonialState.image).catch(console.error);
    }
    // set mongodb url to ""
    handleRemove(testimonialState);
  };

  let titleLabel, descLabel;
  if (testimonial.type === "quote") {
    titleLabel = "Testimonial Title";
    descLabel = "Testimonial Description";
  } else if (testimonial.type === "event") {
    titleLabel = "Event Title";
    descLabel = "Event Description";
  }

  return (
    <div className="group flex flex-row w-full h-auto mt-4">
      <div className="w-min h-full flex flex-row">
        <WarningModule
          titleText={`Are you sure you want to delete this ${testimonial.type}?`}
          subtitleText="This action is permanent and cannot be undone."
          cancelText="No, cancel"
          actionText="Delete"
          action={handleDelete}
        >
          <svg
            className="scale-0 group-hover:scale-75 pr-1 transition-all duration-200 ease-in-out"
            width={21.82}
            height={23}
            viewBox="0 0 21.82 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            // transform="translate(0, 1.5)"
          >
            <path
              d="M1.85502 2.03333C1.40979 2.03333 0.982791 2.19488 0.667964 2.48244C0.353137 2.76999 0.17627 3.16 0.17627 3.56667V5.1C0.17627 5.50667 0.353137 5.89667 0.667964 6.18423C0.982791 6.47179 1.40979 6.63333 1.85502 6.63333H2.6944V20.4333C2.6944 21.2467 3.04813 22.0267 3.67778 22.6018C4.30744 23.1769 5.16143 23.5 6.0519 23.5H16.1244C17.0149 23.5 17.8689 23.1769 18.4985 22.6018C19.1282 22.0267 19.4819 21.2467 19.4819 20.4333V6.63333H20.3213C20.7665 6.63333 21.1935 6.47179 21.5083 6.18423C21.8232 5.89667 22 5.50667 22 5.1V3.56667C22 3.16 21.8232 2.76999 21.5083 2.48244C21.1935 2.19488 20.7665 2.03333 20.3213 2.03333H14.4456C14.4456 1.62667 14.2688 1.23666 13.954 0.949103C13.6391 0.661547 13.2121 0.5 12.7669 0.5H9.4094C8.96416 0.5 8.53717 0.661547 8.22234 0.949103C7.90751 1.23666 7.73065 1.62667 7.73065 2.03333H1.85502ZM6.89127 8.16667C7.11389 8.16667 7.32738 8.24744 7.4848 8.39122C7.64221 8.535 7.73065 8.73 7.73065 8.93333V19.6667C7.73065 19.87 7.64221 20.065 7.4848 20.2088C7.32738 20.3526 7.11389 20.4333 6.89127 20.4333C6.66865 20.4333 6.45516 20.3526 6.29774 20.2088C6.14033 20.065 6.0519 19.87 6.0519 19.6667V8.93333C6.0519 8.73 6.14033 8.535 6.29774 8.39122C6.45516 8.24744 6.66865 8.16667 6.89127 8.16667ZM11.0881 8.16667C11.3108 8.16667 11.5243 8.24744 11.6817 8.39122C11.8391 8.535 11.9275 8.73 11.9275 8.93333V19.6667C11.9275 19.87 11.8391 20.065 11.6817 20.2088C11.5243 20.3526 11.3108 20.4333 11.0881 20.4333C10.8655 20.4333 10.652 20.3526 10.4946 20.2088C10.3372 20.065 10.2488 19.87 10.2488 19.6667V8.93333C10.2488 8.73 10.3372 8.535 10.4946 8.39122C10.652 8.24744 10.8655 8.16667 11.0881 8.16667ZM16.1244 8.93333V19.6667C16.1244 19.87 16.036 20.065 15.8786 20.2088C15.7211 20.3526 15.5076 20.4333 15.285 20.4333C15.0624 20.4333 14.8489 20.3526 14.6915 20.2088C14.5341 20.065 14.4456 19.87 14.4456 19.6667V8.93333C14.4456 8.73 14.5341 8.535 14.6915 8.39122C14.8489 8.24744 15.0624 8.16667 15.285 8.16667C15.5076 8.16667 15.7211 8.24744 15.8786 8.39122C16.036 8.535 16.1244 8.73 16.1244 8.93333Z"
              fill="#B93B3B"
            />
          </svg>
        </WarningModule>
        <p>{idx + 1}.&nbsp;</p>
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className="w-full mb-2">
          <p className="mb-[2px] text-base font-normal font-['Open Sans']">{titleLabel}</p>
          <TextareaAutosize
            className="flex flex-row items-center w-full h-[56px] px-3 py-2 bg-[#e9eef7] rounded outline outline-1 outline-[#d8d8d8] resize-none"
            onChange={handleChangeTitle}
            value={testimonial.title}
          />
        </div>
        <div className="w-full mb-2">
          <p className="mb-[2px] text-base font-normal font-['Open Sans']">{descLabel}</p>
          <TextareaAutosize
            className="flex flex-row items-center w-full h-[56px] px-3 py-2 bg-[#e9eef7] rounded outline outline-1 outline-[#d8d8d8] resize-none"
            onChange={handleChangeDescription}
            value={testimonial.description}
          />
        </div>
        <div className="w-[469px] mb-2">
          <p className="mb-[2px] text-base font-normal font-['Open Sans']">Image</p>
          <SimpleImageDropzone url={testimonialState.image} setUrl={handleSetUrl} />
        </div>
      </div>
    </div>
  );
}
