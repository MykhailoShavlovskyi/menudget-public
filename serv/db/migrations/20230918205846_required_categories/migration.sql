/*
  Warnings:

  - Made the column `categoryId` on table `Dish` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "categoryId" SET NOT NULL;
