import { Get, Controller, Param } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusesService } from './statuses.service';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Get('createDefault')
  async findById() {
    const defaultStatuses: CreateStatusDto[] = [
      { name: 'Заготовка', status_code: 'work_piece', parent_status_code: '' },
      {
        name: 'В работе',
        status_code: 'at_work',
        parent_status_code: 'work_piece',
      },
      {
        name: 'На согласовании',
        status_code: 'on_approval',
        parent_status_code: 'at_work',
      },
      {
        name: 'Принята',
        status_code: 'accepted',
        parent_status_code: 'on_approval',
      },
      {
        name: 'Отказ',
        status_code: 'refusal',
        parent_status_code: 'on_approval',
      },
    ];

    for (const statusDto of defaultStatuses) {
      await this.statusesService.createStatus(statusDto);
    }

    return defaultStatuses;
  }

  @Get('next/:statusId')
  nextStatuses(@Param('statusId') statusId: number) {
    return this.statusesService.getNextStatuses(statusId);
  }

  @Get('prev/:statusId')
  prevStatuses(@Param('statusId') statusId: number) {
    return this.statusesService.getPrevStatus(statusId);
  }
}
