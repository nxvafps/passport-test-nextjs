"use client";
import "./globals.css";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import StyledComponentsRegistry from "../lib/registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
