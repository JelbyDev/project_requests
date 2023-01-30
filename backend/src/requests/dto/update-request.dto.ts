import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateRequestDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
