import React, { useState } from 'react';
import axios from 'axios';

const Auth: React.FC = () => {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res: any;
      if (formType === 'login') {
        // Send login request to server
        res = await axios.post('/api/login', {
          email,
          password,
        });
      } else {
        // Send signup request to server
        res = await axios.post('/api/signup', {
          email,
          password,
        });
      }

      if (res.status === 200) {
        console.log('Successfully authenticated');
      } else {
        setError(res.data.error);
    } catch (err) {
        console.error(err);
        setError('Error authenticating');
    }
};

const toggleFormType = () => {
    setFormType((formType) => (formType === 'login' ? 'signup' : 'login'));
};
return (
  <div>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleChangeEmail}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={handleChangePassword}
        placeholder="Password"
      />
      <button type="submit">{formType === 'login' ? 'Login' : 'Signup'}</button>
      {error && <p>{error}</p>}
    </form>
    <button onClick={toggleFormType}>
      {formType === 'login' ? 'Need to signup?' : 'Already have an account?'}
    </button>
  </div>
);
};

export default Auth;
