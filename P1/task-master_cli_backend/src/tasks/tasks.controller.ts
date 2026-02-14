import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(
      createTaskDto.title,
      createTaskDto.description,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update task completion status' })
  updateStatus(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateStatus(+id, updateTaskDto.isCompleted);
  }
}
