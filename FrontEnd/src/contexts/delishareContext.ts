import { createContext } from "react";
import type { AuthContextProps } from "../provider/AuthProvider";

export const DelishareContext = createContext({} as AuthContextProps);
