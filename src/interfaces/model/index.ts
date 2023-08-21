import { ChatInterface } from 'interfaces/chat';
import { GetQueryInterface } from 'interfaces';

export interface ModelInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  name: string;
  active?: boolean;
  chat?: ChatInterface[];

  _count?: {
    chat?: number;
  };
}

export interface ModelGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
}
