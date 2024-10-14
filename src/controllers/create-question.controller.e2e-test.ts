import { INestApplication } from "@nestjs/common";
import { AppModule } from "../app.module";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

describe("Create question(E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    jwt = moduleRef.get(JwtService);

    await app.init();
  });

  test("[POST] /questions", async () => {
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123456",
      },
    });

    const accessTokes = jwt.sign({ sub: user.id });

    const response = await request(app.getHttpServer())
      .post("/questions")
      .set("Authorization", `Bearer ${accessTokes}`)
      .send({
        title: "New question",
        content: "new content",
      });

    expect(response.statusCode).toBe(201);
    const questionOnDatabase = await prisma.question.findFirst({
      where: {
        title: "New question",
      },
    });

    expect(questionOnDatabase).toBeTruthy();
  });
});
