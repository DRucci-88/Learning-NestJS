import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
    constructor(
        private readonly powerService: PowerService
    ) { }

    compute(a: number, b: number): number {
        const watts = this.powerService.supplyPower(19);
        console.log(`CpuService Drawing ${watts} watts of power from PowerService`);
        return a * b * watts;
    }
}
