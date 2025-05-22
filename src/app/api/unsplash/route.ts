import { UnsplashImageType } from "@/types/ImageTypes";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "perros";
    const perPage = Number(searchParams.get("per_page")) || 15;
    const page = Number(searchParams.get("page")) || 1;

    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}`;

    const res = await fetch(apiUrl, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Error ${res.status}: ${res.statusText}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    const formattedData = data.results.map((img: UnsplashImageType) => ({
      imageId: img.id,
      imageUrl: img.urls.small,
      description: img.alt_description || "No description",
      likes: img.likes,
      created_at: img.created_at
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
