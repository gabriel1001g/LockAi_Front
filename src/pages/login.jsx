import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// ESTE É O IMPORT CRÍTICO QUE ESTAVA FALTANDO OU INCOMPLETO
import { Link, useNavigate } from "react-router-dom"; 
import logo from "../assets/img/logo.png";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // useNavigate está definido aqui
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const showMessage = (title, message) => {
      console.error(`[${title}]`, message); 
  };

  const handleLogin = async () => {
    setIsSubmitting(true); 

    if (!!erroSenha || senha.length === 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Fazendo a requisição POST para o endpoint /auth/login
      const response = await fetch("https://lockaiapii-g7egamgghuhrhrej.brazilsouth-01.azurewebsites.net/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Login: usuario, 
          Senha: senha,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          showMessage("Erro de Login", "Usuário ou senha inválidos.");
        } else {
          const errorText = await response.text();
          showMessage("Erro de Login", "Erro ao realizar login. Tente novamente." + (errorText ? ` Detalhe: ${errorText.substring(0, 100)}` : ""));
        }
        setIsSubmitting(false); 
        return;
      }

      const data = await response.json();
      console.log("Login efetuado:", data);

      const authData = {
        token: data.token, 
        tipoUsuarioId: data.usuario?.tipoUsuarioId ? parseInt(data.usuario.tipoUsuarioId, 10) : 1, 
        id: data.usuario?.id ? parseInt(data.usuario.id, 10) : null, 
        // Mapeamento correto para a chave 'login' que o contexto espera para o nome.
        login: data.usuario?.login || "Usuário Teste", 
      };
      
      login(authData); 
      console.log("Tipo de Usuário LIDO pelo Frontend:", authData.tipoUsuarioId);
      
      
      // Redirecionamento 
      if (authData.tipoUsuarioId === 1) {
        navigate("/home"); 
      } else if (authData.tipoUsuarioId === 2) {
        navigate("/gestor/HomeGestor"); 
      } else {
        navigate("/home"); 
      }
    } catch (error) {
       showMessage("Erro de Conexão", "Não foi possível conectar ao servidor. Verifique sua rede.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUsuarioChange = (e) => {
    const value = e.target.value;
    const sanitized = value.replace(/[^a-zA-Z0-9@.]/g, "");
    setUsuario(sanitized);
  };

  const handleSenhaChange = (e) => {
    const value = e.target.value;
    const regex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    setSenha(value);

    if (value.length === 0) {
      setErroSenha("");
    } else if (!regex.test(value)) {
      setErroSenha(
        "A senha deve ter 8 caracteres, 1 letra maiúscula e 1 caractere especial."
      );
    } else {
      setErroSenha("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-6">
      {/* Logo */}
      <div className="mb-8">
        {/* Placeholder para a imagem da logo */}
        <img src={logo} alt="Logo Lockai" className="w-32 mx-auto" />
      </div>

      {/* Card de Login */}
      <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md">
        <h1 className="text-xl font-semibold text-white mb-4">Login</h1>

        {/* Campo Login */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Usuário
          </label>
          <input
            type="text"
            value={usuario}
            onChange={handleUsuarioChange}
            placeholder="Digite seu login"
            className="w-full px-3 py-2 bg-terceary text-gray-300 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        {/* Campo Senha */}
        <div className="mb-2 relative">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Senha
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={senha}
            onChange={handleSenhaChange}
            placeholder="Digite sua senha"
            className={`w-full px-3 py-2 bg-terceary text-gray-300 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary pr-10 ${erroSenha ? "border-red-500" : ""
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-300 hover:text-gray-100"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Mensagem de erro */}
        {erroSenha && <p className="text-red-400 text-sm mt-1">{erroSenha}</p>}

        {/* Link esqueci senha */}
        <div className="text-left mb-4 mt-2">
          <Link
            to="/recuperar-senha"
            className="text-sm text-secondary hover:underline"
          >
            Esqueci minha senha
          </Link>
        </div>

        {/* Botão de Login */}
        <button
          onClick={handleLogin}
          disabled={!!erroSenha || senha.length === 0 || isSubmitting}
          className="w-full bg-secondary text-white py-3 rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>

        {/* Cadastro */}
        <p className="text-center text-sm text-gray-300 mt-4">
          Ainda não possui uma conta?{" "}
          <Link
            to="/cadastro"
            className="text-secondary font-medium hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}