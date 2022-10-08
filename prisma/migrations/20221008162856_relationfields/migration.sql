-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orders" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "model" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "name" TEXT,
    "serialNumber" TEXT,
    "charger" BOOLEAN NOT NULL DEFAULT false,
    "battery" BOOLEAN NOT NULL DEFAULT false,
    "energyCable" BOOLEAN NOT NULL DEFAULT false,
    "others" TEXT,
    "warranty" BOOLEAN NOT NULL DEFAULT false,
    "warrantyDescription" TEXT,
    "backup" BOOLEAN NOT NULL DEFAULT false,
    "backupDescription" TEXT,
    "isWorking" BOOLEAN NOT NULL DEFAULT true,
    "workingDescription" TEXT,
    "defectDescription" TEXT,
    "technicalReport" TEXT,
    "generalDescription" TEXT,
    "value" REAL DEFAULT 0.00,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("backup", "backupDescription", "battery", "brand", "charger", "clientId", "createdAt", "defectDescription", "energyCable", "generalDescription", "id", "isWorking", "model", "name", "others", "serialNumber", "status", "technicalReport", "updatedAt", "userId", "value", "warranty", "warrantyDescription", "workingDescription") SELECT "backup", "backupDescription", "battery", "brand", "charger", "clientId", "createdAt", "defectDescription", "energyCable", "generalDescription", "id", "isWorking", "model", "name", "others", "serialNumber", "status", "technicalReport", "updatedAt", "userId", "value", "warranty", "warrantyDescription", "workingDescription" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
