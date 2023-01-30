import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectsController, ProjectController } from './projects.controller';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';
import { RequestsService } from 'src/requests/requests.service';
import { Request } from 'src/requests/request.model';

@Module({
  controllers: [ProjectsController, ProjectController],
  providers: [ProjectsService, RequestsService],
  imports: [SequelizeModule.forFeature([Project, Request])],
})
export class ProjectsModule {}
