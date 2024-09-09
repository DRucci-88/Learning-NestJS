import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepo: Repository<Report>,
    ) {}

    create = (dto: CreateReportDto) => {
        // const report: DeepPartial<Report> = this.reportRepo.create(dto);

        const report: DeepPartial<Report> = plainToInstance(Report, dto);

        return this.reportRepo.save(report);
    };
}
