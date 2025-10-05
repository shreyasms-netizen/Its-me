// Internship Challenge Data
const internshipData = [
    {day: 1, focus: "VMware ESXi install + Windows VM + RDP", outcome: "Students create their first Windows VM, access via RDP.", icon: "💻"},
    {day: 2, focus: "Ubuntu latest VM + SSH remote from India→Paris", outcome: "Basic Linux provisioning + remote shell over WAN.", icon: "🐧"},
    {day: 3, focus: "ESXi Networking + Cisco IOS router", outcome: "Each student VM placed in unique subnet; NAT + reachability.", icon: "🌐"},
    {day: 4, focus: "pfSense firewall VM", outcome: "Setup WAN/LAN, static routes, and NAT for all student VMs.", icon: "🔥"},
    {day: 5, focus: "WireGuard VPN", outcome: "Secure tunnel between Paris DC and India clients.", icon: "🔒"},
    {day: 6, focus: "OpenVPN", outcome: "Site-to-site & client mode; compare with WireGuard.", icon: "🚇"},
    {day: 7, focus: "Tailscale Mesh VPN", outcome: "Zero-config mesh across all students; subnet routing.", icon: "🕸️"},
    {day: 8, focus: "FreeRADIUS + Captive Portal", outcome: "Authentication for local users through pfSense.", icon: "🎯"},
    {day: 9, focus: "DNS/DHCP Server", outcome: "Central DHCP scopes, custom internal DNS zones.", icon: "📡"},
    {day: 10, focus: "Migrate to Proxmox", outcome: "Import VMs, configure virtual bridge & VLAN-aware networking.", icon: "📦"},
    {day: 11, focus: "MikroTik RouterOS", outcome: "Create VLANs, NAT, static/dynamic routing; remote management.", icon: "📶"},
    {day: 12, focus: "OSPF with Cisco + MikroTik", outcome: "Dynamic routing in hybrid lab. Verify LSAs & routes.", icon: "🔄"},
    {day: 13, focus: "FRRouting (Linux Router)", outcome: "Replace Cisco with open-source router; redistribute routes.", icon: "🐧"},
    {day: 14, focus: "IDS/IPS – Suricata / Zeek", outcome: "Deploy network monitoring + traffic inspection.", icon: "👁️"},
    {day: 15, focus: "Zabbix / Grafana / Prometheus", outcome: "Centralized monitoring for ESXi, Proxmox, routers, VPNs.", icon: "📊"},
    {day: 16, focus: "Ansible Automation", outcome: "Automate VM config, IP setup, and user creation.", icon: "⚙️"},
    {day: 17, focus: "Docker Networking Basics", outcome: "Deploy small web app + reverse proxy to tie infra & dev.", icon: "🐳"},
    {day: 18, focus: "Proxmox Cluster + HA setup", outcome: "Multi-node cluster; migrate VM live between nodes.", icon: "🏗️"},
    {day: 19, focus: "Backups, Snapshots & Restore", outcome: "Run complete backup policy; disaster-recovery drill.", icon: "💾"},
    {day: 20, focus: "Final Integration Project", outcome: "One cohesive infra: Proxmox + pfSense + MikroTik + Cisco + VPN + Monitoring. Students present design diagrams + live demo.", icon: "🎓"}
];

// Project data
const projectsData = [
    {
        title: "Multi-Enterprise eBGP with OSPF/EIGRP Integration",
        description: "Designed and deployed multi-AS routing using eBGP for external connectivity and OSPF/EIGRP for internal domains. Configured redistribution policies with route-maps, metric control, and summarization for stable route exchange. This project demonstrates advanced understanding of inter-domain routing protocols and their integration in enterprise networks.",
        technologies: ["eBGP", "OSPF", "EIGRP", "Route-maps", "Redistribution", "Summarization"]
    },
    {
        title: "OSPF–EIGRP Multi-Area Redistribution and Summarization",
        description: "Built an integrated topology with OSPF multi-area design and bidirectional EIGRP redistribution. Applied ABR summarization, route filtering, and interface-level summarization to reduce routing overhead and enhance scalability. This project showcases expertise in complex routing scenarios and optimization techniques.",
        technologies: ["OSPF", "EIGRP", "Multi-Area", "ABR", "Route Filtering", "Summarization"]
    },
    {
        title: "Three-Tier Campus Switching and WAN Edge Design",
        description: "Designed access, distribution, and core layers using VLANs, SVIs, EtherChannel, and Rapid-PVST+. Configured OSPF in the core and dual ISP edge connectivity for redundancy and external reachability. This project demonstrates understanding of hierarchical network design principles and high availability implementation.",
        technologies: ["VLANs", "SVIs", "EtherChannel", "Rapid-PVST+", "OSPF", "Dual ISP"]
    },
    {
        title: "Academic Project: Prepaid Electricity Energy Meter",
        description: "Developed a prepaid energy meter system with GSM-based remote recharge functionality. Implemented automatic disconnection on low balance to manage electricity usage efficiently. Streamlined billing and meter-reading processes for improved operational efficiency. This project combines embedded systems knowledge with telecommunications for practical IoT implementation.",
        technologies: ["GSM", "Energy Meter", "Remote Recharge", "Automatic Control", "Billing System"]
    }
];

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const hireMeBtn = document.getElementById('hire-me-btn');
const contactModal = document.getElementById('contact-modal');
const contactModalClose = document.getElementById('contact-modal-close');
const contactForm = document.getElementById('contact-form');
const guidanceModal = document.getElementById('guidance-modal');
const guidanceModalClose = document.getElementById('guidance-modal-close');
const guidanceForm = document.getElementById('guidance-form');
const guidanceBtns = document.querySelectorAll('.guidance-btn');
const tabsNav = document.getElementById('tabs-nav');
const tabsContent = document.getElementById('tabs-content');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initInternshipTabs();
    initCareerProgression();
    initProjects();
    initModals();
    initContactForm();
    initGuidanceForm();
    initScrollEffects();
    initMobileMenu();
    initLoadingAnimations();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Initialize Internship Challenge Tabs
function initInternshipTabs() {
    // Generate tab buttons
    internshipData.forEach((day, index) => {
        const tabBtn = document.createElement('button');
        tabBtn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
        tabBtn.textContent = `Day ${day.day}`;
        tabBtn.setAttribute('data-tab', index);
        tabsNav.appendChild(tabBtn);
    });

    // Generate tab panels
    internshipData.forEach((day, index) => {
        const tabPanel = document.createElement('div');
        tabPanel.className = `tab-panel ${index === 0 ? 'active' : ''}`;
        tabPanel.setAttribute('data-panel', index);
        
        tabPanel.innerHTML = `
            <div class="tab-content">
                <div class="day-number">
                    ${day.day}
                </div>
                <div class="day-details">
                    <h3>
                        <span class="tech-icon">${day.icon}</span>
                        ${day.focus}
                    </h3>
                    <p><strong>Practical Outcome:</strong> ${day.outcome}</p>
                </div>
            </div>
        `;
        
        tabsContent.appendChild(tabPanel);
    });

    // Add click handlers to tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.querySelector(`[data-panel="${targetTab}"]`).classList.add('active');
        });
    });
}

// Career Progression functionality
function initCareerProgression() {
    const flowchartItems = document.querySelectorAll('.flowchart-item');
    
    flowchartItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
    
    // Animate progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.width = progressFill.style.width;
        }, 1000);
    }
}

// Project functionality
function initProjects() {
    projectCards.forEach((card, index) => {
        const detailsBtn = card.querySelector('.project-details-btn');
        detailsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showProjectModal(index);
        });

        // Also make the whole card clickable
        card.addEventListener('click', function() {
            showProjectModal(index);
        });
    });
}

function showProjectModal(projectIndex) {
    const project = projectsData[projectIndex];
    
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    // Clear existing tags
    modalTags.innerHTML = '';
    
    // Add technology tags
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = tech;
        modalTags.appendChild(tag);
    });
    
    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Modal functionality
function initModals() {
    // Project modal close
    modalClose.addEventListener('click', function() {
        hideProjectModal();
    });

    // Contact modal close
    contactModalClose.addEventListener('click', function() {
        hideContactModal();
    });

    // Guidance modal close
    guidanceModalClose.addEventListener('click', function() {
        hideGuidanceModal();
    });

    // Close modals when clicking outside
    [projectModal, contactModal, guidanceModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                if (modal === projectModal) {
                    hideProjectModal();
                } else if (modal === contactModal) {
                    hideContactModal();
                } else if (modal === guidanceModal) {
                    hideGuidanceModal();
                }
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideProjectModal();
            hideContactModal();
            hideGuidanceModal();
        }
    });

    // Hire Me button functionality
    hireMeBtn.addEventListener('click', function() {
        showContactModal();
    });

    // Guidance buttons functionality
    guidanceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const careerArea = this.getAttribute('data-career');
            showGuidanceModal(careerArea);
        });
    });
}

function hideProjectModal() {
    projectModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function hideContactModal() {
    contactModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function hideGuidanceModal() {
    guidanceModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function showContactModal() {
    contactModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function showGuidanceModal(careerArea) {
    // Pre-select the guidance area if provided
    if (careerArea) {
        const selectElement = document.getElementById('guidance-area');
        selectElement.value = careerArea;
    }
    
    guidanceModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Contact form functionality
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create email subject and body
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:shreyasms2108@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you for your message! Your email client will open to send the message.', 'success');
        
        // Reset form and close modal
        contactForm.reset();
        hideContactModal();
    });
}

// Guidance form functionality
function initGuidanceForm() {
    guidanceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(guidanceForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const area = formData.get('area');
        const message = formData.get('message');
        
        // Create email subject and body for guidance request
        const subject = encodeURIComponent(`Professional Guidance Request - ${area.charAt(0).toUpperCase() + area.slice(1)}`);
        const body = encodeURIComponent(`
Professional Guidance Request

From: ${name}
Email: ${email}
Area of Expertise: ${area.charAt(0).toUpperCase() + area.slice(1)}

Message:
${message}

---
This is a guidance request from Shreyas M S's portfolio website.
Please provide mentorship or career advice in the specified area.
        `);
        const mailtoLink = `mailto:shreyasms2108@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you for offering guidance! Your email client will open to send your expertise details.', 'success');
        
        // Reset form and close modal
        guidanceForm.reset();
        hideGuidanceModal();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        background: rgba(var(--color-surface), 0.95);
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        border: 1px solid var(--color-primary);
        border-radius: var(--radius-lg);
        box-shadow: 0 20px 40px rgba(var(--color-primary), 0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform var(--duration-normal) var(--ease-standard);
        padding: var(--space-20);
        color: var(--color-text);
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-12);
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: var(--font-size-lg);
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-base);
        transition: all var(--duration-fast) var(--ease-standard);
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(var(--color-primary), 0.1)';
        this.style.color = 'var(--color-text)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'none';
        this.style.color = 'var(--color-text-secondary)';
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto close after 6 seconds
    setTimeout(closeNotification, 6000);
}

// Scroll effects and animations
function initScrollEffects() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special animation for flowchart items
                if (entry.target.classList.contains('flowchart-item')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(-4px)';
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .training-item, .education-item, .flowchart-item, .contact-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(var(--color-slate-900-rgb), 0.98)';
            header.style.borderBottomColor = 'rgba(var(--color-teal-500-rgb), 0.2)';
        } else {
            header.style.background = 'rgba(var(--color-slate-900-rgb), 0.95)';
            header.style.borderBottomColor = 'rgba(var(--color-teal-500-rgb), 0.1)';
        }
    });
}

// Loading animations
function initLoadingAnimations() {
    // Animate skill tags on hover
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Animate buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn--primary')) {
                this.style.transform = 'translateY(-3px)';
                this.style.boxShadow = '0 12px 30px rgba(var(--color-primary), 0.5)';
            } else {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            if (this.classList.contains('btn--primary')) {
                this.style.boxShadow = '0 4px 15px rgba(var(--color-primary), 0.3)';
            }
        });
    });
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--color-primary)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--color-card-border)';
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}, 250));

// Add loading animation on page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Stagger animation of main sections
    const mainSections = document.querySelectorAll('section');
    mainSections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 150);
    });
    
    // Animate floating symbols
    const symbols = document.querySelectorAll('.symbol');
    symbols.forEach((symbol, index) => {
        setTimeout(() => {
            symbol.style.opacity = symbol.style.opacity || '0.15';
        }, index * 200);
    });
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Tab navigation for modals
    if (e.key === 'Tab') {
        const activeModal = document.querySelector('.modal:not(.hidden)');
        if (activeModal) {
            const focusableElements = activeModal.querySelectorAll(
                'a[href], button, textarea, input[type="text"], input[type="email"], select'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
    
    // Arrow key navigation for tabs
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            const allTabs = Array.from(document.querySelectorAll('.tab-btn'));
            const currentIndex = allTabs.indexOf(activeTab);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
            } else {
                nextIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            allTabs[nextIndex].click();
            allTabs[nextIndex].focus();
        }
    }
});

// Add ripple effect to primary buttons
document.addEventListener('DOMContentLoaded', function() {
    const createRipple = (event) => {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    };
    
    const primaryButtons = document.querySelectorAll('.btn--primary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Initialize progressive loading of content
document.addEventListener('DOMContentLoaded', function() {
    // Add initial styles for loading animation
    const style = document.createElement('style');
    style.textContent = `
        .loaded section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .notification--success {
            border-color: var(--color-success) !important;
        }
        
        .notification--error {
            border-color: var(--color-error) !important;
        }
        
        .notification--info {
            border-color: var(--color-info) !important;
        }
    `;
    document.head.appendChild(style);
});