import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from "@nestjs/common";
import { AuthenticateStudentUseCase } from "src/domain/forum/application/use-cases/authenticate-student";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { WrongCredentialsError } from "src/domain/forum/application/use-cases/errors/wrong-credentials-error";
import { Public } from "src/infra/auth/public";

const authenticatedBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateBodySchema = z.infer<typeof authenticatedBodySchema>;

@Controller("/sessions")
@Public()
export class AuthenticateController {
  constructor(private authenticateStudent: AuthenticateStudentUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticatedBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    const { email, password } = body;

    const result = await this.authenticateStudent.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return { access_token: accessToken };
  }
}
