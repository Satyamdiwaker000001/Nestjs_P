import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator'; // Add these imports

export class CreateTaskDto {
  @ApiProperty({
    example: 'Buy Groceries',
    description: 'The title of the task',
  })
  @IsString() // Add this
  @IsNotEmpty() // Add this
  title: string;

  @ApiProperty({
    example: 'Buy milk and eggs from the store',
    description: 'The detailed description of the task',
    required: false,
  })
  @IsString() // Add this
  description: string;
}
