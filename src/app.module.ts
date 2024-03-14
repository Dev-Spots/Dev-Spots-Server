import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { MorganModule, MorganInterceptor } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UrlEncodedParser } from '../middlewares/urlEncodedParser.middleware';
import { UserModule } from '../modules/user/user.module';

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      waitQueueTimeoutMS: 1000 * 30,
    }),
    MorganModule,
    UserModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined', {
        skip: () => process.env.NODE_ENV === 'test',
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UrlEncodedParser).forRoutes('*');
  }
}
