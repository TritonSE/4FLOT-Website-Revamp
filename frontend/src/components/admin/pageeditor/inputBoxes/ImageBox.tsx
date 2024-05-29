import { Field } from "../../../../api/pageeditor";
import ImageDropzone from "../../storage/ImageDropzone";

type ImageBoxProps = {
  field: Field;
};

export const ImageBox = ({ field }: ImageBoxProps) => {
  return (
    <div>
      <p className="mb-[2px] text-base font-normal font-['Open Sans']">{field.name}</p>
      <ImageDropzone field={field} />
    </div>
  );
};
