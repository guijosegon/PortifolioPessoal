import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QRCode from "react-qr-code";

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

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"} min-h-screen font-sans`}>
      <header className={`sticky top-0 z-10 ${darkMode ? "bg-gray-800" : "bg-white"} shadow`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-xl font-semibold text-center md:text-left">Guilherme José Gonçalves</h1>
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-sm font-medium text-center md:text-left">
            <nav className="space-x-4 md:space-x-6 flex justify-center">
              <a href="#sobre" className="hover:underline">Sobre mim</a>
              <a href="#projetos" className="hover:underline">Projetos</a>
              <a href="#contato" className="hover:underline">Contato</a>
              <a href="#blog" className="hover:underline">Blog</a>
              <a href="#Formulario" className="hover:underline">Envie uma mensagem</a>
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
              Desenvolvedor Full-Stack com rápida capacidade de aprendizagem, comprometido com projetos e processos ágeis. Atualmente cursando Ciência da Computação na UNESC e atuando como desenvolvedor e Scrum Master na Narwal Sistemas.
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
            Desenvolvedor Full-Stack com experiência em C#, .NET, JavaScript, Angular e banco de dados como SQL Server, MySQL e SQLite. Atuante como Scrum Master, realizando code reviews, gerenciamento de pipelines no Azure e facilitando cerimônias ágeis. Busco constantemente novos desafios e aprimoramento profissional.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
              <h4 className="font-semibold mb-1">📌 Experiência</h4>
              <p className="text-sm">Narwal Sistemas - Desenvolvedor Full-Stack</p>
              <p className="text-sm">Márcio Bikes - Assistente Geral</p>
            </div>
            <div className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
              <h4 className="font-semibold mb-1">🛠️ Hard Skills</h4>
              <p className="text-sm">C#, .NET, Razor, JavaScript, Angular</p>
              <p className="text-sm">SQL Server, MySQL, SQLite</p>
              <p className="text-sm">DevOps: Azure, Pipelines, CI/CD</p>
              <p className="text-sm">Arquitetura: MVC, TDD, DDD, SOLID, Clean Code</p>
            </div>
            <div className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
              <h4 className="font-semibold mb-1">🧠 Soft Skills</h4>
              <p className="text-sm">Liderança (Scrum Master), Resolução de problemas, Trabalho em equipe, Adaptabilidade</p>
            </div>
          </div>
        </section>

        <section id="projetos" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Projetos</h3>
          <p className="mb-6">Repositórios públicos do meu GitHub:</p>
          <div className="grid gap-4">
            {repos.slice(0, 5).map((repo) => (
              <div key={repo.id} className={`p-4 rounded shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
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
            ))}
          </div>
        </section>

        <section id="contato" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Contato</h3>
          <ul className="text-sm mb-4">
            <li><strong>Email:</strong> guilhermejosegon@gmail.com</li>
            <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/guilhermejosegon" className="underline" target="_blank">guilhermejosegon</a></li>
          </ul>
          <div className={`p-4 rounded w-fit shadow ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
            <QRCode value={window.location.href} size={128} />
          </div>
        </section>

        <section id="blog" className="mt-24">
          <h3 className="text-2xl font-bold mb-4">Blog</h3>
          <p className="text-base text-gray-400">Em breve, artigos técnicos e tutoriais serão publicados aqui.</p>
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
      </main>

      <footer className="text-center py-6 text-sm border-t mt-24 dark:border-gray-700">
        © {new Date().getFullYear()} Guilherme José Gonçalves. Todos os direitos reservados.
      </footer>
    </div>
  );
}