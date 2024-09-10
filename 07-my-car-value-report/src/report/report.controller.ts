import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportService } from './report.service';
import { AuthGuard } from '../guard/auth.guard';
import { CurrentUser } from '../user/decorator/current-user.decorator';
import { User } from '../user/user.entity';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { ReportDto } from './dto/report.dto';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportService.create(body, user);
    }

    @Get()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    findByUser(@CurrentUser() user: User) {
        return this.reportService.findByUser(user);
    }
}
