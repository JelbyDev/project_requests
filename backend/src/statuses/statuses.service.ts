import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStatusDto } from './dto/create-status.dto';
import { Status } from './status.model';

@Injectable()
export class StatusesService {
  constructor(@InjectModel(Status) private statusModel: typeof Status) {}

  async createStatus(statusDto: CreateStatusDto): Promise<Status> {
    if (statusDto.prev_status_code) {
      const parentCodeRow = await this.getStatusByCode(
        statusDto.prev_status_code,
      );
      if (!parentCodeRow) throw new Error('Не найден код статуса');
    }
    const status = await this.statusModel.create(statusDto);
    return status;
  }

  async getStartStatus(): Promise<Status> {
    const status = await this.statusModel.findOne({
      where: {
        prev_status_code: '',
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
}
