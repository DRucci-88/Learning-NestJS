import { Controller, Get } from "@nestjs/common";

@Controller("/app") // This is a decorator
export class AppController {
    @Get('/hi')
    getRouteRoute() {
        return 'Hi There';
    }

    @Get('bye')
    getByeThere() {
        return 'bye there';
    }
}