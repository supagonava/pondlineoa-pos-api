import { DataSource } from 'typeorm';
import { ALL_ENTITIES } from './app.module';
import * as path from 'path';

const dbPath = path.join(path.dirname(__filename), '../database.sqlite');
export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  entities: ALL_ENTITIES,
  synchronize: true,
});
