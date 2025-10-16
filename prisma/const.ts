import { User } from "../lib/types/types";
export const SEED_USERS: Pick<
  User,
  "email" | "firstName" | "lastName" | "role"
>[] = [
  {
    email: "admin@admin.se",
    firstName: "Admin",
    lastName: "Adminsson",
    role: "ADMIN",
  },
  {
    email: "userOne@user.se",
    firstName: "UserOne",
    lastName: "Usersson",
    role: "USER",
  },
  {
    email: "userTwo@user.se",
    firstName: "UserTwo",
    lastName: "Usersson",
    role: "USER",
  },
  {
    email: "userThree@user.se",
    firstName: "UserThree",
    lastName: "Usersson",
    role: "USER",
  },
];
