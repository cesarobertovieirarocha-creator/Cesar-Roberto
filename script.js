/* JavaScript Document

Tooplate 2147 Titan Folio

https://www.tooplate.com/view/2147-titan-folio
*/


// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

mobileMenuBtn.addEventListener('click', function () {
    mobileMenuBtn.classList.toggle('active');
    mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
});

// Update active menu item based on scroll
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const menuItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        const mobileMenuItem = document.querySelector(`.mobile-nav a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all menu items
            document.querySelectorAll('.nav-links a').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.mobile-nav a').forEach(item => item.classList.remove('active'));

            // Add active class to current menu item
            if (menuItem) menuItem.classList.add('active');
            if (mobileMenuItem) mobileMenuItem.classList.add('active');
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveMenuItem);

// Set initial active state
updateActiveMenuItem();

// Timeline functionality
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineFilters = document.querySelectorAll('.timeline-filter');

    // Timeline scroll progress
    function updateTimelineProgress() {
        const timelineContainer = document.querySelector('.timeline-container');
        const containerRect = timelineContainer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (containerRect.top < windowHeight && containerRect.bottom > 0) {
            const progress = Math.max(0, Math.min(1,
                (windowHeight - containerRect.top) / (containerRect.height + windowHeight)
            ));
            timelineProgress.style.height = `${progress * 100}%`;
        }
    }

    // Timeline item visibility
    function updateTimelineItems() {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;

            if (isVisible && !item.classList.contains('visible')) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            }
        });
    }

    // Timeline filtering
    timelineFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            // Update active filter
            timelineFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            // Filter timeline items
            timelineItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Timeline node interactions
    document.querySelectorAll('.timeline-node').forEach(node => {
        node.addEventListener('click', function () {
            // Remove active class from all nodes
            document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
            // Add active class to clicked node
            this.classList.add('active');

            // Smooth scroll to the timeline item
            const timelineItem = this.closest('.timeline-item');
            timelineItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        updateTimelineProgress();
        updateTimelineItems();
    });

    // Initial calls
    updateTimelineProgress();
    updateTimelineItems();
}

// Initialize timeline when DOM is ready
document.addEventListener('DOMContentLoaded', initTimeline);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeIconSun = document.getElementById('theme-icon-sun');
const themeIconMoon = document.getElementById('theme-icon-moon');

// Check for saved user preference, if any, on load of the website
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    if (themeIconMoon) themeIconMoon.classList.add('hidden');
    if (themeIconSun) themeIconSun.classList.remove('hidden');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeIconMoon.classList.add('hidden');
            themeIconSun.classList.remove('hidden');
        } else {
            localStorage.setItem('theme', 'dark');
            themeIconSun.classList.add('hidden');
            themeIconMoon.classList.remove('hidden');
        }
    });
}

// ─── Translation Dictionary ───────────────────────────────────────────────
const translations = {
    pt: {
        // Nav
        'nav.home': 'Home',
        'nav.about': 'Sobre',
        'nav.skills': 'Habilidades',
        'nav.timeline': 'Jornada',
        'nav.portfolio': 'Projetos',
        'nav.courses': 'Cursos',
        'nav.contact': 'Contato',
        // Hero
        'hero.subtitle': 'Processos Administrativos, Operações e Análise de Dados',
        'hero.description': 'Atuação em processos administrativos, suporte operacional e melhoria contínua com foco em organização, eficiência e análise de informações.',
        'hero.cta.projects': 'Ver Projetos',
        'hero.cta.contact': 'Vamos Conversar',
        'hero.stat1.label': 'Setores de Atuação',
        'hero.stat2.label': 'Anos em Operações',
        'hero.stat3.label': 'Cursos e Certificações',
        // About
        'about.title': 'Sobre Mim',
        'about.subtitle': 'Profissional em crescimento com foco em eficiência operacional e dados.',
        'about.journey.title': 'Minha Jornada',
        'about.p1': 'Sou Assistente Administrativo II com experiência em rotinas administrativas, suporte operacional e melhoria de processos. Com vivência em setores dinâmicos como distribuição, indústria e serviços financeiros, venho desenvolvendo experiência em organização de processos, controle operacional e apoio à melhoria contínua das rotinas administrativas.',
        'about.p2': 'Acredito que a tecnologia, aliada a uma análise de dados precisa, é a chave para o crescimento sustentável de qualquer operação. Possuo conhecimentos em Power BI, Excel e lógica de programação, aplicando essas ferramentas no suporte a processos e organização de informações. Quando não estou analisando indicadores, estou aprimorando minhas habilidades em desenvolvimento web ou estudando análise espacial e territorial na UFU.',
        'about.mission.title': '🎯 Missão',
        'about.mission.text': 'Desenvolver soluções administrativas e tecnológicas que simplifiquem processos complexos, agregando valor real à operação e à experiência do cliente final.',
        'about.vision.title': '💡 Visão',
        'about.vision.text': 'Ser referência na integração entre gestão administrativa e inteligência de dados, utilizando a tecnologia como ponte para a excelência operacional.',
        // Skills
        'skills.title': 'Habilidades e Expertises',
        'skills.subtitle': 'Unindo inteligência de dados, gestão financeira e desenvolvimento tecnológico.',
        'skills.bi.title': 'Inteligência de Dados & BI',
        'skills.bi.desc': 'Conhecimentos em Power BI e Excel aplicados à organização, análise e visualização de dados operacionais.',
        'skills.ops.title': 'Processos Administrativos e Operacionais',
        'skills.ops.desc': 'Ampla experiência em organização de processos e fluxos administrativos. Foco em reduzir gargalos operacionais e implementar melhorias contínuas que geram agilidade e conformidade.',
        'skills.fin.title': 'Gestão e Matemática Financeira',
        'skills.fin.desc': 'Conhecimentos em matemática financeira e administração financeira, com conceitos aplicados pelo Insper. Experiência em análise de faturamento, conciliação e planejamento financeiro para negócios.',
        'skills.web.title': 'Desenvolvimento Web & Lógica',
        'skills.web.desc': 'Aplicação de lógica de programação em projetos reais. Conhecimentos em HTML5, CSS3 e JavaScript para criação de interfaces funcionais e automação de tarefas digitais.',
        // Timeline
        'timeline.title': 'Minha Jornada',
        'timeline.subtitle': 'De processos operacionais à inteligência de dados — uma trajetória de evolução contínua.',
        'timeline.filter.all': 'Tudo',
        'timeline.filter.education': 'Formação',
        'timeline.filter.work': 'Experiência',
        'timeline.filter.project': 'Projetos',
        // Timeline items
        'tl.insper.title': 'Administração Financeira',
        'tl.insper.desc': 'Especialização focada em gestão de recursos, viabilidade econômica e análise estratégica de negócios através da plataforma Coursera.',
        'tl.biz.year': '2025 - Presente',
        'tl.biz.title': 'Assistente Administrativo II',
        'tl.biz.desc': 'Atuação em processos operacionais, suporte administrativo e acompanhamento de rotinas de refaturamento. Apoio direto na otimização de fluxos logísticos e auditoria de notas fiscais.',
        'tl.biz.ach1': 'Implementação de automação para pedidos (Nivea)',
        'tl.biz.ach2': 'Apoio no acompanhamento e análise de processos de refaturamento',
        'tl.ufu.year': '2024 - Em andamento',
        'tl.ufu.title': 'Bacharelado em Geografia',
        'tl.ufu.desc': 'Desenvolvimento de pensamento crítico e analítico aplicado à organização territorial e análise de dados socioeconômicos.',
        'tl.locatudo.title': 'Auxiliar Administrativo',
        'tl.locatudo.desc': 'Atuação em rotinas administrativas e operacionais no setor de construção civil. Foco na organização documental e suporte aos processos internos para garantir agilidade e eficiência operacional.',
        'tl.locatudo.ach1': 'Suporte direto à eficiência do setor operacional',
        'tl.locatudo.ach2': 'Otimização da comunicação interna',
        'tl.michigan.title': 'Negociações de Sucesso: Estratégias e Habilidades Essenciais',
        'tl.michigan.desc': 'Especialização focada em táticas de negociação, preparação estratégica e ferramentas práticas para alcançar acordos eficientes e maximizar resultados em ambientes corporativos.',
        'tl.pagbank.title': 'Projeto PagBank (Selo RA1000)',
        'tl.pagbank.desc': 'Gestão de reputação e atendimento especializado. Foco em resolução de conflitos e elevação dos indicadores de satisfação do cliente (CSAT).',
        'tl.pagbank.ach1': 'Elevação da nota de 7.9 para 8.3 no Reclame Aqui',
        'tl.pagbank.ach2': 'Conquista do Selo RA1000 de excelência',
        'tl.adesp.title': 'Portal Digital ADESP',
        'tl.adesp.company': 'Projeto Independente',
        'tl.adesp.desc': 'Desenvolvimento da interface digital e portal institucional para o time de handebol ADESP de Uberlândia.',
        'tl.adesp.ach1': 'Criação de layout responsivo para atletas',
        'tl.adesp.ach2': 'Gestão digital da marca do clube',
        'tl.skill.finance': 'Finanças',
        'tl.skill.mgmt': 'Gestão',
        'tl.skill.bizanalysis': 'Análise de Negócios',
        'tl.skill.excel': 'Excel Avançado',
        'tl.skill.audit': 'Auditoria',
        'tl.skill.spatial': 'Análise Espacial',
        'tl.skill.research': 'Pesquisa',
        'tl.skill.routines': 'Rotinas Administrativas',
        'tl.skill.docs': 'Controle Documental',
        'tl.skill.org': 'Organização',
        'tl.skill.negotiation': 'Negociação',
        'tl.skill.strategy': 'Estratégia',
        'tl.skill.communication': 'Comunicação',
        'tl.skill.conflict': 'Resolução de Conflitos',
        'tl.skill.crisis': 'Gestão de Crise',
        // Portfolio
        'portfolio.title': 'Projetos em Destaque',
        'portfolio.subtitle': 'Uma vitrine de soluções que unem inteligência operacional, análise de dados e desenvolvimento tecnológico.',
        'portfolio.ra1000.title': 'Gestão de Reputação: Selo RA1000',
        'portfolio.ra1000.desc': 'Atuação no projeto PagBank. Através de acompanhamento de indicadores e resolução de demandas críticas, contribuí para ações que elevaram a nota da empresa no Reclame Aqui de 7.9 para 8.3, conquistando o selo máximo de excelência (RA1000).',
        'portfolio.ops.title': 'Padronização Operacional e Organização de Processos',
        'portfolio.ops.desc': 'Desenvolvimento de solução para padronização de pedidos de grandes fornecedores (Rede Biz). O projeto eliminou erros manuais de processamento e otimizou o fluxo de distribuição utilizando lógica de dados e ferramentas avançadas de Office.',
        'portfolio.adesp.title': 'Portal Institucional ADESP Handebol',
        'portfolio.adesp.desc': 'Desenvolvimento frontend completo para a associação esportiva ADESP. Criação de uma interface responsiva focada em branding e engajamento da comunidade local, utilizando tecnologias modernas de web design.',
        // Courses
        'courses.title': 'Cursos & Certificações',
        'courses.subtitle': 'Aprendizado contínuo como base para a excelência profissional',
        // Contact
        'contact.title': 'Vamos Construir Algo Juntos?',
        'contact.subtitle': 'Pronto para otimizar processos ou tirar sua ideia digital do papel? Vamos conversar.',
        'contact.heading': 'Entre em Contato',
        'contact.desc': 'Estou sempre em busca de novos desafios que unam gestão, dados e tecnologia. Seja para uma oportunidade profissional, colaboração em projetos administrativos e operacionais ou desenvolvimento web, estou à disposição para colaborar com soluções eficientes.',
        'contact.available': '💼 Disponível para:',
        'contact.item1': 'Oportunidades em Análise de Dados / Processos',
        'contact.item2': 'Projetos de Desenvolvimento Web (Frontend)',
        'contact.item3': 'Apoio em Eficiência Operacional',
        'contact.item4': 'Projetos Esportivos e Sociais',
        'contact.location.label': '📍 Localização:',
        'contact.location.value': 'Uberlândia, MG (Disponível para trabalho Remoto ou Presencial)',
        'contact.form.name': 'Seu Nome',
        'contact.form.email': 'Seu E-mail',
        'contact.form.subject': 'Assunto (Ex: Otimização de Processos, Web Design)',
        'contact.form.message': 'Como posso ajudar o seu negócio?',
        'contact.form.send': 'Enviar Mensagem',
    },
    en: {
        // Nav
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.timeline': 'Journey',
        'nav.portfolio': 'Projects',
        'nav.courses': 'Courses',
        'nav.contact': 'Contact',
        // Hero
        'hero.subtitle': 'Administrative Processes, Operations & Data Analysis',
        'hero.description': 'Working in administrative processes, operational support and continuous improvement with a focus on organization, efficiency and information analysis.',
        'hero.cta.projects': 'View Projects',
        'hero.cta.contact': "Let's Talk",
        'hero.stat1.label': 'Industry Sectors',
        'hero.stat2.label': 'Years in Operations',
        'hero.stat3.label': 'Courses & Certifications',
        // About
        'about.title': 'About Me',
        'about.subtitle': 'Growing professional focused on operational efficiency and data.',
        'about.journey.title': 'My Journey',
        'about.p1': 'I am an Administrative Assistant II with experience in administrative routines, operational support and process improvement. With exposure to dynamic sectors such as distribution, industry and financial services, I have been building expertise in process organization, operational control and support for continuous improvement of administrative routines.',
        'about.p2': 'I believe that technology, combined with precise data analysis, is the key to sustainable growth in any operation. I have knowledge of Power BI, Excel and programming logic, applying these tools to support processes and organize information. When I\'m not analyzing indicators, I\'m improving my web development skills or studying spatial and territorial analysis at UFU.',
        'about.mission.title': '🎯 Mission',
        'about.mission.text': 'Develop administrative and technological solutions that simplify complex processes, adding real value to operations and the end-customer experience.',
        'about.vision.title': '💡 Vision',
        'about.vision.text': 'To become a reference in integrating administrative management and data intelligence, using technology as a bridge to operational excellence.',
        // Skills
        'skills.title': 'Skills & Expertise',
        'skills.subtitle': 'Bridging data intelligence, financial management and technology development.',
        'skills.bi.title': 'Data Intelligence & BI',
        'skills.bi.desc': 'Knowledge of Power BI and Excel applied to organization, analysis and visualization of operational data.',
        'skills.ops.title': 'Administrative & Operational Processes',
        'skills.ops.desc': 'Broad experience in organizing processes and administrative workflows. Focus on reducing operational bottlenecks and implementing continuous improvements that generate agility and compliance.',
        'skills.fin.title': 'Financial Management & Math',
        'skills.fin.desc': 'Knowledge of financial mathematics and financial administration, with concepts applied through Insper. Experience in billing analysis, reconciliation and financial planning for businesses.',
        'skills.web.title': 'Web Development & Logic',
        'skills.web.desc': 'Application of programming logic in real projects. Knowledge of HTML5, CSS3 and JavaScript for creating functional interfaces and automating digital tasks.',
        // Timeline
        'timeline.title': 'My Journey',
        'timeline.subtitle': 'From operational processes to data intelligence — a path of continuous evolution.',
        'timeline.filter.all': 'All',
        'timeline.filter.education': 'Education',
        'timeline.filter.work': 'Experience',
        'timeline.filter.project': 'Projects',
        // Timeline items
        'tl.insper.title': 'Financial Administration',
        'tl.insper.desc': 'Specialization focused on resource management, economic feasibility and strategic business analysis through the Coursera platform.',
        'tl.biz.year': '2025 - Present',
        'tl.biz.title': 'Administrative Assistant II',
        'tl.biz.desc': 'Working in operational processes, administrative support and monitoring of rebilling routines. Direct support in optimizing logistics flows and fiscal note auditing.',
        'tl.biz.ach1': 'Automation implementation for orders (Nivea)',
        'tl.biz.ach2': 'Support in monitoring and analyzing rebilling processes',
        'tl.ufu.year': '2024 - In progress',
        'tl.ufu.title': 'Bachelor\'s Degree in Geography',
        'tl.ufu.desc': 'Development of critical and analytical thinking applied to territorial organization and analysis of socioeconomic data.',
        'tl.locatudo.title': 'Administrative Assistant',
        'tl.locatudo.desc': 'Working in administrative and operational routines in the civil construction sector. Focus on document organization and support for internal processes to ensure agility and operational efficiency.',
        'tl.locatudo.ach1': 'Direct support to operational sector efficiency',
        'tl.locatudo.ach2': 'Internal communication optimization',
        'tl.michigan.title': 'Successful Negotiations: Strategies and Essential Skills',
        'tl.michigan.desc': 'Specialization focused on negotiation tactics, strategic preparation and practical tools to reach efficient agreements and maximize results in corporate environments.',
        'tl.pagbank.title': 'PagBank Project (RA1000 Seal)',
        'tl.pagbank.desc': 'Reputation management and specialized customer service. Focus on conflict resolution and improving customer satisfaction indicators (CSAT).',
        'tl.pagbank.ach1': 'Score raised from 7.9 to 8.3 on Reclame Aqui',
        'tl.pagbank.ach2': 'Achievement of the RA1000 excellence seal',
        'tl.adesp.title': 'ADESP Digital Portal',
        'tl.adesp.company': 'Independent Project',
        'tl.adesp.desc': 'Development of the digital interface and institutional portal for the ADESP handball team in Uberlândia.',
        'tl.adesp.ach1': 'Creation of responsive layout for athletes',
        'tl.adesp.ach2': 'Digital management of the club brand',
        'tl.skill.finance': 'Finance',
        'tl.skill.mgmt': 'Management',
        'tl.skill.bizanalysis': 'Business Analysis',
        'tl.skill.excel': 'Advanced Excel',
        'tl.skill.audit': 'Auditing',
        'tl.skill.spatial': 'Spatial Analysis',
        'tl.skill.research': 'Research',
        'tl.skill.routines': 'Administrative Routines',
        'tl.skill.docs': 'Document Control',
        'tl.skill.org': 'Organization',
        'tl.skill.negotiation': 'Negotiation',
        'tl.skill.strategy': 'Strategy',
        'tl.skill.communication': 'Communication',
        'tl.skill.conflict': 'Conflict Resolution',
        'tl.skill.crisis': 'Crisis Management',
        // Portfolio
        'portfolio.title': 'Featured Projects',
        'portfolio.subtitle': 'A showcase of solutions combining operational intelligence, data analysis and technology development.',
        'portfolio.ra1000.title': 'Reputation Management: RA1000 Seal',
        'portfolio.ra1000.desc': 'Work on the PagBank project. Through indicator tracking and resolution of critical demands, I contributed to actions that raised the company\'s Reclame Aqui score from 7.9 to 8.3, achieving the top excellence seal (RA1000).',
        'portfolio.ops.title': 'Operational Standardization & Process Organization',
        'portfolio.ops.desc': 'Development of a solution for standardizing orders from major suppliers (Rede Biz). The project eliminated manual processing errors and optimized the distribution flow using data logic and advanced Office tools.',
        'portfolio.adesp.title': 'ADESP Handball Institutional Portal',
        'portfolio.adesp.desc': 'Full frontend development for the ADESP sports association. Creation of a responsive interface focused on branding and local community engagement, using modern web design technologies.',
        // Courses
        'courses.title': 'Courses & Certifications',
        'courses.subtitle': 'Continuous learning as the foundation for professional excellence',
        // Contact
        'contact.title': "Let's Build Something Together?",
        'contact.subtitle': 'Ready to optimize processes or bring your digital idea to life? Let\'s talk.',
        'contact.heading': 'Get in Touch',
        'contact.desc': 'I\'m always looking for new challenges that combine management, data and technology. Whether for a professional opportunity, collaboration on administrative and operational projects or web development, I\'m available to collaborate on efficient solutions.',
        'contact.available': '💼 Available for:',
        'contact.item1': 'Data Analysis / Process Opportunities',
        'contact.item2': 'Web Development Projects (Frontend)',
        'contact.item3': 'Operational Efficiency Support',
        'contact.item4': 'Sports and Social Projects',
        'contact.location.label': '📍 Location:',
        'contact.location.value': 'Uberlândia, MG, Brazil (Available for Remote or On-site work)',
        'contact.form.name': 'Your Name',
        'contact.form.email': 'Your E-mail',
        'contact.form.subject': 'Subject (e.g. Process Optimization, Web Design)',
        'contact.form.message': 'How can I help your business?',
        'contact.form.send': 'Send Message',
    }
};

function applyTranslations(lang) {
    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });
    // Placeholders for form inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) {
            el.setAttribute('placeholder', t[key]);
        }
    });
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    localStorage.setItem('lang', lang);
}

// Language Toggle Logic
const langToggle = document.getElementById('lang-toggle');
const langPt = document.getElementById('lang-pt');
const langEn = document.getElementById('lang-en');

let currentLang = localStorage.getItem('lang') || 'pt';

// Apply saved language on load
if (currentLang === 'en') {
    langPt.classList.add('hidden');
    langEn.classList.remove('hidden');
    applyTranslations('en');
}

if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        langPt.classList.toggle('hidden');
        langEn.classList.toggle('hidden');
        applyTranslations(currentLang);
    });
}
