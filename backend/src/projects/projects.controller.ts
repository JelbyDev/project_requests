import {
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Controller,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    return this.projectsService.getAllProjects();
  }
}

@Controller('project')
export class ProjectController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':projectId')
  findById(@Param('projectId') projectId: number) {
    return this.projectsService.getProjectById(projectId);
  }

  @Post()
  create(@Body() projectDto: CreateProjectDto) {
    return this.projectsService.createProject(projectDto);
  }

  @Patch(':projectId')
  update(@Body() projectDto: UpdateProjectDto) {
    return this.projectsService.updateProject(projectDto);
  }

  @Delete(':projectId')
  delete(@Param('projectId') projectId: number) {
    return this.projectsService.deleteProjectById(projectId);
  }
}
