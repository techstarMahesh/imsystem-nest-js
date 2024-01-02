import { Controller } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller({
  path: 'home',
  version: '1',
})
export class HomeController {
  constructor(private readonly homeService: HomeService) { }
  get() {
    return this.homeService.get();
  }
}
