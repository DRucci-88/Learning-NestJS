import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
    constructor(
        private readonly powerService: PowerService
    ) { }

    getDate(a: number): number {
        const watts = this.powerService.supplyPower(13);
        console.log(`DiskService Drawing ${watts} watts of power from PowerService`);
        return a * watts;
    }
}
