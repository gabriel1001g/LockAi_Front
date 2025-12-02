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
import HomeGestor from "./pages/gestor/HomeGestor";
import PlanoCategoria from "./pages/gestor/PlanoCategoria";
import ProtectedRoute from "./components/ProtectedRoute";
// import Requerimento from "./pages/gestor/Requerimento";
import Conta from "./pages/conta/Conta";
import Perfil from "./pages/conta/Perfil";
import AprovacaoLocacoes from "./pages/gestor/AprovacaoLocacoes";
import ContaGestor from "./pages/conta/ContaGestor";


export default function App() {


  return (


    <div>
      <Routes>
        {/* Rotas Públicas (acessíveis a todos, inclusive deslogados) */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/CodigoSenha" element={<CodigoSenha />} />
        <Route path="/AlterarSenha" element={<AlterarSenha />} />

        {/*
          =============================================
          ROTAS PROTEGIDAS PARA USUÁRIO COMUM (Tipo 1)
          =============================================
        */}
        <Route element={<ProtectedRoute allowedRoles={[1]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro-planos" element={<CadastroPlanos />} />
          <Route path="/Pagamento" element={<Pagamento />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/tipoobjetos" element={<TipoObjetos />} />
          <Route path="/locacao" element={<Locacao />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/conta/conta" element={<Conta />} />
          <Route path="/conta/perfil" element={<Perfil />} />
        </Route>

        {/*
          =============================================
          ROTAS PROTEGIDAS PARA GESTOR (Tipo 2)
          =============================================
        */}
        <Route element={<ProtectedRoute allowedRoles={[2]} />}>
          <Route path="/gestor/HomeGestor" element={<HomeGestor />} />
          <Route path="/gestor/PlanoCategoria" element={<PlanoCategoria />} />
          <Route path="/gestor/AprovacaoLocacoes" element={<AprovacaoLocacoes />} />
          <Route path="/conta/ContaGestor" element={<ContaGestor />} />
          {/* <Route path="/gestor/Requerimento" element={<Requerimento />} /> */}
        </Route>

        {/* Você pode adicionar um catch-all para 404 aqui */}
      </Routes>
    </div>







  );

}
