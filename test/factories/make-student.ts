import { faker } from "@faker-js/faker/locale/en";
import { UniqueEntityID } from "../../src/core/entities/unique-entity-id";

import { Student, StudentProps } from "src/domain/forum/enterprise/entities/student";

export function makeStudent(override: Partial<StudentProps> = {}, id?: UniqueEntityID) {
  const student = Student.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );

  return student;
}
