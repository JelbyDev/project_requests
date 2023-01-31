import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty({ message: 'id проекта отсутствует' })
  @IsNumber({}, { message: 'id проекта должен быть числом' })
  id: number;

  @IsNotEmpty({ message: 'Название проекта отсутствует' })
  name: string;
}
