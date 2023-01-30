import { Model, Column, Table, DataType } from 'sequelize-typescript';

interface RequestCreationFields {
  name: string;
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

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  project_id: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  status_code: string;
}
