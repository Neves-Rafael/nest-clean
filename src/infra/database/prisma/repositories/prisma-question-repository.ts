import { Injectable } from "@nestjs/common";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { Question } from "src/domain/forum/enterprise/entities/question";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";
import { PrismaService } from "../prisma.service";
import { QuestionRepository } from "src/domain/forum/application/repositories/question-repository";

@Injectable()
export class PrismaQuestionRepository implements QuestionRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { slug },
    });

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return questions.map(PrismaQuestionMapper.toDomain);
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.create({
      data,
    });
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    });
  }
}
