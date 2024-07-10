// user.interface.ts
export interface User {
  userId: number;
  name: string;
  lineId: string;
  isAdmin: boolean;
  register(): void;
  signInWithLine(): void;
  viewOrderHistory(): void;
}
