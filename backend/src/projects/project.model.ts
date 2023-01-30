import { Model, Column, Table, DataType } from 'sequelize-typescript';

interface ProjectCreationFields {
  name: string;
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationFields> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
