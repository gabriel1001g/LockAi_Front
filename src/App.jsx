import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import RecuperarSenha from "./pages/RecuperarSenha";
import CadastroPlanos from "./pages/CadastroPlanos"; 
import Home from "./pages/Home";
import AlterarSenha from "./pages/AlterarSenha";
import CodigoSenha from "./pages/CodigoSenha";
import Pagamento from "./pages/Pagamento";
import Cadastro from "./pages/Cadastro";
import Categorias from "./pages/Categorias";
import TipoObjetos from "./pages/TipoObjetos";
import Locacao from "./pages/Locacao";
import Planos from "./pages/Planos";
import Reserva from "./pages/Reserva";

export default function App() {
  const [dados, setDados] = useState(null);

   useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await fetch("https://lockai.azurewebsites.net/usuario/1");
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error("Erro ao buscar API:", error);
      }
    };

    carregarDados();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/cadastro-planos" element={<CadastroPlanos />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/CodigoSenha" element={<CodigoSenha/>}/>
        <Route path="/Pagamento" element={<Pagamento/>}/>
        <Route path="/AlterarSenha" element={<AlterarSenha />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/tipoobjetos" element={<TipoObjetos />} />
        <Route path="/locacao" element={<Locacao />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/reserva" element={<Reserva />} />
        

        </Routes>

      </div>
      
    </Router>

    
   

    
  );
  
}
