import { Body, Controller, Get, Param, Patch, Post, Query, Search } from '@nestjs/common';
import { TodosService } from './todos.service';

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
    return search ?? [];
  }

  @Post()
  create(@Body() todo: { title: string }) {
    return todo;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todo: { title: string, status: string }) {
    return { id, ...todo };
  }
}
