"use client";
import RegisterForm from "../components/RegisterForm";
import styled from "styled-components";
import { Button } from "../components/auth/styles";
import { useRouter } from "next/navigation";

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.dark.text};
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 600;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.dark.background};
  color: ${(props) => props.theme.colors.dark.text};
`;

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  max-width: 400px;
`;

export default function RegisterPage() {
  const router = useRouter();

  return (
    <PageContainer>
      <Title>Register</Title>
      <RegisterForm />
      <ButtonWrapper>
        <Button type="button" onClick={() => router.push("/")}>
          Return Home
        </Button>
      </ButtonWrapper>
    </PageContainer>
  );
}
