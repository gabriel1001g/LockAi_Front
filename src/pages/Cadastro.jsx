import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import BotaoVoltar from "../components/BotaoVoltar";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [telefone, setTelefone] = useState("");

  const [erroSenha, setErroSenha] = useState("");
  const [erroConfirmar, setErroConfirmar] = useState("");
  const navigate = useNavigate();

  // Máscara CPF
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(value);
  };

  // Máscara Telefone
  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d{1,4})$/, "$1-$2");
    setTelefone(value);
  };

  // Validação de senha
  const handleSenhaChange = (e) => {
    const value = e.target.value;
    const regex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    setSenha(value);
    if (value.length === 0) {
      setErroSenha("");
    } else if (!regex.test(value)) {
      setErroSenha(
        "A senha deve ter pelo menos 8 caracteres, 1 letra maiúscula e 1 caractere especial."
      );
    } else {
      setErroSenha("");
    }
  };

  // Validação confirmação
  const handleConfirmarSenha = (e) => {
    const value = e.target.value;
    setConfirmarSenha(value);
    if (value !== senha) {
      setErroConfirmar("As senhas não coincidem.");
    } else {
      setErroConfirmar("");
    }
  };
  const handleCadastro = async () => {
    // 🔸 Validação simples antes do envio
    if (senha !== confirmarSenha) {
      setErroConfirmar("As senhas não coincidem.");
      return;
    }

    try {
      // 🔸 Monta o objeto com os dados do formulário
      const novoUsuario = {
        nome: nome,
        cpf: cpf,
        email: email,
        usuario: usuario,
        senha: senha,
        dtNascimento: nascimento,
        telefone: telefone,
      };

      // 🔸 Faz o POST para a API
     const response = await fetch("https://lockaiapii-g7egamgghuhrhrej.brazilsouth-01.azurewebsites.net/Usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          login: usuario,
          email: email,
          dtNascimento: nascimento,
          telefone: telefone,
          senha: senha,
          tipoUsuarioId: 1, // exemplo: tipo padrão (cliente comum)
          situacao: 0, // exemplo: ativo (depende do enum no backend)
          dtSituacao: new Date().toISOString(),
          idUsuarioSituacao: 1, 
        }),
      });

      // Verifica se o servidor respondeu com erro
      if (!response.ok) {
        const errorText = await response.text();
        alert("Erro ao cadastrar usuário: " + errorText);
        return;
      }

      // Converte a resposta em JSON (usuário criado)
      const data = await response.json();
      console.log("Usuário cadastrado:", data);

      alert("Cadastro realizado com sucesso!");

      // 🔸 Redireciona para o login
      navigate("/login");
    } catch (error) {
      console.error("Erro de conexão com a API:", error);
      alert("Erro de conexão. Verifique se o backend está disponível.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-6">
      {/* Logo */}
      <div className="mb-8">
        <img src={logo} alt="Logo" className="w-32 mx-auto" />
      </div>

      {/* Card de Cadastro */}
      <div className="w-full max-w-sm bg-primary p-6 rounded-2xl shadow-md">
        <BotaoVoltar />;
        <h1 className="text-xl font-semibold text-white mb-4">Cadastrar-se</h1>
        {/* Nome completo */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300">Nome completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome completo"
            className="w-full px-3 py-2 bg-terceary text-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
          />
        </div>
        {/* Nome de usuário */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300">Nome de usuário</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Digite seu usuário"
            className="w-full px-3 py-2 bg-terceary text-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
          />
        </div>
        {/* Data de nascimento */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300">
            Data de nascimento
          </label>
          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            className="w-full px-3 py-2 bg-terceary text-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
          />
        </div>
        {/* CPF */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300">CPF</label>
          <input
            type="text"
            maxLength={14}
            value={cpf}
            onChange={handleCpfChange}
            placeholder="000.000.000-00"
            className="w-full px-3 py-2 bg-terceary text-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
          />
        </div>
        {/* Telefone */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300">Telefone</label>
          <input
            type="tel"
            maxLength={15}
            value={telefone}
            onChange={handleTelefoneChange}
            placeholder="(00) 00000-0000"
            className="w-full px-3 py-2 bg-terceary text-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
          />
        </div>
        {/* Email */}
        <div className="mb-3">
          <label className="block text-sm text-gray-300">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="w-full px-3 py-2 bg-terceary text-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
          />
        </div>
        {/* Senha */}
        <div className="mb-2 relative">
          <label className="block text-sm text-gray-300">Senha</label>
          <input
            type={showPassword ? "text" : "password"}
            value={senha}
            onChange={handleSenhaChange}
            placeholder="Digite sua senha"
            className={`w-full px-3 py-2 bg-terceary text-gray-300 rounded-lg pr-10 focus:ring-2 focus:ring-secondary ${
              erroSenha ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-300"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {erroSenha && <p className="text-red-400 text-sm">{erroSenha}</p>}
        {/* Confirmar Senha */}
        <div className="mb-2 relative">
          <label className="block text-sm text-gray-300">Confirmar Senha</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmarSenha}
            onChange={handleConfirmarSenha}
            placeholder="Confirme sua senha"
            className={`w-full px-3 py-2 bg-terceary text-gray-300 rounded-lg pr-10 focus:ring-2 focus:ring-secondary ${
              erroConfirmar ? "border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-300"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {erroConfirmar && (
          <p className="text-red-400 text-sm">{erroConfirmar}</p>
        )}
        {/* Botão */}
        <button
          onClick={handleCadastro} // 🔸 Adicionado
          disabled={
            !!erroSenha ||
            !!erroConfirmar ||
            senha.length === 0 ||
            confirmarSenha.length === 0
          }
          className="w-full bg-secondary text-white py-3 rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cadastrar-se
        </button>
        {/* Link login */}
        <p className="text-center text-sm text-gray-300 mt-4">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="text-secondary font-medium hover:underline"
          >
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
