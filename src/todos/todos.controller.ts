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
    return this.todosService.find(search);
  }

  @Post()
  create(@Body() todo: { title: string }) {
    return this.todosService.create(todo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todo: { title: string, status: string, problem_desc: string }) {
    return this.todosService.update(id, todo);
  }
}
