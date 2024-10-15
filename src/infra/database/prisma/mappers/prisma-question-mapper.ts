import { Prisma, Question as PrismaQuestion } from "@prisma/client";
import { UniqueEntityID } from "src/core/entities/unique-entity-id";
import { Question } from "src/domain/forum/enterprise/entities/question";
import { Slug } from "src/domain/forum/enterprise/entities/value-objects/slug";

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        title: raw.title,
        authorId: new UniqueEntityID(raw.authorId),
        content: raw.content,
        bestAnswerId: raw.bestAnswerId ? new UniqueEntityID(raw.bestAnswerId) : null,
        slug: Slug.create(raw.slug),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    );
  }

  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      authorId: question.authorId.toString(),
      bestAnswerId: question.bestAnswerId?.toString(),
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  }
}
