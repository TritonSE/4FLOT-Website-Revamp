import Editor from "../../../../components/admin/pageeditor/Editor";

export default function AboutEditor() {
  return (
    <Editor
      sections={[
        {
          title: "Page Subtitle",
          fieldNames: ["Subtitle", "Header Image Carousel"],
        },
        {
          title: "Section 1 - Our Mission",
          fieldNames: ["Mission Section Title", "Mission Body Text", "Mission Section Image"],
        },
        {
          title: "Section 2 - Our Team",
          fieldNames: ["Team Section Title", "Team Body Text", "Team Section Image"],
        },
        {
          title: "Section 3 - Contact Us",
          fieldNames: ["Contact Section Title", "Contact Body Text", "Contact Section Image"],
        },
      ]}
    />
  );
}
