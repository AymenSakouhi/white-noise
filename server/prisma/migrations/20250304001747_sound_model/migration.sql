-- CreateTable
CREATE TABLE "Sound" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" BYTEA NOT NULL,
    "fileType" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sounds_pkey" PRIMARY KEY ("id")
);
