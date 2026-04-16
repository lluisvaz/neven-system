import { createContext, useContext, ReactNode } from "react";

export type UserTag = "ADMIN" | "USER" | "SUPPORT" | "FINANCE";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  tags: UserTag[];
};

const mockUser: CurrentUser = {
  id: "1",
  name: "Admin",
  email: "admin@gestorpro.com",
  tags: ["ADMIN"],
};

type AuthContextType = {
  user: CurrentUser;
  hasTag: (tag: UserTag) => boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: mockUser,
  hasTag: () => false,
  isAdmin: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const hasTag = (tag: UserTag) => mockUser.tags.includes(tag);
  const isAdmin = hasTag("ADMIN");

  return (
    <AuthContext.Provider value={{ user: mockUser, hasTag, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
