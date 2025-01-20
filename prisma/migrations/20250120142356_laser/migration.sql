/*
  Warnings:

  - The values [Monday,Tuesday,Wednesday,Thursday,Friday,Saturday] on the enum `Day` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `dueTime` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `SupervisorId` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `Surname` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Parent` table. All the data in the column will be lost.
  - You are about to drop the column `Surname` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `Surname` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Teacher` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessonId` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessonId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Parent` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Parent` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `birthday` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `birthday` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Teacher` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Teacher` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserSex" AS ENUM ('MALE', 'FEMALE');

-- AlterEnum
BEGIN;
CREATE TYPE "Day_new" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');
ALTER TABLE "Lesson" ALTER COLUMN "day" TYPE "Day_new" USING ("day"::text::"Day_new");
ALTER TYPE "Day" RENAME TO "Day_old";
ALTER TYPE "Day_new" RENAME TO "Day";
DROP TYPE "Day_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_classId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_SupervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_classId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_subjectId_fkey";

-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "classId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "dueTime",
DROP COLUMN "startTime",
DROP COLUMN "subjectId",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lessonId" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "SupervisorId",
ADD COLUMN     "supervisorId" TEXT;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "classId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "subjectId",
ADD COLUMN     "lessonId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "day" "Day" NOT NULL;

-- AlterTable
ALTER TABLE "Parent" DROP COLUMN "Surname",
DROP COLUMN "img",
DROP COLUMN "password",
ADD COLUMN     "surname" TEXT NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "Surname",
DROP COLUMN "gender",
DROP COLUMN "password",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sex" "UserSex" NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "img" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" DROP COLUMN "Surname",
DROP COLUMN "gender",
DROP COLUMN "password",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sex" "UserSex" NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "img" DROP NOT NULL;

-- DropEnum
DROP TYPE "UserGender";

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
