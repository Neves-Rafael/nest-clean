import { Injectable } from "@nestjs/common";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { QuestionRepository } from "src/domain/forum/application/repositories/question-repository";
import { Question } from "src/domain/forum/enterprise/entities/question";
import { PrismaService } from "../prisma.service";
import { PrismaQuestionMapper } from "../mappers/prisma-question-mapper";

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

  findBySlug(slug: string): Promise<Question | null> {}
  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error("Method not implemented.");
  }
  save(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }
  create(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(question: Question): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
