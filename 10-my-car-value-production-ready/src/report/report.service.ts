import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Report } from './report.entity';
import { User } from 'src/user/user.entity';
import { ApproveReportDto } from './dto/approve-report.dto';
import { GetEstimateReport } from './dto/get-estimate-report.dto';

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

    public async createEstimate(dto: GetEstimateReport) {
        return this.reportRepo
            .createQueryBuilder()
            .select('AVG(price)', 'price')
            .where('make = :make', { make: dto.make })
            .andWhere('model = :model', { model: dto.model })
            .andWhere('longitude - :longitude BETWEEN -5 AND 5', {
                longitude: dto.longitude,
            })
            .andWhere('latitude - :latitude BETWEEN -5 AND 5', {
                latitude: dto.latitude,
            })
            .andWhere('year - :year BETWEEN -3 AND 3', {
                year: dto.year,
            })
            .andWhere('approved IS TRUE')
            .orderBy('ABS(mileage - :mileage)', 'DESC')
            .setParameters({ mileage: dto.mileage })
            .limit(3)
            .getRawOne();
    }
}
