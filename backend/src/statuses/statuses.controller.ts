import { Get, Controller } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get('create_default')
  async findById() {
    const defaultStatuses: CreateStatusDto[] = [
      { name: 'Заготовка', status_code: 'work_piece', prev_status_code: '' },
      {
        name: 'В работе',
        status_code: 'at_work',
        prev_status_code: 'work_piece',
      },
      {
        name: 'На согласовании',
        status_code: 'on_approval',
        prev_status_code: 'at_work',
      },
      {
        name: 'Принята',
        status_code: 'accepted',
        prev_status_code: 'on_approval',
      },
      {
        name: 'Отказ',
        status_code: 'refusal',
        prev_status_code: 'on_approval',
      },
    ];

    for (const statusDto of defaultStatuses) {
      await this.statusesService.createStatus(statusDto);
    }

    return defaultStatuses;
  }
}
