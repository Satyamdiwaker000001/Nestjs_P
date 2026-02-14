import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator'; // Add this import

export class UpdateTaskDto {
  @ApiProperty({
    example: true,
    description: 'The completion status of the task',
    type: Boolean,
  })
  @IsBoolean() // Add this
  isCompleted: boolean;
}
