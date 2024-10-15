import { Module } from "@nestjs/common";
import { Encrypter } from "src/domain/forum/application/cryptography/encrypter";
import { HashCompare } from "src/domain/forum/application/cryptography/hash-compare";
import { HashGenerator } from "src/domain/forum/application/cryptography/hash-generator";
import { BcryptHasher } from "./bcrypt-hasher";
import { JwyEncrypter } from "./jwt-encrypter";

@Module({
  providers: [
    { provide: Encrypter, useClass: JwyEncrypter },
    { provide: HashCompare, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashCompare, HashGenerator],
})
export class CryptographyModule {
  pr;
}
