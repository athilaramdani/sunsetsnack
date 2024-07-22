/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cart` table. All the data in the column will be lost.
  - The primary key for the `cartitem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cartitem` table. All the data in the column will be lost.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `order` table. All the data in the column will be lost.
  - The primary key for the `orderdetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `orderdetail` table. All the data in the column will be lost.
  - The primary key for the `payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `payment` table. All the data in the column will be lost.
  - The primary key for the `pengiriman` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `pengiriman` table. All the data in the column will be lost.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product` table. All the data in the column will be lost.
  - The primary key for the `review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `review` table. All the data in the column will be lost.
  - The primary key for the `toko` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `toko` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - Added the required column `cartId` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartItemId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDetailId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengirimanId` to the `Pengiriman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokoId` to the `Toko` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderdetail` DROP FOREIGN KEY `OrderDetail_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderdetail` DROP FOREIGN KEY `OrderDetail_productId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `pengiriman` DROP FOREIGN KEY `Pengiriman_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_tokoId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_productId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropForeignKey
ALTER TABLE `usertoko` DROP FOREIGN KEY `UserToko_tokoId_fkey`;

-- DropForeignKey
ALTER TABLE `usertoko` DROP FOREIGN KEY `UserToko_userId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `cartId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`cartId`);

-- AlterTable
ALTER TABLE `cartitem` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `cartItemId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`cartItemId`);

-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`orderId`);

-- AlterTable
ALTER TABLE `orderdetail` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `orderDetailId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`orderDetailId`);

-- AlterTable
ALTER TABLE `payment` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `paymentId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`paymentId`);

-- AlterTable
ALTER TABLE `pengiriman` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `pengirimanId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`pengirimanId`);

-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `productId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`productId`);

-- AlterTable
ALTER TABLE `review` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `reviewId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`reviewId`);

-- AlterTable
ALTER TABLE `toko` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `deskripsi` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `tokoId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`tokoId`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- AddForeignKey
ALTER TABLE `UserToko` ADD CONSTRAINT `UserToko_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserToko` ADD CONSTRAINT `UserToko_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`tokoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderDetail` ADD CONSTRAINT `OrderDetail_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengiriman` ADD CONSTRAINT `Pengiriman_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`productId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`cartId`) ON DELETE RESTRICT ON UPDATE CASCADE;
