import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GlobeIcon } from '../components/Icon';
import Loader from '../components/Loader';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isCheckingInstall, setIsCheckingInstall] = useState(true);

  useEffect(() => {
    // On mount, check if the app is installed. If not, redirect to setup.
    if (localStorage.getItem('geoportfolio_installed') !== 'true') {
      navigate('/setup', { replace: true });
    } else {
      setIsCheckingInstall(false);
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result === 'success') {
      navigate('/admin');
    } else {
      setError(result);
    }
  };

  if (isCheckingInstall) {
    return <div className="flex items-center justify-center min-h-[400px]"><Loader /></div>;
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <GlobeIcon className="mx-auto h-12 w-auto text-indigo-600" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
            Admin Panel Access
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Sign in to manage your portfolio.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
           <p className="text-center text-xs text-slate-500">
            (Demo admin: <strong>admin@example.com</strong> / pw: <strong>admin</strong>)
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;