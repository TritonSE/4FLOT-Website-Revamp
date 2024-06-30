import { generateFieldMap } from "../../../app/admin/util/pageeditUtil";

import { Collapsible } from "./Collapsible";
import { usePage } from "./PageProvider";
import { GalleryBox } from "./inputBoxes/GalleryBox";
import { ImageBox } from "./inputBoxes/ImageBox";
import { TextFieldBox } from "./inputBoxes/TextFieldBox";

type CollapsibleFieldsType = {
  title: string;
  fieldNames: string[];
};

export const CollapsibleFields = ({ title, fieldNames }: CollapsibleFieldsType) => {
  const page = usePage();

  // Convert a list of names to a list of Field objects with a hashmap
  const fieldMap = generateFieldMap(page);
  const fields = fieldNames.map((name) => {
    const mappedIndex = fieldMap.get(name);
    if (mappedIndex === undefined) {
      throw new Error(`Error: ${name} is not a valid field on page ${page.name}`);
    }

    return page.fields[mappedIndex];
  });

  return (
    <Collapsible title={title}>
      <div className="my-4" />
      {fields.map((field) => {
        switch (field.type) {
          case "text": {
            return <TextFieldBox field={field} key={`${title}: ${field.name}`} />;
          }
          case "image": {
            return <ImageBox field={field} key={`${title}: ${field.name}`} />;
          }
          case "gallery": {
            return <GalleryBox field={field} key={`${title}: ${field.name}`} />;
          }
          default: {
            throw new Error("Error: Unrecognized collapsible field");
          }
        }
      })}
    </Collapsible>
  );
};
