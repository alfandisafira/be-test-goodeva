import { IsEnum } from "class-validator";
import { TodoStatus } from "../entities/todo-status.enum";

export class UpdateTodoDto {
  @IsEnum(TodoStatus, {
    message: 'Status harus berupa CREATED, ON_GOING, COMPLETED, atau PROBLEM'
  })
  status: TodoStatus;

  problem_desc: string;
}