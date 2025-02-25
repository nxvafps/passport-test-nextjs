"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.dark.background};
  color: ${(props) => props.theme.colors.dark.text};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.dark.primary};
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Message = styled.p`
  color: ${(props) => props.theme.colors.dark.text};
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const LogoutButton = styled.button`
  background: ${(props) => props.theme.colors.dark.error};
  color: ${(props) => props.theme.colors.dark.background};
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export default function SuccessPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SuccessContainer>
      <Title>Login Successful!</Title>
      <Message>Welcome to your account.</Message>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </SuccessContainer>
  );
}
