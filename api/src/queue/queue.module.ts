import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QueueService } from './queue.service';
import { EmailModule } from '../email/email.module';
import { Job } from './job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), EmailModule],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
