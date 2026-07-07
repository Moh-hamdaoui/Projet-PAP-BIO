import usersData from "@/test-data/users.json";

export type UserRole = "particulier" | "pro" | "pro_LaVieClaire";

export interface UserAccount {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

const USERS_STORAGE_KEY = "pap-bio-users";
const TOKEN_STORAGE_KEY = "pap-bio-token";

function getSeedUsers(): UserAccount[] {
  return (usersData.users as UserAccount[]).map((user) => ({ ...user }));
}

function getStoredUsers(): UserAccount[] {
  if (typeof window === "undefined") {
    return getSeedUsers();
  }

  const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) {
    const seedUsers = getSeedUsers();
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seedUsers));
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
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
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

export function createToken(user: UserAccount): string {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };

  return btoa(JSON.stringify(payload));
}

export function saveAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearAuthToken(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function isAuthenticated(): boolean {
  return Boolean(getAuthToken());
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
