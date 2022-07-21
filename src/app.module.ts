import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

const dotenv = process.env;
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: dotenv.MYSQL_HOST,
      port: parseInt(dotenv.MYSQL_PORT),
      username: dotenv.MYSQL_USER,
      password: dotenv.MYSQL_PASSWORD,
      database: dotenv.MYSQL_DB,
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
