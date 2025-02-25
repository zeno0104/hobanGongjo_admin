export type StatusType =
  | "counselIncompleted"
  | "counselCompleted"
  | "installConfirm"
  | "installFinished";

export type Data = {
  id: number;
  content: string;
  created_at: string;
  install_location: string;
  install_type: string;
  name: string;
  phone_number: string;
  region: string;
  type: string;
  status: StatusType;
  memo: string;
  address: string;
  installDate:string;
};
export interface User {
    email: string;
    password: string;
}
export type ButtonType = {
    text: string;
    onClick: () => void;
    type?: string;
};