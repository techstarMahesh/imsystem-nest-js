import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './database/config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './utils/guards/jwt.guard';
import { RolesGuard } from './utils/guards/roles.guard';
import { HomeModule } from './home/home.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TaskModule } from './task/task.module';
import { DataSource } from 'typeorm';
import { SessionsModule } from './sessions/sessions.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { CookiesModule } from './cookies/cookies.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig], isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getOrThrow('typeorm'),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    UserModule,
    AuthModule,
    HomeModule,
    TaskModule,
    CookiesModule,
    SessionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false })).forRoutes('*');
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
