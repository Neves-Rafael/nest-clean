import { HashCompare } from "src/domain/forum/application/cryptography/hash-compare";
import { HashGenerator } from "src/domain/forum/application/cryptography/hash-generator";

export class FakeHasher implements HashGenerator, HashCompare {
  async hash(plain: string): Promise<string> {
    return plain.concat("-hashed");
  }
  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat("-hashed") === hash;
  }
}
