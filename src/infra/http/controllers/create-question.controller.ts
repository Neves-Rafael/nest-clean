import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CreateQuestionUseCase } from "src/domain/forum/application/use-cases/create-question";
import { CurrentUser } from "src/infra/auth/current-user.decorator";
import { UserPayload } from "src/infra/auth/jwt.strategy";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
});

const bodyValidate = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller("/questions")
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @CurrentUser() user: UserPayload,
    @Body(bodyValidate) body: CreateQuestionBodySchema
  ) {
    const { title, content } = body;
    const { sub: userId } = user;

    const result = await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
