import { Student } from "../../enterprise/entities/student";

export abstract class StudentsRepository {
  abstract findByEmail(slug: string): Promise<Student | null>;
  abstract delete(question: Student): Promise<void>;
}
