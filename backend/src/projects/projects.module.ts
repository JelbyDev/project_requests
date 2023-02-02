import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectsController, ProjectController } from './projects.controller';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';
import { Request } from 'src/requests/request.model';
import { RequestsModule } from 'src/requests/requests.module';

@Module({
  controllers: [ProjectsController, ProjectController],
  providers: [ProjectsService],
  imports: [SequelizeModule.forFeature([Project, Request]), RequestsModule],
})
export class ProjectsModule {}
