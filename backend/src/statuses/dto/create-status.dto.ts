import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty({ message: 'status_code отсутствует' })
  @IsString({ message: 'status_code должен быть строкой' })
  status_code: string;

  @IsNotEmpty({ message: 'Название статуса отсутствует' })
  name: string;

  @IsNotEmpty({ message: 'prev_status_code отсутствует' })
  @IsString({ message: 'prev_status_code должен быть строкой' })
  prev_status_code: string;
}
