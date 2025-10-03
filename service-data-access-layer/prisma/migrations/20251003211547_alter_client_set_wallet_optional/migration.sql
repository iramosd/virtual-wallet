-- DropForeignKey
ALTER TABLE `Client` DROP FOREIGN KEY `Client_walletId_fkey`;

-- AlterTable
ALTER TABLE `Client` MODIFY `walletId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
