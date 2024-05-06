/*
  Warnings:

  - You are about to drop the column `weight` on the `Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dish" DROP COLUMN "weight",
ADD COLUMN     "measurementUnit" TEXT NOT NULL DEFAULT 'gr',
ADD COLUMN     "measurementValue" DOUBLE PRECISION NOT NULL DEFAULT 1;
