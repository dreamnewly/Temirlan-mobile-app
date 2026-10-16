import React, { createContext, useContext, useMemo, useState } from 'react';

type AuthFlowState = {
  phone: string;
  setPhone: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  acceptedTerms: boolean;
  setAcceptedTerms: (value: boolean) => void;
  code: string;
  setCode: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
};

const AuthFlowContext = createContext<AuthFlowState | null>(null);

export function AuthFlowProvider({ children }: { children: React.ReactNode }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [code, setCode] = useState('');
  const [city, setCity] = useState('');

  const value = useMemo(
    () => ({
      phone,
      setPhone,
      password,
      setPassword,
      fullName,
      setFullName,
      acceptedTerms,
      setAcceptedTerms,
      code,
      setCode,
      city,
      setCity,
    }),
    [phone, password, fullName, acceptedTerms, code, city],
  );

  return <AuthFlowContext.Provider value={value}>{children}</AuthFlowContext.Provider>;
}

export function useAuthFlow() {
  const value = useContext(AuthFlowContext);
  if (!value) {
    throw new Error('useAuthFlow must be used inside AuthFlowProvider');
  }
  return value;
}
