"use client";
import React, { useEffect } from "react";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import SuccessScreen from "../../../components/SuccessScreen";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { loginSuccess, loginFailure, logout } from "../../../state/authSlice";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../page.module.css";
import Text from "../../../components/Text";

const loginSchema = z.object({
  email: z.email({ message: "invalidEmail" }),
  password: z.string().min(8, { message: "passwordMinLength" }),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isAuthenticated, error, clearForm } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (clearForm) {
      setValue("email", "");
      setValue("password", "");
    }
  }, [clearForm, setValue]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        dispatch(loginSuccess(data.email));
      } else {
        dispatch(loginFailure(result.error || t("errorLogin")));
      }
    } catch {
      dispatch(loginFailure(t("errorLogin")));
    }
  };

  if (isAuthenticated) {
    return (
      <SuccessScreen
        message={t("successLogin")}
        buttonText={t("logout")}
        onButtonClick={() => dispatch(logout())}
      />
    );
  }

  return (
    <section className={styles.container}>
      <Text variant="heading">{t("login")}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={t("email")}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setValue("email", e.target.value)}
          error={t(errors.email?.message || error || "")}
        />
        <InputField
          label={t("password")}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setValue("password", e.target.value)}
          error={t(errors.password?.message ?? "", { count: 8 })}
        />
        <Button type="submit">{t("login")}</Button>
      </form>
      <Link href="forgot-password">
        <Text variant="link">{t("forgotPassword")}</Text>
      </Link>
    </section>
  );
};
export default LoginPage;
