import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

import { EmailService } from '../email/email.service';

import { Job } from './job.entity';

import { emailTemplates } from '../email/email.utils';
import { CreateJobDto } from '../dto/create-job.dto';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    private readonly emailService: EmailService,
  ) {}

  async addJob(job: CreateJobDto) {
    const createdJob = this.jobRepository.create(job);
    return await this.jobRepository.save(createdJob);
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async processJob() {
    const jobs = await this.jobRepository.find({
      where: { processed: false },
      order: { createdAt: 'ASC' },
    });

    if (!jobs) return;

    for (const job of jobs) {
      const { templateKey, subject } = job;

      const filePath: string = emailTemplates[templateKey];

      await this.emailService
        .send(filePath, subject, {
          ...job,
        })
        .catch(async (err) => {
          job.processed = false;
          await this.jobRepository.save(job);
          this.logger.error(err);
        });

      job.processed = true;
      await this.jobRepository
        .save(job)
        .then((processed) => this.jobRepository.delete(processed));
    }
  }
}
