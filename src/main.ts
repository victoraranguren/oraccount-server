import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

BigInt.prototype['toJSON'] = function () {
  return this.toString(); // Se enviará como "1280640" (string) para no perder precisión
  // return Number(this); // O usa esto si prefieres números (cuidado con precisión en números gigantes)
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
