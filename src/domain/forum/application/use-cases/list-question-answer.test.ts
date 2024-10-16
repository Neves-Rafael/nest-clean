import { makeAnswer } from "../../../../../test/factories/make-answer";
import { InMemoryAnswerAttachmentRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswerRepository } from "../../../../../test/repositories/in-memory-answer-repository";
import { UniqueEntityID } from "../../../../core/entities/unique-entity-id";
import { ListQuestionAnswersUseCase } from "./list-question-answer";

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository;
let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: ListQuestionAnswersUseCase;

describe("List Question Answers", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository = new InMemoryAnswerAttachmentRepository();
    inMemoryAnswerRepository = new InMemoryAnswerRepository(inMemoryAnswerAttachmentRepository);
    sut = new ListQuestionAnswersUseCase(inMemoryAnswerRepository);
  });

  it("should be able to list question answers", async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    );

    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityID("question-1") })
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    if (result.isRight()) {
      expect(result.value.answers).toHaveLength(3);
    }
  });

  it("should be able to list paginated question paginated answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueEntityID("q-1") }));
    }

    const result = await sut.execute({
      questionId: "q-1",
      page: 2,
    });

    if (result.isRight()) {
      expect(result.value.answers).toHaveLength(2);
    }
  });
});
