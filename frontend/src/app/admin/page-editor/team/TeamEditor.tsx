"use client";

import React, { useEffect, useState } from "react";

import {
  Member,
  createMember,
  deleteMember,
  getAllMembers,
  updateMember,
} from "../../../../api/member";
import { Collapsible } from "../../../../components/admin/pageeditor/Collapsible";
import Editor from "../../../../components/admin/pageeditor/Editor";
import { usePageDispatch } from "../../../../components/admin/pageeditor/PageProvider";
import MemberBox from "../../../../components/admin/pageeditor/inputBoxes/MemberBox";

export default function TeamEditor() {
  const dispatch = usePageDispatch();
  const [members, setMembers] = useState<Member[]>([]);

  const setMembersFromDB = () => {
    getAllMembers()
      .then((res) => {
        if (res.success) {
          setMembers([...res.data]);
        } else {
          alert(res.error);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    setMembersFromDB();
  }, []);

  const onSave = (saveMembers: Member[]) => {
    // get most recent mongodb data
    getAllMembers()
      .then((res) => {
        if (res.success) {
          // create "id" -> "member" map for members state
          const memberMap = new Map<string, Member>();
          saveMembers.forEach((m) => {
            memberMap.set(m._id, m);
          });
          // get all ids stored on mongodb
          const ids = res.data.map((m) => m._id);
          // do something for every id in mongodb
          let id;
          while ((id = ids.pop())) {
            if (!memberMap.has(id)) {
              // if map does not have id, delete id from mongodb
              deleteMember(id).catch(console.error);
            } else {
              // if map contains id, update member with id
              const memberAtId = memberMap.get(id);
              updateMember({
                _id: id,
                name: memberAtId?.name ?? "",
                role: memberAtId?.role ?? "",
                ...memberAtId,
              }).catch(console.error);
              memberMap.delete(id); // delete after updating
            }
          }
          // if memberMap still has items, add them
          if (memberMap.size > 0) {
            // for each value (member) left in memberMap
            Array.from(memberMap.values()).forEach((m) => {
              createMember({
                name: m.name,
                role: m.role,
                profilePictureURL: m.profilePictureURL,
              }).catch(console.error);
            });
          }
        }
      })
      .catch(console.error);
  };

  const onCancel = () => {
    // overwrite local members with mongodb members
    setMembersFromDB();
  };

  const handleEditMember = (m: Member, isTextEdit: boolean) => {
    const idx = members.findIndex((_) => _._id === m._id);
    if (idx > -1) {
      // if matching id found
      const _members = [...members]; // shallow copy
      _members[idx] = m; // overwrite matching member
      setMembers(_members); // set with new member
    } else {
      // otherwise append
      const _members = [...members, m];
      setMembers(_members);
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

  const handleRemoveMember = (m: Member) => {
    // filter out member that has id = m._id
    const _members = members.filter((_) => _._id !== m._id);
    // remove member from local state
    setMembers([..._members]);
    // save the page, can't undo a delete
    onSave(_members);
  };

  const handleAddMember = () => {
    // create dummy member to pass to createMember()
    const m: Member = {
      _id: `new-member-${crypto.randomUUID()}`, // will get real mongodb ObjectID if saved
      name: "",
      role: "",
    };
    // append to members
    setMembers([...members, m]);
    // set page isEdited = true
    dispatch({
      type: "set_isEdited",
      setIsEdited: true,
    });
  };

  const membersArray = members;

  return (
    <Editor
      onSave={() => {
        onSave(members);
      }}
      onCancel={onCancel}
      sections={[
        {
          title: "Page Header",
          fieldNames: ["Subtitle", "Header Image Carousel"],
        },
        {
          title: "Section 1",
          fieldNames: ["Section Title", "Body Text"],
        },
      ]}
    >
      <Collapsible title="Section 2">
        <div className="flex flex-col gap-3 items-center">
          {membersArray.map((m, idx) => (
            <MemberBox
              key={m._id}
              idx={idx}
              member={m}
              handleEditMember={handleEditMember}
              handleRemoveMember={handleRemoveMember}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="flex m-4 p-2 w-1/2 justify-center items-center gap-3 rounded text-[#694c97] hover:bg-[#694c9725] hover:border-solid border border-[#694c97] border-dashed border-1 transition-all duration-300"
            onClick={handleAddMember}
          >
            Add Staff
          </button>
        </div>
      </Collapsible>
    </Editor>
  );
}
