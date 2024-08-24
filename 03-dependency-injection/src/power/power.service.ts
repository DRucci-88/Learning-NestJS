import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    supplyPower(watts: number): number {
        console.log(`Supplying ${watts} power`);
        return watts;
    }
}
