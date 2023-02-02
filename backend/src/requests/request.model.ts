import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Project } from 'src/projects/project.model';
import { Status } from 'src/statuses/status.model';

interface RequestCreationFields {
  name: string;
  description: string;
}

@Table({ tableName: 'requests' })
export class Request extends Model<Request, RequestCreationFields> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  project_id: number;

  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  status_id: number;

  @BelongsTo(() => Status)
  current_status: Status;
}
