import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database/databaseConfig';

@Module({
  imports: [ConfigModule.forRoot({ load: [databaseConfig], isGlobal: true, cache: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
