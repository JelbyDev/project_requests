import {
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Controller,
} from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get()
  findAll() {
    return this.requestsService.getAllRequests();
  }
}

@Controller('request')
export class RequestController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get(':requestId')
  findById(@Param('requestId') requestId: number) {
    return this.requestsService.getRequestById(requestId);
  }

  @Post()
  create(@Body() requestDto: CreateRequestDto) {
    return this.requestsService.createRequest(requestDto);
  }

  @Post(':requestId/bind/:projectId')
  bindToProject(
    @Param('requestId') requestId: number,
    @Param('projectId') projectId: number,
  ) {
    return this.requestsService.bindRequestToProject(requestId, projectId);
  }

  @Post(':requestId/unbind/:project_id')
  unbindFromProject(@Param('requestId') requestId: number) {
    this.requestsService.unbindRequestToProject(requestId);
  }

  @Post(':requestId/status/next')
  setNextStatus() {
    return 'post';
  }

  @Post(':requestId/status/prev')
  setPrevStatus() {
    return 'post';
  }

  @Patch(':requestId')
  update(
    @Param('requestId') requestId: number,
    @Body() requestDto: UpdateRequestDto,
  ) {
    return this.requestsService.updateRequest(requestId, requestDto);
  }

  @Delete(':requestId')
  delete(@Param('requestId') requestId: number) {
    return this.requestsService.deleteRequestById(requestId);
  }
}
