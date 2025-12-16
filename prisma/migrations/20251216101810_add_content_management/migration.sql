/*
  Warnings:

  - You are about to drop the column `alt_text` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `file_path` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `UserAccount` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `UserAccount` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "alt_text",
DROP COLUMN "created_at",
DROP COLUMN "file_path",
DROP COLUMN "type",
DROP COLUMN "updated_at",
ADD COLUMN     "altText" TEXT,
ADD COLUMN     "caption" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "size" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "uploadedById" INTEGER;

-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT,
    "excerpt" TEXT,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "language" TEXT NOT NULL DEFAULT 'en',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT,
    "authorId" INTEGER,
    "featuredImage" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "parentId" INTEGER,
    "isExternal" BOOLEAN NOT NULL DEFAULT false,
    "menuId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_slug_key" ON "Content"("slug");

-- CreateIndex
CREATE INDEX "Content_type_status_idx" ON "Content"("type", "status");

-- CreateIndex
CREATE INDEX "Content_slug_idx" ON "Content"("slug");

-- CreateIndex
CREATE INDEX "Content_language_idx" ON "Content"("language");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "UserAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
