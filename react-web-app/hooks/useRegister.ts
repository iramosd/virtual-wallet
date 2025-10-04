'use client';

import { useState } from 'react';

const API_BASE_URL = 'http://localhost:8002/api';

interface RegisterData {
  document: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    token?: string;
  };
}

interface UseRegisterReturn {
  register: (data: RegisterData) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useRegister(): UseRegisterReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      if (data.password !== data.confirmPassword) {
        setError('Las contraseñas no coinciden');
        return false;
      }

      if (data.password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        setError('El formato del email no es válido');
        return false;
      }

      if (data.name.trim().length < 2) {
        setError('El nombre debe tener al menos 2 caracteres');
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: data.document.trim(),
          fullName: data.name.trim(),
          email: data.email.toLowerCase().trim(),
          password: data.password,
          phone: data.phone.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error en el registro: ${response.status}`);
      }

      const result: RegisterResponse = await response.json();
console.log("Result", result);
      /*if ([200,201].includes(result.code)) {
        throw new Error(result.message || 'Error en el registro');
      }*/

      if (result.data) {
        const userData = {
          id: result.data.id,
          fullname: result.data.name,
          email: result.data.email,
          token: result.data.token || result.data.id, 
        };

        localStorage.setItem('user', JSON.stringify(userData));
        
        document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`;
      }

      setSuccess(true);
      return true;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido en el registro';
      setError(errorMessage);
      console.error('Error en registro:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
    error,
    success,
  };
}

export function useRegisterValidation() {
  const [errors, setErrors] = useState<Partial<RegisterData>>({});

  const validateField = (field: keyof RegisterData, value: string, allData?: RegisterData) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        if (value.trim().length < 2) {
          newErrors.name = 'El nombre debe tener al menos 2 caracteres';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = 'El formato del email no es válido';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (value.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (allData && value !== allData.password) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAll = (data: RegisterData) => {
    const newErrors: Partial<RegisterData> = {};

    if (data.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (data.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    errors,
    validateField,
    validateAll,
    clearErrors,
    isValid: Object.keys(errors).length === 0,
  };
}
