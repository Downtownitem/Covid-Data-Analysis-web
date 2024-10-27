import { createContext } from "react";

export interface MenuData {
  actualPage: string;
}

export const MenuContext = createContext({} as MenuData);
