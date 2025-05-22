import { render, screen } from "@testing-library/react";
import GalleryGrid from "../GalleryGrid";
import { vi } from "vitest";
import { ImageType } from "@/types/ImageTypes";
import { PropsWithChildren } from "react";

const mockImages: ImageType[] = [
    { imageId: "1", imageUrl:"https://example.com/image1.jpg", description:"this is a cute dog", likes:32, created_at:"24-12-2024"},
    { imageId: "2", imageUrl:"https://example.com/image2.jpg", description:"this is a cute cat", likes:53, created_at:"21-12-2024"},
    { imageId: "3", imageUrl:"https://example.com/image3.jpg", description:"this is a cute wolf", likes:13, created_at:"11-12-2024"},
  ];

vi.mock("./GalleryItem",()=>({
    default: ({img} : {img:ImageType}) =>(
        <div>{img.description}</div>
    )
}))

vi.mock("next-auth/react", () => ({
    useSession: () => ({ data: null, status: "unauthenticated" }),
    SessionProvider: ({ children }: PropsWithChildren) => children,
  }));

describe ("GalleryGrid Component",()=>{
    it("renders a GalleryItem for each image",()=>{
        render(<GalleryGrid images={mockImages}/>);
        const items = screen.getAllByRole("img");
        expect(items).toHaveLength(3);
        expect(items[0]).toHaveAttribute("alt",mockImages[0].description);
        expect(items[1]).toHaveAttribute("alt",mockImages[1].description);
        expect(items[2]).toHaveAttribute("alt",mockImages[2].description);
    });
})