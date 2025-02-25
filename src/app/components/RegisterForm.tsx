"use client";

import { Formik, Field, FormikHelpers, FieldInputProps } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FormContainer,
  StyledForm,
  FormField,
  Input,
  ErrorMessage,
  Button,
} from "./auth/styles";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (
    values: { name: string; email: string; username: string; password: string },
    {
      setSubmitting,
    }: FormikHelpers<{
      name: string;
      email: string;
      username: string;
      password: string;
    }>
  ) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        router.push("/login?registered=true");
      } else {
        const data = await res.json();
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred during registration");
      console.error("Registration failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{ name: "", email: "", username: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <StyledForm>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <FormField>
              <Field name="name">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} type="text" placeholder="Full Name" />
                )}
              </Field>
              {errors.name && touched.name && (
                <ErrorMessage>{errors.name}</ErrorMessage>
              )}
            </FormField>

            <FormField>
              <Field name="email">
                {({ field }: { field: FieldInputProps<string> }) => (
                  <Input {...field} type="email" placeholder="Email" />
                )}
              </Field>
              {errors.email && touched.email && (
                <ErrorMessage>{errors.email}</ErrorMessage>
              )}
            </FormField>

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

            <Button type="submit">Register</Button>
            <Button type="button" onClick={() => router.push("/login")}>
              Already have an account? Login here
            </Button>
          </StyledForm>
        )}
      </Formik>
    </FormContainer>
  );
}
