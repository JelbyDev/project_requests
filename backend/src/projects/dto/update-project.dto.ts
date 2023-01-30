import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  name: string;
}
