import { Injectable } from "@nestjs/common";
import { QuestionAttachmentRepository } from "src/domain/forum/application/repositories/question-attachments-repository";
import { QuestionAttachment } from "src/domain/forum/enterprise/entities/question-attachment";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionAttachmentMapper } from "../mappers/prisma-question-attatchment-mapper";

@Injectable()
export class PrismaQuestionAttachmentRepository implements QuestionAttachmentRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    });

    return answerAttachments.map(PrismaQuestionAttachmentMapper.toDomain);
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    });
  }
}
