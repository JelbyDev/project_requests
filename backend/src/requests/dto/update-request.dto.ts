import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRequestDto {
  @IsNotEmpty({ message: 'id заявки отсутствует' })
  @IsNumber({}, { message: 'id заявки должен быть числом' })
  id: number;

  @IsNotEmpty({ message: 'Название заявки отсутствует' })
  name: string;

  @IsNotEmpty({ message: 'Описание заявки отсутствует' })
  description: string;

  @IsNotEmpty({ message: 'project_id заявки отсутствует' })
  @IsNumber({}, { message: 'project_id заявки должен быть числом' })
  project_id: number;
}
