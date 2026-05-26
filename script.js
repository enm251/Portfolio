// Initialize Interactive Canvas Radar
const canvas = document.getElementById('canvas-radar');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 65;
const maxDistance = 110;
let mouse = { x: null, y: null, radius: 150 };

// Resize canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track mouse positioning
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle blueprint
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff66';
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce borders
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Mouse attraction
        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                let force = (mouse.radius - dist) / mouse.radius;
                this.x -= (dx / dist) * force * 0.5;
                this.y -= (dy / dist) * force * 0.5;
            }
        }
    }
}

// Generate nodes
function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// Render loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Connect particles
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
                let opacity = (maxDistance - dist) / maxDistance * 0.15;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 102, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();


// Signal Latency Simulator
const latencyVal = document.getElementById('latency-val');
if (latencyVal) {
    setInterval(() => {
        const ping = Math.floor(Math.random() * 15) + 18;
        latencyVal.innerText = `${ping}ms`;
    }, 3000);
}


// Interactive Terminal Command Console
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const terminalBody = document.getElementById('terminal-body');

// Command sets definitions
const commands = {
    help: `Authorized Guest Shell Commands:
  <span class="highlight">help</span>       - Displays commands manifest
  <span class="highlight">about</span>      - Retrieves profile biographical metadata
  <span class="highlight">skills</span>     - Dumps engineering skill levels
  <span class="highlight">projects</span>   - Shows key repositories and security tools
  <span class="highlight">certs</span>      - Outputs certifications log
  <span class="highlight">contact</span>    - Prints communication endpoints
  <span class="highlight">matrix</span>     - Run console decryption matrix streams
  <span class="highlight">clear</span>      - Wipes buffer history`,
    
    about: `System Profile: Adarsh Singh
Role: Security Engineer & Web Researcher
Status: TOP 5% Ranker TryHackMe
Bio: Specializing in web application vulnerability analysis, secure coding practices, and reconnaissance. Actively researching static scanning techniques (AST parsing) to detect vulnerabilities under OWASP Top 10 guidelines.`,
    
    skills: `Dumping Capability Matrices:
  - Offensive Security: Web App Pentesting (85%), OWASP Top 10 Audits (90%), Vulnerability ID (80%)
  - Defensive Network: TCP/IP Topologies (85%), Wireshark Packet Inspection (75%)
  - Security Utilities: Scripting Python/JS (80%), Burp Suite Interception (90%)`,
    
    projects: `Repository Archives:
  - [VulnSage]: Python-based Static Code Vulnerability Analyzer using Abstract Syntax Trees
  - [AutoRecon]: Nmap-based automated subnet reconnaissance engine`,
    
    certs: `Credentials Database:
  - ISC2: Certified in Cybersecurity (CC) - Expected July 2026
  - TryHackMe: SEC1 Practitioner - Expected August 2026
  - Cisco: Networking Essentials - Completed`,
    
    contact: `Establishing Handshake Paths:
  - Email: offadarshsingh@gmail.com
  - Phone: +91 93059 26259
  - GitHub: github.com/enm251
  - LinkedIn: linkedin.com/in/adarsh-singh-a22025287`,
    
    secret: `[SECRET] System log override detected. Accessing admin sandbox... Just kidding, write to the contact form to connect!`
};

// Listen for Terminal Input
if (terminalInput) {
    // Focus terminal container on click
    document.getElementById('terminal-container').addEventListener('click', () => {
        terminalInput.focus();
    });

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const inputVal = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';
            
            if (inputVal === '') return;
            
            // Append input line
            const userLine = document.createElement('div');
            userLine.className = 'terminal-input-line';
            userLine.innerHTML = `<span class="prompt">guest@security-node:~$</span> <span>${inputVal}</span>`;
            terminalOutput.appendChild(userLine);
            
            // Output handler
            const responseLine = document.createElement('div');
            responseLine.style.marginTop = '6px';
            responseLine.style.marginBottom = '12px';
            
            if (inputVal === 'clear') {
                terminalOutput.innerHTML = '';
                terminalBody.scrollTop = 0;
                return;
            } else if (inputVal === 'matrix') {
                runMatrixAnimation();
                return;
            } else if (commands[inputVal]) {
                responseLine.innerHTML = commands[inputVal].replace(/\n/g, '<br>');
            } else {
                responseLine.innerHTML = `<span style="color: #ef4444;">COMMAND_NOT_FOUND: ${inputVal}</span><br>Type <span class="highlight">help</span> for authorized commands.`;
            }
            
            terminalOutput.appendChild(responseLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
}

// Matrix rain shell animation
let matrixInterval = null;
function runMatrixAnimation() {
    if (matrixInterval) clearInterval(matrixInterval);
    
    terminalOutput.innerHTML = '';
    const body = document.getElementById('terminal-body');
    const cols = 26;
    let ticks = 0;
    
    matrixInterval = setInterval(() => {
        if (ticks < 12) {
            let row = '';
            for (let i = 0; i < cols; i++) {
                row += Math.random() > 0.5 ? '1 ' : '0 ';
            }
            const line = document.createElement('div');
            line.style.color = '#00ff66';
            line.style.opacity = (12 - ticks) / 12;
            line.innerText = row;
            terminalOutput.appendChild(line);
            body.scrollTop = body.scrollHeight;
            ticks++;
        } else {
            clearInterval(matrixInterval);
            const line = document.createElement('div');
            line.className = 'security-ok';
            line.style.marginTop = '10px';
            line.innerText = "CALIBRATION DONE. TERMINAL SECURED.";
            terminalOutput.appendChild(line);
            body.scrollTop = body.scrollHeight;
        }
    }, 300);
}


// Experience / Credentials Journey Tab System
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        const activePane = document.getElementById(targetTab);
        if (activePane) activePane.classList.add('active');
    });
});


// Project Vulnerability & Recon Scanners Modal triggers
const scannerModal = document.getElementById('scanner-modal');
const scanTerminalBody = document.getElementById('scan-terminal-body');
const scanModalTitle = document.getElementById('scan-modal-title');

const vulnSageLogs = [
    "[INFO] Starting VulnSage Static Code Scan Engine...",
    "[INFO] Target Path: /src/components/auth_gateway.py",
    "[STATUS] Initializing AST code traversal...",
    "[STATUS] Analyzing parsing node imports...",
    "[WARN] Low-risk issue: Insecure library package usage found (pyDes)",
    "[RUN] Auditing user parameters sanitization...",
    "[WARN] HIGH_RISK: SQL Injection point discovered on line 142 (exec statement without parameterization)",
    "[RUN] Inspecting session credential storage...",
    "[WARN] HIGH_RISK: Hardcoded API Secret Key token found on line 208",
    "[INFO] Vulnerability sweep done. Writing scan telemetry report...",
    "[RESULTS] 2 high-risk issues found. Run patch script."
];

const reconLogs = [
    "[INFO] Starting Automated Recon Engine v2.1",
    "[INFO] Target Gateway Scope: 192.168.1.0/24",
    "[STATUS] Launching ICMP ping sweep...",
    "[STATUS] Host discovered active: 192.168.1.1 (Gateway Router)",
    "[STATUS] Host discovered active: 192.168.1.42 (Security Host)",
    "[RUN] Running service enumeration on 192.168.1.42...",
    "[INFO] Discovered open port: 80/tcp  (HTTP - Apache 2.4.41)",
    "[INFO] Discovered open port: 443/tcp (HTTPS - OpenSSL 1.1.1d)",
    "[INFO] Discovered open port: 22/tcp  (SSH - OpenSSH 8.2p1)",
    "[RUN] Auditing HTTP response headers...",
    "[WARN] Missing Header: X-Frame-Options",
    "[WARN] Missing Header: Content-Security-Policy",
    "[INFO] Target port sweep done. Writing report.",
    "[RESULTS] Network crawler sweep completed. 3 ports open."
];

let scanInterval = null;

function launchSecurityScan(projectType) {
    if (scannerModal) {
        scannerModal.classList.add('active');
        scanTerminalBody.innerHTML = '';
        
        let logs = projectType === 'vulnsage' ? vulnSageLogs : reconLogs;
        scanModalTitle.innerText = projectType === 'vulnsage' ? "VULNSAGE STATIC SCAN" : "RECON AUTOMATION CRONTAB";
        
        let index = 0;
        if (scanInterval) clearInterval(scanInterval);
        
        scanInterval = setInterval(() => {
            if (index < logs.length) {
                const line = document.createElement('div');
                line.style.marginBottom = '6px';
                
                // Color formatting
                let logText = logs[index];
                if (logText.includes('[WARN]')) {
                    line.style.color = '#ffbd2e';
                } else if (logText.includes('[OK]') || logText.includes('[RESULTS]')) {
                    line.style.color = '#00ff66';
                } else {
                    line.style.color = '#8c9bb4';
                }
                
                line.innerText = logText;
                scanTerminalBody.appendChild(line);
                scanTerminalBody.scrollTop = scanTerminalBody.scrollHeight;
                index++;
            } else {
                clearInterval(scanInterval);
            }
        }, 350);
    }
}

function closeScannerModal() {
    if (scannerModal) {
        scannerModal.classList.remove('active');
    }
    if (scanInterval) clearInterval(scanInterval);
}


// Handshake Endpoint Submission Simulator
const contactForm = document.getElementById('contact-form');
const commsLog = document.getElementById('comms-log');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('sender-name').value;
        const email = document.getElementById('sender-email').value;
        const msg = document.getElementById('msg-payload').value;
        
        const btn = document.getElementById('btn-submit-comms');
        btn.disabled = true;
        btn.innerText = "Transmitting...";
        
        let progress = 0;
        let progressInterval = setInterval(() => {
            progress += 25;
            commsLog.innerText = `SYSTEM_LOG: Encrypting packet payload... ${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                commsLog.innerHTML = `<span style="color: #00ff66;">SYSTEM_LOG: 100% Sent. Secure connection established!</span>`;
                
                // Reset form
                contactForm.reset();
                btn.disabled = false;
                btn.innerText = "Establish Handshake";
                
                // Restore state log after 4s
                setTimeout(() => {
                    commsLog.innerText = "SYSTEM_LOG: Ready for transmission...";
                }, 4000);
            }
        }, 500);
    });
}

// Nav Link Active State Highlighting on scroll
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 120;
    const sections = ['about', 'dashboard', 'projects', 'skills', 'journey', 'contact'];
    
    sections.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                const activeNav = document.getElementById(`nav-${secId}`);
                if (activeNav) activeNav.classList.add('active');
            }
        }
    });
});

// Skills Progress Animation on Scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.progress-fill');
            fills.forEach(fill => {
                const pct = fill.getAttribute('data-percent');
                fill.style.width = pct;
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.skills-card').forEach(card => {
    skillObserver.observe(card);
});