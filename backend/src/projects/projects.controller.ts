import {
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Controller,
} from '@nestjs/common';
import { RequestsService } from 'src/requests/requests.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll() {
    throw new Error('gg');
    return this.projectsService.getAllProjects();
  }
}

@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly requestsService: RequestsService,
  ) {}

  @Get(':projectId')
  findById(@Param('projectId') projectId: number) {
    return this.projectsService.getProjectById(projectId);
  }

  @Get(':projectId/requests')
  findRequests(@Param('projectId') projectId: number) {
    return this.requestsService.getRequestsByProjectId(projectId);
  }

  @Post()
  create(@Body() projectDto: CreateProjectDto) {
    return this.projectsService.createProject(projectDto);
  }

  @Patch(':projectId')
  update(
    @Param('projectId') projectId: number,
    @Body() projectDto: UpdateProjectDto,
  ) {
    return this.projectsService.updateProject(projectId, projectDto);
  }

  @Delete(':projectId')
  delete(@Param('projectId') projectId: number) {
    return this.projectsService.deleteProjectById(projectId);
  }
}
