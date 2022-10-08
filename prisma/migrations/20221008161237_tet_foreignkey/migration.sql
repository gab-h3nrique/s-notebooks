-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_shelf" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "shelf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "shelf_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_shelf" ("id", "orderId", "type", "userId") SELECT "id", "orderId", "type", "userId" FROM "shelf";
DROP TABLE "shelf";
ALTER TABLE "new_shelf" RENAME TO "shelf";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
