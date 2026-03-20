import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { SearchModule } from './modules/search/search.module';
import { PreviewModule } from './modules/preview/preview.module';
import { QuotaModule } from './modules/quota/quota.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { colorize: true } }
            : undefined,
      },
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UserModule,
    FileModule,
    TransferModule,
    SearchModule,
    PreviewModule,
    QuotaModule,
    TaskModule,
  ],
})
export class AppModule {}
