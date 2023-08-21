import { ChatInterface } from 'interfaces/chat';
import { GetQueryInterface } from 'interfaces';

export interface RoleInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  name?: string;
  description?: string;
  active?: boolean;
  chat?: ChatInterface[];

  _count?: {
    chat?: number;
  };
}

export interface RoleGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
}
