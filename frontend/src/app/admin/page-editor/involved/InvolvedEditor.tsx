import Editor from "../../../../components/admin/pageeditor/Editor";

export default function InvolvedEditor() {
  return (
    <Editor
      sections={[
        {
          title: "Page Header",
          fieldNames: ["Subtitle", "Header Image Carousel"],
        },
        {
          title: "Section 1 - Upcoming Events",
          fieldNames: ["Upcoming Events Subtitle"],
        },
        {
          title: "Section 2 - Past Events",
          fieldNames: ["Past Events Subtitle"],
        },
        {
          title: "Section 3 - Donate",
          fieldNames: ["Donations Subtitle"],
        },
      ]}
    />
  );
}
