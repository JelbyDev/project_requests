import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Request } from 'src/requests/request.model';

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
  @ForeignKey(() => Request)
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
