import { MessageInterface } from 'interfaces/message';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { RoleInterface } from 'interfaces/role';
import { ModelInterface } from 'interfaces/model';
import { GetQueryInterface } from 'interfaces';

export interface ChatInterface {
  id?: string;
  title: string;
  user_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  role_id: string;
  model_id: string;
  message?: MessageInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  role?: RoleInterface;
  model?: ModelInterface;
  _count?: {
    message?: number;
  };
}

export interface ChatGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  user_id?: string;
  organization_id?: string;
  role_id?: string;
  model_id?: string;
}
