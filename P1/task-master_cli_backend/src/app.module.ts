import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // Agar cloud par hai toh process.env se lega, nahi toh local 127.0.0.1
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'taskmanager',
      autoLoadEntities: true,
      // Pehli baar deploy kar rahe ho toh synchronize true rakho taaki tables ban jayein
      synchronize: true,
      logging: false,
      entities: [Task],
      // Cloud hosting ke liye ssl certificate ki zaroorat pad sakti hai
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
