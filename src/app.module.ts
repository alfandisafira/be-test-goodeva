import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'dist'), 
      exclude: ['/api/(.*)'], 
    }),
    TodosModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
