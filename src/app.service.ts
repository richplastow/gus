import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    anonTopLevelRoot(): string {
        return 'ok';
    }
}
