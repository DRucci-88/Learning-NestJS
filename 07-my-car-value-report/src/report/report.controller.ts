import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportService } from './report.service';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto) {
        return this.reportService.create(body);
    }
}
