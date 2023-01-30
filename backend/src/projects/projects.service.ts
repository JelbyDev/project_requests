import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './project.model';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project) private projectModel: typeof Project) {}

  async createProject(projectDto: CreateProjectDto): Promise<Project> {
    const project = await this.projectModel.create(projectDto);
    return project;
  }

  async updateProject(
    projectId: number,
    projectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.getProjectById(projectId);
    await project.update({ ...projectDto });
    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    const projects = await this.projectModel.findAll();
    return projects;
  }

  async getProjectById(projectId: number): Promise<Project> {
    const project = await this.projectModel.findOne({
      where: {
        id: projectId,
      },
    });
    return project;
  }

  async deleteProjectById(projectId: number): Promise<void> {
    const project = await this.getProjectById(projectId);
    await project.destroy();
  }
}
