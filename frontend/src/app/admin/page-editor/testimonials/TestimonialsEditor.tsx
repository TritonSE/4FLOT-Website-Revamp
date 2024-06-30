"use client";

import React, { useEffect, useState } from "react";

import {
  Testimonial,
  createTestimonial,
  deleteTestimonial,
  getAllTestimonials,
  updateTestimonial,
} from "../../../../api/testimonial";
import { Collapsible } from "../../../../components/admin/pageeditor/Collapsible";
import { CollapsibleFields } from "../../../../components/admin/pageeditor/CollapsibleFields";
import Editor from "../../../../components/admin/pageeditor/Editor";
import { usePageDispatch } from "../../../../components/admin/pageeditor/PageProvider";
import TestimonialsBox from "../../../../components/admin/pageeditor/inputBoxes/TestimonialsBox";

export default function TestimonialsEditor() {
  const dispatch = usePageDispatch();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const setTestimonialsFromDB = () => {
    getAllTestimonials()
      .then((res) => {
        if (res.success) {
          setTestimonials([...res.data]);
        } else {
          alert(res.error);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    setTestimonialsFromDB();
  }, []);

  const onSave = (saveTestimonials: Testimonial[]) => {
    // get most recent mongodb data
    getAllTestimonials()
      .then((res) => {
        if (res.success) {
          // update testimonials in the same way as in page-editor/team/TeamEditor.tsx
          const testimonialMap = new Map<string, Testimonial>();
          saveTestimonials.forEach((t) => {
            testimonialMap.set(t._id, t);
          });
          const ids = res.data.map((t) => t._id);
          let id;
          while ((id = ids.pop())) {
            if (!testimonialMap.has(id)) {
              deleteTestimonial(id).catch(console.error);
            } else {
              const testimonialAtId = testimonialMap.get(id);
              updateTestimonial({
                _id: id,
                title: testimonialAtId?.title ?? "",
                description: testimonialAtId?.description ?? "",
                image: testimonialAtId?.image ?? "",
                type: testimonialAtId?.type ?? "",
              }).catch(console.error);
              testimonialMap.delete(id);
            }
          }
          if (testimonialMap.size > 0) {
            Array.from(testimonialMap.values()).forEach((t) => {
              createTestimonial({
                title: t.title,
                description: t.description,
                image: t.image,
                type: t.type,
              }).catch(console.error);
            });
          }
        }
      })
      .catch(console.error);
  };

  const onCancel = () => {
    // overwrite local testimonials with mongodb testimonials
    setTestimonialsFromDB();
  };

  const handleEdit = (t: Testimonial, isTextEdit: boolean) => {
    const idx = testimonials.findIndex((_) => _._id === t._id);
    if (idx > -1) {
      // if matching id found
      const _testimonials = [...testimonials]; // shallow copy
      _testimonials[idx] = t; // overwrite matching testimonial
      setTestimonials(_testimonials); // set with new testimonial
    } else {
      // otherwise append
      const _testimonials = [...testimonials, t];
      setTestimonials(_testimonials);
    }
    // image url edits do not set isEdited
    if (isTextEdit) {
      // set page isEdited = true
      dispatch({
        type: "set_isEdited",
        setIsEdited: true,
      });
    }
  };

  const handleRemove = (t: Testimonial) => {
    // filter out testimonial that has id = m._id
    const _testimonials = testimonials.filter((_) => _._id !== t._id);
    // remove testimonial from local state
    setTestimonials([..._testimonials]);
    // save the page, can't undo a delete
    onSave(_testimonials);
  };

  const handleAddQuote = () => {
    // create dummy quote to pass to createMember()
    const t: Testimonial = {
      _id: `new-quote-${crypto.randomUUID()}`, // will get real mongodb ObjectID if saved
      title: "",
      description: "",
      image: "",
      type: "quote",
    };
    // append to members
    setTestimonials([...testimonials, t]);
    // set page isEdited = true
    dispatch({
      type: "set_isEdited",
      setIsEdited: true,
    });
  };

  const handleAddEvent = () => {
    // create dummy quote to pass to createMember()
    const t: Testimonial = {
      _id: `new-event-${crypto.randomUUID()}`, // will get real mongodb ObjectID if saved
      title: "",
      description: "",
      image: "",
      type: "event",
    };
    // append to members
    setTestimonials([...testimonials, t]);
    // set page isEdited = true
    dispatch({
      type: "set_isEdited",
      setIsEdited: true,
    });
  };

  return (
    <Editor
      onSave={() => {
        onSave(testimonials);
      }}
      onCancel={onCancel}
      sections={[
        {
          title: "Page Header",
          fieldNames: ["Subtitle", "Header Image Carousel"],
        },
        {
          title: "Section 1",
          fieldNames: ["Stories Section Title", "Stories Body Text"],
        },
      ]}
    >
      <Collapsible title="Section 2">
        <div className="flex flex-col gap-3 items-center">
          {testimonials
            .filter((t) => t.type === "quote")
            .map((t, idx) => (
              <TestimonialsBox
                key={t._id}
                idx={idx}
                testimonial={t}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
              />
            ))}
        </div>
        <div className="flex justify-center">
          <button
            className="flex m-4 p-2 w-1/2 justify-center items-center gap-3 rounded text-[#694c97] hover:bg-[#694c9725] hover:border-solid border border-[#694c97] border-dashed border-1 transition-all duration-300"
            onClick={handleAddQuote}
          >
            Add Testimonial
          </button>
        </div>
      </Collapsible>
      <CollapsibleFields
        title={"Section 3"}
        fieldNames={["Events Section Title", "Events Body Text"]}
      />
      <Collapsible title="Section 4">
        <div className="flex flex-col gap-3 items-center">
          {testimonials
            .filter((t) => t.type === "event")
            .map((t, idx) => (
              <TestimonialsBox
                key={t._id}
                idx={idx}
                testimonial={t}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
              />
            ))}
        </div>
        <div className="flex justify-center">
          <button
            className="flex m-4 p-2 w-1/2 justify-center items-center gap-3 rounded text-[#694c97] hover:bg-[#694c9725] hover:border-solid border border-[#694c97] border-dashed border-1 transition-all duration-300"
            onClick={handleAddEvent}
          >
            Add Event
          </button>
        </div>
      </Collapsible>
    </Editor>
  );
}
