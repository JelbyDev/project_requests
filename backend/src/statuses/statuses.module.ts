import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Request } from 'src/requests/request.model';
import { Status } from './status.model';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService],
  imports: [SequelizeModule.forFeature([Status, Request])],
  exports: [StatusesService],
})
export class StatusesModule {}
