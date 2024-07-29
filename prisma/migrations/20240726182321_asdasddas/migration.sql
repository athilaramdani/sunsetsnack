/*
  Warnings:

  - Added the required column `metodePengiriman` to the `Pengiriman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pengiriman` ADD COLUMN `metodePengiriman` VARCHAR(191) NOT NULL;
