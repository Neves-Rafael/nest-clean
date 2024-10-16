import { Either, left, right } from "../../../../core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface ListQuestionAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

type ListQuestionAnswersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answers: Answer[];
  }
>;

export class ListQuestionAnswersUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    page,
    questionId,
  }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    if (!answers) {
      return left(new ResourceNotFoundError());
    }

    return right({ answers });
  }
}
