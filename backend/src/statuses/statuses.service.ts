import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { Status } from './status.model';

@Injectable()
export class StatusesService {
  constructor(@InjectModel(Status) private statusModel: typeof Status) {}

  async createStatus(statusDto: CreateStatusDto): Promise<Status> {
    if (statusDto.parent_status_code) {
      statusDto.parent_id = await this.getParentIdByStatusCode(
        statusDto.parent_status_code,
      );
    } else {
      statusDto.parent_id = 0;
    }
    const status = await this.statusModel.create(statusDto);
    return status;
  }

  async getParentIdByStatusCode(statusCode: string): Promise<number> {
    const parentStatus = await this.getStatusByCode(statusCode);
    if (!parentStatus) throw new Error('Не найден код статуса');
    return parentStatus.id;
  }

  async getStartStatus(): Promise<Status> {
    const status = await this.statusModel.findOne({
      where: {
        parent_id: 0,
      },
    });
    return status;
  }

  async getStatusById(statusId: number): Promise<Status> {
    const status = await this.statusModel.findOne({
      where: {
        id: statusId,
      },
    });
    return status;
  }

  async getStatusByCode(statusCode: string): Promise<Status> {
    const status = await this.statusModel.findOne({
      where: {
        status_code: statusCode,
      },
    });
    return status;
  }
  async getStatusesByParentId(parentId: number): Promise<Status[]> {
    const statuses = await this.statusModel.findAll({
      where: {
        parent_id: parentId,
      },
    });
    return statuses;
  }
}
