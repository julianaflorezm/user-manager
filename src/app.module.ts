import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfigFactory } from './infraestructure/config/database.config';
import { UserModule } from './infraestructure/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './infraestructure/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'env/development.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfigFactory,
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
