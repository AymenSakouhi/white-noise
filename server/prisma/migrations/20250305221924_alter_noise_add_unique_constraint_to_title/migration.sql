/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Noise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Noise_title_key" ON "Noise"("title");
