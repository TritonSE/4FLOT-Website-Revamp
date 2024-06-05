import Editor from "../../../../components/admin/pageeditor/Editor";

export default function MissionEditor() {
  return (
    <Editor
      sections={[
        {
          title: "Page Subtitle",
          fieldNames: ["Subtitle", "Header Image Carousel"],
        },
        {
          title: "Section 1",
          fieldNames: [
            "Values Section Title",
            "Value #1",
            "Value #1 Description",
            "Value #2",
            "Value #2 Description",
            "Value #3",
            "Value #3 Description",
          ],
        },
        {
          title: "Section 2",
          fieldNames: ["Story Section Title", "Body Text", "Image Gallery"],
        },
      ]}
    />
  );
}
