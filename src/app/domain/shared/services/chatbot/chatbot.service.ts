import { Injectable } from '@angular/core';
import { UtilService } from '../util/util.service';

interface ResponsePattern {
  keywords: string[];
  synonyms?: string[][];
  response: { es: string; en: string };
  category?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private patterns: ResponsePattern[] = [
    {
      keywords: ['angular', 'framework'],
      response: {
        es: '<b>Angular</b> es mi especialidad principal y la tecnología con la que más he trabajado. Tengo <b>más de 6 años de experiencia</b> profesional con este framework, desde las versiones más antiguas (AngularJS) hasta las más modernas (<b>Angular 17+</b>). Domino a fondo <b>Standalone Components</b>, <b>Signals</b>, <b>RxJs avanzado</b>, <b>NgRx</b> para gestión de estado, <b>lazy loading</b>, <b>SSR con Angular Universal</b>, <b>change detection strategies</b>, <b>dependency injection avanzada</b>, y toda la arquitectura empresarial del framework. He liderado migraciones de versiones, construido librerías de componentes reutilizables, y arquitectado proyectos desde cero para múltiples empresas.',
        en: '<b>Angular</b> is my main specialty and the technology I\'ve worked with the most. I have <b>over 6 years of professional experience</b> with this framework, from older versions (AngularJS) to the latest (<b>Angular 17+</b>). I deeply master <b>Standalone Components</b>, <b>Signals</b>, <b>advanced RxJs</b>, <b>NgRx</b> for state management, <b>lazy loading</b>, <b>SSR with Angular Universal</b>, <b>change detection strategies</b>, <b>advanced dependency injection</b>, and the full enterprise architecture of the framework. I\'ve led version migrations, built reusable component libraries, and architected projects from scratch for multiple companies.',
      },
    },
    {
      keywords: ['spa', 'single page', 'single page application', 'aplicacion de una sola pagina', 'aplicacion web', 'web application'],
      response: {
        es: 'Sí, las <b>SPAs (Single Page Applications)</b> son mi especialidad. Tengo más de 6 años construyendo aplicaciones web de una sola página:<br><br><b>Angular SPAs</b> — Arquitectura modular, lazy loading de rutas, guards de navegación, resolvers<br><b>React SPAs</b> — Hooks, Context, React Router, estado global<br><b>Rendimiento</b> — Code splitting, prefetching, bundle optimization para carga inicial rápida<br><b>SEO & SSR</b> — Angular Universal / Next.js para SPAs con renderizado en servidor cuando es necesario<br><b>State management</b> — NgRx, Redux, signals para gestión de estado compleja<br><b>Routing avanzado</b> — Lazy routes, guards, resolvers, query params, navegación programática<br><br>He construido SPAs empresariales complejas para Mutua Madrileña, plataformas educativas en NORU, y múltiples proyectos personales. Es el paradigma de desarrollo web en el que más me muevo.',
        en: 'Yes, <b>SPAs (Single Page Applications)</b> are my specialty. I have over 6 years building single page web applications:<br><br><b>Angular SPAs</b> — Modular architecture, route lazy loading, navigation guards, resolvers<br><b>React SPAs</b> — Hooks, Context, React Router, global state<br><b>Performance</b> — Code splitting, prefetching, bundle optimization for fast initial load<br><b>SEO & SSR</b> — Angular Universal / Next.js for SPAs with server-side rendering when needed<br><b>State management</b> — NgRx, Redux, signals for complex state management<br><b>Advanced routing</b> — Lazy routes, guards, resolvers, query params, programmatic navigation<br><br>I\'ve built complex enterprise SPAs for Mutua Madrileña, educational platforms at NORU, and multiple personal projects. It\'s the web development paradigm I work in the most.',
      },
    },
    {
      keywords: ['react', 'next', 'hooks'],
      response: {
        es: 'Sí, tengo experiencia profesional con <b>React</b>. He trabajado con <b>React Hooks</b>, <b>Context API</b>, <b>Styled Components</b>, y <b>Jest</b> para testing. Lo utilicé en proyectos profesionales en <b>NORU</b> para construir plataformas educativas y portales internos. También desarrollo proyectos personales con React para mantenerme actualizado. Aunque <b>Angular es mi especialidad</b>, React es una parte sólida de mi stack y puedo adaptarme rápidamente a cualquier proyecto basado en él.',
        en: 'Yes, I have professional experience with <b>React</b>. I\'ve worked with <b>React Hooks</b>, <b>Context API</b>, <b>Styled Components</b>, and <b>Jest</b> for testing. I used it in professional projects at <b>NORU</b> to build educational platforms and internal portals. I also develop personal projects with React to stay up to date. While <b>Angular is my specialty</b>, React is a solid part of my stack and I can quickly adapt to any project based on it.',
      },
    },
    {
      keywords: ['tecnolog', 'tech', 'stack'],
      response: {
        es: 'Mi stack tecnológico es bastante amplio:<br><br><b>Frontend:</b> Angular (especialidad), React, TypeScript, JavaScript, RxJs, NgRx, Ionic, Capacitor, Stencil.js, Web Components, SCSS/CSS avanzado<br><br><b>Backend:</b> Node.js, Express.js, NestJS, PostgreSQL, MongoDB, Redis, Prisma, Docker<br><br><b>Testing:</b> Jasmine/Karma, Cypress, Jest, Vitest, TDD<br><br><b>DevOps & Tools:</b> Git, Jenkins, GitHub Actions, CI/CD, Vercel, Docker, Nx Monorepo, Webpack 5, Module Federation<br><br><b>IA & Automatización:</b> Claude Code CLI, GitHub Copilot, OpenAI API, Anthropic Claude API<br><br><b>Diseño:</b> Figma, UI/UX, Design Systems, animaciones CSS/JS avanzadas<br><br><b>Metodologías:</b> SCRUM, Agile, gestión de proyectos con Jira/Confluence',
        en: 'My tech stack is quite extensive:<br><br><b>Frontend:</b> Angular (specialty), React, TypeScript, JavaScript, RxJs, NgRx, Ionic, Capacitor, Stencil.js, Web Components, advanced SCSS/CSS<br><br><b>Backend:</b> Node.js, Express.js, NestJS, PostgreSQL, MongoDB, Redis, Prisma, Docker<br><br><b>Testing:</b> Jasmine/Karma, Cypress, Jest, Vitest, TDD<br><br><b>DevOps & Tools:</b> Git, Jenkins, GitHub Actions, CI/CD, Vercel, Docker, Nx Monorepo, Webpack 5, Module Federation<br><br><b>AI & Automation:</b> Claude Code CLI, GitHub Copilot, OpenAI API, Anthropic Claude API<br><br><b>Design:</b> Figma, UI/UX, Design Systems, advanced CSS/JS animations<br><br><b>Methodologies:</b> SCRUM, Agile, project management with Jira/Confluence',
      },
    },
    {
      keywords: ['experiencia laboral', 'experience', 'empleo', 'job', 'empresa', 'company', 'laboral', 'trayectoria profesional'],
      response: {
        es: 'Mi trayectoria profesional incluye:<br><br><b>Frontend Developer & Frontend Lead</b> — Profile Software Services / Mutua Madrileña, Madrid (Diciembre 2022 – Presente)<br>Lidero la arquitectura frontend de <b>7 proyectos empresariales</b>, instruyo a compañeros, implemento las mejores tecnologías, realizo migraciones (Angular, Capacitor, Cordova, Ionic, jQuery), y mantengo la estabilidad y calidad del código con CI/CD y testing.<br><br><b>Frontend Developer</b> — NORU, Quito (Agosto 2019 – Septiembre 2022)<br>Desarrollé aplicaciones web y móviles híbridas con <b>React</b> y <b>Angular</b>. Lideré la arquitectura frontend de plataformas educativas y portales internos con web components.<br><br><b>Instructor de Desarrollo Jr</b> — Genius Plus, Quito (Febrero 2019 – Julio 2019)<br>Enseñé fundamentos de desarrollo web (HTML, CSS, JS, React, Node.js) a principiantes.',
        en: 'My professional trajectory includes:<br><br><b>Frontend Developer & Frontend Lead</b> — Profile Software Services / Mutua Madrileña, Madrid (December 2022 – Present)<br>I lead the frontend architecture of <b>7 enterprise projects</b>, mentor colleagues, implement best technologies, perform migrations (Angular, Capacitor, Cordova, Ionic, jQuery), and maintain code stability and quality with CI/CD and testing.<br><br><b>Frontend Developer</b> — NORU, Quito (August 2019 – September 2022)<br>I developed hybrid web and mobile applications with <b>React</b> and <b>Angular</b>. Led frontend architecture of educational platforms and internal portals with web components.<br><br><b>Jr Development Instructor</b> — Genius Plus, Quito (February 2019 – July 2019)<br>Taught web development fundamentals (HTML, CSS, JS, React, Node.js) to beginners.',
      },
    },
    {
      keywords: ['proyecto', 'project', 'portfolio', 'portafolio', 'hecho', 'built', 'creado'],
      response: {
        es: 'He construido una gran variedad de proyectos personales y profesionales:<br><br><b>ngx-ever-components</b> — Librería de componentes Angular publicada en npm con documentación completa<br><b>Micro-frontends</b> — Arquitectura con Module Federation, Webpack 5 y Nx Monorepo<br><b>State Management Library</b> — Librería propia de gestión de estado para Angular<br><b>AI Chat App</b> — Aplicación de chat con inteligencia artificial usando OpenAI API<br><b>AI Calories</b> — App que calcula calorías mediante IA y visión por computador<br><b>AI Decisions</b> — Herramienta de toma de decisiones asistida por IA<br><b>Real-time Dashboard</b> — Dashboard con WebSockets, Chart.js y datos en tiempo real<br><b>Design System</b> — Sistema de diseño completo con Storybook y Chromatic<br><b>Frontend CLI</b> — Herramienta CLI personalizada para desarrollo frontend<br><b>Performance Monitor</b> — Librería de monitoreo de rendimiento para aplicaciones web<br><br>Todos están disponibles en mi portfolio con demos y código fuente.',
        en: 'I\'ve built a wide variety of personal and professional projects:<br><br><b>ngx-ever-components</b> — Angular component library published on npm with full documentation<br><b>Micro-frontends</b> — Architecture with Module Federation, Webpack 5 and Nx Monorepo<br><b>State Management Library</b> — Custom state management library for Angular<br><b>AI Chat App</b> — Chat application with artificial intelligence using OpenAI API<br><b>AI Calories</b> — App that calculates calories using AI and computer vision<br><b>AI Decisions</b> — AI-assisted decision making tool<br><b>Real-time Dashboard</b> — Dashboard with WebSockets, Chart.js and real-time data<br><b>Design System</b> — Complete design system with Storybook and Chromatic<br><b>Frontend CLI</b> — Custom CLI tool for frontend development<br><b>Performance Monitor</b> — Performance monitoring library for web apps<br><br>All are available in my portfolio with demos and source code.',
      },
    },
    {
      keywords: ['ia', 'ai', 'inteligencia artificial', 'artificial intelligence', 'gpt', 'claude', 'copilot', 'openai', 'llm', 'machine learning'],
      response: {
        es: 'Integro activamente <b>herramientas de IA</b> en mi flujo de trabajo diario:<br><br><b>Claude Code CLI</b> — Lo uso para generación de código, planificación de arquitectura, testing automatizado y pair programming con IA<br><b>GitHub Copilot</b> — Asistencia en tiempo real durante el desarrollo<br><b>APIs de LLMs</b> — He construido aplicaciones completas usando <b>OpenAI API (GPT-4)</b> y <b>Anthropic Claude API</b> para funcionalidades inteligentes<br><br>He desarrollado múltiples proyectos con IA: un chat inteligente, una app de calorías con visión por computador, un generador de storybooks, y herramientas de decisión asistida. Considero la IA como una herramienta fundamental que <b>potencia mi productividad</b> y la calidad de mis entregas.',
        en: 'I actively integrate <b>AI tools</b> into my daily workflow:<br><br><b>Claude Code CLI</b> — I use it for code generation, architecture planning, automated testing and AI pair programming<br><b>GitHub Copilot</b> — Real-time assistance during development<br><b>LLM APIs</b> — I\'ve built complete applications using <b>OpenAI API (GPT-4)</b> and <b>Anthropic Claude API</b> for intelligent features<br><br>I\'ve developed multiple AI projects: an intelligent chat, a calorie app with computer vision, a storybook generator, and assisted decision tools. I consider AI a fundamental tool that <b>enhances my productivity</b> and the quality of my deliverables.',
      },
    },
    {
      keywords: ['mobile', 'movil', 'móvil', 'ionic', 'capacitor', 'cordova', 'hibrida', 'hybrid', 'nativa'],
      response: {
        es: 'Tengo amplia experiencia en <b>desarrollo móvil híbrido</b>:<br><br><b>Ionic</b> — Framework principal para apps móviles, dominando componentes nativos, navegación, y optimización de rendimiento<br><b>Capacitor</b> — Acceso a APIs nativas (cámara, GPS, notificaciones push, almacenamiento seguro)<br><b>Cordova</b> — Experiencia con plugins legacy y migraciones a Capacitor<br><b>Ionic Trapeze</b> — Automatización de configuraciones nativas (Android/iOS)<br><br>He desarrollado y mantenido aplicaciones <b>multiplataforma (Android/iOS)</b> en entornos empresariales, incluyendo migraciones entre tecnologías móviles y configuración de pipelines de build para ambas plataformas. Actualmente mantengo apps móviles en producción para <b>Mutua Madrileña</b>.',
        en: 'I have extensive experience in <b>hybrid mobile development</b>:<br><br><b>Ionic</b> — Main framework for mobile apps, mastering native components, navigation, and performance optimization<br><b>Capacitor</b> — Access to native APIs (camera, GPS, push notifications, secure storage)<br><b>Cordova</b> — Experience with legacy plugins and migrations to Capacitor<br><b>Ionic Trapeze</b> — Native configuration automation (Android/iOS)<br><br>I\'ve developed and maintained <b>cross-platform applications (Android/iOS)</b> in enterprise environments, including migrations between mobile technologies and build pipeline configuration for both platforms. I currently maintain mobile apps in production for <b>Mutua Madrileña</b>.',
      },
    },
    {
      keywords: ['backend', 'node', 'nestjs', 'nest', 'express', 'servidor', 'server', 'api', 'base de datos', 'database', 'fullstack', 'full stack', 'full-stack'],
      response: {
        es: 'Aunque mi especialidad es el <b>frontend</b>, también tengo conocimientos sólidos de backend:<br><br><b>Node.js & Express.js</b> — APIs REST, middleware, autenticación JWT<br><b>NestJS</b> — Framework enterprise con TypeScript, módulos, guards, interceptors<br><b>PostgreSQL</b> — Base de datos relacional, queries complejas, optimización<br><b>MongoDB</b> — Base de datos NoSQL, aggregation pipeline<br><b>Redis</b> — Caché, sesiones, pub/sub<br><b>Prisma</b> — ORM moderno con type-safety<br><b>Docker</b> — Containerización de aplicaciones y servicios<br><br>Puedo manejar proyectos <b>full-stack</b> de principio a fin, desde el diseño de la API hasta el deploy con Docker y CI/CD.',
        en: 'While my specialty is <b>frontend</b>, I also have solid backend knowledge:<br><br><b>Node.js & Express.js</b> — REST APIs, middleware, JWT authentication<br><b>NestJS</b> — Enterprise framework with TypeScript, modules, guards, interceptors<br><b>PostgreSQL</b> — Relational database, complex queries, optimization<br><b>MongoDB</b> — NoSQL database, aggregation pipeline<br><b>Redis</b> — Cache, sessions, pub/sub<br><b>Prisma</b> — Modern ORM with type-safety<br><b>Docker</b> — Application and service containerization<br><br>I can handle <b>full-stack</b> projects end-to-end, from API design to deployment with Docker and CI/CD.',
      },
    },
    {
      keywords: ['testing', 'test', 'tdd', 'jasmine', 'karma', 'cypress', 'jest', 'prueba', 'calidad', 'quality'],
      response: {
        es: 'El testing es parte integral de mi proceso de desarrollo:<br><br><b>Unit Testing</b> — Jasmine/Karma para Angular, Jest para React, Vitest para proyectos Vite<br><b>E2E Testing</b> — Cypress para pruebas end-to-end completas con interacción de usuario simulada<br><b>TDD</b> — Practico Test-Driven Development cuando la complejidad del feature lo amerita<br><b>Coverage</b> — Busco mantener alta cobertura en lógica de negocio crítica<br><br>En mi rol actual implemento testing como requisito obligatorio y mantengo pipelines de <b>CI/CD con Jenkins</b> que ejecutan suites completas antes de cada merge. Esto garantiza <b>alta calidad</b> y reduce bugs en producción significativamente.',
        en: 'Testing is an integral part of my development process:<br><br><b>Unit Testing</b> — Jasmine/Karma for Angular, Jest for React, Vitest for Vite projects<br><b>E2E Testing</b> — Cypress for complete end-to-end tests with simulated user interaction<br><b>TDD</b> — I practice Test-Driven Development when feature complexity warrants it<br><b>Coverage</b> — I aim to maintain high coverage on critical business logic<br><br>In my current role I implement testing as a mandatory requirement and maintain <b>CI/CD pipelines with Jenkins</b> that run complete suites before every merge. This ensures <b>high quality</b> and significantly reduces production bugs.',
      },
    },
    {
      keywords: ['arquitectura', 'architecture', 'solid', 'patron', 'pattern', 'design pattern', 'escalab', 'scalab', 'estructura', 'structure'],
      response: {
        es: 'La <b>arquitectura frontend</b> es una de mis mayores fortalezas:<br><br><b>Principios SOLID</b> — Aplicados rigurosamente para código mantenible y extensible<br><b>Design Patterns</b> — Singleton, Observer, Factory, Strategy, Facade, adaptados al contexto frontend<br><b>Micro-frontends</b> — Arquitectura distribuida con Module Federation y Webpack 5<br><b>Monorepos</b> — Gestión con Nx para múltiples aplicaciones y librerías compartidas<br><b>State Management</b> — NgRx, señales, servicios reactivos, stores personalizados<br><b>Component Architecture</b> — Smart/Dumb components, composición, lazy loading granular<br><br>He liderado la arquitectura de <b>múltiples proyectos empresariales</b>, definiendo estructura de carpetas, patrones de comunicación, estrategias de caché, y guías de estilo para equipos de desarrollo.',
        en: '<b>Frontend architecture</b> is one of my greatest strengths:<br><br><b>SOLID Principles</b> — Rigorously applied for maintainable and extensible code<br><b>Design Patterns</b> — Singleton, Observer, Factory, Strategy, Facade, adapted to frontend context<br><b>Micro-frontends</b> — Distributed architecture with Module Federation and Webpack 5<br><b>Monorepos</b> — Management with Nx for multiple applications and shared libraries<br><b>State Management</b> — NgRx, signals, reactive services, custom stores<br><b>Component Architecture</b> — Smart/Dumb components, composition, granular lazy loading<br><br>I\'ve led the architecture of <b>multiple enterprise projects</b>, defining folder structure, communication patterns, caching strategies, and style guides for development teams.',
      },
    },
    {
      keywords: ['scrum', 'agile', 'ágil', 'metodolog', 'methodolog', 'jira', 'confluence', 'team'],
      response: {
        es: 'Tengo sólida experiencia con <b>metodologías ágiles</b> y liderazgo técnico:<br><br><b>SCRUM</b> — Sprints, dailies, retrospectivas, planning poker, refinamiento de backlog<br><b>Jira</b> — Gestión de tareas, epics, stories, bugs, workflows personalizados<br><b>Confluence</b> — Documentación técnica, ADRs, guías de arquitectura<br><b>Liderazgo técnico</b> — Mentoría de compañeros, code reviews, definición de estándares<br><br>Actualmente lidero como <b>Frontend Lead</b> gestionando <b>7 proyectos simultáneos</b>, coordinando equipos multifuncionales, y manteniendo comunicación efectiva entre desarrollo, producto y negocio.',
        en: 'I have solid experience with <b>agile methodologies</b> and technical leadership:<br><br><b>SCRUM</b> — Sprints, dailies, retrospectives, planning poker, backlog refinement<br><b>Jira</b> — Task management, epics, stories, bugs, custom workflows<br><b>Confluence</b> — Technical documentation, ADRs, architecture guides<br><b>Technical Leadership</b> — Colleague mentoring, code reviews, standards definition<br><br>I currently lead as <b>Frontend Lead</b> managing <b>7 simultaneous projects</b>, coordinating cross-functional teams, and maintaining effective communication between development, product and business.',
      },
    },
    {
      keywords: ['hobby', 'gusta', 'like', 'tiempo libre', 'free time', 'afición', 'pasatiempo', 'fuera del', 'outside'],
      response: {
        es: 'Fuera del mundo del código, soy una persona bastante <b>sencilla</b> y tranquila:<br><br><b>Viajar</b> — Me encanta conocer nuevos lugares, culturas y gastronomías<br><b>Gaming</b> — Disfruto de los videojuegos como forma de relajación y desconexión<br><b>Música</b> — Me gustan los instrumentos musicales, es otra forma de expresión creativa<br><b>Programación por pasión</b> — Constantemente estudio nuevas tecnologías y construyo proyectos personales, no solo por trabajo sino por genuino interés<br><br>Creo que tener intereses variados fuera del trabajo me hace un <b>mejor profesional</b>, con perspectiva fresca y creatividad para resolver problemas.',
        en: 'Outside the world of code, I\'m a fairly <b>simple</b> and relaxed person:<br><br><b>Traveling</b> — I love discovering new places, cultures and cuisines<br><b>Gaming</b> — I enjoy video games as a form of relaxation and disconnection<br><b>Music</b> — I like musical instruments, it\'s another form of creative expression<br><b>Programming out of passion</b> — I constantly study new technologies and build personal projects, not just for work but out of genuine interest<br><br>I believe having varied interests outside of work makes me a <b>better professional</b>, with fresh perspective and creativity for problem solving.',
      },
    },
    {
      keywords: ['autodidacta', 'self-taught', 'aprender', 'learn', 'estudi', 'study', 'formación', 'education', 'universidad', 'university', 'programar'],
      response: {
        es: 'Soy completamente <b>autodidacta</b>. Todo lo que sé lo he aprendido por mi cuenta, impulsado por una pasión genuina por la tecnología y el desarrollo:<br><br><b>Aprendizaje continuo</b> — Dedico tiempo cada día a estudiar nuevas tecnologías, leer documentación, y experimentar con herramientas emergentes<br><b>Proyectos prácticos</b> — Aprendo construyendo. Cada proyecto personal es una oportunidad para dominar algo nuevo<br><b>Comunidad</b> — Consumo contenido técnico, sigo a referentes del sector, y comparto conocimiento<br><br>Mi capacidad para <b>adaptarme rápidamente</b> a nuevas tecnologías y entornos me ha permitido abordar proyectos diversos con confianza. No necesito que me enseñen — encuentro la forma de aprender y dominar cualquier herramienta.',
        en: 'I\'m completely <b>self-taught</b>. Everything I know I\'ve learned on my own, driven by a genuine passion for technology and development:<br><br><b>Continuous learning</b> — I dedicate time every day to studying new technologies, reading documentation, and experimenting with emerging tools<br><b>Practical projects</b> — I learn by building. Each personal project is an opportunity to master something new<br><b>Community</b> — I consume technical content, follow industry references, and share knowledge<br><br>My ability to <b>quickly adapt</b> to new technologies and environments has allowed me to tackle diverse projects with confidence. I don\'t need to be taught — I find the way to learn and master any tool.',
      },
    },
    {
      keywords: ['inglés', 'english', 'idioma', 'language', 'speak', 'idiomas', 'languages'],
      response: {
        es: 'Mi nivel de <b>inglés es B1</b>, lo que me permite:<br><br>• Mantener conversaciones estables en entornos internacionales<br>• Leer documentación técnica sin problemas<br>• Participar en reuniones con equipos globales<br>• Escribir código y comentarios en inglés (estándar en la industria)<br><br>Ha sido invaluable para colaboraciones en proyectos globalizados y comunicación con equipos distribuidos. Sigo mejorando activamente mi nivel de inglés.',
        en: 'My <b>English level is B1</b>, which allows me to:<br><br>• Maintain stable conversations in international environments<br>• Read technical documentation without issues<br>• Participate in meetings with global teams<br>• Write code and comments in English (industry standard)<br><br>It has been invaluable for collaborations in globalized projects and communication with distributed teams. I\'m actively improving my English level.',
      },
    },
    {
      keywords: ['contacto', 'contact', 'email', 'correo', 'linkedin', 'contratar', 'hire'],
      response: {
        es: 'Puedes contactarme a través de los siguientes canales:<br><br><b>LinkedIn</b> — linkedin.com/in/everit-jhon (conexiones profesionales y mensajes)<br><b>Email</b> — everitjhon@gmail.com (consultas directas o propuestas)<br><b>CV</b> — Descargable directamente desde esta página (botón de descarga en la barra lateral)<br><br>Estoy abierto a <b>nuevas oportunidades</b> y colaboraciones interesantes. No dudes en escribirme para conversar sobre proyectos, roles técnicos o consultoría frontend.',
        en: 'You can reach me through the following channels:<br><br><b>LinkedIn</b> — linkedin.com/in/everit-jhon (professional connections and messages)<br><b>Email</b> — everitjhon@gmail.com (direct inquiries or proposals)<br><b>CV</b> — Downloadable directly from this page (download button in the sidebar)<br><br>I\'m open to <b>new opportunities</b> and interesting collaborations. Don\'t hesitate to reach out to discuss projects, technical roles or frontend consulting.',
      },
    },
    {
      keywords: ['lead', 'líder', 'lider', 'liderar', 'liderado', 'mentor', 'enseñ', 'teach', 'desempeñ', 'code review', 'equipo'],
      response: {
        es: 'Mi rol como <b>Frontend Lead</b> implica múltiples responsabilidades:<br><br><b>Liderazgo técnico</b> — Defino la arquitectura y estándares de código para el equipo<br><b>Mentoría</b> — Instruyo a compañeros menos experimentados, hago code reviews constructivas<br><b>Gestión de proyectos</b> — Coordino 7 proyectos simultáneos, priorizo tareas, gestiono deuda técnica<br><b>Decisiones tecnológicas</b> — Evalúo y propongo las mejores herramientas y frameworks para cada contexto<br><b>Migraciones</b> — He liderado migraciones completas de Angular, Capacitor, Cordova, Ionic y jQuery<br><br>Mi experiencia previa como <b>instructor</b> me dio habilidades de comunicación y enseñanza que aplico diariamente en mi liderazgo.',
        en: 'My role as <b>Frontend Lead</b> involves multiple responsibilities:<br><br><b>Technical leadership</b> — I define architecture and code standards for the team<br><b>Mentoring</b> — I instruct less experienced colleagues, do constructive code reviews<br><b>Project management</b> — I coordinate 7 simultaneous projects, prioritize tasks, manage tech debt<br><b>Tech decisions</b> — I evaluate and propose the best tools and frameworks for each context<br><b>Migrations</b> — I\'ve led complete migrations of Angular, Capacitor, Cordova, Ionic and jQuery<br><br>My previous experience as an <b>instructor</b> gave me communication and teaching skills that I apply daily in my leadership.',
      },
    },
    {
      keywords: ['diseño', 'design', 'ui/ux', 'figma', 'interfaz', 'interface', 'css', 'scss', 'estilos', 'styles', 'animacion', 'animation'],
      response: {
        es: 'Tengo conocimientos profundos en <b>diseño UI/UX</b> y estilos avanzados:<br><br><b>Figma</b> — Diseño de interfaces, prototipos interactivos, design tokens<br><b>Design Systems</b> — He creado sistemas de diseño completos con Storybook y Chromatic<br><b>CSS/SCSS avanzado</b> — Glassmorphism, animaciones complejas, responsive design, CSS Grid, Flexbox avanzado<br><b>Animaciones</b> — Transiciones fluidas, keyframes, intersection observer, scroll animations<br><b>Accesibilidad</b> — WCAG, semántica HTML, ARIA labels, contraste de colores<br><br>Esta misma web es un ejemplo de mi enfoque en diseño: <b>glassmorphism</b>, gradientes animados, efectos de cursor, tipografía cuidada y una experiencia visual pulida en cada detalle.',
        en: 'I have deep knowledge in <b>UI/UX design</b> and advanced styling:<br><br><b>Figma</b> — Interface design, interactive prototypes, design tokens<br><b>Design Systems</b> — I\'ve created complete design systems with Storybook and Chromatic<br><b>Advanced CSS/SCSS</b> — Glassmorphism, complex animations, responsive design, CSS Grid, advanced Flexbox<br><b>Animations</b> — Fluid transitions, keyframes, intersection observer, scroll animations<br><b>Accessibility</b> — WCAG, HTML semantics, ARIA labels, color contrast<br><br>This very website is an example of my design approach: <b>glassmorphism</b>, animated gradients, cursor effects, careful typography and a polished visual experience in every detail.',
      },
    },
    {
      keywords: ['ci/cd', 'ci cd', 'jenkins', 'deploy', 'despliegue', 'pipeline', 'devops', 'docker', 'vercel'],
      response: {
        es: 'Implemento prácticas de <b>CI/CD</b> de forma continua en todos mis proyectos:<br><br><b>Jenkins</b> — Pipelines de integración continua, build automatizados, gates de calidad<br><b>GitHub Actions</b> — Workflows para testing, linting, y deploy automático<br><b>Docker</b> — Containerización de aplicaciones para entornos consistentes<br><b>Vercel</b> — Deploy de aplicaciones frontend con preview deployments<br><b>Automatización</b> — Scripts de build, versionado semántico, changelog automático<br><br>En mi rol actual, cada merge a producción pasa por un pipeline completo de <b>testing, linting, build y deploy</b> automatizado que garantiza la calidad del código.',
        en: 'I implement <b>CI/CD</b> practices continuously in all my projects:<br><br><b>Jenkins</b> — Continuous integration pipelines, automated builds, quality gates<br><b>GitHub Actions</b> — Workflows for testing, linting, and automatic deployment<br><b>Docker</b> — Application containerization for consistent environments<br><b>Vercel</b> — Frontend application deployment with preview deployments<br><b>Automation</b> — Build scripts, semantic versioning, automatic changelog<br><br>In my current role, every merge to production goes through a complete pipeline of automated <b>testing, linting, build and deployment</b> that ensures code quality.',
      },
    },
    {
      keywords: ['hola', 'hello', 'hi', 'hey', 'buenas', 'saludos', 'qué tal', 'como estas', 'buen dia', 'buenos dias'],
      response: {
        es: '¡Hola! 👋 Soy la <b>IA de Everit</b>. Estoy aquí para contarte todo sobre su perfil profesional. Puedes preguntarme sobre:<br><br>• Sus <b>habilidades técnicas</b> y stack tecnológico<br>• Su <b>experiencia profesional</b> y trayectoria<br>• Sus <b>proyectos</b> personales y profesionales<br>• Su enfoque en <b>arquitectura</b> y diseño<br>• Cualquier otra cosa sobre su perfil<br><br>¿Qué te gustaría saber?',
        en: 'Hello! 👋 I\'m <b>Everit\'s AI</b>. I\'m here to tell you everything about his professional profile. You can ask me about:<br><br>• His <b>technical skills</b> and tech stack<br>• His <b>professional experience</b> and trajectory<br>• His <b>projects</b> (personal and professional)<br>• His approach to <b>architecture</b> and design<br>• Anything else about his profile<br><br>What would you like to know?',
      },
    },
    {
      keywords: ['quién', 'quien', 'who', 'about', 'sobre', 'presentat', 'introducción', 'introduction', 'eres', 'describe'],
      response: {
        es: '<b>Everit Jhon Molero</b> es un <b>Senior Frontend Engineer</b> con más de 6 años de experiencia profesional, actualmente trabajando como <b>Frontend Lead</b> en Madrid, España.<br><br>Se especializa en <b>Angular</b> (todas las versiones), arquitectura frontend escalable, desarrollo móvil híbrido, y herramientas de IA. Es completamente autodidacta, apasionado por la tecnología, y constantemente construye nuevos proyectos.<br><br>Su filosofía es crear soluciones <b>atractivas, escalables y mantenibles</b>. Combina habilidades técnicas profundas con capacidad de liderazgo, diseño UI/UX, y una mentalidad de mejora continua que lo impulsa a estar siempre a la vanguardia.',
        en: '<b>Everit Jhon Molero</b> is a <b>Senior Frontend Engineer</b> with over 6 years of professional experience, currently working as <b>Frontend Lead</b> in Madrid, Spain.<br><br>He specializes in <b>Angular</b> (all versions), scalable frontend architecture, hybrid mobile development, and AI tools. He\'s completely self-taught, passionate about technology, and constantly builds new projects.<br><br>His philosophy is to create <b>attractive, scalable and maintainable</b> solutions. He combines deep technical skills with leadership ability, UI/UX design, and a continuous improvement mindset that drives him to always be at the cutting edge.',
      },
    },
    {
      keywords: ['typescript', 'tipado'],
      response: {
        es: '<b>TypeScript</b> es fundamental en mi desarrollo diario. Lo uso extensivamente con Angular y React:<br><br><b>Tipado estricto</b> — Interfaces, tipos, enums, unions discriminadas<br><b>Generics</b> — Funciones y clases genéricas para código reutilizable<br><b>Utility Types</b> — Partial, Required, Pick, Omit, Record, y tipos condicionales<br><b>Decorators</b> — Metaprogramación para Angular y custom decorators<br><b>Type Guards</b> — Narrowing preciso para código seguro<br><b>Mapped Types</b> — Transformación de tipos para APIs tipadas<br><br>Considero TypeScript <b>esencial</b> para construir aplicaciones robustas, mantenibles y con menor tasa de errores en producción.',
        en: '<b>TypeScript</b> is fundamental in my daily development. I use it extensively with Angular and React:<br><br><b>Strict typing</b> — Interfaces, types, enums, discriminated unions<br><b>Generics</b> — Generic functions and classes for reusable code<br><b>Utility Types</b> — Partial, Required, Pick, Omit, Record, and conditional types<br><b>Decorators</b> — Metaprogramming for Angular and custom decorators<br><b>Type Guards</b> — Precise narrowing for safe code<br><b>Mapped Types</b> — Type transformation for typed APIs<br><br>I consider TypeScript <b>essential</b> for building robust, maintainable applications with lower production error rates.',
      },
    },
    {
      keywords: ['rxjs', 'observable', 'reactive', 'reactiv', 'stream'],
      response: {
        es: '<b>RxJs</b> es una de mis herramientas principales y algo que domino a fondo:<br><br><b>Operadores avanzados</b> — switchMap, mergeMap, concatMap, exhaustMap, combineLatest, withLatestFrom<br><b>Gestión de streams</b> — Composición de observables complejos, manejo de errores con catchError y retry<br><b>Estado reactivo</b> — BehaviorSubjects, ReplaySubjects, gestión de estado sin librerías externas<br><b>Patrones UX</b> — debounceTime para search, distinctUntilChanged, takeUntil para unsubscribe<br><b>Custom operators</b> — Operadores personalizados para lógica de negocio reutilizable<br><br>En Angular, RxJs es el <b>sistema nervioso</b> de la aplicación. Lo uso para comunicación entre componentes, gestión de estado, y manejo de async de forma elegante.',
        en: '<b>RxJs</b> is one of my main tools and something I master deeply:<br><br><b>Advanced operators</b> — switchMap, mergeMap, concatMap, exhaustMap, combineLatest, withLatestFrom<br><b>Stream management</b> — Complex observable composition, error handling with catchError and retry<br><b>Reactive state</b> — BehaviorSubjects, ReplaySubjects, state management without external libraries<br><b>UX Patterns</b> — debounceTime for search, distinctUntilChanged, takeUntil for unsubscribe<br><b>Custom operators</b> — Custom operators for reusable business logic<br><br>In Angular, RxJs is the application\'s <b>nervous system</b>. I use it for component communication, state management, and elegant async handling.',
      },
    },
    {
      keywords: ['web component', 'stencil', 'micro frontend', 'microfrontend', 'microfrontends', 'module federation', 'monorepo', 'nx monorepo'],
      response: {
        es: 'Tengo experiencia avanzada con <b>Web Components</b> y arquitecturas distribuidas:<br><br><b>Stencil.js</b> — Construcción de componentes nativos del navegador, framework-agnostic<br><b>Module Federation</b> — Micro-frontends con Webpack 5, carga dinámica de remotes<br><b>Nx Monorepo</b> — Gestión de múltiples apps y librerías compartidas<br><b>Custom Elements</b> — Encapsulación con Shadow DOM, slots, CSS parts<br><br>He implementado arquitecturas donde <b>múltiples equipos</b> trabajan en diferentes micro-apps que se integran en runtime, permitiendo deploys independientes y escalabilidad organizacional.',
        en: 'I have advanced experience with <b>Web Components</b> and distributed architectures:<br><br><b>Stencil.js</b> — Building native browser components, framework-agnostic<br><b>Module Federation</b> — Micro-frontends with Webpack 5, dynamic remote loading<br><b>Nx Monorepo</b> — Management of multiple apps and shared libraries<br><b>Custom Elements</b> — Encapsulation with Shadow DOM, slots, CSS parts<br><br>I\'ve implemented architectures where <b>multiple teams</b> work on different micro-apps that integrate at runtime, enabling independent deploys and organizational scalability.',
      },
    },
    {
      keywords: ['ngrx', 'redux', 'state', 'estado', 'store', 'signal'],
      response: {
        es: 'La <b>gestión de estado</b> es crucial en aplicaciones complejas. Mi experiencia incluye:<br><br><b>NgRx</b> — Store, Effects, Selectors, Entity, Router Store, ComponentStore<br><b>NgRx Signals</b> — La nueva API basada en signals para estado local y global<br><b>Redux patterns</b> — Actions, reducers, side effects, immutabilidad<br><b>Servicios reactivos</b> — BehaviorSubjects como stores simples para apps medianas<br><b>Signal Store</b> — Gestión moderna de estado con Angular Signals<br><br>Incluso he construido mi propia <b>librería de state management</b> como proyecto personal, lo que me da un entendimiento profundo de cómo funcionan internamente estas herramientas.',
        en: '<b>State management</b> is crucial in complex applications. My experience includes:<br><br><b>NgRx</b> — Store, Effects, Selectors, Entity, Router Store, ComponentStore<br><b>NgRx Signals</b> — The new signals-based API for local and global state<br><b>Redux patterns</b> — Actions, reducers, side effects, immutability<br><b>Reactive services</b> — BehaviorSubjects as simple stores for medium apps<br><b>Signal Store</b> — Modern state management with Angular Signals<br><br>I\'ve even built my own <b>state management library</b> as a personal project, which gives me a deep understanding of how these tools work internally.',
      },
    },
    {
      keywords: ['performance', 'rendimiento', 'optimiz', 'rápido', 'fast', 'velocidad', 'speed', 'lazy'],
      response: {
        es: 'La <b>optimización de rendimiento</b> es algo que aplico constantemente:<br><br><b>Lazy Loading</b> — Carga bajo demanda de módulos, componentes y rutas<br><b>Change Detection</b> — OnPush strategy, signals, trackBy en loops<br><b>Bundle Optimization</b> — Tree shaking, code splitting, preloading strategies<br><b>Virtual Scrolling</b> — Para listas largas sin impacto en memoria<br><b>Web Workers</b> — Procesamiento pesado fuera del main thread<br><b>Image Optimization</b> — Lazy loading, formatos modernos, srcset responsive<br><b>Caching</b> — Service workers, HTTP caching, memoization<br><br>He construido una <b>librería de monitoreo de rendimiento</b> propia que mide métricas clave en aplicaciones web.',
        en: '<b>Performance optimization</b> is something I constantly apply:<br><br><b>Lazy Loading</b> — On-demand loading of modules, components and routes<br><b>Change Detection</b> — OnPush strategy, signals, trackBy in loops<br><b>Bundle Optimization</b> — Tree shaking, code splitting, preloading strategies<br><b>Virtual Scrolling</b> — For long lists without memory impact<br><b>Web Workers</b> — Heavy processing off the main thread<br><b>Image Optimization</b> — Lazy loading, modern formats, responsive srcset<br><b>Caching</b> — Service workers, HTTP caching, memoization<br><br>I\'ve built my own <b>performance monitoring library</b> that measures key metrics in web applications.',
      },
    },
    {
      keywords: ['git', 'github', 'branch', 'rama'],
      response: {
        es: 'Tengo dominio completo de <b>Git</b> y flujos de trabajo colaborativos:<br><br><b>Branching strategies</b> — GitFlow, trunk-based development, feature branches<br><b>Operaciones avanzadas</b> — Rebase interactivo, cherry-pick, bisect, stash<br><b>Code Reviews</b> — Pull requests detallados con feedback constructivo<br><b>Conventional Commits</b> — Mensajes semánticos para changelog automático<br><b>CI/CD integration</b> — Hooks, GitHub Actions, protección de ramas<br><br>En mi equipo actual aplico <b>flujos estrictos</b> con protección de ramas, reviews obligatorios y pipelines de calidad antes de cada merge.',
        en: 'I have complete mastery of <b>Git</b> and collaborative workflows:<br><br><b>Branching strategies</b> — GitFlow, trunk-based development, feature branches<br><b>Advanced operations</b> — Interactive rebase, cherry-pick, bisect, stash<br><b>Code Reviews</b> — Detailed pull requests with constructive feedback<br><b>Conventional Commits</b> — Semantic messages for automatic changelog<br><b>CI/CD integration</b> — Hooks, GitHub Actions, branch protection<br><br>In my current team I apply <b>strict workflows</b> with branch protection, mandatory reviews and quality pipelines before every merge.',
      },
    },
    {
      keywords: ['por qué', 'why', 'contratar', 'hire', 'mejor', 'best', 'diferencia', 'difference', 'destaca', 'stands out', 'valor', 'value'],
      response: {
        es: '¿Por qué destacar a Everit? Aquí van las razones principales:<br><br><b>Versatilidad</b> — Domina frontend, backend, mobile, arquitectura, diseño y herramientas de IA<br><b>Experiencia real</b> — +6 años en proyectos empresariales de alto impacto, no solo tutoriales<br><b>Liderazgo</b> — Gestiona 7 proyectos y mentoriza equipos activamente<br><b>Autodidacta incansable</b> — Constantemente aprendiendo y construyendo<br><b>Visión holística</b> — No solo escribe código, entiende producto, negocio y usuario<br><b>Calidad</b> — Testing, CI/CD, arquitectura limpia como estándares no-negociables<br><br>Everit no es solo un developer — es un <b>ingeniero completo</b> que aporta valor técnico y estratégico a cualquier equipo.',
        en: 'Why does Everit stand out? Here are the main reasons:<br><br><b>Versatility</b> — Masters frontend, backend, mobile, architecture, design and AI tools<br><b>Real experience</b> — 6+ years in high-impact enterprise projects, not just tutorials<br><b>Leadership</b> — Manages 7 projects and actively mentors teams<br><b>Tireless self-learner</b> — Constantly learning and building<br><b>Holistic vision</b> — Doesn\'t just write code, understands product, business and users<br><b>Quality</b> — Testing, CI/CD, clean architecture as non-negotiable standards<br><br>Everit is not just a developer — he\'s a <b>complete engineer</b> who brings technical and strategic value to any team.',
      },
    },
    {
      keywords: ['salario', 'salary', 'sueldo', 'cobras', 'ganas', 'dinero', 'money', 'rate', 'tarifa', 'precio', 'price', 'cost', 'coste', 'presupuesto', 'budget', 'expectativa salarial', 'salary expectation', 'cuanto cobra', 'how much', 'compensación', 'compensation'],
      response: {
        es: 'Las condiciones económicas y expectativas salariales son algo que Everit prefiere tratar <b>directamente y de forma personalizada</b>. Cada proyecto y rol tiene sus particularidades, por lo que te invito a contactarlo directamente:<br><br><b>LinkedIn</b> — linkedin.com/in/everit-jhon<br><b>Email</b> — everitjhon@gmail.com<br><br>Estará encantado de conversar sobre condiciones, disponibilidad y cualquier detalle específico del rol o proyecto.',
        en: 'Economic conditions and salary expectations are something Everit prefers to discuss <b>directly and personally</b>. Each project and role has its particularities, so I invite you to contact him directly:<br><br><b>LinkedIn</b> — linkedin.com/in/everit-jhon<br><b>Email</b> — everitjhon@gmail.com<br><br>He\'ll be happy to discuss conditions, availability and any specific details about the role or project.',
      },
    },
    {
      keywords: ['disponib', 'availab', 'remoto', 'remote', 'presencial', 'onsite', 'híbrido', 'ubicación', 'location', 'madrid', 'españa', 'spain'],
      response: {
        es: 'Everit actualmente reside en <b>Madrid, España</b> y trabaja como Frontend Lead. Para consultas sobre <b>disponibilidad</b>, modalidad de trabajo (remoto, híbrido, presencial) o cualquier propuesta laboral específica, te recomiendo contactarlo directamente:<br><br><b>LinkedIn</b> — linkedin.com/in/everit-jhon<br><b>Email</b> — everitjhon@gmail.com<br><br>Podrá darte información actualizada sobre su situación y apertura a nuevas oportunidades.',
        en: 'Everit currently resides in <b>Madrid, Spain</b> and works as Frontend Lead. For inquiries about <b>availability</b>, work modality (remote, hybrid, onsite) or any specific job proposal, I recommend contacting him directly:<br><br><b>LinkedIn</b> — linkedin.com/in/everit-jhon<br><b>Email</b> — everitjhon@gmail.com<br><br>He\'ll be able to provide updated information about his situation and openness to new opportunities.',
      },
    },
  ];

  private additionalPatterns: ResponsePattern[] = [
    {
      keywords: ['años de experiencia', 'years of experience', 'cuanto tiempo', 'how long', 'antiguedad', 'carrera', 'career', 'recorrido'],
      response: {
        es: 'Everit tiene <b>más de 6 años de experiencia profesional</b> en desarrollo frontend. Comenzó en 2019 como instructor de desarrollo, luego trabajó como Frontend Developer en NORU (2019-2022), y desde diciembre de 2022 es <b>Frontend Developer & Lead</b> en Profile Software Services / Mutua Madrileña en Madrid. Su carrera ha sido una evolución constante desde roles junior hasta posiciones de liderazgo técnico.',
        en: 'Everit has <b>over 6 years of professional experience</b> in frontend development. He started in 2019 as a development instructor, then worked as a Frontend Developer at NORU (2019-2022), and since December 2022 he\'s been <b>Frontend Developer & Lead</b> at Profile Software Services / Mutua Madrileña in Madrid. His career has been a constant evolution from junior roles to technical leadership positions.',
      },
    },
    {
      keywords: ['edad', 'age', 'cuantos años tiene', 'how old', 'nacimiento', 'birth', 'cumpleaños', 'birthday'],
      response: {
        es: 'Esa información personal no está disponible públicamente. Lo que sí puedo decirte es que Everit tiene <b>más de 6 años de experiencia profesional</b> en desarrollo frontend, actualmente trabaja como <b>Frontend Lead</b> en Madrid, y es un profesional consolidado con un perfil técnico muy sólido. ¿Te gustaría saber más sobre su experiencia o habilidades?',
        en: 'That personal information is not publicly available. What I can tell you is that Everit has <b>over 6 years of professional experience</b> in frontend development, currently works as a <b>Frontend Lead</b> in Madrid, and is an established professional with a very solid technical profile. Would you like to know more about his experience or skills?',
      },
    },
    {
      keywords: ['pasion', 'passion', 'motiva', 'motivat', 'inspir', 'impulsa', 'drive', 'love', 'encanta', 'ama', 'disfruta', 'enjoy'],
      response: {
        es: 'Lo que más apasiona a Everit es la <b>creación de experiencias digitales excepcionales</b>. Le motiva:<br><br><b>Resolver problemas complejos</b> — Encontrar soluciones elegantes a desafíos técnicos difíciles<br><b>Aprender constantemente</b> — Cada nueva tecnología es una oportunidad de crecimiento<br><b>Impacto visible</b> — Ver cómo su código se convierte en productos que usan miles de personas<br><b>Compartir conocimiento</b> — Mentorar y ver crecer a otros desarrolladores<br><b>La perfección en el detalle</b> — Desde animaciones fluidas hasta arquitecturas escalables<br><br>Combina su pasión técnica con un genuino interés por el diseño y la experiencia de usuario, lo que lo hace un desarrollador con <b>visión de producto</b>.',
        en: 'What Everit is most passionate about is <b>creating exceptional digital experiences</b>. He\'s motivated by:<br><br><b>Solving complex problems</b> — Finding elegant solutions to difficult technical challenges<br><b>Constant learning</b> — Every new technology is a growth opportunity<br><b>Visible impact</b> — Seeing his code become products used by thousands of people<br><b>Sharing knowledge</b> — Mentoring and watching other developers grow<br><b>Perfection in detail</b> — From fluid animations to scalable architectures<br><br>He combines his technical passion with a genuine interest in design and user experience, making him a developer with <b>product vision</b>.',
      },
    },
    {
      keywords: ['fortaleza', 'strength', 'fuerte', 'strong', 'mejor en', 'best at', 'punto fuerte', 'ventaja', 'advantage', 'talento', 'talent'],
      response: {
        es: 'Las principales fortalezas de Everit son:<br><br><b>Adaptabilidad</b> — Aprende cualquier tecnología rápidamente y se adapta a nuevos contextos<br><b>Visión arquitectónica</b> — Ve más allá del código: diseña sistemas escalables y mantenibles<br><b>Liderazgo técnico</b> — Sabe guiar equipos, tomar decisiones y comunicar efectivamente<br><b>Atención al detalle</b> — Desde el pixel perfecto hasta la optimización de rendimiento<br><b>Autodidacta tenaz</b> — Todo lo ha aprendido por cuenta propia, con disciplina y pasión<br><b>Full-spectrum</b> — Combina frontend, backend, mobile, diseño y DevOps en un solo perfil',
        en: 'Everit\'s main strengths are:<br><br><b>Adaptability</b> — Learns any technology quickly and adapts to new contexts<br><b>Architectural vision</b> — Sees beyond code: designs scalable and maintainable systems<br><b>Technical leadership</b> — Knows how to guide teams, make decisions and communicate effectively<br><b>Attention to detail</b> — From pixel perfect to performance optimization<br><b>Tenacious self-learner</b> — Everything learned on his own, with discipline and passion<br><b>Full-spectrum</b> — Combines frontend, backend, mobile, design and DevOps in a single profile',
      },
    },
    {
      keywords: ['debilidad', 'weakness', 'mejorar', 'improve', 'falta', 'lack', 'defecto', 'flaw', 'area de mejora', 'growth area'],
      response: {
        es: 'Everit es transparente sobre sus áreas de crecimiento:<br><br><b>Inglés</b> — Actualmente nivel B1, trabajando activamente para alcanzar B2/C1<br><b>Perfeccionismo</b> — A veces invierte más tiempo del necesario en detalles, aunque esto también es una fortaleza<br><b>Backend profundo</b> — Aunque tiene conocimientos sólidos, su especialidad sigue siendo el frontend<br><br>Sin embargo, su mentalidad de <b>mejora continua</b> hace que estas áreas se reduzcan constantemente. Es una persona que identifica sus gaps y trabaja activamente para cerrarlos.',
        en: 'Everit is transparent about his growth areas:<br><br><b>English</b> — Currently B1 level, actively working to reach B2/C1<br><b>Perfectionism</b> — Sometimes invests more time than necessary in details, though this is also a strength<br><b>Deep backend</b> — While he has solid knowledge, his specialty remains frontend<br><br>However, his <b>continuous improvement</b> mindset means these areas are constantly shrinking. He identifies his gaps and actively works to close them.',
      },
    },
    {
      keywords: ['gracias', 'thanks', 'thank', 'genial', 'great', 'perfecto', 'perfect', 'excelente', 'excellent', 'bueno', 'good', 'ok', 'vale', 'bien', 'entendido', 'understood', 'claro', 'clear', 'interesante', 'interesting'],
      response: {
        es: '¡Me alegra poder ayudarte! 😊 Si tienes más preguntas sobre Everit — su experiencia, proyectos, habilidades técnicas, o cualquier otro aspecto de su perfil profesional — no dudes en preguntar. Estoy aquí para eso.',
        en: 'Glad I could help! 😊 If you have more questions about Everit — his experience, projects, technical skills, or any other aspect of his professional profile — don\'t hesitate to ask. That\'s what I\'m here for.',
      },
    },
    {
      keywords: ['adios', 'bye', 'hasta luego', 'see you', 'nos vemos', 'chao', 'ciao', 'goodbye', 'farewell', 'me voy'],
      response: {
        es: '¡Hasta luego! 👋 Fue un placer ayudarte. Si en el futuro necesitas más información sobre Everit, aquí estaré. ¡Mucho éxito!',
        en: 'Goodbye! 👋 It was a pleasure helping you. If you need more information about Everit in the future, I\'ll be here. Best of luck!',
      },
    },
    {
      keywords: ['cv', 'curriculum', 'resume', 'descargar', 'download', 'pdf', 'documento', 'document'],
      response: {
        es: 'Puedes <b>descargar el CV de Everit</b> directamente desde esta página. Busca el botón de descarga en la barra lateral (ícono de documento/descarga). El CV está disponible en formato PDF con toda su información profesional actualizada.<br><br>Si prefieres la información de forma interactiva, ¡pregúntame lo que quieras sobre su perfil!',
        en: 'You can <b>download Everit\'s CV</b> directly from this page. Look for the download button in the sidebar (document/download icon). The CV is available in PDF format with all his updated professional information.<br><br>If you prefer the information interactively, feel free to ask me anything about his profile!',
      },
    },
    {
      keywords: ['nacionalidad', 'nationality', 'pais', 'country', 'origen', 'origin', 'de donde', 'where from', 'ecuatoriano', 'ecuadorian', 'ecuador', 'latino', 'latinoamerica'],
      response: {
        es: 'Everit es de <b>Ecuador</b> 🇪🇨, donde comenzó su carrera profesional trabajando en empresas de Quito. En 2022 se mudó a <b>Madrid, España</b> 🇪🇸, donde actualmente trabaja como Frontend Lead. Esta experiencia internacional le ha dado una perspectiva global, adaptabilidad cultural y la capacidad de trabajar eficazmente en equipos diversos y multiculturales.',
        en: 'Everit is from <b>Ecuador</b> 🇪🇨, where he started his professional career working at companies in Quito. In 2022 he moved to <b>Madrid, Spain</b> 🇪🇸, where he currently works as Frontend Lead. This international experience has given him a global perspective, cultural adaptability and the ability to work effectively in diverse and multicultural teams.',
      },
    },
    {
      keywords: ['diferente', 'different', 'unico', 'unique', 'especial', 'special', 'destacar', 'stand out', 'distingue', 'distinguish', 'separa', 'separate', 'comparar', 'compare'],
      response: {
        es: 'Lo que hace <b>único</b> a Everit en el mercado:<br><br><b>1. Perfil completo</b> — No es solo un developer, es arquitecto, líder, diseñador y mentor<br><b>2. Autodidacta puro</b> — Todo su conocimiento viene de pasión y disciplina propia<br><b>3. IA nativa</b> — Integra IA en su flujo diario, no como buzzword sino como herramienta real de productividad<br><b>4. Impacto empresarial</b> — 7 proyectos simultáneos en producción real, no solo side projects<br><b>5. Artesanía visual</b> — Combina ingeniería sólida con diseño visual excepcional (esta web es prueba)<br><b>6. Evolución constante</b> — De instructor junior a Frontend Lead en menos de 4 años',
        en: 'What makes Everit <b>unique</b> in the market:<br><br><b>1. Complete profile</b> — Not just a developer, he\'s an architect, leader, designer and mentor<br><b>2. Pure self-taught</b> — All his knowledge comes from passion and self-discipline<br><b>3. AI native</b> — Integrates AI into his daily flow, not as a buzzword but as a real productivity tool<br><b>4. Enterprise impact</b> — 7 simultaneous projects in real production, not just side projects<br><b>5. Visual craftsmanship</b> — Combines solid engineering with exceptional visual design (this website is proof)<br><b>6. Constant evolution</b> — From junior instructor to Frontend Lead in less than 4 years',
      },
    },
    {
      keywords: ['pwa', 'pwas', 'progressive', 'service worker', 'offline', 'webapp', 'web app', 'installable'],
      response: {
        es: 'Everit tiene experiencia con <b>Progressive Web Apps (PWAs)</b>:<br><br><b>Service Workers</b> — Caché offline, sincronización en background, push notifications<br><b>Manifest</b> — Configuración para instalación nativa en dispositivos<br><b>Workbox</b> — Estrategias de caché avanzadas (cache-first, network-first, stale-while-revalidate)<br><b>Performance</b> — Optimización para Lighthouse scores altos<br><br>Combina su experiencia en mobile híbrido (Ionic/Capacitor) con PWAs para ofrecer la mejor experiencia posible según el contexto del proyecto.',
        en: 'Everit has experience with <b>Progressive Web Apps (PWAs)</b>:<br><br><b>Service Workers</b> — Offline cache, background sync, push notifications<br><b>Manifest</b> — Configuration for native device installation<br><b>Workbox</b> — Advanced caching strategies (cache-first, network-first, stale-while-revalidate)<br><b>Performance</b> — Optimization for high Lighthouse scores<br><br>He combines his hybrid mobile experience (Ionic/Capacitor) with PWAs to deliver the best possible experience depending on project context.',
      },
    },
    {
      keywords: ['websocket', 'real-time', 'realtime', 'tiempo real', 'socket', 'sse', 'event source', 'push'],
      response: {
        es: 'Everit tiene experiencia con <b>comunicación en tiempo real</b>:<br><br><b>WebSockets</b> — Conexiones bidireccionales para datos en vivo<br><b>Socket.io</b> — Implementación robusta con fallbacks automáticos<br><b>Server-Sent Events</b> — Streaming unidireccional para actualizaciones<br><b>Real-time Dashboard</b> — Proyecto personal con datos en vivo y Chart.js<br><br>Ha construido aplicaciones con datos en tiempo real para dashboards, notificaciones y colaboración en vivo.',
        en: 'Everit has experience with <b>real-time communication</b>:<br><br><b>WebSockets</b> — Bidirectional connections for live data<br><b>Socket.io</b> — Robust implementation with automatic fallbacks<br><b>Server-Sent Events</b> — Unidirectional streaming for updates<br><b>Real-time Dashboard</b> — Personal project with live data and Chart.js<br><br>He\'s built applications with real-time data for dashboards, notifications and live collaboration.',
      },
    },
    {
      keywords: ['logro', 'achievement', 'orgullo', 'proud', 'éxito', 'success', 'mejor resultado', 'best result', 'accomplishment'],
      response: {
        es: 'Algunos de los <b>logros más destacados</b> de Everit:<br><br><b>Frontend Lead a los ~3 años</b> — Ascenso rápido de developer junior a líder técnico<br><b>7 proyectos empresariales</b> — Gestiona simultáneamente 7 proyectos en producción para Mutua Madrileña<br><b>Migraciones exitosas</b> — Lideró migraciones complejas entre tecnologías sin downtime<br><b>Librería npm publicada</b> — ngx-ever-components, librería open source en producción<br><b>Salto internacional</b> — De Ecuador a España, integrándose exitosamente en el mercado europeo<br><b>Múltiples proyectos de IA</b> — Pionero en integrar IA como herramienta de desarrollo real',
        en: 'Some of Everit\'s <b>most notable achievements</b>:<br><br><b>Frontend Lead in ~3 years</b> — Rapid promotion from junior developer to technical leader<br><b>7 enterprise projects</b> — Simultaneously manages 7 production projects for Mutua Madrileña<br><b>Successful migrations</b> — Led complex technology migrations without downtime<br><b>Published npm library</b> — ngx-ever-components, open source library in production<br><b>International leap</b> — From Ecuador to Spain, successfully integrating into the European market<br><b>Multiple AI projects</b> — Pioneer in integrating AI as a real development tool',
      },
    },
    {
      keywords: ['futuro', 'future', 'plan', 'meta', 'goal', 'objetivo', 'objective', 'aspir', 'quiere ser', 'wants to be', 'proximo', 'next', 'vision'],
      response: {
        es: 'Los <b>objetivos profesionales</b> de Everit apuntan a:<br><br><b>Crecer como líder técnico</b> — Evolucionar hacia roles de mayor impacto arquitectónico y estratégico<br><b>Innovar con IA</b> — Seguir integrando inteligencia artificial en desarrollo de productos<br><b>Contribuir al open source</b> — Ampliar sus contribuciones y librerías públicas<br><b>Impacto internacional</b> — Trabajar en proyectos de escala global con equipos distribuidos<br><b>Nunca dejar de aprender</b> — Mantenerse siempre en la vanguardia tecnológica<br><br>Su visión es ser un <b>engineering leader</b> que combine excelencia técnica con impacto en producto y negocio.',
        en: 'Everit\'s <b>professional goals</b> aim towards:<br><br><b>Growing as a technical leader</b> — Evolving toward roles with greater architectural and strategic impact<br><b>Innovating with AI</b> — Continuing to integrate artificial intelligence into product development<br><b>Contributing to open source</b> — Expanding his contributions and public libraries<br><b>International impact</b> — Working on global-scale projects with distributed teams<br><b>Never stop learning</b> — Always staying at the technological forefront<br><br>His vision is to be an <b>engineering leader</b> who combines technical excellence with product and business impact.',
      },
    },
    {
      keywords: ['cultura', 'culture', 'valor', 'values', 'principio', 'principle', 'ética', 'ethic', 'filosofía', 'philosophy', 'cree', 'believ', 'piensa', 'think'],
      response: {
        es: 'La <b>filosofía profesional</b> de Everit se basa en:<br><br><b>Calidad sobre velocidad</b> — El código bien hecho ahorra tiempo a largo plazo<br><b>Mejora continua</b> — Siempre hay algo nuevo que aprender y mejorar<br><b>Colaboración</b> — Los mejores resultados vienen del trabajo en equipo<br><b>Transparencia</b> — Comunicar problemas temprano, no esconderlos<br><b>Pragmatismo</b> — La mejor solución es la que resuelve el problema real, no la más compleja<br><b>Ownership</b> — Hacerse responsable del código y su impacto en el producto<br><br>Busca equipos que valoren la <b>excelencia técnica</b> y la mentalidad de crecimiento.',
        en: 'Everit\'s <b>professional philosophy</b> is based on:<br><br><b>Quality over speed</b> — Well-written code saves time in the long run<br><b>Continuous improvement</b> — There\'s always something new to learn and improve<br><b>Collaboration</b> — The best results come from teamwork<br><b>Transparency</b> — Communicate problems early, don\'t hide them<br><b>Pragmatism</b> — The best solution is one that solves the real problem, not the most complex one<br><b>Ownership</b> — Taking responsibility for code and its impact on the product<br><br>He seeks teams that value <b>technical excellence</b> and a growth mindset.',
      },
    },
    {
      keywords: ['esta web', 'this web', 'esta pagina', 'this page', 'portfolio', 'sitio', 'site', 'hiciste esto', 'made this', 'construiste', 'built this'],
      response: {
        es: 'Sí, Everit <b>diseñó y desarrolló este portfolio completo</b> desde cero:<br><br><b>Tecnología</b> — Angular 17+ con Standalone Components y signals<br><b>Diseño</b> — Glassmorphism personalizado, gradientes animados, efectos de cursor<br><b>Performance</b> — Lazy loading, optimización de animaciones, responsive completo<br><b>IA integrada</b> — Este chatbot que estás usando ahora mismo<br><b>Internacionalización</b> — Soporte completo ES/EN<br><b>UX cuidada</b> — Cada interacción está pensada para una experiencia fluida<br><br>Es una muestra directa de su nivel técnico, sentido estético y atención al detalle.',
        en: 'Yes, Everit <b>designed and developed this entire portfolio</b> from scratch:<br><br><b>Technology</b> — Angular 17+ with Standalone Components and signals<br><b>Design</b> — Custom glassmorphism, animated gradients, cursor effects<br><b>Performance</b> — Lazy loading, animation optimization, fully responsive<br><b>Integrated AI</b> — This chatbot you\'re using right now<br><b>Internationalization</b> — Full ES/EN support<br><b>Polished UX</b> — Every interaction is designed for a fluid experience<br><br>It\'s a direct showcase of his technical level, aesthetic sense and attention to detail.',
      },
    },
    {
      keywords: ['soft skill', 'habilidad blanda', 'comunicacion', 'communication', 'interpersonal', 'trabajo en equipo', 'teamwork', 'colabora', 'collaborat'],
      response: {
        es: 'Las <b>soft skills</b> de Everit complementan su perfil técnico:<br><br><b>Comunicación efectiva</b> — Explica conceptos técnicos complejos de forma clara a cualquier audiencia<br><b>Liderazgo natural</b> — Guía equipos sin imponer, con ejemplo y mentoría<br><b>Adaptabilidad</b> — Se integra rápidamente en nuevos entornos y culturas<br><b>Resolución de conflictos</b> — Gestiona desacuerdos técnicos con diplomacia<br><b>Proactividad</b> — No espera instrucciones, identifica problemas y propone soluciones<br><b>Empatía</b> — Entiende las necesidades del usuario, del equipo y del negocio<br><br>Su experiencia como <b>instructor</b> le dio herramientas únicas de comunicación y enseñanza.',
        en: 'Everit\'s <b>soft skills</b> complement his technical profile:<br><br><b>Effective communication</b> — Explains complex technical concepts clearly to any audience<br><b>Natural leadership</b> — Guides teams without imposing, through example and mentoring<br><b>Adaptability</b> — Quickly integrates into new environments and cultures<br><b>Conflict resolution</b> — Manages technical disagreements with diplomacy<br><b>Proactivity</b> — Doesn\'t wait for instructions, identifies problems and proposes solutions<br><b>Empathy</b> — Understands the needs of users, team, and business<br><br>His experience as an <b>instructor</b> gave him unique communication and teaching tools.',
      },
    },
    {
      keywords: ['freelance', 'autonomo', 'independiente', 'independent', 'consultor', 'consultant', 'consultoria', 'consulting'],
      response: {
        es: 'Para consultas sobre <b>freelance, consultoría</b> o colaboraciones independientes, te recomiendo contactar a Everit directamente:<br><br><b>LinkedIn</b> — linkedin.com/in/everit-jhon<br><b>Email</b> — everitjhon@gmail.com<br><br>Podrá darte información sobre su disponibilidad, tarifas y el tipo de proyectos que acepta. Tiene experiencia tanto en roles full-time como en colaboraciones por proyecto.',
        en: 'For inquiries about <b>freelance, consulting</b> or independent collaborations, I recommend contacting Everit directly:<br><br><b>LinkedIn</b> — linkedin.com/in/everit-jhon<br><b>Email</b> — everitjhon@gmail.com<br><br>He can provide information about his availability, rates and the type of projects he takes on. He has experience in both full-time roles and project-based collaborations.',
      },
    },
    {
      keywords: ['npm', 'libreria', 'library', 'paquete', 'package', 'open source', 'opensource', 'contribucion', 'contribution', 'ngx-ever'],
      response: {
        es: 'Everit ha publicado y mantenido <b>paquetes open source</b>:<br><br><b>ngx-ever-components</b> — Librería de componentes Angular publicada en npm con:<br>• Documentación completa<br>• API bien tipada<br>• Componentes reutilizables<br>• Mantenimiento activo<br><br>Además, ha construido su propia <b>librería de state management</b> y un <b>CLI personalizado</b> para desarrollo frontend. Cree firmemente en contribuir a la comunidad y compartir herramientas que resuelvan problemas reales.',
        en: 'Everit has published and maintained <b>open source packages</b>:<br><br><b>ngx-ever-components</b> — Angular component library published on npm with:<br>• Complete documentation<br>• Well-typed API<br>• Reusable components<br>• Active maintenance<br><br>Additionally, he\'s built his own <b>state management library</b> and a <b>custom CLI</b> for frontend development. He firmly believes in contributing to the community and sharing tools that solve real problems.',
      },
    },
    {
      keywords: ['mutua', 'profile software', 'actualmente', 'current', 'ahora', 'now', 'hoy', 'today', 'presente', 'present'],
      response: {
        es: 'Actualmente Everit trabaja como <b>Frontend Developer & Frontend Lead</b> en <b>Profile Software Services</b> para el cliente <b>Mutua Madrileña</b> en Madrid, España (desde diciembre 2022).<br><br>Sus responsabilidades incluyen:<br>• Liderar la arquitectura frontend de <b>7 proyectos empresariales</b><br>• Instruir y mentorizar compañeros del equipo<br>• Implementar las mejores tecnologías y prácticas<br>• Realizar migraciones tecnológicas complejas<br>• Mantener estabilidad y calidad con CI/CD y testing<br>• Tomar decisiones técnicas de alto nivel',
        en: 'Everit currently works as <b>Frontend Developer & Frontend Lead</b> at <b>Profile Software Services</b> for the client <b>Mutua Madrileña</b> in Madrid, Spain (since December 2022).<br><br>His responsibilities include:<br>• Leading frontend architecture for <b>7 enterprise projects</b><br>• Instructing and mentoring team colleagues<br>• Implementing the best technologies and practices<br>• Performing complex technology migrations<br>• Maintaining stability and quality with CI/CD and testing<br>• Making high-level technical decisions',
      },
    },
    {
      keywords: ['noru', 'quito', 'anterior', 'previous', 'antes', 'before', 'pasado', 'past'],
      response: {
        es: 'Antes de su rol actual, Everit trabajó en <b>NORU</b> en Quito, Ecuador (Agosto 2019 – Septiembre 2022) como <b>Frontend Developer</b>:<br><br>• Desarrolló aplicaciones web y móviles híbridas con <b>React</b> y <b>Angular</b><br>• Lideró la arquitectura frontend de plataformas educativas<br>• Construyó portales internos con web components<br>• Trabajó con equipos multidisciplinarios<br><br>Y antes de eso fue <b>Instructor de Desarrollo Jr</b> en <b>Genius Plus</b> (Feb-Jul 2019), enseñando fundamentos web a principiantes.',
        en: 'Before his current role, Everit worked at <b>NORU</b> in Quito, Ecuador (August 2019 – September 2022) as a <b>Frontend Developer</b>:<br><br>• Developed hybrid web and mobile applications with <b>React</b> and <b>Angular</b><br>• Led frontend architecture of educational platforms<br>• Built internal portals with web components<br>• Worked with multidisciplinary teams<br><br>And before that he was a <b>Jr Development Instructor</b> at <b>Genius Plus</b> (Feb-Jul 2019), teaching web fundamentals to beginners.',
      },
    },
    {
      keywords: ['referencia profesional', 'reference', 'recomendacion', 'recommendation', 'testimonial'],
      response: {
        es: 'Para <b>referencias profesionales</b> o recomendaciones de colegas y managers anteriores, te recomiendo contactar a Everit directamente. En su perfil de <b>LinkedIn</b> (linkedin.com/in/everit-jhon) puedes ver conexiones profesionales y solicitar referencias.<br><br>Lo que sí puedo decirte es que en su rol actual gestiona <b>7 proyectos</b> con alta confianza de la empresa, mentoriza activamente a compañeros, y ha demostrado consistentemente capacidad de liderazgo técnico.',
        en: 'For <b>professional references</b> or recommendations from previous colleagues and managers, I recommend contacting Everit directly. On his <b>LinkedIn</b> profile (linkedin.com/in/everit-jhon) you can see professional connections and request references.<br><br>What I can tell you is that in his current role he manages <b>7 projects</b> with high company trust, actively mentors colleagues, and has consistently demonstrated technical leadership capability.',
      },
    },
    {
      keywords: ['seguridad', 'security', 'autenticacion', 'authentication', 'jwt', 'oauth', 'csrf', 'xss', 'owasp'],
      response: {
        es: 'Everit aplica <b>prácticas de seguridad</b> en sus desarrollos:<br><br><b>Autenticación</b> — JWT, OAuth, guards en Angular, interceptors de tokens<br><b>Frontend Security</b> — Sanitización de inputs, protección contra XSS, Content Security Policy<br><b>API Security</b> — CORS configurado correctamente, validación de datos, rate limiting<br><b>Almacenamiento seguro</b> — Manejo correcto de tokens, HttpOnly cookies, secure storage en mobile<br><b>OWASP</b> — Conocimiento de las principales vulnerabilidades y cómo prevenirlas<br><br>La seguridad es parte integral de su proceso de desarrollo, no una ocurrencia tardía.',
        en: 'Everit applies <b>security practices</b> in his developments:<br><br><b>Authentication</b> — JWT, OAuth, Angular guards, token interceptors<br><b>Frontend Security</b> — Input sanitization, XSS protection, Content Security Policy<br><b>API Security</b> — Properly configured CORS, data validation, rate limiting<br><b>Secure storage</b> — Correct token handling, HttpOnly cookies, secure storage on mobile<br><b>OWASP</b> — Knowledge of main vulnerabilities and how to prevent them<br><br>Security is an integral part of his development process, not an afterthought.',
      },
    },
    {
      keywords: ['accesibilidad', 'accessibility', 'a11y', 'wcag', 'aria', 'screen reader', 'lector de pantalla', 'discapacidad', 'disability', 'inclusiv'],
      response: {
        es: 'Everit incorpora <b>accesibilidad (a11y)</b> en sus desarrollos:<br><br><b>WCAG</b> — Seguimiento de guidelines para contenido web accesible<br><b>Semántica HTML</b> — Uso correcto de landmarks, headings, y estructura<br><b>ARIA</b> — Labels, roles, y live regions para tecnologías asistivas<br><b>Contraste</b> — Verificación de ratios de contraste en paletas de colores<br><b>Navegación por teclado</b> — Focus management y skip links<br><b>Testing</b> — Herramientas como axe-core y Lighthouse accessibility audits<br><br>Considera la accesibilidad como un <b>requisito fundamental</b>, no un nice-to-have.',
        en: 'Everit incorporates <b>accessibility (a11y)</b> in his developments:<br><br><b>WCAG</b> — Following guidelines for accessible web content<br><b>HTML Semantics</b> — Correct use of landmarks, headings, and structure<br><b>ARIA</b> — Labels, roles, and live regions for assistive technologies<br><b>Contrast</b> — Verification of contrast ratios in color palettes<br><b>Keyboard navigation</b> — Focus management and skip links<br><b>Testing</b> — Tools like axe-core and Lighthouse accessibility audits<br><br>He considers accessibility a <b>fundamental requirement</b>, not a nice-to-have.',
      },
    },
    {
      keywords: ['entrevista', 'interview', 'proceso de seleccion', 'selection', 'prueba tecnica', 'technical test', 'challenge', 'reto'],
      response: {
        es: 'Everit tiene un perfil que destaca en <b>procesos de selección</b> por:<br><br><b>Proyectos demostrables</b> — Portfolio con código fuente disponible y demos en vivo<br><b>Experiencia real</b> — No solo teoría, sino proyectos empresariales en producción<br><b>Comunicación técnica</b> — Explica su código y decisiones de forma clara<br><b>Amplitud de conocimiento</b> — Puede hablar con profundidad de múltiples temas técnicos<br><b>Resolución de problemas</b> — Enfoque metódico para challenges de código<br><br>Para iniciar un proceso con él, contacta por <b>LinkedIn</b> o <b>email</b> (everitjhon@gmail.com).',
        en: 'Everit has a profile that stands out in <b>selection processes</b> for:<br><br><b>Demonstrable projects</b> — Portfolio with available source code and live demos<br><b>Real experience</b> — Not just theory, but enterprise projects in production<br><b>Technical communication</b> — Explains his code and decisions clearly<br><b>Breadth of knowledge</b> — Can speak in depth about multiple technical topics<br><b>Problem solving</b> — Methodical approach to code challenges<br><br>To start a process with him, contact via <b>LinkedIn</b> or <b>email</b> (everitjhon@gmail.com).',
      },
    },
    {
      keywords: ['señal', 'signal', 'angular 17', 'angular 18', 'angular 19', 'standalone', 'nueva version', 'new version', 'moderno', 'modern', 'ultimo', 'latest'],
      response: {
        es: 'Everit está siempre actualizado con las <b>últimas versiones de Angular</b>:<br><br><b>Standalone Components</b> — Sin módulos, arquitectura simplificada<br><b>Signals</b> — Nueva reactividad primitiva, sin RxJs para estado local<br><b>Control Flow</b> — @if, @for, @switch directamente en templates<br><b>Deferrable Views</b> — @defer para lazy loading granular<br><b>SSR mejorado</b> — Hydration y server-side rendering optimizado<br><b>Vite + esbuild</b> — Build tools modernos, tiempos de compilación mínimos<br><br>No solo conoce estas features — las <b>aplica en producción</b> y las enseña a su equipo.',
        en: 'Everit is always up to date with <b>the latest Angular versions</b>:<br><br><b>Standalone Components</b> — No modules, simplified architecture<br><b>Signals</b> — New primitive reactivity, no RxJs needed for local state<br><b>Control Flow</b> — @if, @for, @switch directly in templates<br><b>Deferrable Views</b> — @defer for granular lazy loading<br><b>Improved SSR</b> — Optimized hydration and server-side rendering<br><b>Vite + esbuild</b> — Modern build tools, minimal compilation times<br><br>He doesn\'t just know these features — he <b>applies them in production</b> and teaches them to his team.',
      },
    },
    {
      keywords: ['migracion', 'migration', 'upgrade', 'actualizar', 'update', 'version', 'legacy', 'antiguo', 'viejo', 'old'],
      response: {
        es: 'Everit tiene amplia experiencia en <b>migraciones tecnológicas</b>:<br><br><b>Angular versions</b> — AngularJS → Angular 2+, y entre versiones modernas<br><b>Capacitor</b> — Migraciones de Cordova a Capacitor<br><b>Ionic</b> — Entre versiones mayores del framework<br><b>jQuery → Angular</b> — Modernización de aplicaciones legacy<br><b>Module systems</b> — CommonJS → ES Modules<br><b>Build tools</b> — Webpack → Vite/esbuild<br><br>Su enfoque es siempre <b>incremental y seguro</b>: planificación exhaustiva, migraciones graduales, testing paralelo, y zero downtime.',
        en: 'Everit has extensive experience in <b>technology migrations</b>:<br><br><b>Angular versions</b> — AngularJS → Angular 2+, and between modern versions<br><b>Capacitor</b> — Cordova to Capacitor migrations<br><b>Ionic</b> — Between major framework versions<br><b>jQuery → Angular</b> — Legacy application modernization<br><b>Module systems</b> — CommonJS → ES Modules<br><b>Build tools</b> — Webpack → Vite/esbuild<br><br>His approach is always <b>incremental and safe</b>: thorough planning, gradual migrations, parallel testing, and zero downtime.',
      },
    },
    {
      keywords: ['que puedo preguntar', 'what can i ask', 'que sabes', 'what do you know', 'ayuda', 'help', 'como funciona', 'how does this work', 'que haces', 'what do you do'],
      response: {
        es: 'Puedes preguntarme <b>cualquier cosa sobre Everit</b> como profesional. Algunos temas populares:<br><br>• <b>Habilidades técnicas</b> — Angular, React, TypeScript, Node.js, mobile, etc.<br>• <b>Experiencia laboral</b> — Roles, empresas, responsabilidades<br>• <b>Proyectos</b> — Portfolio, open source, apps de IA<br>• <b>Arquitectura</b> — Patrones, micro-frontends, escalabilidad<br>• <b>Liderazgo</b> — Gestión de equipos, mentoría, procesos<br>• <b>Herramientas de IA</b> — Claude Code, Copilot, OpenAI API<br>• <b>Información personal profesional</b> — Formación, idiomas, ubicación<br>• <b>Contacto y disponibilidad</b><br><br>¡Pregunta con confianza, estoy preparada para responder sobre cualquier aspecto de su perfil!',
        en: 'You can ask me <b>anything about Everit</b> as a professional. Some popular topics:<br><br>• <b>Technical skills</b> — Angular, React, TypeScript, Node.js, mobile, etc.<br>• <b>Work experience</b> — Roles, companies, responsibilities<br>• <b>Projects</b> — Portfolio, open source, AI apps<br>• <b>Architecture</b> — Patterns, micro-frontends, scalability<br>• <b>Leadership</b> — Team management, mentoring, processes<br>• <b>AI tools</b> — Claude Code, Copilot, OpenAI API<br>• <b>Professional personal info</b> — Education, languages, location<br>• <b>Contact and availability</b><br><br>Ask with confidence, I\'m prepared to answer about any aspect of his profile!',
      },
    },
  ];

  private contextualFallbacks: { triggers: string[]; response: { es: string; en: string } }[] = [
    {
      triggers: ['como', 'how', 'manera', 'way', 'forma', 'method', 'metodo', 'proceso', 'approach'],
      response: {
        es: 'Entiendo que quieres saber sobre el <b>enfoque o metodología</b> de Everit. Él se caracteriza por un enfoque <b>pragmático y orientado a resultados</b>, combinando mejores prácticas de la industria con soluciones adaptadas a cada contexto. ¿Podrías ser más específico? Por ejemplo: ¿cómo trabaja con testing, arquitectura, equipos, nuevas tecnologías, diseño...?',
        en: 'I understand you want to know about Everit\'s <b>approach or methodology</b>. He\'s characterized by a <b>pragmatic and results-oriented</b> approach, combining industry best practices with solutions adapted to each context. Could you be more specific? For example: how he works with testing, architecture, teams, new technologies, design...?',
      },
    },
    {
      triggers: ['puede', 'can', 'capaz', 'able'],
      response: {
        es: 'Everit tiene un perfil <b>muy versátil</b>. Su stack incluye Angular, React, TypeScript, Node.js, mobile híbrido, y mucho más. ¿Podrías especificar sobre qué tecnología o habilidad te gustaría saber? Puedo darte información detallada sobre cualquier aspecto técnico de su perfil.',
        en: 'Everit has a <b>very versatile</b> profile. His stack includes Angular, React, TypeScript, Node.js, hybrid mobile, and much more. Could you specify which technology or skill you\'d like to know about? I can give you detailed information about any technical aspect of his profile.',
      },
    },
    {
      triggers: ['cuanto', 'how much', 'how many', 'numero', 'number', 'cantidad', 'amount'],
      response: {
        es: 'Algunos números clave sobre Everit:<br><br>• <b>+6 años</b> de experiencia profesional<br>• <b>7 proyectos</b> empresariales simultáneos<br>• <b>3 empresas</b> en su trayectoria<br>• <b>2 países</b> (Ecuador → España)<br>• <b>Múltiples tecnologías</b> en su stack<br><br>¿Sobre qué aspecto específico te gustaría más detalles?',
        en: 'Some key numbers about Everit:<br><br>• <b>6+ years</b> of professional experience<br>• <b>7 simultaneous</b> enterprise projects<br>• <b>3 companies</b> in his trajectory<br>• <b>2 countries</b> (Ecuador → Spain)<br>• <b>Multiple technologies</b> in his stack<br><br>Which specific aspect would you like more details about?',
      },
    },
  ];

  private deflection = {
    es: 'Hmm, no estoy segura de cómo responder a eso exactamente, pero puedo contarte todo sobre <b>Everit como profesional</b>. Intenta preguntarme sobre:<br><br>• Sus <b>habilidades técnicas</b> (Angular, React, TypeScript, Node.js...)<br>• Su <b>experiencia</b> y trayectoria laboral<br>• Sus <b>proyectos</b> personales y profesionales<br>• Su enfoque en <b>arquitectura</b> y liderazgo<br>• Sus <b>herramientas de IA</b><br>• <b>Contacto</b> y disponibilidad<br><br>O simplemente reformula tu pregunta — probablemente puedo ayudarte si está relacionada con su perfil profesional. 😊',
    en: 'Hmm, I\'m not sure how to answer that exactly, but I can tell you everything about <b>Everit as a professional</b>. Try asking me about:<br><br>• His <b>technical skills</b> (Angular, React, TypeScript, Node.js...)<br>• His <b>experience</b> and career trajectory<br>• His <b>projects</b> (personal and professional)<br>• His approach to <b>architecture</b> and leadership<br>• His <b>AI tools</b><br>• <b>Contact</b> and availability<br><br>Or just rephrase your question — I can probably help if it\'s related to his professional profile. 😊',
  };

  constructor(private utilService: UtilService) {}

  getResponse(input: string): string {
    const lang = this.utilService.langIsEs() ? 'es' : 'en';
    const normalized = input
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/-/g, ' ');

    const allPatterns = [...this.patterns, ...this.additionalPatterns];

    let bestMatch: ResponsePattern | null = null;
    let bestScore = 0;

    for (const pattern of allPatterns) {
      let score = 0;
      const matched: string[] = [];

      for (const keyword of pattern.keywords) {
        const nk = keyword
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '')
          .replace(/-/g, ' ');

        if (nk.length <= 4) {
          const regex = new RegExp(`\\b${nk.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
          if (regex.test(normalized)) {
            const isSubstr = matched.some(m => m.includes(nk));
            if (!isSubstr) {
              matched.push(nk);
              score += nk.length;
            }
          }
        } else {
          if (normalized.includes(nk)) {
            const longerIdx = matched.findIndex(m => nk.includes(m) && nk !== m);
            if (longerIdx >= 0) {
              score -= matched[longerIdx].length;
              matched[longerIdx] = nk;
              score += nk.length;
            } else if (!matched.some(m => m.includes(nk))) {
              matched.push(nk);
              score += nk.length;
            }
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = pattern;
      }
    }

    if (bestMatch && bestScore > 0) {
      return bestMatch.response[lang];
    }

    for (const fallback of this.contextualFallbacks) {
      for (const trigger of fallback.triggers) {
        if (normalized.includes(trigger)) {
          return fallback.response[lang];
        }
      }
    }

    const words = normalized.split(/\s+/).filter(w => w.length > 3);
    for (const pattern of allPatterns) {
      for (const keyword of pattern.keywords) {
        const nk = keyword
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '')
          .replace(/-/g, ' ');
        for (const word of words) {
          if (nk.includes(word) || word.includes(nk)) {
            return pattern.response[lang];
          }
        }
      }
    }

    return this.deflection[lang];
  }

  getSuggestedQuestions(): { es: string; en: string }[] {
    return [
      { es: '¿Qué tecnologías dominas?', en: 'What technologies do you master?' },
      { es: 'Cuéntame tu experiencia laboral', en: 'Tell me about your work experience' },
      { es: '¿Qué proyectos has creado?', en: 'What projects have you built?' },
      { es: '¿Por qué debería contratarte?', en: 'Why should I hire you?' },
      { es: '¿Usas herramientas de IA?', en: 'Do you use AI tools?' },
      { es: '¿Cómo es tu arquitectura frontend?', en: 'What\'s your frontend architecture like?' },
      { es: '¿Conoces Angular?', en: 'Do you know Angular?' },
      { es: '¿Tienes experiencia con React?', en: 'Do you have React experience?' },
      { es: '¿Qué te apasiona del desarrollo?', en: 'What are you passionate about in development?' },
      { es: '¿Trabajas con testing?', en: 'Do you work with testing?' },
      { es: '¿Qué metodologías usas?', en: 'What methodologies do you use?' },
      { es: '¿Tienes experiencia mobile?', en: 'Do you have mobile experience?' },
      { es: '¿Conoces backend?', en: 'Do you know backend?' },
      { es: '¿Cuántos años de experiencia tienes?', en: 'How many years of experience do you have?' },
      { es: '¿Dónde trabajas actualmente?', en: 'Where do you currently work?' },
      { es: '¿Qué rol desempeñas?', en: 'What role do you have?' },
      { es: '¿Manejas TypeScript?', en: 'Do you use TypeScript?' },
      { es: '¿Dominas RxJs?', en: 'Do you master RxJs?' },
      { es: '¿Cómo gestionas el estado?', en: 'How do you manage state?' },
      { es: '¿Has liderado equipos?', en: 'Have you led teams?' },
      { es: '¿Qué herramientas de diseño usas?', en: 'What design tools do you use?' },
      { es: '¿Conoces micro-frontends?', en: 'Do you know micro-frontends?' },
      { es: '¿Cómo optimizas rendimiento?', en: 'How do you optimize performance?' },
      { es: '¿Qué CI/CD utilizas?', en: 'What CI/CD do you use?' },
      { es: '¿Trabajas con Docker?', en: 'Do you work with Docker?' },
      { es: '¿Cómo aprendiste a programar?', en: 'How did you learn to code?' },
      { es: '¿Qué haces en tu tiempo libre?', en: 'What do you do in your free time?' },
      { es: '¿Hablas inglés?', en: 'Do you speak English?' },
      { es: '¿Cómo puedo contactarte?', en: 'How can I contact you?' },
      { es: '¿Cuál es tu expectativa salarial?', en: 'What\'s your salary expectation?' },
      { es: '¿Estás disponible para trabajar?', en: 'Are you available for work?' },
      { es: '¿Trabajas remoto?', en: 'Do you work remotely?' },
      { es: '¿Por qué destacas como profesional?', en: 'Why do you stand out as a professional?' },
      { es: '¿Manejas Git avanzado?', en: 'Do you handle advanced Git?' },
      { es: '¿Has creado librerías?', en: 'Have you created libraries?' },
      { es: '¿Qué design patterns aplicas?', en: 'What design patterns do you apply?' },
      { es: '¿Conoces NgRx?', en: 'Do you know NgRx?' },
      { es: '¿Has trabajado con Ionic?', en: 'Have you worked with Ionic?' },
      { es: '¿Qué base de datos manejas?', en: 'What databases do you use?' },
      { es: '¿Usas GitHub Copilot?', en: 'Do you use GitHub Copilot?' },
      { es: '¿Has construido apps con IA?', en: 'Have you built AI apps?' },
      { es: '¿Conoces NestJS?', en: 'Do you know NestJS?' },
      { es: '¿Has trabajado con Stencil.js?', en: 'Have you worked with Stencil.js?' },
      { es: '¿Manejas monorepos?', en: 'Do you handle monorepos?' },
      { es: '¿Cómo haces code reviews?', en: 'How do you do code reviews?' },
      { es: '¿Has hecho migraciones?', en: 'Have you done migrations?' },
      { es: '¿Usas Module Federation?', en: 'Do you use Module Federation?' },
      { es: '¿Cuántos proyectos gestionas?', en: 'How many projects do you manage?' },
      { es: '¿Has desarrollado PWAs?', en: 'Have you developed PWAs?' },
      { es: '¿Tienes experiencia con WebSockets?', en: 'Do you have WebSocket experience?' },
      { es: '¿Conoces Cypress?', en: 'Do you know Cypress?' },
      { es: '¿Has usado Claude Code?', en: 'Have you used Claude Code?' },
      { es: '¿Cómo manejas el CSS avanzado?', en: 'How do you handle advanced CSS?' },
      { es: '¿Eres autodidacta?', en: 'Are you self-taught?' },
      { es: '¿Qué te hace único como developer?', en: 'What makes you unique as a developer?' },
    ];
  }

  getWelcomeMessage(): { es: string; en: string } {
    return {
      es: '¡Hola! 👋 Soy la <b>IA de Everit</b>. Pregúntame lo que quieras sobre sus habilidades, experiencia, proyectos o perfil profesional. Estoy aquí para ayudarte a conocerlo mejor.',
      en: 'Hello! 👋 I\'m <b>Everit\'s AI</b>. Ask me anything about his skills, experience, projects or professional profile. I\'m here to help you get to know him better.',
    };
  }
}
