import type { Metadata } from "next";
import "../globals.css";
import ReduxProvider from "@/components/ReduxProvider";
import { I18nProvider } from "./i18n-provider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Auth App",
  description: "Login and Forgot Password with i18n and Redux",
};

const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <html lang={locale}>
      <body>
        <I18nProvider locale={locale}>
          <ReduxProvider>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <LanguageSwitcher />
            </div>
            {children}
          </ReduxProvider>
        </I18nProvider>
      </body>
    </html>
  );
};
export default RootLayout;
