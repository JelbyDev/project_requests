import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty({ message: 'Название проекта отсутствует' })
  name: string;
}
