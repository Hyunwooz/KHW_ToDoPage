-- CreateTable
CREATE TABLE "Status" (
    "statusNo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Board" (
    "boardNo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "statusNo" INTEGER NOT NULL,
    CONSTRAINT "Board_statusNo_fkey" FOREIGN KEY ("statusNo") REFERENCES "Status" ("statusNo") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ToDo" (
    "tdNo" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "boardNo" INTEGER NOT NULL,
    CONSTRAINT "ToDo_boardNo_fkey" FOREIGN KEY ("boardNo") REFERENCES "Board" ("boardNo") ON DELETE CASCADE ON UPDATE CASCADE
);
