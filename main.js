const scrollButtons = document.querySelectorAll("[data-scroll]");
const revealElements = document.querySelectorAll("[data-reveal]");
const progressBar = document.querySelector(".scroll-progress span");
const langButtons = document.querySelectorAll(".lang-switch [data-lang]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const galleryButtons = document.querySelectorAll("[data-gallery]");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
const lightboxCloseButtons = document.querySelectorAll("[data-lightbox-close]");

const galleries = {
  hcmc: [
    {
      src: "media/HCMC_IFC_1.jpg",
      caption: "Ho Chi Minh IFC has an area of 793ha in the center of Ho Chi Minh",
    },
    {
      src: "media/HCMC_IFC_2.jpg",
      caption: "Ho Chi Minh IFC has an area of 793ha in the center of Ho Chi Minh",
    },
  ],
  danang: [
    {
      src: "media/DN_IFC_1A.jpeg",
      caption: "5 buildings in An Thuong area, spanning 6.17ha",
    },
    {
      src: "media/DN_IFC_1B.jpg",
      caption: "5 buildings in An Thuong area, spanning 6.17ha",
    },
    {
      src: "media/DN_IFC_2A.jpeg",
      caption: "An Hai ward: software park 2, corner of Nhu Nguyet - Xuan Dieu and 9.7ha located to the west of Thuan Phuoc Bridge",
    },
    {
      src: "media/DN_IFC_2B.jpg",
      caption: "Software Park 2 buildings, IFC",
    },
    {
      src: "media/DN_IFC_3.jpg",
      caption: "Approximately 282 hectares located within the area planned for sea reclamation along Nguyen Tat Thanh Street",
    },
  ],
};

let activeGallery = [];
let activeIndex = 0;

const translations = {
  en: {
    "brand.title": "VietnamIFC Services",
    "brand.subtitle": "Brokered access to Vietnam International Financial Center",
    "nav.benefits": "Benefits",
    "nav.framework": "Framework",
    "nav.destinations": "Destinations",
    "nav.faq": "FAQ",
    "nav.cta": "Request Eligibility Review",
    "hero.eyebrow": "Vietnam International Financial Center (VIFC)",
    "hero.title": "Secure Your Family's 10-Year Future in Vietnam: The New Global Hub for Digital Sovereignty.",
    "hero.subtitle":
      "Stop worrying about short-term visas and complex ownership laws. Experience a life where premium infrastructure meets the world's most aggressive tax incentives for high-level talent.",
    "hero.primaryCta": "Request Eligibility Review",
    "hero.secondaryCta": "Explore the IFC Advantage",
    "hero.note": "Broker service. We guide you through the process and coordinate with official channels.",
    "hero.hcmcTitle": "Ho Chi Minh City",
    "hero.hcmcCaption": "Global capital connectivity",
    "hero.danangTitle": "Da Nang",
    "hero.danangCaption": "Innovation-driven wealth management",
    "benefits.title": "The IFC Advantage",
    "benefits.subtitle":
      "Designed for global families and operators who value mobility, transparency, and long-term certainty.",
    "benefits.cards.residency.title": "The 10-Year Family Residency",
    "benefits.cards.residency.body":
      "Receive UD1 temporary residence cards for yourself and UD2 cards for your spouse and children (under 18), valid for up to 10 years, subject to eligibility and official guidance.",
    "benefits.cards.pit.title": "0% Personal Income Tax",
    "benefits.cards.pit.body":
      "Qualified managers and experts working for IFC members enjoy a full exemption from Personal Income Tax (PIT) on wages and bonuses earned within the center until the end of 2030.",
    "benefits.cards.ownership.title": "100% Business Ownership",
    "benefits.cards.ownership.body":
      "Register as an IFC Member and exercise your right to own 100% of the charter capital of your economic organization, with the ability to use English as your primary language for official transactions.",
    "benefits.cards.cit.title": "Corporate Tax Sovereignty",
    "benefits.cards.cit.body":
      "Access a preferential Corporate Income Tax (CIT) rate of 10% for 30 years, including tax holidays (4 years of 100% exemption and 9 years of 50% reduction).",
    "benefits.cards.mobility.title": "Asset & Capital Mobility",
    "benefits.cards.mobility.body":
      "Benefit from specialized foreign exchange mechanisms allowing for the free flow of investment capital, profits, and legal income to be transferred abroad.",
    "framework.title": "Safety, Governance, and International Standards",
    "framework.subtitle": "Confidence is built on clarity. We keep you aligned with the official framework at every step.",
    "framework.cards.government.title": "Government-Backed Framework",
    "framework.cards.government.body":
      "Residency and business rights are anchored in National Assembly Resolution No. 222/2025/QH15 and Government Decree No. 323/2025/ND-CP. We track updates and advise on implementation.",
    "framework.cards.government.link": "View sources",
    "framework.cards.agency.title": "Dedicated Executive Agency",
    "framework.cards.agency.body":
      "Navigate your setup through a specialized one-stop Executive Agency to ensure administrative transparency and legal protection.",
    "framework.cards.ifrs.title": "International Standards",
    "framework.cards.ifrs.body":
      "Apply International Financial Reporting Standards (IFRS) or other accepted frameworks to keep your business globally compatible and transparent.",
    "destinations.title": "One Center, Two Destinations",
    "destinations.subtitle":
      "Vietnam International Financial Center (VIFC) operates as one ecosystem across Ho Chi Minh City and Da Nang. Choose the energy that fits your family and portfolio.",
    "destinations.hcmc.title": "Ho Chi Minh City Hub",
    "destinations.hcmc.body": "Global capital connectivity, enterprise finance, and international deal flow.",
    "destinations.hcmc.point1": "Regional headquarters potential",
    "destinations.hcmc.point2": "Access to global banking networks",
    "destinations.hcmc.point3": "Premium urban lifestyle",
    "destinations.danang.title": "Da Nang Hub",
    "destinations.danang.body": "Innovation-driven wealth management, FinTech, and family-friendly coastal living.",
    "destinations.danang.point1": "Future-forward infrastructure",
    "destinations.danang.point2": "Coastal lifestyle and education",
    "destinations.danang.point3": "Strategic Asia-Pacific location",
    "faq.title": "FAQ",
    "faq.subtitle": "Direct answers for families and investors exploring the IFC path.",
    "faq.subnote":
      "We also provide an AI self-research notebook with the most updated legal documents and IFC news.",
    "faq.subnoteLink": "Open the notebook",
    "faq.q1.q": "What is the \"One Center, Two Destinations\" model?",
    "faq.q1.a":
      "The Vietnam International Financial Center (VIFC) consists of two specialized hubs: Ho Chi Minh City, which serves as a global gateway for capital markets and banking, and Da Nang, which is an innovation-driven center for FinTech, Digital Asset, wealth management, and green finance. There is a Free Trade Zone in Da Nang which bring benefit to companies working in logistic.",
    "faq.q2.q": "Is there an application fee to join?",
    "faq.q2.a": "During the interim phase of 2025–2026, the application fee for IFC membership is currently waived.",
    "faq.q3.q": "How long can I and my family stay in Vietnam as IFC members?",
    "faq.q3.a":
      "Qualified strategic investors, managers, and experts are eligible for visas and temporary residence cards valid for up to 10 years (symbol UD1). Your spouse and children under 18 are granted residence cards (symbol UD2) with the same duration as yours.",
    "faq.q4.q": "Do I need a work permit?",
    "faq.q4.a":
      "Foreign experts and their accompanying family members may be exempt from work permits if they meet the criteria for high-level expertise defined by the Executive Agency.",
    "faq.q5.q": "Can I own 100% of my business in the IFC?",
    "faq.q5.a":
      "Yes, foreign investors have the right to own 100% of the charter capital of an economic organization registered as an IFC Member.",
    "faq.q6.q": "What legal structures are available for foreigners?",
    "faq.q6.a":
      "You can establish a Single-member Limited Liability Company, a Multi-member LLC, a Joint Stock Company, or a Partnership.",
    "faq.q7.q": "Can I use English for my business operations?",
    "faq.q7.a":
      "Yes, the sources permit the use of English as the primary language for transactions, records, and official documents within the center.",
    "faq.q8.q": "What are the tax benefits for my company?",
    "faq.q8.a":
      "Eligible members can access a preferential Corporate Income Tax (CIT) rate of 10% for 30 years or 15% for 15 years, including tax holidays (up to 4 years of 100% exemption and 9 years of 50% reduction).",
    "faq.q9.q": "What are the tax benefits for me personally?",
    "faq.q9.a":
      "Qualified managers and experts working for IFC members are exempt from Personal Income Tax (PIT) on wages and bonuses earned at the center until the end of 2030.",
    "faq.q10.q": "What is the minimum capital requirement?",
    "faq.q10.a":
      "For regulated financial sectors like securities, the minimum charter capital is 800 billion VND. However, for non-regulated professional services (Category 3) like consulting or marketing, the sources do not specify a fixed minimum amount, though you must prove financial capacity through bank balance confirmations or audited statements.",
    "faq.q11.q": "Where must my office be located?",
    "faq.q11.a":
      "It is mandatory for Members to have their head office located within the physical boundaries of the IFC (such as the ICT Tower in Da Nang) and maintain it throughout the business operation.",
    "faq.q12.q": "What accounting standards must I use?",
    "faq.q12.a":
      "Members must apply International Financial Reporting Standards (IFRS) for their accounting and financial reporting.",
    "faq.q13.q": "Is there a \"Sandbox\" for new technologies?",
    "faq.q13.a":
      "Yes, the IFC provides a controlled testing mechanism (\"Sandbox\") for innovative financial technologies and digital asset services, allowing firms to operate under a flexible regulatory environment while formal rules are finalized.",
    "cta.title": "Request Eligibility Review",
    "cta.subtitle": "Share your basic profile for a private assessment. We respond within 24 hours with next steps.",
    "cta.note":
      "Limited-time note: during the interim setup phase (2025-2026), IFC membership fees are expected to be very favorable.",
    "cta.button": "Open the Eligibility Form",
    "cta.micro": "Broker service. Final eligibility is determined by official authorities.",
    "footer.title": "Sources and legal framework references:",
    "footer.source1": "National Assembly Resolution No. 222/2025/QH15 on the International Financial Center in Vietnam",
    "footer.source2": "Government Decree No. 323/2025/ND-CP on establishment of the IFC",
    "footer.source3": "Tax incentive overview for IFCs (corporate and personal)",
    "footer.disclaimer": "VietnamIFC Services (VFCS) is a broker service and does not provide legal or tax advice.",
  },
  fa: {},
  ru: {},
};

const availableLanguages = ["en"];

const applyLanguage = (lang) => {
  const strings = translations[lang];
  if (!strings) return;

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (!key) return;
    if (strings[key]) {
      element.textContent = strings[key];
    }
  });
};

langButtons.forEach((button) => {
  const lang = button.dataset.lang;
  if (!availableLanguages.includes(lang)) {
    button.disabled = true;
  }

  button.addEventListener("click", () => {
    if (!availableLanguages.includes(lang)) return;
    langButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    applyLanguage(lang);
  });
});

applyLanguage("en");

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-scroll");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

if (prefersReducedMotion) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

const updateProgress = () => {
  if (!progressBar) return;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
};

const parallaxPanels = document.querySelectorAll(".city-panel");
const updateParallax = () => {
  if (prefersReducedMotion) return;
  const offset = window.scrollY * 0.05;
  parallaxPanels.forEach((panel, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    panel.style.transform = `translateY(${offset * direction}px)`;
  });
};

window.addEventListener("scroll", () => {
  updateProgress();
  updateParallax();
});

window.addEventListener("load", () => {
  updateProgress();
  updateParallax();
});

const openLightbox = (galleryKey, startIndex) => {
  const gallery = galleries[galleryKey];
  if (!gallery || !lightbox || !lightboxImage || !lightboxCaption) return;

  activeGallery = gallery;
  activeIndex = startIndex;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  renderLightbox();
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
};

const renderLightbox = () => {
  if (!activeGallery.length) return;
  const item = activeGallery[activeIndex];
  if (!item || !lightboxImage || !lightboxCaption) return;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.caption || "IFC gallery image";
  lightboxCaption.textContent = item.caption || "";
};

const showNext = () => {
  if (!activeGallery.length) return;
  activeIndex = (activeIndex + 1) % activeGallery.length;
  renderLightbox();
};

const showPrev = () => {
  if (!activeGallery.length) return;
  activeIndex = (activeIndex - 1 + activeGallery.length) % activeGallery.length;
  renderLightbox();
};

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.gallery;
    if (!key) return;
    openLightbox(key, 0);
  });
});

lightboxCloseButtons.forEach((button) => {
  button.addEventListener("click", closeLightbox);
});

if (lightboxPrev) {
  lightboxPrev.addEventListener("click", showPrev);
}

if (lightboxNext) {
  lightboxNext.addEventListener("click", showNext);
}

window.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrev();
});
