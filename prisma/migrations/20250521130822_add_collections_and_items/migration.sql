-- CreateTable
CREATE TABLE "image_item" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CollectionToImageItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CollectionToImageItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "collection_slug_key" ON "collection"("slug");

-- CreateIndex
CREATE INDEX "_CollectionToImageItem_B_index" ON "_CollectionToImageItem"("B");

-- AddForeignKey
ALTER TABLE "_CollectionToImageItem" ADD CONSTRAINT "_CollectionToImageItem_A_fkey" FOREIGN KEY ("A") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CollectionToImageItem" ADD CONSTRAINT "_CollectionToImageItem_B_fkey" FOREIGN KEY ("B") REFERENCES "image_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
