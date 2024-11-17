import { AuthLayout } from "@/components/forms/auth/auth-layout";
import { RegisterForm } from "@/components/forms/auth/register-from";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4 lg:p-8">
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </main>
  );
}
