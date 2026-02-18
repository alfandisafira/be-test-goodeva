import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }
  
  /**
   * GET /api/todos?search= → daftar todo (array), serta filter sederhana pada title
   * POST /api/todos → buat todo { title: string }
   * PATCH /api/todos/:id →  created, completed, on_going, problem (tambahkan problem_desc)
   */

  @Get()
  find(@Query('search') search?: string) {
    return this.todosService.find(search);
  }

  @Post()
  create(@Body(ValidationPipe) createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }
}
