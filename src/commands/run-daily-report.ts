import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DailyReportCommand } from './daily-report.command';

async function main() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const emailTo = process.env.DAILY_REPORT_EMAIL_TO;
  const cmd = app.get(DailyReportCommand);

  const { text } = await cmd.run({
    emailTo: emailTo && emailTo.length > 0 ? emailTo : undefined,
  });

  // Always print to stdout for cron visibility

  console.log(text);

  await app.close();
}

void main();
