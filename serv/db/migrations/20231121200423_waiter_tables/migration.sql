-- CreateTable
CREATE TABLE "_TableToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TableToUser_AB_unique" ON "_TableToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TableToUser_B_index" ON "_TableToUser"("B");

-- AddForeignKey
ALTER TABLE "_TableToUser" ADD CONSTRAINT "_TableToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TableToUser" ADD CONSTRAINT "_TableToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
