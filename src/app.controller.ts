import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Header('content-type', 'text/plain')
    anonTopLevelRoot(): string {
        return this.appService.anonTopLevelRoot();
    }
}
