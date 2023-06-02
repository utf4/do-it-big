import { IsString, Length } from 'class-validator';

export class EmailReplyDto {
  @IsString()
  @Length(3, 200)
  body: string;
}
