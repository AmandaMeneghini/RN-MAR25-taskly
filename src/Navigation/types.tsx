import { NavigatorScreenParams } from '@react-navigation/native';
import { Task } from '../interfaces/task';

export type BottomTabParamList = {
  Home: { 
    scrollToTaskId?: string;
    deletedTaskId?: string;
  } | undefined;
  Notifications: undefined;
  Menu: undefined;
};

export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Menu: undefined;
  Regulamentos: undefined;
  AvatarSelector: {
    isEditing: boolean;
    email?: string;
    password?: string;
    name?: string;
    phone_number?: string;
  };
  PreferencesMenu: undefined;
  EditPersonalInfo: undefined;
  Login: undefined;
  MainApp: NavigatorScreenParams<BottomTabParamList>;
  TaskDetails: {
    task: Task;
  };
};
