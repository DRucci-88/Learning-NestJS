import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportService } from './report.service';
import { AuthGuard } from '../guard/auth.guard';
import { CurrentUser } from 'src/user/decorator/current-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }
}
