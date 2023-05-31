import { BaseError } from "./BaseError";

export class AlreadyExist extends BaseError {
  constructor(message: string) {
    super(409, message);
  }
}
