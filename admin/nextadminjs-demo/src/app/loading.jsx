import React from "react";
import Spinner from "./components/Spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
      <Spinner />
    </div>
  );
}
