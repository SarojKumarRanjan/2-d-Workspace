/*
  Warnings:

  - Added the required column `static` to the `Elements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Elements" ADD COLUMN     "static" BOOLEAN NOT NULL;
