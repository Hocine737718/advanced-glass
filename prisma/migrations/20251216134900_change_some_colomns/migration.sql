/*
  Warnings:

  - You are about to drop the column `created_at` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Modal` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Modal` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `SectionItem` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `SectionItem` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `SiteSetting` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `SiteSetting` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `SocialLink` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `SocialLink` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Modal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SectionItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SiteSetting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SocialLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Modal" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SectionItem" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SiteSetting" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SocialLink" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
