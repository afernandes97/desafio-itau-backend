import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './Modules/transactions/Modules/transactions.module';
import { HealthModule } from './Modules/health/Modules/health.module';

@Module({
  imports: [TransactionModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
