import { HttpException, HttpStatus } from '@nestjs/common';

export class BussinessError extends HttpException {
  constructor(mensaje: string, clase?: string) {
    super(mensaje, HttpStatus.NOT_FOUND);
    this.name = clase || BussinessError.name;
  }
}
