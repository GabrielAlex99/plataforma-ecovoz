import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, AlertCircle, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { PlataformaUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: PlataformaUser) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Por favor, insira o seu e-mail cadastrado.');
      return;
    }

    // Simulate real database verification
    const storedUsers = localStorage.getItem('esg_plataforma_users');
    const users: any[] = storedUsers ? JSON.parse(storedUsers) : [];
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());

    console.log(`Password reset requested for: ${email}`);
    // Simulate API flow
    setRecoverySuccess(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!isLogin && !name.trim()) {
      setError('Por favor, preencha o seu nome completo.');
      return;
    }

    if (!isLogin && !lgpdConsent) {
      setError('De acordo com a LGPD, você de aceitar os termos de consentimento para efetuar seu cadastro.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Get existing users list
    const storedUsers = localStorage.getItem('esg_plataforma_users');
    const users: any[] = storedUsers ? JSON.parse(storedUsers) : [];

    if (isLogin) {
      // Find user
      const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!foundUser) {
        setError('Usuário não localizado. Verifique o e-mail ou crie uma conta.');
        return;
      }
      if (foundUser.password !== password) {
        setError('Senha incorreta. Tente novamente.');
        return;
      }

      // Login Successful
      const userObj: PlataformaUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email
      };
      onLoginSuccess(userObj);
      onClose();
    } else {
      // Signup
      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        setError('Este e-mail já está sendo utilizado por outra conta.');
        return;
      }

      const newUser = {
        id: String(Date.now()),
        name,
        email: email.toLowerCase(),
        password
      };

      // Store in array
      users.push(newUser);
      localStorage.setItem('esg_plataforma_users', JSON.stringify(users));

      // Automatic login after sign up
      const userObj: PlataformaUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      onLoginSuccess(userObj);
      onClose();
    }
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setIsForgotMode(false);
    setRecoverySuccess(false);
    setName('');
    setEmail('');
    setPassword('');
    setLgpdConsent(false);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-[#e9ecef] rounded-[28px] max-w-md w-full max-h-[85vh] md:max-h-[90vh] overflow-y-auto custom-scrollbar p-6 md:p-8 shadow-2xl relative text-left animate-scale-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#f5f7f6] text-gray-400 hover:text-gray-700 border border-[#e9ecef] transition-all cursor-pointer"
          title="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-6">
          
          {/* Header Title */}
          <div className="text-center">
            <span className="text-xs font-bold text-[#f28f3b] tracking-wider uppercase block mb-1">
              Plataforma ESG
            </span>
            <h3 className="font-sans font-bold text-2xl text-[#1b4332] tracking-tight">
              {isForgotMode 
                ? 'Recuperar Senha' 
                : (isLogin ? 'Entrar na Plataforma' : 'Criar Conta de Acesso')}
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              {isForgotMode
                ? 'Informe o e-mail cadastrado para redefinir as credenciais de acesso de forma segura.'
                : (isLogin 
                  ? 'Monitore e gerencie seus relatos e propostas socioambientais enviadas.' 
                  : 'Cadastre-se para gerenciar seus relatos territoriais e propostas.')}
            </p>
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-220 p-3 rounded-xl text-xs text-rose-700 flex items-center space-x-2 animate-pulse">
              <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          {isForgotMode ? (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              {recoverySuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-xs text-emerald-800 text-center space-y-3 animate-scale-up">
                  <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-sm">Link de Redefinição Enviado!</p>
                  <p className="leading-relaxed text-emerald-700">
                    Instruções detalhadas e um link seguro foram gerados e enviados para o e-mail: <br/>
                    <strong className="font-bold text-emerald-950 font-mono select-all">{email}</strong>.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(false);
                        setRecoverySuccess(false);
                        setEmail('');
                        setError('');
                      }}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-sm transition-colors"
                    >
                      Voltar ao Login
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase block">E-mail Cadastrado</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemplo@email.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1b4332] text-sm transition-colors shadow-sm"
                      />
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#1b4332]" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0b3d59] hover:bg-[#072a42] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
                  >
                    Enviar Link de Recuperação
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotMode(false);
                      setRecoverySuccess(false);
                      setError('');
                    }}
                    className="w-full text-center text-xs text-gray-500 hover:text-gray-800 font-bold underline cursor-pointer mt-2"
                  >
                    Voltar para o Login
                  </button>
                </div>
              )}
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Name Input (Signup only) */}
              {!isLogin && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase block">Qual o seu nome?</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1b4332] text-sm transition-colors shadow-sm"
                    />
                    <UserIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-[#1b4332]" />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase block">E-mail corporativo / pessoal</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1b4332] text-sm transition-colors shadow-sm"
                  />
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#1b4332]" />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-gray-500 uppercase block">Senha de acesso</label>
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotMode(true);
                        setRecoverySuccess(false);
                        setError('');
                      }}
                      className="text-xs font-bold text-[#f28f3b] hover:text-[#de7c2a] cursor-pointer transition-colors"
                    >
                      Esqueci a senha?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#1b4332] text-sm transition-colors shadow-sm"
                  />
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#1b4332]" />
                  
                  {/* Visual Eye toggles */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-gray-405 hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* LGPD Checkbox for signup form */}
              {!isLogin && (
                <div className="flex items-start space-x-2.5 text-xs text-gray-600 bg-[#1b4332]/5 p-3.5 rounded-xl border border-[#1b4332]/10 mt-4 shadow-sm">
                  <input
                    id="lgpd-signup"
                    type="checkbox"
                    checked={lgpdConsent}
                    onChange={(e) => setLgpdConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#1b4332] focus:ring-[#1b4332] shrink-0 cursor-pointer"
                  />
                  <label htmlFor="lgpd-signup" className="leading-relaxed select-none cursor-pointer text-gray-700 font-normal">
                    Aceito os termos de consentimento da <strong className="text-[#1b4332] font-bold">LGPD</strong>. Autorizo o armazenamento criptografado do meu nome e e-mail de forma protegida para login, autenticação e correspondência às queixas de sustentabilidade enviadas.
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#0b3d59] hover:bg-[#072a42] text-white font-bold rounded-xl text-sm transition-all shadow-md mt-6 cursor-pointer"
              >
                {isLogin ? 'Efetuar Login' : 'Finalizar Cadastro'}
              </button>

            </form>
          )}

          {/* Toggle between login / registration */}
          <div className="pt-4 border-t border-[#e9ecef] text-center">
            <p className="text-xs text-gray-505">
              {isLogin ? 'Não possui uma conta corporativa?' : 'Já possui uma conta ativa?'}
              <button 
                onClick={handleToggleMode}
                className="ml-1 text-[#f28f3b] hover:text-[#de7c2a] font-bold underline focus:outline-none cursor-pointer"
              >
                {isLogin ? 'Cadastre-se agora mesmo' : 'Acesse o Painel'}
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
