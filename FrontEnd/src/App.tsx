import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyles from "./styles/globalStyles";
import AuthProvider from "./provider/AuthProvider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AppRoutes />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: theme.colors.background,
                color: theme.font.colors.DarkBlue,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: "12px",
                padding: "12px 16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
              success: {
                iconTheme: {
                  primary: theme.colors.greenSchema?.default || "#10b981",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: theme.colors.error || "#ef4444",
                  secondary: "#fff",
                },
              },
            }}
          />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
