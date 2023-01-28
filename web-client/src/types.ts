export interface TeacherProps extends AccountProps {
  QrCode?: string;
  Name?: string;
  IdNumber?: string;
  BirthDate?: string;
  Department?: string;
  isActive?: boolean;
}

export interface AccountProps {
  IdNumber?: string;
  UserName?: string;
  Password?: string;
}
