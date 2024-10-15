import { Injectable } from "@nestjs/common";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { AnswerCommentRepository } from "src/domain/forum/application/repositories/answer-comment-repository";
import { AnswerComment } from "src/domain/forum/enterprise/entities/answer-comment";

@Injectable()
export class PrismaAnswerCommentRepository implements AnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error("Method not implemented.");
  }
  findManyByAnswerId(answerId: string, params: PaginationParams): Promise<AnswerComment[]> {
    throw new Error("Method not implemented.");
  }
  create(answerComment: AnswerComment): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
