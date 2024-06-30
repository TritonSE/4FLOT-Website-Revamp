import Editor from "../../../../components/admin/pageeditor/Editor";

export default function PastEventsEditor() {
  return (
    <Editor
      sections={[
        {
          title: "Page Header",
          fieldNames: ["Subtitle", "Header Image Carousel"],
        },
        {
          title: "Section 1",
          fieldNames: ["Section Title", "Section Subtitle"],
        },
      ]}
    />
  );
}
