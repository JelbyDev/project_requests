import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Status } from './status.model';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService],
  imports: [SequelizeModule.forFeature([Status])],
})
export class StatusesModule {}
