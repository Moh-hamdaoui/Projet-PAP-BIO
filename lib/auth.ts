import usersData from "@/test-data/users.json";

export type UserRole = "particulier" | "pro" | "pro_LaVieClaire";

export interface UserAccount {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

const STORAGE_KEY = "pap-bio-users";

function getSeedUsers(): UserAccount[] {
  return (usersData.users as UserAccount[]).map((user) => ({ ...user }));
}

function getStoredUsers(): UserAccount[] {
  if (typeof window === "undefined") {
    return getSeedUsers();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seedUsers = getSeedUsers();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedUsers));
    return seedUsers;
  }

  try {
    return JSON.parse(raw) as UserAccount[];
  } catch {
    return getSeedUsers();
  }
}

export function getUsers(): UserAccount[] {
  return getStoredUsers();
}

export function saveUser(user: UserAccount): UserAccount[] {
  const users = getUsers();
  const exists = users.some((item) => item.email.toLowerCase() === user.email.toLowerCase());

  if (exists) {
    return users;
  }

  const nextUsers = [...users, user];
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUsers));
  }
  return nextUsers;
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
