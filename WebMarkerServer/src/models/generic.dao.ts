import { Entity } from './entity';

export interface GenericDAO<T extends Entity> {

  create(entity: Partial<T>): Promise<T>

  findAll(entityFilter?: Partial<T>): Promise<T[]>

  findOne(filter: Partial<T>): Promise<T | null>

  update(entity: Partial<T>): Promise<boolean>

  delete(id: string): Promise<boolean>

}
