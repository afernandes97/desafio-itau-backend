import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  async check() {
    return await this.health.check([
      async () => await this.http.pingCheck('API', 'http://localhost:3000/'),
    ]);
  }

  @Get('memory')
  @HealthCheck()
  async checkMemory() {
    return await this.health.check([
      async () => await this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }
}
