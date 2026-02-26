"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const daily_report_command_1 = require("./daily-report.command");
async function main() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log'],
    });
    const emailTo = process.env.DAILY_REPORT_EMAIL_TO;
    const cmd = app.get(daily_report_command_1.DailyReportCommand);
    const { text } = await cmd.run({
        emailTo: emailTo && emailTo.length > 0 ? emailTo : undefined,
    });
    console.log(text);
    await app.close();
}
void main();
//# sourceMappingURL=run-daily-report.js.map