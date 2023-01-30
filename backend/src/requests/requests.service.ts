import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './request.model';

@Injectable()
export class RequestsService {
  constructor(@InjectModel(Request) private requestModel: typeof Request) {}

  async createRequest(requestDto: CreateRequestDto): Promise<Request> {
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

  async getAllRequests(): Promise<Request[]> {
    const requests = await this.requestModel.findAll();
    return requests;
  }

  async getRequestById(requestId: number): Promise<Request> {
    const request = await this.requestModel.findOne({
      where: {
        id: requestId,
      },
    });
    return request;
  }

  async deleteRequestById(requestId: number): Promise<void> {
    const request = await this.getRequestById(requestId);
    await request.destroy();
  }

  async bindRequestToProject(requestId: number, projectId: number) {
    const request = await this.getRequestById(requestId);
    request.project_id = projectId;
    await request.update({ ...request });
    return request;
  }

  async unbindRequestToProject(requestId: number) {
    const request = this.bindRequestToProject(requestId, 0);
    return request;
  }
}
