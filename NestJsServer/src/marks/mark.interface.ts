import { Entity } from './../models/entity';
export interface Mark extends Entity {
  url: string;
  origin: string;
  text: string;
  tags: string[];
  anchorOffset: number;
  nodeTagName: string;
  startOffset: number;
  endOffset: number;
  nodeData: string;
  startContainerText: string;
  endContainerText: string;
  completeText: string;
  title: string;
  _user?: string;
  scrollY: number;
}
