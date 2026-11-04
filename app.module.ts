import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flor } from './flores/flor.entity.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'floricultura_db',
      entities: [Flor],
      synchronize: true,
      logging: true,
    }),
  ]
})
export class AppModule { }