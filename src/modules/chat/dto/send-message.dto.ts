import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
    @ApiProperty({ description: 'The message body', maxLength: 1600 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1600)
    body: string;
}
