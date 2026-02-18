import { IsNotEmpty } from "class-validator";

export class CreateTodoDto {
  
  @IsNotEmpty({
    message: "Title tidak boleh kosong"
  })
  title: string;
}