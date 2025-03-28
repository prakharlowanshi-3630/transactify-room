
import LoginForm from '@/components/auth/LoginForm';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">TransactifyRoom</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account to manage your deals
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
