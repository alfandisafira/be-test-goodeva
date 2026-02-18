import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@Inject('DB_POOL') private pool: Pool) {}

  async find(search?: string) {
    let response = {
      success: true,
      data: null,
      message: null
    };

    let queryFind = "SELECT * FROM todos";

    if (search) {
      queryFind += " WHERE title ILIKE $1 ORDER BY id ASC"
    
      const result = await this.pool.query(queryFind, [`%${search}%`]);
      response.data = result.rows;

      if (result.rows.length === 0) response.message = "Data tidak ditemukan";

      return response;
    }

    queryFind += " ORDER BY id ASC";

    const result = await this.pool.query(queryFind);
    response.data = result.rows;

    if (result.rows.length === 0) response.message = "Data tidak ditemukan";

    return response;
  }

  async create(createTodoDto: CreateTodoDto) {
    let response = {
      success: true,
      message: null
    };

    const queryCreate = `
      INSERT INTO todos (title) 
      VALUES ($1) 
      RETURNING *
    `;

    const result = await this.pool.query(queryCreate, [createTodoDto.title]);

    if (result.rows.length > 0) {
      response.message = "Data berhasil disimpan"; 
    } else {
      response.success = false;
      response.message = "Data gagal disimpan";
    }

    return response;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    let response = {
      success: true,
      message: null
    };

    const queryFindTodo = "SELECT * FROM todos WHERE id = $1";

    const result = await this.pool.query(queryFindTodo, [id]);
    
    if (result.rows.length > 0) {

      const queryUpdateTodo = `
        UPDATE todos
        SET
          status = $1,
          problem_desc = $2
        WHERE id = $3
      `;

      const update = await this.pool.query(queryUpdateTodo, [updateTodoDto.status, updateTodoDto.problem_desc, id]);

      if (update.rowCount > 0) {
        response.message = "Data berhasil diperbarui"
      } else {
        response.success = false;
        response.message = "Data gagal diperbarui"
      }
    } else {
      response.success = false;
      response.message = "Todo tidak ditemukan";
    }

    return response;
  }
}
