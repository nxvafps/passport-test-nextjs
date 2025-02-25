import styled from "styled-components";
import { Form as FormikForm } from "formik";

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
  background: ${(props) => props.theme.colors.dark.background};
`;

export const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: ${(props) => props.theme.colors.dark.surface};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: 0 2px 4px ${(props) => props.theme.colors.dark.border};
`;

export const Label = styled.label`
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  font-weight: 500;
  color: ${(props) => props.theme.colors.dark.text};
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.dark.text};
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 600;
`;

export const StyledForm = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.dark.border};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  background: ${(props) => props.theme.colors.dark.background};
  color: ${(props) => props.theme.colors.dark.text};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.dark.primary};
  }
`;

export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.colors.dark.error};
  font-size: 0.875rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: ${(props) => props.theme.colors.dark.primary};
  color: white;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const SuccessMessage = styled.div`
  color: ${(props) => props.theme.colors.dark.success};
  background: ${(props) => props.theme.colors.dark.surface};
  border: 1px solid ${(props) => props.theme.colors.dark.success};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
`;
