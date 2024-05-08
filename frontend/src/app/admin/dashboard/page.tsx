"use client";

import { usePrivatePage } from "../util/hooks";

import UserIcon from "@/components/UserIcon";

// Admin Dashboard landing page
export default function Dashboard() {
  usePrivatePage();

  return (
    <div className="p-4">
      <UserIcon />
    </div>
  );
}
