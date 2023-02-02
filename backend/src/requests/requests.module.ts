import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestsController, RequestController } from './requests.controller';
import { Request } from './request.model';
import { RequestsService } from './requests.service';
import { Status } from 'src/statuses/status.model';
import { StatusesModule } from 'src/statuses/statuses.module';

@Module({
  controllers: [RequestsController, RequestController],
  providers: [RequestsService],
  imports: [SequelizeModule.forFeature([Request, Status]), StatusesModule],
  exports: [RequestsService],
})
export class RequestsModule {}
