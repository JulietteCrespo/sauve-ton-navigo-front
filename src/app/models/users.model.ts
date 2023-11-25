export interface Users {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  isEditing?: boolean;
}
