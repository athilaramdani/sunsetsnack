/*
  Warnings:

  - Added the required column `tokoId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderdetail` ADD COLUMN `tokoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
