"use client";

import React, { useEffect, useState } from "react";

import { Testimonial, getAllTestimonials } from "../../api/testimonial";

import Card from "./card";

export default function Impact() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    getAllTestimonials()
      .then((result) => {
        if (result.success) {
          //console.log(result.data);
          setTestimonials(result.data);
        } else {
          alert(result.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <main className="flex flex-col px-24">
      <h1 className="text-4xl font-bold underline">Impact</h1>
      <div className="grid grid-cols-3 gap-y-10">
        {testimonials.map((testimonial) => (
          <Card key={testimonial._id} testimonial={testimonial} />
        ))}
      </div>
    </main>
  );
}
