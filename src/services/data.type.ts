import { User } from "firebase/auth";
import { Moment } from "moment";

export type Timestamp = {
  createdOn: Moment;
  updatedOn: Moment;
};

export type BaseRecord = {
  id:number;
  user: User;
  timestamp: Timestamp;
};

export type Activity = BaseRecord & {
  title: string;
  description: string;
};

export type Profile = BaseRecord & {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Moment;
  aboutMe: string;
};

export type Team = BaseRecord & {
  name: string;
  description: string;
  memberCount: string;
  members: User[];
};

export type Feedback = BaseRecord & {
  accepted: boolean;
};

export type Expense = BaseRecord & {
  amountPaid: number;
  catogory: string;
  date: Moment;
  feedback?: Feedback;
  name: string;
  remarks?: string;
  team?: Team;
  totalAmount: number;
};
