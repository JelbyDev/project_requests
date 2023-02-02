import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty({ message: 'status_code отсутствует' })
  @IsString({ message: 'status_code должен быть строкой' })
  status_code: string;

  @IsNotEmpty({ message: 'Название статуса отсутствует' })
  name: string;

  @IsNotEmpty({ message: 'parent_status_code отсутствует' })
  @IsString({ message: 'parent_status_code должен быть числом' })
  parent_status_code: string;

  parent_id?: number;
}
