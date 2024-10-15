import { DomainEvents } from "src/core/events/domain-events";
import { StudentsRepository } from "src/domain/forum/application/repositories/students-repository";
import { Student } from "src/domain/forum/enterprise/entities/student";

export class InMemoryStudentRepository implements StudentsRepository {
  public items: Student[] = [];

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email);

    if (!student) {
      return null;
    }

    return student;
  }

  async create(student: Student): Promise<void> {
    this.items.push(student);

    DomainEvents.dispatchEventsForAggregate(student.id);
  }
}
