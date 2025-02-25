"use client";

import { Formik, Field, FormikHelpers, FieldInputProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FormContainer,
  StyledForm,
  FormField,
  Input,
  ErrorMessage,
  Button,
  SuccessMessage,
} from "./auth/styles";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const justRegistered = searchParams.get("registered") === "true";

  const handleSubmit = async (
    values: { username: string; password: string },
    { setSubmitting }: FormikHelpers<{ username: string; password: string }>
  ) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push("/success");
      } else {
        const data = await res.json();
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Login failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      {justRegistered && (
        <SuccessMessage>
          Account successfully created! Please log in.
        </SuccessMessage>
      )}
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <StyledForm>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormField>
              <Field name="username">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} type="text" placeholder="Username" />
                )}
              </Field>
              {errors.username && touched.username && (
                <ErrorMessage>{errors.username}</ErrorMessage>
              )}
            </FormField>

            <FormField>
              <Field name="password">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} type="password" placeholder="Password" />
                )}
              </Field>
              {errors.password && touched.password && (
                <ErrorMessage>{errors.password}</ErrorMessage>
              )}
            </FormField>

            <Button type="submit">Log In</Button>
            <Button type="button" onClick={() => router.push("/register")}>
              Don't have an account? Register here
            </Button>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
  );
}
