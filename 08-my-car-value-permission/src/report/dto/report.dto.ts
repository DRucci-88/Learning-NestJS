import { Expose, Transform } from 'class-transformer';

export class ReportDto {
    @Expose()
    id: number;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: string;

    @Expose()
    approved: boolean;

    @Expose()
    price: number;

    @Expose()
    make: string;

    @Expose()
    model: string;

    @Expose()
    year: number;

    @Expose()
    longitude: number;

    @Expose()
    latitude: number;

    @Expose()
    mileage: number;
}
