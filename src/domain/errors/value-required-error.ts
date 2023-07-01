import { BussinessError } from './bussiness-error';

export class ValueRequiredError extends BussinessError {
  constructor(mensaje: string) {
    super(mensaje, ValueRequiredError.name);
  }
}
