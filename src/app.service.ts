import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: 'clinic-tech',
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}
