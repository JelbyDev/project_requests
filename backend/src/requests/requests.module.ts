import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestsController, RequestController } from './requests.controller';
import { Request } from './request.model';
import { RequestsService } from './requests.service';

@Module({
  controllers: [RequestsController, RequestController],
  providers: [RequestsService],
  imports: [SequelizeModule.forFeature([Request])],
})
export class RequestsModule {}
