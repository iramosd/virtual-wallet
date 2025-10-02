/*
  Warnings:

  - Made the column `sessionId` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_sessionId_fkey`;

-- DropIndex
DROP INDEX `Transaction_sessionId_key` ON `Transaction`;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `sessionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
