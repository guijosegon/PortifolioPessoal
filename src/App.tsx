import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

const MotionCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    document.title = "Guilherme José Gonçalves | Portfólio";
    localStorage.setItem("theme", JSON.stringify(darkMode));

    fetch("https://api.github.com/users/guijosegon/repos")
      .then(res => res.json())
      .then(data => setRepos(data))
      .catch(err => console.error("Erro ao buscar repositórios:", err));
  }, [darkMode]);

  const scrollToId = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"} min-h-screen font-sans`}>
      <header className={`sticky top-0 z-10 ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-xl font-semibold text-center md:text-left">Portfólio </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm font-medium text-center md:text-left">
            <nav className="space-x-4 md:space-x-6 flex justify-center">
              <button onClick={() => scrollToId("sobre")}>Sobre mim</button>
              <button onClick={() => scrollToId("projetos")}>Projetos</button>
              <button onClick={() => scrollToId("blog")}>Blog</button>
              <button onClick={() => scrollToId("Formulario")}>Envie uma mensagem</button>
              <button onClick={() => scrollToId("contato")}>Contato</button>
            </nav>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-xs px-3 py-1 border rounded shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? "☀️ Claro" : "🌙 Escuro"}
            </button>
          </div>
        </div>
      </header>
      <main className="px-6 py-16 max-w-5xl mx-auto">

        <motion.section
          className="grid md:grid-cols-2 gap-10 items-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-4xl font-bold leading-snug">Olá, eu sou Guilherme Gonçalves</h2>
            <p className="text-lg mt-4">
              Desenvolvedor Full-Stack com rápida capacidade de aprendizagem, comprometido com projetos e processos ágeis. Atualmente cursando Ciência da Computação na UNESC e atuando como desenvolvedor e scrum master na Narwal Sistemas.
            </p>
            <a
              href="#projetos"
              className={`inline-block mt-6 ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"} px-6 py-2 rounded-md hover:bg-gray-800 transition`}
            >
              Ver Projetos
            </a>
          </div>
          <div className="flex justify-center">
            <img
              src="/perfil.png"
              alt="Foto de Guilherme Gonçalves"
              className="w-48 h-48 rounded-full border-4 border-black object-cover"
            />
          </div>
        </motion.section>

        <section id="sobre" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Sobre mim</h3>
          <p className="text-base leading-relaxed">
          Desenvolvedor Full-Stack com experiência profissional em C#, .NET, JavaScript e bancos de dados como SQL Server. Atuo com foco em integrações (RESTful APIs, OData, Webhooks), otimizações (LINQ, paralelismo, cache), autenticação (JWT, OAuth2), além de arquitetura monolítica modular e noções de microsserviços. Também possuo domínio em comunicação em tempo real com SignalR.
          <br />
          <br />
          Como Scrum Master, facilito cerimônias e processos ágeis, realizo code reviews e revisões de produto com visão técnica, além de gerenciar pipelines e implantações no Azure.
          <br />
          <br />
          Estou em constante evolução, sempre em busca de novos desafios e aprimoramento profissional.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <MotionCard delay={0.1}>
              <div className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                <h4 className="flex items-center gap-2 font-semibold mb-4">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-sm">📌</span>
                  Experiência
                </h4>
                <ul className="text-sm space-y-3">
                  <li>
                    <div className="font-semibold">Narwal Sistemas <span className="text-xs text-gray-400">(2022 – atual)</span></div>
                    <div className="text-sm">Desenvolvedor Full-Stack e Scrum Master, atuando em novas funcionalidades e sendo uma das refências do time.</div>
                  </li>
                  <li>
                    <div className="font-semibold">Márcio Bikes <span className="text-xs text-gray-400">(2022)</span></div>
                    <div className="text-sm">Assistente geral de oficina e estoque.</div>
                  </li>
                </ul>
              </div>
            </MotionCard>

            <MotionCard delay={0.2}>
              <div className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                <h4 className="flex items-center gap-2 font-semibold mb-4">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full text-sm">🛠️</span>
                  Hard Skills
                </h4>
                <ul className="text-sm space-y-1">
                  <div className="font-semibold">Linguagens/Frameworks:</div>
                  <li>C#, Java, JavaScript, .NET/.NET Core e Razor/Blazor (HTML5 e CSS3).</li>
                  <div className="font-semibold">Banco de Dados/Gerenciamento:</div>
                  <li>SQL Server, MySQL, SQLite, PostgreSQL, MongoDB, Redis, DBeaver e Podman.</li>
                  <div className="font-semibold">Arquitetura:</div>
                  <li>MVC, TDD, DDD, SOLID, Clean Code.</li>
                  <div className="font-semibold">DevOps:</div>
                  <li>Azure, Pipelines, CI/CD.</li>
                </ul>
              </div>
            </MotionCard>

            <MotionCard delay={0.3}>
              <div className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                <h4 className="flex items-center gap-2 font-semibold mb-4">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-pink-600 text-white rounded-full text-sm">🧠</span>
                  Soft Skills
                </h4>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Capacidade de aprendizagem rápida</li>
                  <li>Organização e planejamento</li>
                  <li>Liderança (Scrum Master)</li>
                  <li>Resolução de problemas</li>
                  <li>Trabalho em equipe</li>
                  <li>Adaptabilidade</li>
                </ul>
              </div>
            </MotionCard>
          </div>
        </section>

        <section id="projetos" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Projetos</h3>
          <p className="mb-6">Repositórios públicos do meu GitHub para estudos e ampliar conhecimento:</p>
          <div className="grid gap-4">
            {repos.slice(0, 8)
            .filter(repo => !repo.fork && repo.name !== "guijosegon"&& repo.name !== "guia-completo-scrum")
            .map((repo, index) => (
              <MotionCard key={repo.id} delay={index * 0.1}>
                <div className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                  <h4 className="text-lg font-semibold mb-1">{repo.name}</h4>
                  <p className="text-sm text-gray-900 dark:text-gray-500 mb-2">{repo.description || "Sem descrição."}</p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 text-sm underline"
                  >
                    Ver no GitHub
                  </a>
                </div>
              </MotionCard>
            ))}
          </div>
        </section>

        <section id="blog" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Blog</h3>
          <p className="mb-6">Pesquisas e artigos de estudos realizados:</p>
          <div className="grid gap-4">
            <div className={`p-4 rounded shadow hover:scale-105 transition-all duration-300 border border-transparent ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
              <h4 className="text-lg font-semibold mb-1">Scrum na Prática: Entregando Valor com Agilidade</h4>
              <p className="text-sm text-gray-800 dark:text-gray-500 mb-2">Scrum é um framework ágil utilizado para gerenciar projetos complexos e adaptativos, especialmente no desenvolvimento de software. Sua estrutura é simples, mas sua aplicação exige disciplina e colaboração.</p>
              <a
                href="https://github.com/guijosegon/GuiaCompletoScrum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 text-sm underline"
              >
                Acessar pesquisa
              </a>
            </div>
          </div>
        </section>

        <section id="Formulario" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Envie uma Mensagem</h3>
          <form
            action="https://formsubmit.co/guilhermejosegon@gmail.com"
            method="POST"
            className="grid gap-4 max-w-xl"
          >
            <input type="text" name="_honey" style={{ display: 'none' }} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="name" placeholder="Seu nome" required className={`p-2 rounded border ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`} />
            <input type="email" name="email" placeholder="Seu email" required className={`p-2 rounded border ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`} />
            <textarea name="message" placeholder="Sua mensagem" required className={`p-2 rounded border ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}></textarea>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Enviar mensagem
            </button>
          </form>
        </section>

<section id="contato" className="mt-24">
  <h3 className="text-2xl font-bold mb-4">Contato</h3>
  <ul className="text-sm mb-6 space-y-3">
    <li className="flex items-center gap-2">
      <FaEnvelope className="text-lg" />
      <span>guilhermejosegon@gmail.com</span>
    </li>
    <li className="flex items-center gap-2">
      <FaLinkedin className="text-lg" />
      <a
        href="https://www.linkedin.com/in/guilhermejosegon"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-500"
      >
        linkedin.com/in/guilhermejosegon
      </a>
    </li>
    <li className="flex items-center gap-2">
      <FaGithub className="text-lg" />
      <a
        href="https://github.com/guijosegon"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-blue-500"
      >
        github.com/guijosegon
      </a>
    </li>
  </ul>

  <div className={`p-4 rounded w-fit shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
    <QRCode value={window.location.href} size={128} />
  </div>
</section>
      </main>

      <footer className="text-center py-6 text-sm border-t mt-24 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-500 mb-2">Este é o portfólio pessoal desenvolvido em React + TypeScript com Vite e Tailwind CSS, hospedado gratuitamente no Render. Usado especialmente para apredizagem em Tailwind CSS.</p>
        © {new Date().getFullYear()} Guilherme José Gonçalves. Todos os direitos reservados.
      </footer>
    </div>
  );
}