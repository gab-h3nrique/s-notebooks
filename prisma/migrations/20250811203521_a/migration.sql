/*
  Warnings:

  - You are about to drop the column `orderId` on the `shelf` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN "cep" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN "deleted" BOOLEAN DEFAULT false;

-- CreateTable
CREATE TABLE "services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "servicesOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "status" TEXT NOT NULL DEFAULT 'aguardando',
    "type" TEXT NOT NULL DEFAULT 'serviço',
    "orderId" INTEGER NOT NULL,
    "value" REAL DEFAULT 0.00
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_shelf" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "userId" INTEGER
);
INSERT INTO "new_shelf" ("id", "type", "userId") SELECT "id", "type", "userId" FROM "shelf";
DROP TABLE "shelf";
ALTER TABLE "new_shelf" RENAME TO "shelf";
CREATE INDEX "shelf_userId_idx" ON "shelf"("userId");
CREATE TABLE "new_orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "clientId" INTEGER,
    "userId" INTEGER,
    "shelfId" INTEGER,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT,
    "serialNumber" TEXT,
    "charger" BOOLEAN NOT NULL DEFAULT false,
    "battery" BOOLEAN NOT NULL DEFAULT false,
    "energyCable" BOOLEAN NOT NULL DEFAULT false,
    "bag" BOOLEAN NOT NULL DEFAULT false,
    "others" TEXT,
    "warranty" BOOLEAN NOT NULL DEFAULT false,
    "warrantyDescription" TEXT,
    "backup" BOOLEAN NOT NULL DEFAULT false,
    "backupDescription" TEXT,
    "isWorking" BOOLEAN NOT NULL DEFAULT true,
    "defectDescription" TEXT,
    "technicalReport" TEXT,
    "equipamentPassword" TEXT,
    "generalDescription" TEXT,
    "deliveryConfirmation" BOOLEAN NOT NULL DEFAULT false,
    "value" REAL DEFAULT 0.00,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_orders" ("backup", "backupDescription", "bag", "battery", "brand", "charger", "clientId", "createdAt", "defectDescription", "deliveryConfirmation", "energyCable", "generalDescription", "id", "model", "name", "others", "serialNumber", "status", "technicalReport", "updatedAt", "userId", "value", "warranty", "warrantyDescription") SELECT "backup", "backupDescription", "bag", "battery", "brand", "charger", "clientId", "createdAt", "defectDescription", "deliveryConfirmation", "energyCable", "generalDescription", "id", "model", "name", "others", "serialNumber", "status", "technicalReport", "updatedAt", "userId", "value", "warranty", "warrantyDescription" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
CREATE UNIQUE INDEX "orders_shelfId_key" ON "orders"("shelfId");
CREATE INDEX "orders_clientId_idx" ON "orders"("clientId");
CREATE INDEX "orders_userId_idx" ON "orders"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "servicesOrder_orderId_idx" ON "servicesOrder"("orderId");
