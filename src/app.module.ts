import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './api/users/users.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './api/users/users.module';
import { LoggerMiddleware } from './middleware/request-logger';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(configuration),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('database.uri'),
        user: configService.get('database.user'),
        pass: configService.get('database.password'),
        dbName: configService.get('database.name'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
