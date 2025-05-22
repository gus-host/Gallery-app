// src/app/collections/[collection]/edit/page.tsx
import EditCollectionForm from "@/components/EditCollectionForm";
import React from "react";

export type Params = {
  collection: string;
};

export default async function Page(
  { params }: { params: Promise<Params> } // params comes in as Promise
) {
  // Await the params promise
  const { collection } = await params;

  return (
    <div className="my-[100px] px-4">
      <EditCollectionForm collectionId={collection} />
    </div>
  );
}
