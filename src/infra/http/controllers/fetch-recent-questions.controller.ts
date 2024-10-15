import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ListRecentQuestionsUseCase } from "src/domain/forum/application/use-cases/list-recent-questions";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { QuestionPresenter } from "../presenter/question-presenter";

const pageQueryParamSchema = z
  .string()
  .optional()
  .default("1")
  .transform(Number)
  .pipe(z.number().min(1));

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;

@Controller("/questions")
export class FetchRecentQuestionController {
  constructor(private fetchRecentQuestions: ListRecentQuestionsUseCase) {}

  @Get()
  async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchRecentQuestions.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const questions = result.value.questions;

    return { questions: questions.map(QuestionPresenter.toHTTP) };
  }
}
