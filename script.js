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
  <span class="highlight">recon</span>      - Inspects RaccoonRecon orchestrator details
  <span class="highlight">aegis</span>      - Inspects Aegis Active Defense Proxy details
  <span class="highlight">certs</span>      - Outputs certifications log
  <span class="highlight">contact</span>    - Prints communication endpoints
  <span class="highlight">matrix</span>     - Run console decryption matrix streams
  <span class="highlight">clear</span>      - Wipes buffer history`,
    
    about: `System Profile: Adarsh Singh
Role: Aspiring Cybersecurity Professional
Status: TOP 5% Ranked on TryHackMe
Bio: Hands-on experience in web application security testing and OWASP Top 10 vulnerabilities through practical security labs and projects. Strong foundations in reconnaissance and vulnerability analysis.`,
    
    skills: `Dumping Capability Matrices:
  - Cybersecurity: Web App Security Testing, OWASP Top 10, Auth & Access Control, Input Validation & Injection Testing, API Security
  - Networking: TCP/IP & OSI Models, HTTP/HTTPS, DNS, ARP, DHCP, Subnetting, Firewalls, Packet Analysis
  - Security Tools: Burp Suite, Nmap, Wireshark, Metasploitable, Hashcat, Netcat
  - Programming: Python, JavaScript, Java`,
    
    projects: `Repository Archives:
  - [VulnSage]: Code vulnerability analyzer to identify insecure coding patterns with extension-based implementation
  - [RaccoonRecon]: High-performance recon orchestrator coordinating an optimized 9-stage parallel funnel of 18+ tools
  - [Aegis]: Go-based Active Defense Reverse Proxy featuring JA3/JA4 TLS fingerprinting, browser spoofing detection, deception tarpits, and SSE live alerts dashboard`,
    
    recon: `System Core: RaccoonRecon Orchestrator
Type: High-performance parallel reconnaissance pipeline
Core Capabilities:
  - Hybrid Execution Engine (optimized 9-stage funnel)
  - Intelligent WAF Detection (throttles scan speeds dynamically)
  - Infrastructure Discovery (Masscan + Nmap fingerprinting)
  - Secret Validation (searches JS files and validates APIs against GitHub/Slack)
  - Dataset Normalization (uses Uro/Anew for noise reduction)
  - Interactive Console (real-time progress metrics dashboard)`,
    
    aegis: `System Core: Aegis Active Defense Proxy
Type: Go-based reverse proxy & Deception WAF
Core Capabilities:
  - TLS Handshake Fingerprinting (computes raw JA3 MD5 & JA4 signatures)
  - Browser Spoofing Heuristics (flags bots faking standard browser UAs)
  - Deception Engine (dynamic crawl traps, fake SQL dumps, honeypot forms)
  - TCP Tarpit (throttles connections to 1 byte/3s to exhaust scanner resources)
  - Live Telemetry Dashboard (SSE-based dark-mode admin console)`,
    
    certs: `Credentials Database:
  - ISC2: Certified in Cybersecurity (CC) - Expected July 2026
  - TryHackMe: Certified in SEC1 - Expected August 2026
  - Cisco: Networking Essentials / Introduction to Cybersecurity - Completed
  - AWS: Certified Cloud Practitioner`,
    
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
            } else if (inputVal === 'raccoonrecon') {
                responseLine.innerHTML = commands.recon.replace(/\n/g, '<br>');
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

const raccoonReconLogs = [
    "[INFO] Initializing RaccoonRecon 9-Stage Orchestration Pipeline...",
    "[STATUS] Target Scope: target-node-01.com | Speed Profile: Balanced (WAF-aware)",
    "[STAGE 1] Launching passive subdomain discovery (Subfinder, Gau, Waybackurls)...",
    "[INFO] Harvested 47 subdomain candidates from passive sources.",
    "[STAGE 2] Checking active infrastructure (Masscan / Nmap fingerprints)...",
    "[WARN] WAF DETECTED: Cloudflare active. Throttling scan concurrency...",
    "[STAGE 3] Initiating web probing & JS file extraction (Httpx, SubJS)...",
    "[INFO] Discovered open port: 443/tcp (HTTPS - Nginx 1.25.1)",
    "[STAGE 4] Harvesting credentials & active API secret verification...",
    "[WARN] SECRET VERIFIED: Exposed Slack Webhook found in main.js line 48",
    "[STAGE 5] Deep crawling & directories fuzzer (Katana, Ffuf, Nuclei)...",
    "[WARN] VULNERABILITY FOUND: Path Traversal (CVE-2023-XXXX) on /api/download",
    "[INFO] Normalizing datasets and removing duplicates (Uro, Anew)...",
    "[RESULTS] Recon pipeline complete. 1 active vulnerability & 1 exposed secret identified."
];

const aegisLogs = [
    "[INFO] Starting Aegis Active Defense Proxy Engine...",
    "[STATUS] Binding TCP socket listener to port 443 (HTTPS)...",
    "[STATUS] Secure reverse proxy loaded. Handshake sniffing active.",
    "[RUN] Incoming client connection: socket 192.168.1.187:51224",
    "[STATUS] Sniffing ClientHello record parameters...",
    "[INFO] Raw TLS JA3 Fingerprint: 771,4865-4866-4867,11-10-35,23-24,,",
    "[INFO] Calculated JA4 Signature: t13d1516h2_8c548a3e9c2a_792d4f23b81a",
    "[WARN] SPOOFING DETECTED: Client user-agent claims Chrome, but JA4 fingerprint indicates automated Go/Python scanner!",
    "[RUN] Deploying Deception countermeasures...",
    "[WARN] HEURISTICS ALERT: Triggered crawl trap link (dynamic seed injection)",
    "[STATUS] Activating socket-level tarpit block on 192.168.1.187...",
    "[WARN] Socket write rate-throttled: 1 byte per 3 seconds. Bot pool stalling...",
    "[INFO] Dispatching alert JSON packet to SSE telemetry dashboard...",
    "[RESULTS] Active defense successful. Target connection neutralized."
];

let scanInterval = null;

function launchSecurityScan(projectType) {
    if (scannerModal) {
        scannerModal.classList.add('active');
        scanTerminalBody.innerHTML = '';
        
        let logs;
        let title;
        if (projectType === 'vulnsage') {
            logs = vulnSageLogs;
            title = "VULNSAGE STATIC SCAN";
        } else if (projectType === 'aegis') {
            logs = aegisLogs;
            title = "AEGIS ACTIVE DEFENSE SHIELD";
        } else if (projectType === 'raccoonrecon') {
            logs = raccoonReconLogs;
            title = "RACCOONRECON ORCHESTRATION PIPELINE";
        } else {
            logs = [];
            title = "UNKNOWN SCAN";
        }
        
        scanModalTitle.innerText = title;
        
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