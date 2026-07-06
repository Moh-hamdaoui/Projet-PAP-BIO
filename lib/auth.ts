import usersData from "@/test-data/users.json";

export type UserRole = "particulier" | "pro" | "pro_LaVieClaire";

export interface UserAccount {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

export function getUsers(): UserAccount[] {
  return usersData.users as UserAccount[];
}

export function findUserByEmail(email: string): UserAccount | undefined {
  return getUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function validateUser(email: string, password: string): UserAccount | undefined {
  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return undefined;
  }

  return user;
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case "particulier":
      return "Particulier";
    case "pro":
      return "Professionnel";
    case "pro_LaVieClaire":
      return "Professionnel La Vie Claire";
    default:
      return role;
  }
}
