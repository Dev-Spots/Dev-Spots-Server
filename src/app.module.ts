import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { config } from "dotenv";

config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL, {
      waitQueueTimeoutMS: 1000 * 30,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
