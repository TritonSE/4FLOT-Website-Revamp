import React from "react";

import BackgroundHeader from "./BackgroundHeader";
import WhiteCard from "./WhiteCard";

export default function Impact() {
  return (
    <main style={{ backgroundColor: "#F9F9F9" }}>
      <BackgroundHeader />
      {/* White Cards */}
      <WhiteCard
        imageUrl="/testimonials.png"
        title="Testimonals"
        description="Lorem ipsum dolor sit amet consectetur. Et vestibulum enim nunc ultrices. Donec blandit sollicitudin vitae integer mauris sed. Mattis duis id viverra suscipit morbi."
        verticalPosition="30.4823%"
      />
      <WhiteCard
        imageUrl="/Newsletter.png"
        title="Newsletter"
        description="Your support and contributions will enable us to meet our goals and improve conditions. Your generous donation will fund our mission."
        verticalPosition="51.6484%"
      />
    </main>
  );
}
