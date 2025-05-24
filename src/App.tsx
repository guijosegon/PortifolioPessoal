import { useEffect, useState } from "react";
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
              className="inline-block mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
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
            Desenvolvedor Full-Stack com experiência em C#, .NET, JavaScript e bancos de dados como SQL Server.
            Atuo também como Scrum Master, conduzindo code reviews, gerenciamento de pipelines no Azure e facilitando cerimônias ágeis.
            Estou sempre em busca de novos desafios e crescimento profissional contínuo.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
              <h4 className="font-semibold mb-2">📌 Experiência</h4>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>
                  <strong>Narwal Sistemas – Desenvolvedor Full-Stack:</strong> Atuação como Scrum Master, gerenciamento de projetos (NPI, On-Call, entre outros), code reviews e gerenciamento de DevOps.
                </li>
                <li>
                  <strong>Márcio Bikes – Assistente Geral:</strong> Organização de estoque, mecânica e vendas de bicicletas.
                </li>
              </ul>
            </div>
            <div className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
              <h4 className="font-semibold mb-2">🛠️ Hard Skills</h4>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li><strong>Linguagens/Frameworks:</strong> C#, .NET/.NET Core, Razor/Blazor, Java, JavaScript, Angular, React.</li>
                <li><strong>Banco de Dados:</strong> SQL Server, MySQL, SQLite, MongoDB, Postgres.</li>
                <li><strong>DevOps:</strong> Azure, Pipelines, CI/CD.</li>
                <li><strong>Arquitetura:</strong> MVC, TDD, DDD, SOLID, Clean Code.</li>
              </ul>
            </div>
            <div className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
              <h4 className="font-semibold mb-2">🧠 Soft Skills</h4>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Liderança (Scrum Master)</li>
                <li>Resolução de problemas</li>
                <li>Trabalho em equipe</li>
                <li>Adaptabilidade</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="projetos" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Projetos</h3>
          <p className="mb-6">Repositórios públicos do meu GitHub:</p>
          <div className="grid gap-4">
            {repos.slice(0, 8)
            .filter(repo => !repo.fork && repo.name !== "guijosegon"&& repo.name !== "guia-completo-scrum")
            .map((repo, index) => (
              <MotionCard key={repo.id} delay={index * 0.1}>
                <div className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
                  <h4 className="text-lg font-semibold mb-1">{repo.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{repo.description || "Sem descrição."}</p>
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
          <p className="mb-6">Pesquisas e estudos realizados: (Em desenvolvimento)</p>
          <div className="grid gap-4">
            <div className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
              <h4 className="text-lg font-semibold mb-1">Scrum na Prática: Entregando Valor com Agilidade</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Scrum é um framework ágil utilizado para gerenciar projetos complexos e adaptativos, especialmente no desenvolvimento de software. Sua estrutura é simples, mas sua aplicação exige disciplina e colaboração.</p>
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
          <ul className="text-sm mb-4">
            <li><strong>Email:</strong> guilhermejosegon@gmail.com</li>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/guilhermejosegon" className="underline" target="_blank">guilhermejosegon</a></li>
            <li><strong>GitHub:</strong> <a href="https://github.com/guijosegon" className="underline" target="_blank">guilhermejosegon</a></li>
          </ul>
          <div className={`p-4 rounded w-fit shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
            <QRCode value={window.location.href} size={128} />
          </div>
        </section>

      </main>

      <footer className="text-center py-6 text-sm border-t mt-24 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Este é o portfólio pessoal desenvolvido em React + TypeScript com Vite e Tailwind CSS, hospedado gratuitamente no Render. Usado especialmente para apredizagem em Tailwind CSS.</p>
        © {new Date().getFullYear()} Guilherme José Gonçalves. Todos os direitos reservados.
      </footer>
    </div>
  );
}