/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,name]` on the table `Dish` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dish_restaurantId_name_key" ON "Dish"("restaurantId", "name");
