import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectsController, ProjectController } from './projects.controller';
import { Project } from './project.model';
import { ProjectsService } from './projects.service';

@Module({
  controllers: [ProjectsController, ProjectController],
  providers: [ProjectsService],
  imports: [SequelizeModule.forFeature([Project])],
})
export class ProjectsModule {}
