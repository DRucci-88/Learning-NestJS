import { Controller, Get } from "@nestjs/common";

@Controller() // This is a decorator
export class AppController {
    @Get()
    getRouteRoute() {
        return 'Hi There';
    }
}