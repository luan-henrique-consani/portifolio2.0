/* ===================== DATA ===================== */
const DATA_PROFILE = {
    name: "Luan Consani",
    nameFirst: "LUAN",
    nameLast: "CONSANI",
    title: "WEB DEVELOPER",
    bio: "Desenvolvedor web focado em criar experiências digitais de alto desempenho. Especializado em soluções que unem estética técnica com precisão funcional.",
};

const DATA_SKILLS = {
    center: "JavaScript",
    left: ["Node.js", "NestJS", "Next.js", "Prisma"],
    right: ["React", "Angular", "Tailwind CSS"],
};

const DATA_PROJECTS = [
    { title: "PortfólioSync", desc: "Plataforma de portfólio dinâmica com integração de API em tempo real. Construída com Next.js e NestJS.", tags: ["HAND-CODED"], link: "https://github.com/Leonxlnx", img: "" },
    { title: "NexusBoard", desc: "Dashboard administrativo responsivo com painéis interativos. React + TypeScript.", tags: ["HAND-CODED", "CLIENTE"], link: "https://github.com/Leonxlnx", img: "" },
    { title: "APIForge", desc: "API REST robusta com autenticação JWT. NestJS + Prisma + PostgreSQL.", tags: ["HAND-CODED"], link: "https://github.com/Leonxlnx", img: "" },
];

const DATA_TIMELINE = {
    experience: [
        { period: "2024-2025", role: "Assistente de TI", place: "@Tech_Merchandising", desc: "Suporte técnico, manutenção de hardware e infraestrutura de rede" },
        { period: "2025-2025", role: "Freelancer", place: "@Projetos_Independentes", desc: "" },
        { period: "2026-PRESENTE", role: "Estágio em Desenvolvimento Web", place: "@Escola_Koru", desc: "Desenvolvimento de interfaces e sistemas web" },
    ],
    education: [
        { status: "CURSANDO", course: "Engenharia de Software", place: "@UniSenai_Londrina" },
        { status: "CERTIFICADO", course: "JavaScript Completo", place: "@DIO" },
        { status: "CONCLUÍDO", course: "Curso Técnico em Informática", place: "@Senai" },
    ]
};

/* ===================== INTRO CURTAIN ===================== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('curtains').classList.add('curtains-open');
        document.getElementById('intro-content').style.opacity = '1';
    }, 400);
});

/* ===================== NAV ACTIVE STATE ===================== */
const sections = document.querySelectorAll('section, #projects-wrap');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

function setActive(id) {
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
    mobileLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
}

const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting && e.intersectionRatio >= 0.3) {
            setActive(e.target.id);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('section[id], #projects-wrap').forEach(s => io.observe(s));

/* ===================== TECH TREE SVG LINES ===================== */
function drawTreeLines() {
    const svg = document.getElementById('tree-svg');
    const container = document.getElementById('tech-container');
    const center = document.getElementById('tech-center');
    const leftNodes = document.querySelectorAll('[data-side="left"]');
    const rightNodes = document.querySelectorAll('[data-side="right"]');

    if (!svg || !center || window.innerWidth < 769) return;

    const contRect = container.getBoundingClientRect();
    const centerRect = center.getBoundingClientRect();

    const W = contRect.width;
    const H = contRect.height;

    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = '';

    const cx = centerRect.left - contRect.left + centerRect.width / 2;
    const cy = centerRect.top - contRect.top + centerRect.height / 2;

    function drawLinesFor(nodes) {
        nodes.forEach(node => {
            const r = node.getBoundingClientRect();
            const nx = r.left - contRect.left + r.width / 2;
            const ny = r.top - contRect.top + r.height / 2;

            const midX = (cx + nx) / 2;

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${cx} ${cy} C ${midX} ${cy}, ${midX} ${ny}, ${nx} ${ny}`);
            path.setAttribute('class', 'tree-line');
            svg.appendChild(path);
        });
    }

    drawLinesFor(leftNodes);
    drawLinesFor(rightNodes);
}

window.addEventListener('load', () => { setTimeout(drawTreeLines, 100); });
window.addEventListener('resize', drawTreeLines);

/* Tech section in-view glow */
const techSection = document.getElementById('tech');
const techObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        techSection.classList.toggle('in-view', e.isIntersecting);
        if (e.isIntersecting) setTimeout(drawTreeLines, 100);
    });
}, { threshold: 0.4 });
techObs.observe(techSection);

/* ===================== PROJECT CURTAIN REVEAL ===================== */
const projectSlides = document.querySelectorAll('.project-slide');
const projObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('revealed'), 150);
        } else {
            e.target.classList.remove('revealed');
        }
    });
}, { threshold: 0.3 });

projectSlides.forEach(s => projObs.observe(s));

/* ===================== TERMINAL TYPEWRITER ===================== */
const terminalLines = document.querySelectorAll('.t-line');
let terminalTriggered = false;

function revealTerminalLines() {
    if (terminalTriggered) return;
    terminalTriggered = true;

    terminalLines.forEach((line, i) => {
        setTimeout(() => {
            line.classList.add('visible');
        }, i * 200);
    });
}

const termObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) revealTerminalLines();
    });
}, { threshold: 0.3 });
termObs.observe(document.getElementById('terminal'));

/* ===================== SCROLL SNAP for projects ===================== */
// Projects wrap needs snap for each slide
const projectsWrap = document.getElementById('projects-wrap');
projectsWrap.style.scrollSnapAlign = 'start';

// Ensure each project slide snaps
projectSlides.forEach(slide => {
    slide.style.scrollSnapAlign = 'start';
    slide.style.scrollSnapStop = 'always';
});
