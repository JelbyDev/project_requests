import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StatusesService } from 'src/statuses/statuses.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './request.model';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request) private requestModel: typeof Request,
    private statusesService: StatusesService,
  ) {}

  async createRequest(requestDto: CreateRequestDto): Promise<Request> {
    const defaultStatus = await this.statusesService.getStartStatus();
    requestDto.status_id = defaultStatus.id;
    const request = await this.requestModel.create(requestDto);
    return request;
  }

  async updateRequest(
    requestId: number,
    requestDto: UpdateRequestDto,
  ): Promise<Request> {
    const request = await this.getRequestById(requestId);
    await request.update({ ...requestDto });
    return request;
  }

  async updateRequestProjectId(requestId: number, projectId: number) {
    const request = await this.getRequestById(requestId);
    await request.update({ project_id: projectId });
    return request;
  }

  async getRequestById(requestId: number): Promise<Request> {
    const request = await this.requestModel.findOne({
      include: { all: true },
      where: {
        id: requestId,
      },
    });

    return request;
  }

  async getRequestsByProjectId(projectId: number): Promise<Request[]> {
    const requests = await this.requestModel.findAll({
      where: {
        project_id: projectId,
      },
    });
    return requests;
  }

  async deleteRequestById(requestId: number): Promise<void> {
    const request = await this.getRequestById(requestId);
    await request.destroy();
  }

  async setPrevStatus(requestId: number, statusId: number): Promise<Request> {
    const request = await this.getRequestById(requestId);
    const prevStatus = await this.statusesService.getPrevStatus(
      request.status_id,
    );

    if (prevStatus.id === statusId) {
      await request.update({ status_id: statusId });
      return await this.getRequestById(requestId);
    } else {
      throw new Error('???????????? ?????????????????? ??????????????');
    }
  }

  async setNextStatus(requestId: number, statusId: number): Promise<Request> {
    const request = await this.getRequestById(requestId);
    const nextStatus = await this.statusesService.getStatusById(statusId);

    if (request.status_id === nextStatus.parent_id) {
      await request.update({ status_id: statusId });
      return await this.getRequestById(requestId);
    } else {
      throw new Error('???????????? ?????????????????? ??????????????');
    }
  }
}
