import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty({ message: 'Название заявки отсутствует' })
  name: string;

  @IsNotEmpty({ message: 'Описание заявки отсутствует' })
  description: string;

  @IsNotEmpty({ message: 'project_id заявки отсутствует' })
  @IsNumber({}, { message: 'project_id заявки должен быть числом' })
  project_id: number;

  @IsNumber({}, { message: 'status_id заявки должен быть числом' })
  status_id: number;
}
