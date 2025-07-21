"use client";
import React, { useState } from "react";
import InputField from "../../../components/InputField";
import Button from "../../../components/Button";
import SuccessScreen from "../../../components/SuccessScreen";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../page.module.css";
import Text from "../../../components/Text";

const forgotSchema = z.object({
  email: z.email({ message: "invalidEmail" }),
});

type ForgotForm = z.infer<typeof forgotSchema>;

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const email = watch("email");

  const onSubmit = async () => {
    const res = await fetch("/api/users", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const { users } = await res.json();
    if (users.includes(email)) {
      setSuccess(true);
    } else {
      setError("email", {
        type: "manual",
        message: "emailNotFound",
      });
    }
  };

  if (success) {
    return <SuccessScreen message={t("successReset")} />;
  }

  return (
    <section className={styles.container}>
      <Text variant="heading">{t("forgotPassword")}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={t("email")}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setValue("email", e.target.value)}
          error={t(errors.email?.message ?? "")}
        />
        <Button type="submit">{t("submit")}</Button>
      </form>
    </section>
  );
};

export default ForgotPasswordPage;
