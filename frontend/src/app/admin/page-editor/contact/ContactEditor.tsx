import Editor from "../../../../components/admin/pageeditor/Editor";

export default function ContactEditor() {
  return (
    <Editor
      sections={[
        {
          title: "Section 1",
          fieldNames: ["Section Title", "Body Text"],
        },
        {
          title: "Section 2",
          fieldNames: ["Phone Number", "Locations", "Email"],
        },
      ]}
    />
  );
}
