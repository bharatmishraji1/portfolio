/* ============================================================
   FUTURISTIC 3D AI PORTFOLIO — RED NEON EDITION (3D ENHANCED)
   Target: Cyberpunk + AI + NVIDIA + Tesla + OpenAI
   Colors: #050505, #FF003C, #C80032, rgba(255,0,60,0.25/0.45)
   ============================================================ */

// ------------------------------------------------------------
// 1. LOADING SCREEN ANIMATION
// ------------------------------------------------------------
(function initLoadingScreen() {
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loaderText');
    const loaderBar = document.getElementById('loaderBar');
    if (!loader) return;

    const messages = [
        "Initializing AI System Core...",
        "Generating 3D Neural Nodes...",
        "Connecting LangChain & MCP Agents...",
        "Compiling MLOps Pipelines...",
        "System Fully Operational."
    ];

    let step = 0;
    const interval = setInterval(() => {
        step++;
        if (loaderBar) loaderBar.style.width = (step * 20) + '%';
        if (loaderText && messages[step]) {
            loaderText.textContent = messages[step];
        }

        if (step >= 5) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                initCounters();
            }, 400);
        }
    }, 400);
})();


// ------------------------------------------------------------
// 2. BACKGROUND MATRIX / NEURAL CANVAS (#bg-canvas)
// ------------------------------------------------------------
(function initBgCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '01AI_ENGINEER_ML_MODEL_LLM_RAG_PYTHON';
    const fontSize = 13;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);

    const particleCount = 50;
    const particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1
    }));

    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 5, 0.18)';
        ctx.fillRect(0, 0, width, height);

        // Matrix Rain
        ctx.fillStyle = 'rgba(255, 0, 60, 0.12)';
        ctx.font = fontSize + 'px monospace';
        columns = Math.floor(width / fontSize);
        if (drops.length < columns) drops = Array(columns).fill(1);

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }

        // Neural Mesh
        ctx.strokeStyle = 'rgba(255, 0, 60, 0.09)';
        ctx.lineWidth = 0.8;

        for (let i = 0; i < particleCount; i++) {
            const p1 = particles[i];
            p1.x += p1.vx;
            p1.y += p1.vy;

            if (p1.x < 0 || p1.x > width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > height) p1.vy *= -1;

            ctx.fillStyle = 'rgba(255, 0, 60, 0.35)';
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particleCount; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
})();


// ------------------------------------------------------------
// 3. ADVANCED THREE.JS 3D NEURAL SPHERE & ORBITS (#hero-canvas)
// ------------------------------------------------------------
(function initThreeScene() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // A. HOLOGRAPHIC WIREFRAME NEURAL SPHERE
    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 3);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0xFF003C,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
    });
    const neuralSphere = new THREE.Mesh(sphereGeo, sphereMat);
    neuralSphere.position.set(1.2, 0, 0);
    scene.add(neuralSphere);

    // INNER GLOW CORE
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0xC80032,
        transparent: true,
        opacity: 0.45,
        wireframe: true,
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    neuralSphere.add(innerCore);

    // B. ORBIT RINGS
    const ringGroup = new THREE.Group();
    neuralSphere.add(ringGroup);

    function createOrbitRing(radius, tiltX, tiltY, color) {
        const ringGeo = new THREE.TorusGeometry(radius, 0.015, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = tiltX;
        ring.rotation.y = tiltY;
        ringGroup.add(ring);
        return ring;
    }

    const ring1 = createOrbitRing(2.4, Math.PI / 3, Math.PI / 6, 0xFF003C);
    const ring2 = createOrbitRing(2.8, -Math.PI / 4, Math.PI / 4, 0xC80032);
    const ring3 = createOrbitRing(3.2, Math.PI / 2, 0, 0xFF003C);

    // C. 3D FLOATING DATA CUBES
    const cubes = [];
    for (let i = 0; i < 14; i++) {
        const size = 0.15 + Math.random() * 0.28;
        const geo = new THREE.BoxGeometry(size, size, size);
        const mat = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0xFF003C : 0xC80032,
            transparent: true,
            opacity: 0.35 + Math.random() * 0.35,
            wireframe: true,
        });
        const cube = new THREE.Mesh(geo, mat);
        cube.position.set(
            (Math.random() - 0.5) * 14,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 6
        );
        cube.userData = {
            rotSpeedX: 0.005 + Math.random() * 0.015,
            rotSpeedY: 0.005 + Math.random() * 0.015,
            floatSpeed: 0.3 + Math.random() * 0.6,
            floatPhase: Math.random() * Math.PI * 2,
            baseY: cube.position.y
        };
        scene.add(cube);
        cubes.push(cube);
    }

    // D. 3D PARTICLE FIELD
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = [];
    const particleSpeeds = [];

    for (let i = 0; i < particleCount; i++) {
        particlePos.push(
            (Math.random() - 0.5) * 18,
            (Math.random() - 0.5) * 14,
            (Math.random() - 0.5) * 10
        );
        particleSpeeds.push(0.002 + Math.random() * 0.006);
    }

    particleGeo.setAttribute('position', new THREE.Float32BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
        color: 0xFF003C,
        size: 0.065,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // MOUSE PARALLAX INTERACTION
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Rotate 3D Neural Sphere Core & Rings
        neuralSphere.rotation.y = elapsed * 0.25;
        neuralSphere.rotation.x = elapsed * 0.15;
        innerCore.rotation.y = -elapsed * 0.4;

        ring1.rotation.z = elapsed * 0.4;
        ring2.rotation.z = -elapsed * 0.3;
        ring3.rotation.z = elapsed * 0.2;

        // Animate Floating 3D Cubes
        cubes.forEach((c) => {
            c.rotation.x += c.userData.rotSpeedX;
            c.rotation.y += c.userData.rotSpeedY;
            c.position.y = c.userData.baseY + Math.sin(elapsed * c.userData.floatSpeed + c.userData.floatPhase) * 0.4;
        });

        // Drift Particles
        const pos = particles.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3 + 1] += particleSpeeds[i];
            if (pos[i * 3 + 1] > 7) {
                pos[i * 3 + 1] = -7;
                pos[i * 3] = (Math.random() - 0.5) * 18;
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Smooth Camera Mouse Parallax
        targetX = mouseX * 0.6;
        targetY = mouseY * 0.4;
        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (targetY - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
})();


// ------------------------------------------------------------
// 4. INTERACTIVE 3D TILT CARDS (CSS 3D TRANSFORMS)
// ------------------------------------------------------------
(function init3DTiltCards() {
    const tiltCards = document.querySelectorAll('.project-card, .skill-card, .info-card, .timeline-content');

    tiltCards.forEach((card) => {
        card.style.transformStyle = 'preserve-3d';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12; // Rotate X up to 12 deg
            const rotateY = ((x - centerX) / centerX) * 12;  // Rotate Y up to 12 deg

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;

            // Update glow position inside card if present
            const glow = card.querySelector('.skill-glow, .project-card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 0, 60, 0.2), transparent 70%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            card.style.transition = 'transform 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
})();


// ------------------------------------------------------------
// 5. HERO TYPEWRITER EFFECT
// ------------------------------------------------------------
(function initTypewriter() {
    const roleText = document.getElementById('roleText');
    if (!roleText) return;

    const roles = [
        "AI Engineer",
        "Machine Learning Engineer",
        "Data Scientist",
        "Generative AI Specialist"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 35 : 75;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
})();


// ------------------------------------------------------------
// 6. CUSTOM NEON CURSOR & MAGNETIC BUTTONS
// ------------------------------------------------------------
(function initCustomCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function renderRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';

        requestAnimationFrame(renderRing);
    }
    renderRing();

    const clickables = document.querySelectorAll('a, button, .skill-card, .project-card, .contact-card, .info-card');
    clickables.forEach((el) => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateZ(10px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px) translateZ(0px)';
        });
    });
})();


// ------------------------------------------------------------
// 7. NAVBAR SCROLL & HIDE BEHAVIOR
// ------------------------------------------------------------
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (currentScrollY > 300 && currentScrollY > lastScrollY) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScrollY = currentScrollY;

        let current = '';
        sections.forEach((sec) => {
            const top = sec.offsetTop - 150;
            if (currentScrollY >= top) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
})();


// ------------------------------------------------------------
// 8. MOBILE MENU
// ------------------------------------------------------------
(function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
})();


// ------------------------------------------------------------
// 9. SCROLL REVEAL ANIMATIONS
// ------------------------------------------------------------
(function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach((el) => observer.observe(el));
})();


// ------------------------------------------------------------
// 10. ANIMATED COUNTER NUMBERS
// ------------------------------------------------------------
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute('data-count'), 10);
                let currentVal = 0;
                const duration = 1500;
                const stepTime = Math.max(10, Math.floor(duration / endVal));

                const timer = setInterval(() => {
                    currentVal += 1;
                    target.textContent = currentVal + '+';
                    if (currentVal >= endVal) {
                        clearInterval(timer);
                    }
                }, stepTime);

                obs.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((c) => observer.observe(c));
}


// ------------------------------------------------------------
// 11. FORM & ACTION HANDLERS
// ------------------------------------------------------------
(function initFormAndActions() {
    const downloadBtn = document.getElementById('downloadResume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSec = document.getElementById('contact');
            if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #00FF66, #00CC44)';
        btn.style.boxShadow = '0 0 20px rgba(0, 255, 102, 0.4)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.boxShadow = '';
            form.reset();
        }, 3000);
    });
})();
