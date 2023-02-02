import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestsController, RequestController } from './requests.controller';
import { Request } from './request.model';
import { RequestsService } from './requests.service';
import { Status } from 'src/statuses/status.model';
import { StatusesModule } from 'src/statuses/statuses.module';
import { Project } from 'src/projects/project.model';

@Module({
  controllers: [RequestsController, RequestController],
  providers: [RequestsService],
  imports: [
    SequelizeModule.forFeature([Request, Status, Project]),
    StatusesModule,
  ],
  exports: [RequestsService],
})
export class RequestsModule {}
