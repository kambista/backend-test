import {
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class EstacionamientoService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('estacionamiento-service');
  }
  getDemo(): string {
    this.logger.log('getDemo');
    return 'getDemoX';
  }
  postDemo(): string {
    return 'postDemoX';
  }
  putDemo(): string {
    return 'putDemoX';
  }
  deleteDemo(): string {
    return 'deleteDemoX';
  }
  patchDemo(): string {
    return 'patchDemoX';
  }
}
