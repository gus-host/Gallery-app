// src/app/api/collections/[collection]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string }> } // params is now a Promise
) {
  try {
    // Await params to get the actual params object
    const { collection } = await params;

    // Find by either id or slug
    const col = await prisma.collection.findFirst({
      where: {
        OR: [{ id: collection }, { slug: collection }],
      },
      include: { favorites: true },
    });

    if (!col) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(col);
  } catch (error) {
    console.error("Error fetching collection:", error);
    return NextResponse.json(
      { error: "Failed to fetch collection" },
      { status: 500 }
    );
  }
}
