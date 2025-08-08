/*
  Warnings:

  - You are about to drop the column `complexity` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `demo_url` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `included` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `revenue` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `running_cost` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `sales` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `setup_time` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `tech` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `tech_specs` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `workflow` on the `projects` table. All the data in the column will be lost.
  - The `status` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `short_description` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Made the column `long_description` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ready', 'idea');

-- CreateEnum
CREATE TYPE "Customizable" AS ENUM ('yes', 'no', 'partial');

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "complexity",
DROP COLUMN "demo_url",
DROP COLUMN "description",
DROP COLUMN "features",
DROP COLUMN "images",
DROP COLUMN "included",
DROP COLUMN "requirements",
DROP COLUMN "revenue",
DROP COLUMN "running_cost",
DROP COLUMN "sales",
DROP COLUMN "setup_time",
DROP COLUMN "tech",
DROP COLUMN "tech_specs",
DROP COLUMN "workflow",
ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "business_advantages" TEXT[],
ADD COLUMN     "business_types" TEXT[],
ADD COLUMN     "cover_image" TEXT,
ADD COLUMN     "customizable" "Customizable" NOT NULL DEFAULT 'partial',
ADD COLUMN     "estimated_custom_price" INTEGER,
ADD COLUMN     "estimated_duration" TEXT,
ADD COLUMN     "gallery_images" TEXT[],
ADD COLUMN     "short_description" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "target_audience" TEXT[],
ADD COLUMN     "use_cases" TEXT[],
ADD COLUMN     "video_demo_url" TEXT,
ADD COLUMN     "views_count" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "long_description" SET NOT NULL,
ALTER COLUMN "price" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'ready';
