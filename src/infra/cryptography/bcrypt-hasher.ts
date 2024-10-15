import { compare, hash } from "bcryptjs";
import { HashCompare } from "src/domain/forum/application/cryptography/hash-compare";
import { HashGenerator } from "src/domain/forum/application/cryptography/hash-generator";

export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
