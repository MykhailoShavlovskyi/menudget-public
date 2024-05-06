/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,order]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.
  - Made the column `order` on table `Dish` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Dish" ALTER COLUMN "order" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dish_categoryId_order_key" ON "Dish"("categoryId", "order");
