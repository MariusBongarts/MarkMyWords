import { Entity } from './entity';
export interface Mark extends Entity{
  url: string,
  origin: string,
  text: string
  anchorNodeText: string,
  anchorOffset: number,
  createdAt: number
}