"use client";
import { useRouter } from "next/navigation";
import { AuthContainer, Title } from "./components/auth/styles";

export default function HomePage() {
  const router = useRouter();

  return (
    <AuthContainer>
      <Title>Welcome</Title>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => router.push("/login")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Go to Login
        </button>
        <button
          onClick={() => router.push("/register")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Go to Register
        </button>
      </div>
    </AuthContainer>
  );
}
