import Editor from "../../../../components/admin/pageeditor/Editor";

export default function ImpactEditor() {
  return (
    <Editor
      sections={[
        {
          title: "Page Header",
          fieldNames: ["Subtitle", "Header Image Carousel"],
        },
        {
          title: "Section 1 - Testimonials",
          fieldNames: ["Testimonials Subtitle"],
        },
        {
          title: "Section 2 - Newsletter",
          fieldNames: ["Newsletter Subtitle"],
        },
      ]}
    />
  );
}
