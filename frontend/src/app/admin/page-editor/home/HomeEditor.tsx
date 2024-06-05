import Editor from "../../../../components/admin/pageeditor/Editor";

export default function HomeEditor() {
  return (
    <Editor
      sections={[
        {
          title: "Page Header",
          fieldNames: ["Subtitle", "Header Image Carousel"],
        },
        {
          title: "Section 1",
          fieldNames: ["Events Section Title", "Events Body Text"],
        },
        {
          title: "Section 2",
          fieldNames: ["Sponsors Section Title", "Sponsors Body Text", "Sponsor Image Gallery"],
        },
      ]}
    />
  );
}
