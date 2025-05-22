/*
  Warnings:

  - You are about to drop the `_CollectionToImageItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image_item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CollectionToImageItem" DROP CONSTRAINT "_CollectionToImageItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToImageItem" DROP CONSTRAINT "_CollectionToImageItem_B_fkey";

-- AlterTable
ALTER TABLE "favorite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_CollectionToImageItem";

-- DropTable
DROP TABLE "image_item";

-- CreateTable
CREATE TABLE "_CollectionToFavorite" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CollectionToFavorite_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CollectionToFavorite_B_index" ON "_CollectionToFavorite"("B");

-- AddForeignKey
ALTER TABLE "_CollectionToFavorite" ADD CONSTRAINT "_CollectionToFavorite_A_fkey" FOREIGN KEY ("A") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToFavorite" ADD CONSTRAINT "_CollectionToFavorite_B_fkey" FOREIGN KEY ("B") REFERENCES "favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
