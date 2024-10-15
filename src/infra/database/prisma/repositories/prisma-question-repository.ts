import { Injectable } from "@nestjs/common";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { QuestionRepository } from "src/domain/forum/application/repositories/question-repository";
import { Question } from "src/domain/forum/enterprise/entities/question";

@Injectable()
export class PrismaQuestionRepository implements QuestionRepository {
  findBySlug(slug: string): Promise<Question | null> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<Question | null> {
    throw new Error("Method not implemented.");
  }
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
