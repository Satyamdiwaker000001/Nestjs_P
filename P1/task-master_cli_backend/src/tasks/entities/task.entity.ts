import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;
}
