import { useContext } from "react";
import { DelishareContext } from "../contexts/delishareContext";

export function useDelishare() {
  const context = useContext(DelishareContext);

  if (context === null) {
    throw new Error("useDelishare must be used within AuthProvider");
  }

  return context;
}
