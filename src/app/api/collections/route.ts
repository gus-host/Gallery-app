// src/app/api/collections/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Fetch collections belonging to this user
    // after
    const collections = await prisma.collection.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        slug: true,
        createdAt: true,
        _count: { select: { favorites: true } }, // ← correct relation name
      },
    });

    return NextResponse.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      { error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId, name, slug, favoriteIds } = await req.json();

    // Basic validation
    if (!userId || !name || !slug || !Array.isArray(favoriteIds)) {
      return NextResponse.json(
        { error: "userId, name, slug, and favoriteIds[] are all required" },
        { status: 400 }
      );
    }

    // 1) Check if this user already has a collection with the same slug
    const existing = await prisma.collection.findFirst({
      where: { userId, slug },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A collection with this name already exists." },
        { status: 409 }
      );
    }

    // 2) Create the collection and connect to favorites
    const collection = await prisma.collection.create({
      data: {
        userId,
        name,
        slug,
        favorites: {
          connect: favoriteIds.map((id: string) => ({ id })),
        },
      },
    });

    return NextResponse.json(collection, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating collection:", error);

    // Handle unique constraint at the database level (just in case)
    if (
      (error as { code: string }).code === "P2002" &&
      (error as { meta: { target: string[] } }).meta?.target?.includes("slug")
    ) {
      return NextResponse.json(
        { error: "A collection with this name already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create collection" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const collectionId = searchParams.get("collectionId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    if (!collectionId) {
      return NextResponse.json(
        { error: "collectionId is required" },
        { status: 400 }
      );
    }

    // Verify the collection exists and belongs to the user
    const coll = await prisma.collection.findFirst({
      where: { id: collectionId, userId: userId },
    });
    if (!coll) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    // Delete the collection (this will also remove the join records)
    await prisma.collection.deleteMany({
      where: { id: collectionId, userId: userId },
    });

    return NextResponse.json(
      { message: "Collection deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      { message: "Failed to delete collection" },
      { status: 500 }
    );
  }
}

function slugify(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

export async function PATCH(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const collectionId = searchParams.get("collectionId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }
    if (!collectionId) {
      return NextResponse.json(
        { error: "collectionId is required" },
        { status: 400 }
      );
    }

    // Ensure the collection exists and belongs to this user
    const existing = await prisma.collection.findFirst({
      where: { id: collectionId, userId },
    });
    if (!existing) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    // Parse incoming fields
    const { name, favoriteIds } = (await req.json()) as {
      name?: string;
      favoriteIds?: string[];
    };

    // Build the update payload
    const data: Record<string, unknown> = {};
    if (typeof name === "string" && name.trim()) {
      data.name = name.trim();
      data.slug = slugify(name);
    }
    if (Array.isArray(favoriteIds)) {
      data.favorites = {
        // 'set' replaces the existing relations with this new array
        set: favoriteIds.map((id) => ({ id })),
      };
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
    }

    // Perform the update
    const updated = await prisma.collection.update({
      where: { id: collectionId },
      data,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating collection:", error);
    // Handle unique slug constraint
    if (
      (error as { code: string }).code === "P2002" &&
      (error as { meta: { target: string[] } }).meta?.target?.includes("slug")
    ) {
      return NextResponse.json(
        { error: "Another collection with this name already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Failed to update collection" },
      { status: 500 }
    );
  }
}
