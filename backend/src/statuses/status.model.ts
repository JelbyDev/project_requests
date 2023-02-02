import { Model, Column, Table, DataType } from 'sequelize-typescript';

interface StatusCreationFields {
  name: string;
  status_code: string;
  prev_status_code: string;
}

@Table({ tableName: 'statuses', createdAt: false, updatedAt: false })
export class Status extends Model<Status, StatusCreationFields> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  status_code: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING })
  prev_status_code: string;
}
