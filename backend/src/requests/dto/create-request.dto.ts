import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  project_id: number;
}
