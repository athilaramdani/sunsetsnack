/*
  Warnings:

  - You are about to drop the column `userId` on the `toko` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `toko` DROP FOREIGN KEY `Toko_userId_fkey`;

-- AlterTable
ALTER TABLE `toko` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `roleToko` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `UserToko` (
    `userId` INTEGER NOT NULL,
    `tokoId` INTEGER NOT NULL,
    `role` VARCHAR(191) NULL,

    PRIMARY KEY (`userId`, `tokoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserToko` ADD CONSTRAINT `UserToko_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserToko` ADD CONSTRAINT `UserToko_tokoId_fkey` FOREIGN KEY (`tokoId`) REFERENCES `Toko`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
