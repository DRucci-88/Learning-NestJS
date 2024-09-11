import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Report } from './report.entity';
import { User } from 'src/user/user.entity';
import { ApproveReportDto } from './dto/approve-report.dto';

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private readonly reportRepo: Repository<Report>,
    ) {}

    create = (dto: CreateReportDto, user: User): Promise<Report> => {
        // const report: DeepPartial<Report> = this.reportRepo.create(dto);

        const report: DeepPartial<Report> = plainToInstance(Report, dto);
        report.user = user;
        return this.reportRepo.save(report);
    };

    findByUser = async (user: User): Promise<Report[]> => {
        const reports = await this.reportRepo.findBy({
            user: user,
        });
        return reports.sort((a, b) => a.id - b.id);
    };

    changeApproval = async (
        id: string,
        dto: ApproveReportDto,
    ): Promise<Report> => {
        const report: Report = await this.reportRepo.findOne({
            where: { id: Number.parseInt(id) },
        });
        if (!report) throw new NotFoundException('Report not found');

        report.approved = dto.approved;
        report.user;
        return this.reportRepo.save(report);
    };
}
