import { Module } from "@nestjs/common";
import { QuestionRepository } from "src/domain/forum/application/repositories/question-repository";
import { StudentsRepository } from "src/domain/forum/application/repositories/students-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaAnswerAttachmentRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswerCommentRepository } from "./prisma/repositories/prisma-answer-comment-repository";
import { PrismaAnswerRepository } from "./prisma/repositories/prisma-answer-repository";
import { PrismaQuestionAttachmentRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionCommentRepository } from "./prisma/repositories/prisma-question-comment-repository";
import { PrismaQuestionRepository } from "./prisma/repositories/prisma-question-repository";
import { PrismaStudentRepository } from "./prisma/repositories/prisma-students-repository";

@Module({
  providers: [
    PrismaService,
    { provide: QuestionRepository, useClass: PrismaQuestionRepository },
    { provide: StudentsRepository, useClass: PrismaStudentRepository },
    PrismaQuestionCommentRepository,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerAttachmentRepository,
  ],
  exports: [
    PrismaService,
    QuestionRepository,
    StudentsRepository,
    PrismaQuestionCommentRepository,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerAttachmentRepository,
  ],
})
export class DatabaseModule {}
