import { IsNotEmpty } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
