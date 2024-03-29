import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GLOBAL_PREFIX } from "./constant";
import { ForbiddenException } from "@nestjs/common";
import helmet from "helmet";
import { AllExceptionsFilter } from "./middlewares/errorHandler.middleware";
import { config } from "dotenv";

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      referrerPolicy: { policy: "same-origin" },
    })
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin(requestOrigin, callback) {
      const whiteList = process.env.CORS_LIST ?? "";
      if (whiteList.indexOf(requestOrigin as string) !== -1) {
        callback(null, true);
      } else {
        callback(
          new ForbiddenException(`Not allowed by CORS for URL ${requestOrigin}`)
        );
      }
    },
  });

  app.setGlobalPrefix(GLOBAL_PREFIX);
  const port = process.env.PORT || 3001;

  console.log(`${new Date().toISOString()} application start on port ${port}`);
  await app.listen(port);
}
bootstrap();
