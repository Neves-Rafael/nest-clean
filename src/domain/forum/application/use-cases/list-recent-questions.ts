import { Injectable } from "@nestjs/common";
import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepository } from "../repositories/question-repository";

interface ListRecentQuestionsUseCaseRequest {
  page: number;
}

type ListRecentQuestionsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questions: Question[];
  }
>;

@Injectable()
export class ListRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page });

    if (!questions) {
      return left(new ResourceNotFoundError());
    }

    return right({ questions });
  }
}
