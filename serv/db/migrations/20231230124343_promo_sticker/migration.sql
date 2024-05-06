-- AlterTable
ALTER TABLE "Dish" ADD COLUMN     "sticker" TEXT;

-- CreateTable
CREATE TABLE "Promo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "percentageDiscount" INTEGER,
    "fixedDiscount" DOUBLE PRECISION,
    "minSumm" DOUBLE PRECISION,
    "dueDate" TIMESTAMP(3),
    "maxUse" INTEGER,
    "useCount" INTEGER NOT NULL DEFAULT 0,
    "restaurantId" INTEGER NOT NULL,
    "allDishes" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Promo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DishToPromo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Promo_restaurantId_name_key" ON "Promo"("restaurantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_DishToPromo_AB_unique" ON "_DishToPromo"("A", "B");

-- CreateIndex
CREATE INDEX "_DishToPromo_B_index" ON "_DishToPromo"("B");

-- AddForeignKey
ALTER TABLE "Promo" ADD CONSTRAINT "Promo_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToPromo" ADD CONSTRAINT "_DishToPromo_A_fkey" FOREIGN KEY ("A") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DishToPromo" ADD CONSTRAINT "_DishToPromo_B_fkey" FOREIGN KEY ("B") REFERENCES "Promo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
