import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
    get() {
        return 'Hello World!';
    }
}
