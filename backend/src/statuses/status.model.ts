import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Request } from 'src/requests/request.model';

interface StatusCreationFields {
  name: string;
  status_code: string;
  parent_id: number;
}

@Table({ tableName: 'statuses', createdAt: false, updatedAt: false })
export class Status extends Model<Status, StatusCreationFields> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ForeignKey(() => Request)
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  status_code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => Request)
  @Column({ type: DataType.INTEGER })
  parent_id: number;
}
