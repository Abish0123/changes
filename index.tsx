
import React, { useState, useEffect, useRef, memo, createContext, useContext, MouseEventHandler } from 'react';
import { createRoot } from 'react-dom/client';

declare const gsap: any;

// --- DATA & CONFIG ---

const servicesSubLinks = [
  { name: 'Architectural Design', href: 'architectural-design.html', icon: 'fas fa-archway', description: 'Innovative and functional spaces from concept to construction.', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60' },
  { name: 'Engineering Consultancy', href: 'engineering-consultancy.html', icon: 'fas fa-cogs', description: 'Expert technical advice and solutions for robust project outcomes.', image: 'https://images.unsplash.com/photo-1518692113669-e34fa251a37c?w=800&auto=format&fit=crop&q=60' },
  { name: 'Project Management Consultancy', href: 'project-management.html', icon: 'fas fa-tasks', description: 'Overseeing projects from inception to completion on time and budget.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60' },
  { name: 'Sustainability & Energy', href: 'sustainability-energy.html', icon: 'fas fa-leaf', description: 'Integrating green principles for environmentally responsible designs.', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=60' },
];

const navLinks = [
  { name: 'Home', href: '/index.html' },
  { name: 'About Us', href: '/about.html' },
  { name: 'Works/Projects', href: '/works.html' },
  { name: 'Services', href: '/index.html#our-services', subLinks: servicesSubLinks },
  { name: 'Blog', href: '/index.html#blog' },
  { name: 'Careers', href: '/careers.html' },
  { name: 'Contact', href: '/contact.html' },
];

const servicePageData = {
    'architectural-design.html': {
        title: 'Architectural Design',
        image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop&q=60',
        alt: 'Architectural design sketch',
        content: [
            'From concept sketches to refined details, we craft cohesive spatial narratives where aesthetics, function, and flow work as one. Our Architectural Design division unites multiple studios into one collaborative team, covering every discipline – from urban planning, landscape architecture, and interiors to public/commercial developments, residential projects, industrial facilities, and even stadium and venue design. We leverage a holistic design process that blends creativity with practicality, ensuring spaces are not only visually striking but also highly functional and contextually appropriate.',
            'We excel in Building Information Modeling (BIM), delivering end-to-end BIM support (3D–5D) from concept through to handover. By using coordinated digital models, we detect and resolve clashes early in the design phase, improving buildability and reducing risk on complex projects. Our team’s integrated approach and attention to detail result in architectural solutions that are innovative, sustainable, and aligned with each client’s vision.',
        ],
        services: [
            'Building Architecture – Complete architectural design for commercial, residential, and institutional buildings.',
            'Landscape Architecture – Planning and design of outdoor spaces, gardens, and urban landscapes.',
            'Interiors – Interior architecture and space planning that enhance form and function.',
            'Site Selection, Evaluation & Analysis – Assessing and selecting optimal sites based on project requirements and feasibility.',
            'Infrastructure Architecture – Design of support facilities and integration with civil infrastructure.',
            'Industrial Architecture – Customized design for factories, warehouses, and industrial plants.',
            'Project Brief & Feasibility Studies – Defining project requirements, scope, and viability analyses.',
            'Preliminary Design & Concept Presentations – Early-phase design development with reports and client presentations.',
            'Detailed Design & Documentation – Comprehensive architectural drawings, specifications, and reports.',
            'Tender Documents & Analysis – Preparation of tender packages and assistance with bid evaluation.',
            'Presentation Drawings, 3D Walkthroughs & Animations – Visualizations and animations bringing designs to life for stakeholders.',
            'Architectural Scale Models – Physical and digital scale models for design review and client display.',
            'Building Information Modeling (up to 5D) – Advanced BIM modeling including 3D geometry, scheduling (4D), and cost estimation (5D).',
            'Urban Design & Masterplanning – Large-scale urban planning, cityscape design, and master plan development.',
            'Redevelopment & Refurbishment – Renovation design and adaptive reuse for existing buildings and heritage projects.',
            'Municipality Approvals – Navigating local authority regulations and obtaining necessary building permits and approvals.',
        ],
    },
    'engineering-consultancy.html': {
        title: 'Engineering Consultancy',
        image: 'https://images.unsplash.com/photo-1581092446337-234557050003?w=800&auto=format&fit=crop&q=60',
        alt: 'Engineers collaborating on a blueprint.',
        content: [
            'Our Engineering Consultancy division provides the technical backbone for visionary architecture. We deliver integrated, multidisciplinary engineering solutions that are innovative, efficient, and resilient. Our expert teams in structural, MEP, civil, and specialized engineering disciplines work collaboratively to solve complex challenges and ensure that every design is buildable, sustainable, and optimized for performance. We merge technical excellence with a deep understanding of our clients’ goals to deliver projects that stand the test of time.',
            'From initial feasibility studies to detailed design and construction support, we are committed to precision and quality. We leverage cutting-edge software and analysis tools to model and test our designs, ensuring they meet the highest standards of safety and efficiency. Our proactive approach to coordination and problem-solving helps streamline the construction process, minimize risks, and deliver exceptional value. We are dedicated to engineering excellence that supports architectural creativity and delivers lasting results.',
        ],
        services: [
            'Structural Engineering – Design of robust and efficient structural systems for buildings and infrastructure.',
            'MEP (Mechanical, Electrical & Plumbing) Engineering – Integrated design of building services for optimal performance and comfort.',
            'Civil Engineering – Site development, grading, drainage, and utility design.',
            'Geotechnical Engineering – Subsurface investigation and foundation design.',
            'Facade Engineering – Design and analysis of building envelopes for performance and aesthetics.',
            'Fire & Life Safety Consulting – Code compliance, fire protection system design, and evacuation planning.',
            'Acoustic Consulting – Design for optimal sound insulation, room acoustics, and noise control.',
            'Vertical Transportation – Elevator and escalator system design and analysis.',
            'Value Engineering – Optimizing project value by analyzing function and cost.',
            'Peer Review & Third-Party Verification – Independent review of engineering designs for quality and compliance.',
        ],
    },
    'project-management.html': {
        title: 'Project & Construction Management',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop&q=60',
        alt: 'Construction site with project managers reviewing plans.',
        content: [
            'We provide comprehensive leadership for projects of all sizes, ensuring your vision is realized on time, on budget, and to the highest quality standards. Our Project Management Consultancy (PMC) team serves as a trusted extension of our clients, managing every phase of a project from inception to handover. With a proven track record on some of Qatar’s most iconic developments, we specialize in navigating complex projects with precision and foresight. Our deep local experience gives us an unparalleled understanding of regional regulations and market dynamics, allowing us to proactively mitigate risks and drive project success.',
            'Our methodology is built on a foundation of clear communication, rigorous control, and proactive problem-solving. We implement robust systems for planning, cost management, and quality assurance, ensuring complete transparency for all stakeholders. By integrating seamlessly with design teams, contractors, and authorities, we foster a collaborative environment focused on shared goals. Whether managing a single project or a large-scale program, our commitment is to safeguard our clients\' interests and deliver outcomes that exceed expectations.',
        ],
        services: [
            'Project Management – Comprehensive project planning, execution, and closing services representing the client’s interests.',
            'Construction Management & Supervision – On-site construction supervision, contractor coordination, and quality control.',
            'Technical Review – Independent technical audits and constructability reviews of designs and plans.',
            'Cost Estimating & Management – Budget development, cost control, value engineering, and financial reporting throughout the project.',
            'Construction Claims Consulting – Claims analysis, mitigation strategies, and dispute resolution support during construction.',
            'Independent Contract Document Review – Thorough review of contracts, drawings, and specifications to ensure clarity and completeness.',
            'Bid Management & Tender Evaluation – Management of the bidding process, contractor pre-qualification, and tender analysis.',
            'Quality Assurance & Control (QA/QC) – Establishing and implementing QA/QC protocols to meet project standards.',
            'Commissioning & Handover Management – Managing the final stages of a project, including system testing, training, and final handover.',
        ],
    },
    'sustainability-energy.html': {
        title: 'Sustainability & Energy',
        image: 'https://images.unsplash.com/photo-1579225688258-af53a436a5e1?w=800&auto=format&fit=crop&q=60',
        alt: 'Sustainable energy solutions like solar panels on a modern building',
        content: [
            'Aligned with our clients’ objectives, we deliver projects safely and sustainably – meeting cost, schedule, and quality targets every time. Our Sustainability & Energy team provides end-to-end environmental consulting and energy management services for both public and private clients. We guide projects through Environmental Impact Assessments and regulatory approvals, embedding practical strategies for energy efficiency, resource conservation, and low-carbon design to achieve compliant and resilient outcomes. By clarifying environmental impacts and cutting energy consumption, we help clients meet green building standards and future-proof their investments.',
            'Our specialists develop tailored solutions in energy auditing, retrofitting, and sustainable design integration. We implement strategies like advanced commissioning, renewable energy integration, and smart building controls to maximize efficiency. These efforts regularly reduce building operating costs by over 50% without compromising comfort, safety, or compliance – delivering tangible savings alongside environmental benefits. With a finger on the pulse of global best practices and local regulations, Taj Consultancy’s sustainability experts ensure each project not only meets today’s goals but also contributes to a greener, more energy-efficient future.',
        ],
        services: [
            'Energy Audits & Savings Roadmaps',
            'Retro-Commissioning & Continuous Commissioning',
            'HVAC Optimization',
            'Building Management System (BMS) Optimization',
            'Lighting Redesign & Smart Controls',
            'Solar PV Feasibility & Design',
            'Water Efficiency Solutions',
            'Utility Tariff Optimization',
            'Measurement & Verification (M&V)',
            'Indoor Air Quality Improvements',
            'Waste Minimization & Circular Materials',
            'Carbon Accounting & Net-Zero Roadmaps',
            'Sustainability Reporting & Certification',
            'Environmental Impact Assessments (EIA/ESIA)',
            'Contractor Sustainability Compliance',
            'Training & Change Management',
        ],
    },
};

const blogPageData = {
    '/blog-bim-ai.html': {
        title: 'The Future of BIM: AI and Generative Design',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&auto=format&fit=crop&q=60',
        alt: 'Abstract visualization of AI and design',
        category: 'Technology',
        date: 'August 15, 2024',
        content: [
            'Building Information Modeling (BIM) has fundamentally transformed the architecture, engineering, and construction (AEC) industry over the past two decades. By creating intelligent 3D models, BIM allows for better collaboration, improved clash detection, and more efficient project delivery. However, we are on the cusp of another revolution, one powered by Artificial Intelligence (AI) and Generative Design.',
            'AI is moving beyond simple automation and into the realm of creative partnership. In the context of architecture, AI algorithms can analyze vast datasets—from building performance metrics to local climate data and zoning regulations—to inform and optimize the design process. This isn\'t about replacing the architect but augmenting their capabilities, freeing them from repetitive tasks to focus on higher-level creative and strategic thinking.',
            'This is where Generative Design comes in. It\'s a design exploration process where designers input their goals and constraints (e.g., spatial requirements, material costs, energy performance, structural loads) into an AI system. The system then explores the entire solution space, rapidly generating thousands of potential design options. It learns from each iteration, refining the results to produce high-performing and often unexpected solutions that a human designer might never have conceived.',
            'The benefits are profound. Generative design can lead to structures that are not only more aesthetically innovative but also lighter, stronger, and more sustainable. By optimizing for material usage, it can significantly reduce construction costs and environmental impact. The ability to simulate performance at an early stage allows for the creation of buildings that are more energy-efficient and comfortable for their occupants.',
            'While the technology is still evolving, its potential is undeniable. From creating complex, lightweight lattice structures for building facades to optimizing the layout of an entire hospital floor for patient flow and staff efficiency, AI-driven design is set to tackle some of the most complex challenges in the built environment. As computational power grows and algorithms become more sophisticated, the collaboration between human creativity and machine intelligence will define the future of architecture.',
        ],
    },
    '/blog-sustainable-materials.html': {
        title: 'Sustainable Materials in Modern Construction',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&auto=format&fit=crop&q=60',
        alt: 'A modern wooden building showcasing sustainable materials',
        category: 'Architecture',
        date: 'August 10, 2024',
        content: [
            'As global awareness of climate change and resource depletion grows, the construction industry is under increasing pressure to adopt more sustainable practices. Buildings are responsible for a significant portion of global energy consumption and carbon emissions, making the choice of materials more critical than ever. The shift towards sustainable materials is not just an ethical choice; it\'s becoming an economic and regulatory necessity.',
            'At the forefront of this movement is mass timber, particularly Cross-Laminated Timber (CLT). CLT panels are made by gluing layers of solid-sawn lumber together at right angles, creating a product that is exceptionally strong, lightweight, and dimensionally stable. It can replace concrete and steel in many applications, significantly reducing the carbon footprint of a building. As a renewable resource, timber sequesters carbon throughout its life, making it a key player in the fight against climate change.',
            'Beyond timber, a host of innovative materials are gaining traction. Bamboo, a rapidly renewable grass, offers incredible tensile strength. Recycled steel reduces the energy-intensive process of virgin steel production. Hempcrete, a mixture of hemp fibers and lime, is a carbon-negative insulation material. Even more futuristic materials like mycelium (the root structure of fungi) are being explored to grow bricks and insulation with minimal environmental impact.',
            'Choosing the right material involves more than just its origin. A Life Cycle Assessment (LCA) is a crucial tool that evaluates the environmental impact of a material from cradle to grave—from raw material extraction through manufacturing, use, and eventual disposal or recycling. This holistic view ensures that we make informed decisions that genuinely reduce a project\'s overall environmental footprint.',
            'At Taj Design Consult, we are deeply committed to integrating sustainable materials and practices into our projects. We believe that thoughtful material selection is fundamental to creating resilient, healthy, and environmentally responsible buildings that will stand the test of time and contribute positively to our planet\'s future.',
        ],
    },
    '/blog-minimalism-light.html': {
        title: 'Minimalism and Light: Crafting Serene Spaces',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop&q=60',
        alt: 'A minimalist interior with abundant natural light',
        category: 'Interior Design',
        date: 'August 05, 2024',
        content: [
            'In a world of constant noise and clutter, the principles of minimalist design offer a powerful antidote. Rooted in the "less is more" philosophy, interior design is about stripping away the non-essential to create spaces that are calm, intentional, and deeply restorative. It’s not about emptiness, but about making room for what truly matters.',
            'Natural light is arguably the most important element in a minimalist interior. It breathes life into a space, making it feel larger, cleaner, and more open. The design should work to maximize daylight at every turn. This can be achieved through large, unadorned windows, translucent materials, and strategically placed mirrors. Sheer, simple window treatments are preferred over heavy draperies to allow light to filter through gently.',
            'The color palette in minimalist design is typically subdued, relying on a foundation of neutrals like white, beige, and grey. This doesn\'t mean the space has to be boring. Interest and warmth are introduced through texture—the rough weave of a linen sofa, the smooth grain of a light wood floor, the soft pile of a wool rug. These tactile elements prevent the space from feeling cold or sterile.',
            'Every piece of furniture and decor in a minimalist space must earn its place. The focus is on quality over quantity. Each item is chosen for its form, function, and beauty. Clean lines, simple geometries, and high-quality craftsmanship are hallmarks of minimalist furniture. Clutter is eliminated through clever, integrated storage solutions that keep surfaces clear and the mind at ease.',
            'The result of this intentional approach is more than just an aesthetic; it\'s a feeling. Minimalist spaces have been shown to reduce stress, improve focus, and promote a sense of well-being. By creating an environment free from overwhelming visual stimuli, we create a sanctuary where we can truly relax, recharge, and connect with ourselves.',
        ],
    },
};

const careerOpenings = [
    {
      title: 'Senior Architect',
      description: 'Lead design projects from concept to completion. Must have 8+ years of experience in large-scale commercial and residential projects.',
    },
    {
      title: 'BIM Specialist',
      description: 'Develop and manage BIM models, ensuring clash detection and coordination across disciplines. Proficiency in Revit is essential.',
    },
    {
      title: 'Lead Interior Designer',
      description: 'Create innovative and functional interior spaces for high-end hospitality and corporate clients. Strong portfolio required.',
    },
];

// --- SHARED & LAYOUT COMPONENTS ---

const SkipToContentLink = () => (
    <a href="#main-content" className="skip-to-content-link">
        Skip to main content
    </a>
);

const CustomCursor = memo(() => {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const dot = dotRef.current;
        const outline = outlineRef.current;
        if (!dot || !outline) return;

        gsap.set([dot, outline], { xPercent: -50, yPercent: -50 });

        const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
        const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
        const outlineX = gsap.quickTo(outline, "x", { duration: 0.3, ease: "power3" });
        const outlineY = gsap.quickTo(outline, "y", { duration: 0.3, ease: "power3" });

        const mouseMove = (e: MouseEvent) => {
            dotX(e.clientX);
            dotY(e.clientY);
            outlineX(e.clientX);
            outlineY(e.clientY);
        };
        
        const showCursor = () => {
            dot.classList.add('visible');
            outline.classList.add('visible');
        };
        const hideCursor = () => {
            dot.classList.remove('visible');
            outline.classList.remove('visible');
        };
        
        const handleMouseEnterHoverTarget = () => {
            dot.classList.add('cursor-hover');
            outline.classList.add('cursor-hover');
        };

        const handleMouseLeaveHoverTarget = () => {
            dot.classList.remove('cursor-hover');
            outline.classList.remove('cursor-hover');
        };
        
        window.addEventListener("mousemove", mouseMove);
        document.body.addEventListener("mouseleave", hideCursor);
        document.body.addEventListener("mouseenter", showCursor);

        const hoverTargets = document.querySelectorAll(
            'a, button, [role="button"], .about-image, .process-item, .service-item, .sector-item, .work-image, .blog-item, .carousel-btn, .dot, .client-logo, .whatsapp-widget, .lightbox-close'
        );
        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', handleMouseEnterHoverTarget);
            target.addEventListener('mouseleave', handleMouseLeaveHoverTarget);
        });

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            document.body.removeEventListener("mouseleave", hideCursor);
            document.body.removeEventListener("mouseenter", showCursor);
            hoverTargets.forEach(target => {
                target.removeEventListener('mouseenter', handleMouseEnterHoverTarget);
                target.removeEventListener('mouseleave', handleMouseLeaveHoverTarget);
            });
        };
    }, []);

    return (
        <>
            <div ref={outlineRef} className="custom-cursor-outline"></div>
            <div ref={dotRef} className="custom-cursor-dot"></div>
        </>
    );
});

const WhatsAppChatWidget = () => (
    <a
        href="https://wa.me/97477123400"
        className="whatsapp-widget"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
    >
        <div className="whatsapp-ring"></div>
        <div className="whatsapp-ring-delay"></div>
        <i className="fab fa-whatsapp whatsapp-icon" aria-hidden="true"></i>
    </a>
);

const Lightbox = ({ image, onClose }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const lastFocusedElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (image) {
            lastFocusedElement.current = document.activeElement as HTMLElement;
            setTimeout(() => {
                contentRef.current?.focus();
            }, 100);

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
                else if (e.key === 'Tab') {
                    // Trap focus
                    const focusableElements = contentRef.current?.querySelectorAll<HTMLElement>('button');
                    if (!focusableElements || focusableElements.length === 0) return;
                    
                    if (document.activeElement === focusableElements[0]) {
                        focusableElements[0].focus();
                        e.preventDefault();
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
                lastFocusedElement.current?.focus();
            };
        }
    }, [image, onClose]);

    if (!image) return null;

    return (
        <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${image.title} - Project image viewer`}>
            <div ref={contentRef} className="lightbox-content" onClick={(e) => e.stopPropagation()} tabIndex={-1}>
                <img src={image.src} alt={image.title} className="lightbox-image" />
                <button onClick={onClose} className="lightbox-close" aria-label="Close image viewer">&times;</button>
            </div>
        </div>
    );
};

const LeftSidebar = () => {
  return (
    <aside className="left-sidebar">
      <div className="sidebar-top">
        <div className="divider" />
        <div className="home-text">HOME</div>
      </div>
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f" aria-hidden="true"></i></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" aria-hidden="true"></i></a>
      </div>
      <div className="sidebar-footer">
        <p>© Taj Design Consult 2024. All rights reserved.</p>
      </div>
    </aside>
  );
};

const AppContext = createContext<{ onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void }>({
    onLinkClick: () => {},
});

const MobileNav = ({ isOpen, onClose, onLinkClick }) => {
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const navContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const focusableElements = navContainerRef.current?.querySelectorAll<HTMLElement>(
                'a[href], button, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusableElements || focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            setTimeout(() => firstElement.focus(), 100);

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                    return;
                }
                if (e.key === 'Tab') {
                    if (e.shiftKey) { // shift + tab
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                        }
                    } else { // tab
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                }
            };
            
            const container = navContainerRef.current;
            container?.addEventListener('keydown', handleKeyDown);
            return () => container?.removeEventListener('keydown', handleKeyDown);

        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen, onClose]);

    const handleServicesToggle = () => {
        setIsServicesOpen(prev => !prev);
    }
    
    return (
        <div ref={navContainerRef} className={`mobile-nav-overlay ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!isOpen} id="mobile-nav">
            <button className="mobile-nav-close" onClick={onClose} aria-label="Close navigation menu">
                <i className="fas fa-times" aria-hidden="true"></i>
            </button>
            <nav className="mobile-nav">
                <ul>
                    {navLinks.map(link => (
                         <li key={link.name}>
                             <a 
                                href={link.href} 
                                onClick={(e) => {
                                    if (link.subLinks) {
                                        handleServicesToggle();
                                        e.preventDefault();
                                    } else {
                                        onLinkClick(e, link.href);
                                        onClose();
                                    }
                                }}
                                aria-haspopup={!!link.subLinks}
                                aria-expanded={link.subLinks ? isServicesOpen : undefined}
                                aria-controls={link.subLinks ? `mobile-${link.name}-submenu` : undefined}
                                id={link.subLinks ? `mobile-${link.name}-toggle` : undefined}
                             >
                                 {link.name}
                                 {link.subLinks && <i className={`fas fa-chevron-down dropdown-indicator ${isServicesOpen ? 'open' : ''}`} aria-hidden="true"></i>}
                             </a>
                             {link.subLinks && (
                                 <ul id={`mobile-${link.name}-submenu`} className={`mobile-submenu ${isServicesOpen ? 'open' : ''}`} aria-hidden={!isServicesOpen}>
                                     {link.subLinks.map(subLink => (
                                         <li key={subLink.name}><a href={subLink.href}>{subLink.name}</a></li>
                                     ))}
                                 </ul>
                             )}
                         </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

const Header = ({ onLinkClick, theme }) => {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  
  const burgerMenuRef = useRef<HTMLButtonElement>(null);
  const servicesToggleRef = useRef<HTMLAnchorElement>(null);
  const servicesDropdownContainerRef = useRef<HTMLLIElement>(null);

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
    burgerMenuRef.current?.focus();
  };

  const closeServicesDropdown = (shouldFocusToggle = true) => {
    if (isServicesDropdownOpen) {
      setIsServicesDropdownOpen(false);
      if (shouldFocusToggle) {
        servicesToggleRef.current?.focus();
      }
    }
  };

  useEffect(() => {
    if (isServicesDropdownOpen) {
      const firstItem = servicesDropdownContainerRef.current?.querySelector<HTMLAnchorElement>('.dropdown-link-item');
      firstItem?.focus();
    }
  }, [isServicesDropdownOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeServicesDropdown();
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownContainerRef.current && !servicesDropdownContainerRef.current.contains(event.target as Node)) {
        closeServicesDropdown(false);
      }
    };

    if (isServicesDropdownOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animate nav links in
    const timer = setTimeout(() => {
      navRef.current?.classList.add('animate-in');
    }, 300);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleServicesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsServicesDropdownOpen(prev => !prev);
  };

  const handleDropdownItemKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    const items = Array.from(
      servicesDropdownContainerRef.current?.querySelectorAll<HTMLAnchorElement>('.dropdown-link-item') || []
    );
    const currentIndex = items.indexOf(e.currentTarget);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    } else if (e.key === 'Tab' && !e.shiftKey && currentIndex === items.length - 1) {
      closeServicesDropdown(false); // Last item, tabbing forward should close
    } else if (e.key === 'Tab' && e.shiftKey && currentIndex === 0) {
      closeServicesDropdown(false); // First item, tabbing backward should close
    }
  };

  const headerClasses = `app-header ${scrolled ? 'scrolled' : ''} on-${theme}`;

  return (
    <header className={headerClasses}>
      <div className="logo">
        <a href="/index.html">
          <img src="https://res.cloudinary.com/dj3vhocuf/image/upload/v1760896759/Blue_Bold_Office_Idea_Logo_250_x_80_px_7_uatyqd.png" alt="Taj Design Consult Logo" className="logo-image desktop-logo" />
          <img src="https://res.cloudinary.com/dj3vhocuf/image/upload/v1721596541/Blue_Bold_Office_Idea_Logo_80_x_80_px_x80h8r.png" alt="Taj Design Consult Logo" className="logo-image mobile-logo" />
        </a>
      </div>
      <nav className="main-nav" aria-label="Main navigation">
        <ul ref={navRef}>
          {navLinks.map((link) => (
             <li 
              key={link.name} 
              className={`${link.subLinks ? 'has-dropdown' : ''} ${link.name === 'Services' && isServicesDropdownOpen ? 'open' : ''}`}
              ref={link.name === 'Services' ? servicesDropdownContainerRef : null}
            >
              <a 
                ref={link.name === 'Services' ? servicesToggleRef : null}
                href={link.href} 
                onClick={(e) => {
                  onLinkClick(e, link.href);
                  if (link.name === 'Services') handleServicesClick(e);
                }}
                id={link.name === 'Services' ? 'services-menu-toggle' : undefined}
                aria-haspopup={!!link.subLinks}
                aria-expanded={link.name === 'Services' ? isServicesDropdownOpen : undefined}
                aria-controls={link.name === 'Services' ? 'services-dropdown-menu' : undefined}
              >
                {link.name}
                {link.subLinks && (
                  <span className="dropdown-indicator-wrapper">
                    <i className="fas fa-chevron-down dropdown-indicator" aria-hidden="true"></i>
                  </span>
                )}
              </a>
              {link.subLinks && (
                <div id="services-dropdown-menu" className="dropdown-menu" role="menu" aria-labelledby="services-menu-toggle">
                  <ul className="dropdown-links" role="none">
                      {link.subLinks.map((subLink, index) => (
                          <li role="presentation" key={subLink.name}>
                              <a
                                  href={subLink.href}
                                  role="menuitem"
                                  onKeyDown={handleDropdownItemKeyDown}
                                  className="dropdown-link-item"
                                  onClick={() => setIsServicesDropdownOpen(false)}
                                  style={{ '--delay': `${index * 0.05}s` } as React.CSSProperties}
                              >
                                  <i className={`${subLink.icon} dropdown-link-icon`} aria-hidden="true"></i>
                                  <span>{subLink.name}</span>
                              </a>
                          </li>
                      ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button 
        ref={burgerMenuRef}
        className="burger-menu" 
        onClick={() => setIsMobileNavOpen(true)}
        aria-label="Open navigation menu"
        aria-controls="mobile-nav"
        aria-expanded={isMobileNavOpen}
      >
        <i className="fas fa-bars" aria-hidden="true"></i>
      </button>
      <MobileNav isOpen={isMobileNavOpen} onClose={closeMobileNav} onLinkClick={onLinkClick} />
    </header>
  );
};
const HeroSection = ({ onLinkClick }) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const blueprintRef = useRef<SVGSVGElement>(null);
    const heroContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const titleEl = titleRef.current;
        if (!titleEl) return;
        const text = titleEl.textContent || '';
        titleEl.innerHTML = ''; // Clear existing content

        const lines = text.split('|').map(line => line.trim());
        lines.forEach((line, lineIndex) => {
            const lineDiv = document.createElement('span');
            lineDiv.className = 'hero-title-line';
            line.split('').forEach(char => {
                const charSpan = document.createElement('span');
                charSpan.className = 'letter';
                charSpan.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
                lineDiv.appendChild(charSpan);
            });
            titleEl.appendChild(lineDiv);
            if (lineIndex < lines.length - 1) {
                titleEl.appendChild(document.createElement('br'));
            }
        });

        gsap.from(titleEl.querySelectorAll('.letter'), {
            y: 100,
            opacity: 0,
            stagger: 0.03,
            duration: 1.2,
            ease: 'power4.out',
            delay: 0.5
        });

        // Blueprint animation
        const paths = blueprintRef.current?.querySelectorAll<SVGPathElement>('.blueprint-path');
        if (paths) {
            paths.forEach(path => {
                const length = path.getTotalLength();
                path.style.strokeDasharray = `${length}`;
                path.style.strokeDashoffset = `${length}`;
            });
            gsap.to(paths, {
                strokeDashoffset: 0,
                duration: 4,
                ease: 'power1.inOut',
                stagger: 0.2,
                delay: 1.5
            });
        }
        
    }, []);

    // Parallax effect for hero content
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;
        
        const heroContent = heroContentRef.current;
        if (!heroContent) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX - window.innerWidth / 2) / window.innerWidth;
            const y = (clientY - window.innerHeight / 2) / window.innerHeight;

            gsap.to(heroContent, {
                rotateY: x * 10,
                rotateX: -y * 10,
                transformPerspective: 1200,
                duration: 0.5,
                ease: 'power3.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero-section" id="hero">
             <video autoPlay loop muted playsInline className="hero-video" poster="https://res.cloudinary.com/dj3vhocuf/image/upload/v1716301389/pexels-tima-miroshnichenko-6612340_2160p_r6tq7s.jpg">
                <source src="https://res.cloudinary.com/dj3vhocuf/video/upload/v1716300977/pexels-tima-miroshnichenko-6612340_2160p_c4k24r.mp4" type="video/mp4" />
            </video>
            <div className="hero-content" ref={heroContentRef}>
                <h1 ref={titleRef} className="reveal-text">Evidence-led Design | & Technical Precision</h1>
                <a href="#about" onClick={(e) => onLinkClick(e, '#about')} className="explore-btn">Explore Our Vision</a>
            </div>
            <a href="#about" onClick={(e) => onLinkClick(e, '#about')} className="scroll-down-indicator" aria-label="Scroll down to about section">
                <i className="fas fa-chevron-down"></i>
            </a>
        </section>
    );
};
const WaveAnimation = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationFrameId: number;

        const waves = [
            { amp: 15, freq: 0.02, phase: 0, color: 'rgba(212, 175, 55, 0.2)', speed: 0.01 },
            { amp: 20, freq: 0.015, phase: 1, color: 'rgba(212, 175, 55, 0.3)', speed: 0.015 },
            { amp: 25, freq: 0.01, phase: 2, color: 'rgba(212, 175, 55, 0.4)', speed: 0.02 },
        ];
        
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const draw = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            waves.forEach(wave => {
                wave.phase += wave.speed;
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);
                for (let x = 0; x < canvas.width; x++) {
                    const y = Math.sin(x * wave.freq + wave.phase) * wave.amp + (canvas.height / 1.5);
                    ctx.lineTo(x, y);
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.closePath();
                ctx.fillStyle = wave.color;
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(draw);
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        draw();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} id="footer-wave-canvas" aria-hidden="true" />;
});
const Footer = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const successMessageRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => { if (isSubmitted) successMessageRef.current?.focus(); }, [isSubmitted]);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        if (!name.trim() || !email.trim() || !message.trim()) {
            alert('Please fill in all fields before sending.');
            return;
        }

        setIsSubmitted(true);
    };
    
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer id="footer" className="app-footer">
            <WaveAnimation />
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-item footer-logo">
                        <h4>Taj Design Consult</h4>
                        <p>A premier multidisciplinary consultancy creating spaces that are aesthetically compelling, functionally robust, and environmentally responsible.</p>
                         <div className="footer-contact-info">
                            <p><i className="fas fa-map-marker-alt" aria-hidden="true"></i> Al Jazeera Tower, Doha, Qatar</p>
                            <p><i className="fas fa-phone" aria-hidden="true"></i> <a href="tel:+97477123400">+974 7712 3400</a></p>
                            <p><i className="fas fa-envelope" aria-hidden="true"></i> <a href="mailto:info@tajdc.com">info@tajdc.com</a></p>
                        </div>
                    </div>
                    <div className="footer-item">
                        <h4>Quick Contact</h4>
                         <div className="contact-form-container">
                            <form className={`contact-form ${isSubmitted ? 'submitted' : ''}`} onSubmit={handleFormSubmit} aria-hidden={isSubmitted}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="footer-name">Name</label>
                                        <input type="text" id="footer-name" name="name" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="footer-email">Email</label>
                                        <input type="email" id="footer-email" name="email" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="footer-message">Message</label>
                                    <textarea id="footer-message" name="message" required></textarea>
                                </div>
                                <button type="submit" className="submit-btn">Send Message</button>
                            </form>
                            <div className={`success-message ${isSubmitted ? 'visible' : ''}`} aria-hidden={!isSubmitted} aria-live="polite">
                                <i className="fas fa-check-circle" aria-hidden="true"></i>
                                <h3 ref={successMessageRef} tabIndex={-1}>Thank You!</h3>
                                <p>Your message has been sent successfully.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyright-section">
                    <span>2024 © Taj Design Consult. All rights reserved.</span>
                    <button className="to-top" onClick={scrollToTop} aria-label="Scroll back to top">To Top ↑</button>
                </div>
            </div>
          </footer>
    )
}
const App = () => {
    const [loading, setLoading] = useState(true);
    const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        document.body.style.backgroundColor = '#111';
        const timer = setTimeout(() => setLoading(false), 800);
        return () => {
            document.body.style.backgroundColor = '';
            clearTimeout(timer);
        };
    }, []);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const isInternalLink = href.startsWith('#');
        if (isInternalLink) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    };
    
    useEffect(() => {
        const sections = document.querySelectorAll<HTMLElement>('.content-section, .hero-section');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);
    
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.querySelectorAll('.scroll-trigger').forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
          }
        );

        const elementsToReveal = document.querySelectorAll('.scroll-trigger');
        elementsToReveal.forEach((el) => {
            observer.observe(el);
        });

        return () => {
            elementsToReveal.forEach((el) => {
                observer.unobserve(el);
            });
        };
    }, []);

    const isLightSection = ['about', 'our-services', 'sectors', 'blog'].includes(activeSection);
    const headerTheme = isLightSection ? 'light' : 'dark';

    return (
        <div className={`app ${loading ? 'loading' : ''}`}>
            <SkipToContentLink />
            <CustomCursor />
            <WhatsAppChatWidget />
            <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
            <AppContext.Provider value={{ onLinkClick: handleLinkClick }}>
                <Header onLinkClick={handleLinkClick} theme={headerTheme} />
                <div className="main-container">
                    <LeftSidebar />
                    <main className="main-content" id="main-content" tabIndex={-1}>
                        <HeroSection onLinkClick={handleLinkClick} />
                        <Footer />
                    </main>
                </div>
            </AppContext.Provider>
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
