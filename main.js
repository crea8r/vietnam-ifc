const scrollButtons = document.querySelectorAll("[data-scroll]");
const revealElements = document.querySelectorAll("[data-reveal]");
const progressBar = document.querySelector(".scroll-progress span");
const langSelect = document.querySelector("#lang-select");
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
    "cta.subtitle": "Share your basic profile for a private assessment. We respond within 48 hours with next steps.",
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
  fa: {
    "brand.title": "خدمات VietnamIFC",
    "brand.subtitle": "دسترسی کارگزاری به مرکز مالی بین‌المللی ویتنام",
    "nav.benefits": "مزایا",
    "nav.framework": "چارچوب",
    "nav.destinations": "مقاصد",
    "nav.faq": "پرسش‌ها",
    "nav.cta": "درخواست بررسی صلاحیت",
    "hero.eyebrow": "مرکز مالی بین‌المللی ویتنام (VIFC)",
    "hero.title": "آینده ۱۰ ساله خانواده‌تان در ویتنام را تضمین کنید: قطب جهانی نوین حاکمیت دیجیتال.",
    "hero.subtitle":
      "نگرانی درباره ویزاهای کوتاه‌مدت و قوانین پیچیده مالکیت را کنار بگذارید. زندگی‌ای را تجربه کنید که در آن زیرساخت ممتاز با تهاجمی‌ترین مشوق‌های مالیاتی برای استعدادهای سطح بالا همراه است.",
    "hero.primaryCta": "درخواست بررسی صلاحیت",
    "hero.secondaryCta": "بررسی مزیت‌های IFC",
    "hero.note": "ما کارگزار هستیم. مسیر را هدایت می‌کنیم و با کانال‌های رسمی هماهنگ می‌شویم.",
    "hero.hcmcTitle": "هوشی‌مین سیتی",
    "hero.hcmcCaption": "اتصال سرمایه جهانی",
    "hero.danangTitle": "دانانگ",
    "hero.danangCaption": "مدیریت ثروت نوآورانه",
    "benefits.title": "مزیت‌های IFC",
    "benefits.subtitle":
      "برای خانواده‌ها و اپراتورهای جهانی که به تحرک، شفافیت و قطعیت بلندمدت اهمیت می‌دهند طراحی شده است.",
    "benefits.cards.residency.title": "اقامت ۱۰ ساله خانوادگی",
    "benefits.cards.residency.body":
      "کارت‌های اقامت موقت UD1 برای شما و UD2 برای همسر و فرزندان زیر ۱۸ سال، تا ۱۰ سال معتبر، مشروط به صلاحیت و دستورالعمل‌های رسمی.",
    "benefits.cards.pit.title": "۰٪ مالیات بر درآمد شخصی",
    "benefits.cards.pit.body":
      "مدیران و کارشناسان واجد شرایط شاغل در اعضای IFC تا پایان ۲۰۳۰ از مالیات بر درآمد شخصی (PIT) بر حقوق و پاداش در مرکز معاف‌اند.",
    "benefits.cards.ownership.title": "مالکیت ۱۰۰٪ کسب‌وکار",
    "benefits.cards.ownership.body":
      "به‌عنوان عضو IFC ثبت‌نام کنید و حق مالکیت ۱۰۰٪ سرمایه شرکت خود را داشته باشید، با امکان استفاده از زبان انگلیسی برای تراکنش‌های رسمی.",
    "benefits.cards.cit.title": "حاکمیت مالیات شرکتی",
    "benefits.cards.cit.body":
      "نرخ ترجیحی مالیات شرکتی (CIT) ۱۰٪ برای ۳۰ سال، به‌همراه تعطیلات مالیاتی (۴ سال معافیت کامل و ۹ سال کاهش ۵۰٪).",
    "benefits.cards.mobility.title": "تحرک دارایی و سرمایه",
    "benefits.cards.mobility.body":
      "سازوکارهای ویژه ارز خارجی برای انتقال آزاد سرمایه‌گذاری، سود و درآمد قانونی به خارج از کشور.",
    "framework.title": "ایمنی، حکمرانی و استانداردهای بین‌المللی",
    "framework.subtitle": "اعتماد بر شفافیت بنا می‌شود. در هر مرحله شما را با چارچوب رسمی همسو نگه می‌داریم.",
    "framework.cards.government.title": "چارچوب پشتیبانی‌شده دولتی",
    "framework.cards.government.body":
      "حقوق اقامت و کسب‌وکار بر اساس قطعنامه 222/2025/QH15 مجلس ملی و فرمان 323/2025/ND-CP دولت تثبیت شده است. ما تغییرات را دنبال می‌کنیم و در اجرا راهنمایی می‌دهیم.",
    "framework.cards.government.link": "مشاهده منابع",
    "framework.cards.agency.title": "آژانس اجرایی یک‌پنجره",
    "framework.cards.agency.body":
      "راه‌اندازی خود را از طریق آژانس اجرایی تخصصی یک‌پنجره انجام دهید تا شفافیت اداری و حمایت حقوقی تضمین شود.",
    "framework.cards.ifrs.title": "استانداردهای بین‌المللی",
    "framework.cards.ifrs.body":
      "به‌کارگیری استانداردهای گزارشگری مالی بین‌المللی (IFRS) برای سازگاری و شفافیت جهانی.",
    "destinations.title": "یک مرکز، دو مقصد",
    "destinations.subtitle":
      "مرکز مالی بین‌المللی ویتنام (VIFC) به‌صورت یک اکوسیستم در هوشی‌مین سیتی و دانانگ عمل می‌کند. انرژی مناسب خانواده و سرمایه‌تان را انتخاب کنید.",
    "destinations.hcmc.title": "قطب هوشی‌مین سیتی",
    "destinations.hcmc.body": "اتصال سرمایه جهانی، مالیه شرکتی و جریان معاملات بین‌المللی.",
    "destinations.hcmc.point1": "پتانسیل دفتر منطقه‌ای",
    "destinations.hcmc.point2": "دسترسی به شبکه‌های بانکی جهانی",
    "destinations.hcmc.point3": "سبک زندگی شهری ممتاز",
    "destinations.danang.title": "قطب دانانگ",
    "destinations.danang.body": "مدیریت ثروت نوآورانه، فین‌تک و زندگی ساحلی مناسب خانواده.",
    "destinations.danang.point1": "زیرساخت آینده‌محور",
    "destinations.danang.point2": "سبک زندگی ساحلی و آموزش",
    "destinations.danang.point3": "موقعیت راهبردی آسیا-اقیانوسیه",
    "faq.title": "پرسش‌های متداول",
    "faq.subtitle": "پاسخ‌های مستقیم برای خانواده‌ها و سرمایه‌گذاران در مسیر IFC.",
    "faq.subnote":
      "همچنین یک نوت‌بوک پژوهش با هوش مصنوعی با به‌روزترین اسناد حقوقی و اخبار IFC ارائه می‌کنیم.",
    "faq.subnoteLink": "باز کردن نوت‌بوک",
    "faq.q1.q": "مدل «یک مرکز، دو مقصد» چیست؟",
    "faq.q1.a":
      "مرکز مالی بین‌المللی ویتنام (VIFC) شامل دو قطب تخصصی است: هوشی‌مین سیتی به‌عنوان درگاه جهانی بازار سرمایه و بانکداری، و دانانگ به‌عنوان مرکز نوآوری برای فین‌تک، دارایی دیجیتال، مدیریت ثروت و مالی سبز. در دانانگ یک منطقه تجارت آزاد نیز وجود دارد که برای شرکت‌های فعال در لجستیک مزیت ایجاد می‌کند.",
    "faq.q2.q": "آیا برای عضویت هزینه درخواست وجود دارد؟",
    "faq.q2.a": "در دوره موقت ۲۰۲۵–۲۰۲۶، هزینه درخواست عضویت IFC در حال حاضر حذف شده است.",
    "faq.q3.q": "من و خانواده‌ام به‌عنوان اعضای IFC چه مدت می‌توانیم در ویتنام بمانیم؟",
    "faq.q3.a":
      "سرمایه‌گذاران راهبردی، مدیران و کارشناسان واجد شرایط می‌توانند ویزا و کارت اقامت موقت تا ۱۰ سال (نماد UD1) دریافت کنند. همسر و فرزندان زیر ۱۸ سال کارت اقامت (نماد UD2) با همان مدت دریافت می‌کنند.",
    "faq.q4.q": "آیا به مجوز کار نیاز دارم؟",
    "faq.q4.a":
      "کارشناسان خارجی و اعضای همراه خانواده در صورت احراز معیارهای تخصص سطح بالا از سوی آژانس اجرایی ممکن است از مجوز کار معاف شوند.",
    "faq.q5.q": "آیا می‌توانم ۱۰۰٪ کسب‌وکار خود را در IFC مالک باشم؟",
    "faq.q5.a":
      "بله، سرمایه‌گذاران خارجی حق مالکیت ۱۰۰٪ سرمایه ثبتی یک سازمان اقتصادی ثبت‌شده به‌عنوان عضو IFC را دارند.",
    "faq.q6.q": "چه ساختارهای حقوقی برای خارجی‌ها در دسترس است؟",
    "faq.q6.a":
      "می‌توانید شرکت با مسئولیت محدود تک‌عضوی، شرکت با مسئولیت محدود چندعضوی، شرکت سهامی یا مشارکت ثبت کنید.",
    "faq.q7.q": "آیا می‌توانم زبان انگلیسی را برای عملیات کسب‌وکار استفاده کنم؟",
    "faq.q7.a":
      "بله، منابع اجازه استفاده از انگلیسی به‌عنوان زبان اصلی برای تراکنش‌ها، سوابق و اسناد رسمی در مرکز را می‌دهند.",
    "faq.q8.q": "مزایای مالیاتی برای شرکت من چیست؟",
    "faq.q8.a":
      "اعضای واجد شرایط می‌توانند به نرخ ترجیحی مالیات شرکتی (CIT) ۱۰٪ برای ۳۰ سال یا ۱۵٪ برای ۱۵ سال دسترسی داشته باشند، به‌همراه تعطیلات مالیاتی (تا ۴ سال معافیت کامل و ۹ سال کاهش ۵۰٪).",
    "faq.q9.q": "مزایای مالیاتی شخصی برای من چیست؟",
    "faq.q9.a":
      "مدیران و کارشناسان واجد شرایط شاغل در اعضای IFC از مالیات بر درآمد شخصی (PIT) بر حقوق و پاداش تا پایان ۲۰۳۰ معاف‌اند.",
    "faq.q10.q": "حداقل سرمایه موردنیاز چقدر است؟",
    "faq.q10.a":
      "برای بخش‌های مالی مقررات‌گذاری‌شده مانند اوراق بهادار، حداقل سرمایه ثبتی ۸۰۰ میلیارد دونگ است. برای خدمات حرفه‌ای غیرمقرراتی (دسته ۳) مانند مشاوره یا بازاریابی، منابع حداقل ثابت تعیین نکرده‌اند، اما باید توان مالی را با تایید موجودی بانکی یا صورت‌های مالی حسابرسی‌شده اثبات کنید.",
    "faq.q11.q": "دفتر شرکت باید کجا باشد؟",
    "faq.q11.a":
      "اعضا باید دفتر مرکزی خود را در محدوده فیزیکی IFC (مانند برج ICT در دانانگ) مستقر و در طول فعالیت حفظ کنند.",
    "faq.q12.q": "چه استانداردهای حسابداری باید استفاده شود؟",
    "faq.q12.a": "اعضا باید استانداردهای گزارشگری مالی بین‌المللی (IFRS) را برای حسابداری و گزارشگری به‌کار گیرند.",
    "faq.q13.q": "آیا «سندباکس» برای فناوری‌های جدید وجود دارد؟",
    "faq.q13.a":
      "بله، IFC سازوکار آزمایشی کنترل‌شده («Sandbox») برای فناوری‌های مالی نوآورانه و خدمات دارایی دیجیتال فراهم می‌کند تا شرکت‌ها در چارچوبی منعطف فعالیت کنند تا قواعد رسمی نهایی شود.",
    "cta.title": "درخواست بررسی صلاحیت",
    "cta.subtitle": "نمایه اولیه خود را برای ارزیابی محرمانه ارسال کنید. ظرف ۲۴ ساعت با مراحل بعدی پاسخ می‌دهیم.",
    "cta.note":
      "یادداشت محدود: در دوره موقت ۲۰۲۵–۲۰۲۶ انتظار می‌رود هزینه‌های عضویت IFC بسیار مطلوب باشد.",
    "cta.button": "باز کردن فرم ارزیابی",
    "cta.micro": "ما کارگزار هستیم. صلاحیت نهایی توسط مراجع رسمی تعیین می‌شود.",
    "footer.title": "منابع و ارجاعات چارچوب حقوقی:",
    "footer.source1": "قطعنامه 222/2025/QH15 مجلس ملی درباره مرکز مالی بین‌المللی در ویتنام",
    "footer.source2": "فرمان 323/2025/ND-CP دولت درباره تأسیس IFC",
    "footer.source3": "مرور مشوق‌های مالیاتی برای IFCها (شرکتی و شخصی)",
    "footer.disclaimer": "VietnamIFC Services (VFCS) یک سرویس کارگزاری است و مشاوره حقوقی یا مالیاتی ارائه نمی‌دهد.",
  },
  ru: {
    "brand.title": "VietnamIFC Services",
    "brand.subtitle": "Брокерский доступ к Международному финансовому центру Вьетнама",
    "nav.benefits": "Преимущества",
    "nav.framework": "Нормативная база",
    "nav.destinations": "Локации",
    "nav.faq": "FAQ",
    "nav.cta": "Запросить проверку соответствия",
    "hero.eyebrow": "Международный финансовый центр Вьетнама (VIFC)",
    "hero.title": "Обеспечьте 10‑летнее будущее вашей семьи во Вьетнаме: новый глобальный центр цифрового суверенитета.",
    "hero.subtitle":
      "Хватит беспокоиться о краткосрочных визах и сложных правилах собственности. Испытайте жизнь, где премиальная инфраструктура сочетается с самыми агрессивными налоговыми стимулами для высококвалифицированных специалистов.",
    "hero.primaryCta": "Запросить проверку соответствия",
    "hero.secondaryCta": "Изучить преимущества IFC",
    "hero.note": "Мы брокерский сервис. Сопровождаем процесс и координируем с официальными органами.",
    "hero.hcmcTitle": "Хошимин",
    "hero.hcmcCaption": "Глобальная связь капитала",
    "hero.danangTitle": "Дананг",
    "hero.danangCaption": "Инновационное управление капиталом",
    "benefits.title": "Преимущества IFC",
    "benefits.subtitle":
      "Создано для международных семей и операторов, которым важны мобильность, прозрачность и долгосрочная определенность.",
    "benefits.cards.residency.title": "10‑летнее семейное резидентство",
    "benefits.cards.residency.body":
      "Временные карты проживания UD1 для вас и UD2 для супруга и детей до 18 лет, действительные до 10 лет при соблюдении критериев и официальных требований.",
    "benefits.cards.pit.title": "0% подоходного налога",
    "benefits.cards.pit.body":
      "Квалифицированные менеджеры и эксперты, работающие у членов IFC, освобождаются от НДФЛ (PIT) на зарплаты и бонусы до конца 2030 года.",
    "benefits.cards.ownership.title": "100% владение бизнесом",
    "benefits.cards.ownership.body":
      "Регистрация в качестве члена IFC позволяет владеть 100% уставного капитала компании и использовать английский как основной язык официальных транзакций.",
    "benefits.cards.cit.title": "Налоговый суверенитет для бизнеса",
    "benefits.cards.cit.body":
      "Льготная ставка налога на прибыль (CIT) 10% на 30 лет с налоговыми каникулами (4 года 100% освобождения и 9 лет 50% снижения).",
    "benefits.cards.mobility.title": "Мобильность активов и капитала",
    "benefits.cards.mobility.body":
      "Специальные валютные механизмы для свободного перевода инвестиций, прибыли и законных доходов за границу.",
    "framework.title": "Безопасность, управление и международные стандарты",
    "framework.subtitle": "Доверие строится на ясности. Мы сопровождаем вас в рамках официальной базы.",
    "framework.cards.government.title": "Государственно закрепленная база",
    "framework.cards.government.body":
      "Права на резидентство и бизнес основаны на Резолюции Национального собрания 222/2025/QH15 и Правительственном декрете 323/2025/ND-CP. Мы отслеживаем обновления и помогаем с внедрением.",
    "framework.cards.government.link": "Источники",
    "framework.cards.agency.title": "Единый исполнительный орган",
    "framework.cards.agency.body":
      "Сопровождение через специализированный «единый» исполнительный орган для прозрачности и правовой защиты.",
    "framework.cards.ifrs.title": "Международные стандарты",
    "framework.cards.ifrs.body":
      "Применение МСФО (IFRS) для глобальной совместимости и прозрачности отчетности.",
    "destinations.title": "Один центр, две локации",
    "destinations.subtitle":
      "VIFC работает как единая экосистема в Хошимине и Дананге. Выберите среду, подходящую вашей семье и портфелю.",
    "destinations.hcmc.title": "Хаб Хошимина",
    "destinations.hcmc.body": "Глобальная связь капитала, корпоративные финансы и международные сделки.",
    "destinations.hcmc.point1": "Потенциал регионального офиса",
    "destinations.hcmc.point2": "Доступ к глобальным банковским сетям",
    "destinations.hcmc.point3": "Премиальный городской образ жизни",
    "destinations.danang.title": "Хаб Дананга",
    "destinations.danang.body": "Инновационное управление капиталом, финтех и семейная жизнь у моря.",
    "destinations.danang.point1": "Инфраструктура будущего",
    "destinations.danang.point2": "Побережье и образование",
    "destinations.danang.point3": "Стратегическое положение в АТР",
    "faq.title": "FAQ",
    "faq.subtitle": "Прямые ответы для семей и инвесторов, изучающих путь IFC.",
    "faq.subnote": "Мы также предоставляем AI‑ноутбук с актуальными правовыми документами и новостями IFC.",
    "faq.subnoteLink": "Открыть ноутбук",
    "faq.q1.q": "Что означает модель «Один центр, две локации»?",
    "faq.q1.a":
      "VIFC состоит из двух специализированных хабов: Хошимин — глобальные рынки капитала и банковские сервисы; Дананг — инновационный центр финтеха, цифровых активов, управления капиталом и зеленых финансов. В Дананге действует зона свободной торговли, дающая преимущества логистическим компаниям.",
    "faq.q2.q": "Есть ли вступительный сбор?",
    "faq.q2.a": "В переходный период 2025–2026 вступительный сбор IFC временно отменен.",
    "faq.q3.q": "Как долго я и моя семья можем находиться во Вьетнаме как члены IFC?",
    "faq.q3.a":
      "Стратегические инвесторы, менеджеры и эксперты могут получить визы и временные карты проживания до 10 лет (UD1). Супруг/супруга и дети до 18 лет получают карты UD2 на тот же срок.",
    "faq.q4.q": "Нужна ли рабочая виза/разрешение на работу?",
    "faq.q4.a":
      "Иностранные эксперты и сопровождающие члены семьи могут быть освобождены от разрешения на работу при соответствии критериям высокого уровня, определенным исполнительным органом.",
    "faq.q5.q": "Могу ли я владеть 100% бизнеса в IFC?",
    "faq.q5.a":
      "Да, иностранные инвесторы имеют право владеть 100% уставного капитала экономической организации, зарегистрированной как член IFC.",
    "faq.q6.q": "Какие юридические формы доступны иностранцам?",
    "faq.q6.a":
      "Доступны: ООО с одним участником, ООО с несколькими участниками, акционерное общество или партнерство.",
    "faq.q7.q": "Можно ли использовать английский язык в операциях?",
    "faq.q7.a":
      "Да, источники допускают использование английского как основного языка для транзакций, записей и официальных документов в центре.",
    "faq.q8.q": "Какие налоговые льготы для компании?",
    "faq.q8.a":
      "Льготная ставка CIT 10% на 30 лет или 15% на 15 лет, с налоговыми каникулами (до 4 лет 100% освобождения и 9 лет 50% снижения).",
    "faq.q9.q": "Какие личные налоговые льготы?",
    "faq.q9.a":
      "Квалифицированные менеджеры и эксперты освобождаются от PIT на зарплаты и бонусы, полученные в центре, до конца 2030 года.",
    "faq.q10.q": "Каков минимальный уставный капитал?",
    "faq.q10.a":
      "Для регулируемых финансовых отраслей (например, ценные бумаги) минимум — 800 млрд донгов. Для нерегулируемых профессиональных услуг (категория 3) фиксированного минимума нет, но нужно подтвердить финансовую состоятельность банковскими выписками или аудированной отчетностью.",
    "faq.q11.q": "Где должен быть офис?",
    "faq.q11.a":
      "Члены обязаны размещать головной офис в пределах IFC (например, ICT Tower в Дананге) и сохранять его в течение деятельности.",
    "faq.q12.q": "Какие стандарты учета использовать?",
    "faq.q12.a": "Необходимо применять МСФО (IFRS) для бухгалтерского учета и отчетности.",
    "faq.q13.q": "Есть ли «песочница» для новых технологий?",
    "faq.q13.a":
      "Да, IFC предоставляет контролируемую «песочницу» для инновационных финтех‑ и сервисов цифровых активов, позволяя работать в гибкой регуляторной среде до утверждения окончательных правил.",
    "cta.title": "Запросить проверку соответствия",
    "cta.subtitle": "Отправьте базовый профиль для конфиденциальной оценки. Ответим в течение 48 часов.",
    "cta.note":
      "Ограниченная примечание: в переходный период 2025–2026 ожидаются очень выгодные условия членских взносов IFC.",
    "cta.button": "Открыть форму оценки",
    "cta.micro": "Мы брокерский сервис. Окончательное решение принимают официальные органы.",
    "footer.title": "Источники и правовые ссылки:",
    "footer.source1": "Резолюция Национального собрания № 222/2025/QH15 о Международном финансовом центре",
    "footer.source2": "Правительственный декрет № 323/2025/ND-CP о создании IFC",
    "footer.source3": "Обзор налоговых льгот для IFC (корпоративные и личные)",
    "footer.disclaimer": "VietnamIFC Services (VFCS) — брокерский сервис и не предоставляет юридические или налоговые консультации.",
  },
  cn: {
    "brand.title": "VietnamIFC 服务",
    "brand.subtitle": "越南国际金融中心的经纪式对接服务",
    "nav.benefits": "优势",
    "nav.framework": "框架",
    "nav.destinations": "目的地",
    "nav.faq": "常见问题",
    "nav.cta": "申请资格评估",
    "hero.eyebrow": "越南国际金融中心（VIFC）",
    "hero.title": "锁定家人在越南未来10年的稳定：全新的全球数字主权枢纽。",
    "hero.subtitle":
      "不再为短期签证和复杂的所有权法规担忧。体验高端基础设施与最具竞争力的税收激励并存的生活方式。",
    "hero.primaryCta": "申请资格评估",
    "hero.secondaryCta": "了解 IFC 优势",
    "hero.note": "我们是经纪服务方，协助流程并与官方渠道协调。",
    "hero.hcmcTitle": "胡志明市",
    "hero.hcmcCaption": "全球资本连接",
    "hero.danangTitle": "岘港",
    "hero.danangCaption": "创新型财富管理",
    "benefits.title": "IFC 优势",
    "benefits.subtitle": "为重视流动性、透明度与长期确定性的全球家庭与运营者打造。",
    "benefits.cards.residency.title": "10年家庭居留",
    "benefits.cards.residency.body":
      "本人可获 UD1 临时居留卡，配偶与18岁以下子女可获 UD2 卡，最长有效期10年（须满足资格与官方要求）。",
    "benefits.cards.pit.title": "0% 个人所得税",
    "benefits.cards.pit.body":
      "符合条件的管理人员与专家在 IFC 成员单位内取得的工资与奖金可免征个人所得税（PIT），至2030年底。",
    "benefits.cards.ownership.title": "100% 业务所有权",
    "benefits.cards.ownership.body":
      "注册为 IFC 成员可享 100% 外资持股权，并可在官方交易中以英文为主要语言。",
    "benefits.cards.cit.title": "企业税优势",
    "benefits.cards.cit.body": "企业所得税（CIT）优惠税率10%长达30年，并含税收假期（4年全免、9年减半）。",
    "benefits.cards.mobility.title": "资产与资本流动",
    "benefits.cards.mobility.body": "通过专门外汇机制实现投资资本、利润与合法收入自由汇出。",
    "framework.title": "安全、治理与国际标准",
    "framework.subtitle": "信任源于清晰。我们在每一步确保与官方框架一致。",
    "framework.cards.government.title": "政府背书框架",
    "framework.cards.government.body":
      "居留与商业权利依据国会第222/2025/QH15号决议与政府第323/2025/ND-CP号法令。我们跟踪更新并指导落地。",
    "framework.cards.government.link": "查看来源",
    "framework.cards.agency.title": "一站式执行机构",
    "framework.cards.agency.body": "通过专业“一站式”执行机构推进设立，确保行政透明与法律保障。",
    "framework.cards.ifrs.title": "国际标准",
    "framework.cards.ifrs.body": "采用国际财务报告准则（IFRS），确保全球兼容与透明。",
    "destinations.title": "一个中心，两大目的地",
    "destinations.subtitle":
      "VIFC 作为单一生态覆盖胡志明市与岘港。选择最适合家庭与资产配置的能量场。",
    "destinations.hcmc.title": "胡志明市枢纽",
    "destinations.hcmc.body": "全球资本连接、企业金融与国际交易流。",
    "destinations.hcmc.point1": "区域总部潜力",
    "destinations.hcmc.point2": "对接全球银行网络",
    "destinations.hcmc.point3": "高端城市生活方式",
    "destinations.danang.title": "岘港枢纽",
    "destinations.danang.body": "创新型财富管理、金融科技与亲家庭海滨生活。",
    "destinations.danang.point1": "前瞻基础设施",
    "destinations.danang.point2": "海滨生活与教育资源",
    "destinations.danang.point3": "亚太战略位置",
    "faq.title": "常见问题",
    "faq.subtitle": "为探索 IFC 路径的家庭与投资者提供直接答案。",
    "faq.subnote": "我们还提供 AI 自研笔记本，包含最新法律文件与 IFC 新闻。",
    "faq.subnoteLink": "打开笔记本",
    "faq.q1.q": "“一个中心，两大目的地”模式是什么？",
    "faq.q1.a":
      "VIFC 由两个专业枢纽组成：胡志明市作为资本市场与银行业的全球门户；岘港为金融科技、数字资产、财富管理与绿色金融的创新中心。岘港设有自由贸易区，为物流企业带来优势。",
    "faq.q2.q": "加入是否有申请费用？",
    "faq.q2.a": "在2025–2026过渡期内，IFC 会员申请费目前免除。",
    "faq.q3.q": "作为 IFC 成员，我和家人可在越南停留多久？",
    "faq.q3.a":
      "合格战略投资者、管理人员与专家可获得最长10年的签证与临时居留卡（UD1）。配偶与18岁以下子女可获得同期限 UD2 居留卡。",
    "faq.q4.q": "是否需要工作许可？",
    "faq.q4.a": "符合执行机构高端专业标准的外国专家及随行家属可能免于工作许可。",
    "faq.q5.q": "我能在 IFC 中100%持有公司吗？",
    "faq.q5.a": "可以，外国投资者有权100%持有注册为 IFC 成员的经济组织的注册资本。",
    "faq.q6.q": "外国人可用哪些法律结构？",
    "faq.q6.a": "可设立一人有限责任公司、多人有限责任公司、股份公司或合伙企业。",
    "faq.q7.q": "我可以用英语进行业务运营吗？",
    "faq.q7.a": "可以，官方来源允许在中心内使用英语作为主要交易、记录和文件语言。",
    "faq.q8.q": "企业有哪些税收优惠？",
    "faq.q8.a": "可享企业所得税优惠：10%长达30年或15%长达15年，并含税收假期（最多4年全免、9年减半）。",
    "faq.q9.q": "个人有哪些税收优惠？",
    "faq.q9.a": "合格管理人员与专家在中心取得的工资和奖金可免征个人所得税（PIT），至2030年底。",
    "faq.q10.q": "最低资本要求是多少？",
    "faq.q10.a":
      "对于证券等受监管金融领域，最低注册资本为8000亿越南盾。对咨询、营销等非监管专业服务（类别3），官方未规定固定最低额，但需通过银行余额证明或审计报表证明资金实力。",
    "faq.q11.q": "办公室必须设在哪里？",
    "faq.q11.a": "成员必须在 IFC 的物理范围内设立并保持总部（如岘港 ICT Tower）。",
    "faq.q12.q": "必须采用哪些会计标准？",
    "faq.q12.a": "成员必须采用国际财务报告准则（IFRS）进行会计与财务报告。",
    "faq.q13.q": "是否有新技术“沙盒”？",
    "faq.q13.a":
      "有。IFC 提供受控测试机制（Sandbox）用于创新金融科技与数字资产服务，在正式规则完善前允许灵活监管环境下运营。",
    "cta.title": "申请资格评估",
    "cta.subtitle": "提交基础信息进行私密评估。我们将在48小时内回复下一步。",
    "cta.note": "限时提示：在2025–2026过渡期内，IFC 会员费用预计非常优惠。",
    "cta.button": "打开资格评估表",
    "cta.micro": "我们是经纪服务方。最终资格由官方机构决定。",
    "footer.title": "法律框架与来源：",
    "footer.source1": "关于越南国际金融中心的国会第222/2025/QH15号决议",
    "footer.source2": "关于设立 IFC 的政府第323/2025/ND-CP号法令",
    "footer.source3": "IFC 税收优惠概览（企业与个人）",
    "footer.disclaimer": "VietnamIFC Services (VFCS) 为经纪服务，不提供法律或税务建议。",
  },
  kr: {
    "brand.title": "VietnamIFC 서비스",
    "brand.subtitle": "베트남 국제금융센터 중개 서비스",
    "nav.benefits": "혜택",
    "nav.framework": "프레임워크",
    "nav.destinations": "거점",
    "nav.faq": "FAQ",
    "nav.cta": "자격 검토 요청",
    "hero.eyebrow": "베트남 국제금융센터 (VIFC)",
    "hero.title": "베트남에서 가족의 10년 미래를 확보하세요: 새로운 글로벌 디지털 주권 허브.",
    "hero.subtitle":
      "단기 비자와 복잡한 소유 규정에 대한 걱정을 멈추세요. 프리미엄 인프라와 최고 수준의 세제 인센티브가 만나는 라이프스타일을 경험하십시오.",
    "hero.primaryCta": "자격 검토 요청",
    "hero.secondaryCta": "IFC 혜택 알아보기",
    "hero.note": "저희는 중개 서비스입니다. 절차를 안내하고 공식 채널과 협업합니다.",
    "hero.hcmcTitle": "호치민시",
    "hero.hcmcCaption": "글로벌 자본 연결",
    "hero.danangTitle": "다낭",
    "hero.danangCaption": "혁신형 자산관리",
    "benefits.title": "IFC 혜택",
    "benefits.subtitle": "이동성, 투명성, 장기 안정성을 중시하는 글로벌 가족과 운영자를 위해 설계되었습니다.",
    "benefits.cards.residency.title": "10년 가족 거주",
    "benefits.cards.residency.body":
      "본인 UD1 임시 거주카드, 배우자 및 18세 미만 자녀 UD2 카드 발급(최대 10년), 자격 및 공식 지침에 따름.",
    "benefits.cards.pit.title": "개인소득세 0%",
    "benefits.cards.pit.body":
      "IFC 회원사에 근무하는 자격 있는 관리자와 전문가의 급여 및 보너스에 대한 PIT가 2030년 말까지 면제됩니다.",
    "benefits.cards.ownership.title": "사업 100% 소유",
    "benefits.cards.ownership.body":
      "IFC 회원으로 등록하면 100% 지분 소유 가능하며, 공식 거래에서 영어를 주요 언어로 사용할 수 있습니다.",
    "benefits.cards.cit.title": "법인세 우대",
    "benefits.cards.cit.body": "법인세(CIT) 10% 30년 우대, 세금 휴가(4년 전액 면제 + 9년 50% 감면).",
    "benefits.cards.mobility.title": "자산·자본 이동",
    "benefits.cards.mobility.body": "특수 외환 메커니즘을 통해 투자자금, 이익, 합법 소득의 해외 이전 허용.",
    "framework.title": "안정성, 거버넌스, 국제 기준",
    "framework.subtitle": "신뢰는 명확함에서 시작됩니다. 공식 프레임워크에 맞춰 전 과정을 지원합니다.",
    "framework.cards.government.title": "정부 기반 프레임워크",
    "framework.cards.government.body":
      "거주 및 사업 권리는 국회 결의 222/2025/QH15 및 정부령 323/2025/ND-CP에 근거합니다. 우리는 업데이트를 추적하고 실행을 지원합니다.",
    "framework.cards.government.link": "출처 보기",
    "framework.cards.agency.title": "원스톱 실행 기관",
    "framework.cards.agency.body": "전담 원스톱 실행 기관을 통해 행정 투명성과 법적 보호를 확보합니다.",
    "framework.cards.ifrs.title": "국제 기준",
    "framework.cards.ifrs.body": "국제회계기준(IFRS)을 적용해 글로벌 호환성과 투명성을 보장합니다.",
    "destinations.title": "하나의 센터, 두 개의 거점",
    "destinations.subtitle":
      "VIFC는 호치민시와 다낭을 잇는 단일 생태계입니다. 가족과 자산에 맞는 에너지를 선택하세요.",
    "destinations.hcmc.title": "호치민시 허브",
    "destinations.hcmc.body": "글로벌 자본 연결, 기업금융, 국제 거래 흐름.",
    "destinations.hcmc.point1": "지역 본부 가능성",
    "destinations.hcmc.point2": "글로벌 은행 네트워크 접근",
    "destinations.hcmc.point3": "프리미엄 도시 라이프스타일",
    "destinations.danang.title": "다낭 허브",
    "destinations.danang.body": "혁신형 자산관리, 핀테크, 가족 친화적 해변 생활.",
    "destinations.danang.point1": "미래지향 인프라",
    "destinations.danang.point2": "해안 라이프스타일과 교육",
    "destinations.danang.point3": "아시아-태평양 전략 위치",
    "faq.title": "FAQ",
    "faq.subtitle": "IFC 경로를 탐색하는 가족과 투자자를 위한 명확한 답변입니다.",
    "faq.subnote": "최신 법률 문서와 IFC 뉴스를 담은 AI 셀프리서치 노트북을 제공합니다.",
    "faq.subnoteLink": "노트북 열기",
    "faq.q1.q": "“하나의 센터, 두 개의 거점” 모델은 무엇인가요?",
    "faq.q1.a":
      "VIFC는 두 개의 전문 허브로 구성됩니다. 호치민시는 자본시장과 은행의 글로벌 게이트웨이이며, 다낭은 핀테크, 디지털 자산, 자산관리, 그린 파이낸스의 혁신 중심지입니다. 다낭에는 물류기업에 유리한 자유무역지대가 있습니다.",
    "faq.q2.q": "가입 신청 수수료가 있나요?",
    "faq.q2.a": "2025–2026 과도기 동안 IFC 가입 신청 수수료는 현재 면제됩니다.",
    "faq.q3.q": "IFC 회원으로 저와 가족은 얼마나 체류할 수 있나요?",
    "faq.q3.a":
      "자격 있는 전략적 투자자, 관리자, 전문가는 최대 10년 유효한 비자 및 임시 거주카드(UD1)를 받을 수 있습니다. 배우자와 18세 미만 자녀는 동일 기간의 UD2 카드를 받습니다.",
    "faq.q4.q": "취업허가가 필요한가요?",
    "faq.q4.a":
      "외국인 전문가와 동반 가족은 실행기관이 정의한 고급 전문성 기준을 충족하면 취업허가가 면제될 수 있습니다.",
    "faq.q5.q": "IFC에서 100% 소유가 가능한가요?",
    "faq.q5.a": "네, 외국인 투자자는 IFC 회원으로 등록된 경제 조직의 자본을 100% 소유할 수 있습니다.",
    "faq.q6.q": "외국인이 사용할 수 있는 법인 형태는?",
    "faq.q6.a": "1인 유한책임회사, 다인 유한책임회사, 주식회사, 파트너십을 설립할 수 있습니다.",
    "faq.q7.q": "사업 운영에 영어를 사용할 수 있나요?",
    "faq.q7.a": "네, 센터 내 거래, 기록, 공식 문서에 영어를 주요 언어로 사용할 수 있습니다.",
    "faq.q8.q": "회사에 대한 세제 혜택은?",
    "faq.q8.a":
      "법인세(CIT) 10% 30년 또는 15% 15년 우대, 세금 휴가(최대 4년 전액 면제 + 9년 50% 감면).",
    "faq.q9.q": "개인 세제 혜택은?",
    "faq.q9.a": "자격 있는 관리자와 전문가는 2030년 말까지 급여 및 보너스 PIT가 면제됩니다.",
    "faq.q10.q": "최소 자본 요건은?",
    "faq.q10.a":
      "증권 등 규제 금융 분야는 최소 자본금 8,000억 VND. 비규제 전문 서비스(카테고리 3)는 고정 최소액이 없지만, 은행 잔고증명 또는 감사보고서로 재무 능력을 입증해야 합니다.",
    "faq.q11.q": "사무실 위치는 어디여야 하나요?",
    "faq.q11.a":
      "회원사는 IFC의 물리적 경계(예: 다낭 ICT Tower) 내에 본사를 두고 사업 기간 동안 유지해야 합니다.",
    "faq.q12.q": "어떤 회계 기준을 사용해야 하나요?",
    "faq.q12.a": "국제회계기준(IFRS)을 적용해 회계 및 재무보고를 해야 합니다.",
    "faq.q13.q": "신기술을 위한 ‘샌드박스’가 있나요?",
    "faq.q13.a":
      "네, IFC는 혁신적 핀테크 및 디지털 자산 서비스를 위한 통제된 테스트 메커니즘(Sandbox)을 제공합니다.",
    "cta.title": "자격 검토 요청",
    "cta.subtitle": "기본 정보를 제출해 비공개 평가를 받으세요. 48시간 내에 안내드립니다.",
    "cta.note": "한정 안내: 2025–2026 과도기에는 IFC 회원 비용이 매우 유리할 것으로 예상됩니다.",
    "cta.button": "평가 폼 열기",
    "cta.micro": "저희는 중개 서비스입니다. 최종 자격은 공식 기관이 결정합니다.",
    "footer.title": "법적 근거 및 참고 자료:",
    "footer.source1": "베트남 국제금융센터 관련 국회 결의 222/2025/QH15",
    "footer.source2": "IFC 설립 관련 정부령 323/2025/ND-CP",
    "footer.source3": "IFC 세제 혜택 개요(법인/개인)",
    "footer.disclaimer": "VietnamIFC Services (VFCS)는 중개 서비스이며 법률·세무 자문을 제공하지 않습니다.",
  },
  jp: {
    "brand.title": "VietnamIFC Services",
    "brand.subtitle": "ベトナム国際金融センターへの仲介サービス",
    "nav.benefits": "メリット",
    "nav.framework": "枠組み",
    "nav.destinations": "拠点",
    "nav.faq": "FAQ",
    "nav.cta": "適格性レビューを依頼",
    "hero.eyebrow": "ベトナム国際金融センター（VIFC）",
    "hero.title": "ベトナムで家族の10年の未来を確保：新たなグローバル・デジタル主権のハブ。",
    "hero.subtitle":
      "短期ビザや複雑な所有権規制への不安を解消。プレミアムなインフラと最も強力な税制優遇が出会う生活を。",
    "hero.primaryCta": "適格性レビューを依頼",
    "hero.secondaryCta": "IFCの優位性を見る",
    "hero.note": "当社は仲介サービスです。プロセスをガイドし、公式チャネルと連携します。",
    "hero.hcmcTitle": "ホーチミン市",
    "hero.hcmcCaption": "グローバル資本の接続拠点",
    "hero.danangTitle": "ダナン",
    "hero.danangCaption": "革新的な資産運用",
    "benefits.title": "IFCの優位性",
    "benefits.subtitle": "流動性・透明性・長期的確実性を重視するグローバルファミリー向け。",
    "benefits.cards.residency.title": "10年の家族レジデンシー",
    "benefits.cards.residency.body":
      "本人はUD1、配偶者・18歳未満の子どもはUD2の一時滞在カードを最大10年取得可能（要件と公式指針に準拠）。",
    "benefits.cards.pit.title": "個人所得税 0%",
    "benefits.cards.pit.body":
      "IFC会員で働く適格な管理職・専門家は、2030年末まで給与・賞与のPITが全額免除。",
    "benefits.cards.ownership.title": "事業の100%所有",
    "benefits.cards.ownership.body":
      "IFC会員として登録すれば、100%外資所有が可能。公式取引で英語を主要言語として使用できます。",
    "benefits.cards.cit.title": "法人税優遇",
    "benefits.cards.cit.body": "法人税（CIT）10%が30年、税優遇（4年全免＋9年50%減免）。",
    "benefits.cards.mobility.title": "資産・資本の移動",
    "benefits.cards.mobility.body": "投資資本・利益・合法収入の海外送金を可能にする特別な外貨メカニズム。",
    "framework.title": "安全性・ガバナンス・国際基準",
    "framework.subtitle": "信頼は明確さから。公式枠組みに沿って全工程を支援します。",
    "framework.cards.government.title": "政府により裏付けられた枠組み",
    "framework.cards.government.body":
      "居住・事業権は国会決議222/2025/QH15および政府政令323/2025/ND-CPに基づきます。更新を追跡し実装を支援します。",
    "framework.cards.government.link": "出典を見る",
    "framework.cards.agency.title": "ワンストップ実行機関",
    "framework.cards.agency.body": "専門のワンストップ機関を通じて透明性と法的保護を確保。",
    "framework.cards.ifrs.title": "国際基準",
    "framework.cards.ifrs.body": "IFRSを適用し、グローバル互換性と透明性を確保。",
    "destinations.title": "一つのセンター、二つの拠点",
    "destinations.subtitle":
      "VIFCはホーチミン市とダナンを結ぶ単一エコシステム。ご家族とポートフォリオに合う拠点を選択できます。",
    "destinations.hcmc.title": "ホーチミン市ハブ",
    "destinations.hcmc.body": "グローバル資本接続、企業金融、国際取引。",
    "destinations.hcmc.point1": "地域本部の可能性",
    "destinations.hcmc.point2": "国際銀行ネットワークへのアクセス",
    "destinations.hcmc.point3": "プレミアムな都市生活",
    "destinations.danang.title": "ダナンハブ",
    "destinations.danang.body": "革新的な資産運用、フィンテック、家族向けの海辺生活。",
    "destinations.danang.point1": "未来志向のインフラ",
    "destinations.danang.point2": "海辺の生活と教育",
    "destinations.danang.point3": "アジア太平洋の戦略的立地",
    "faq.title": "FAQ",
    "faq.subtitle": "IFCを検討する家族と投資家への明確な回答。",
    "faq.subnote": "最新の法令・IFCニュースを反映したAIセルフリサーチノートを提供します。",
    "faq.subnoteLink": "ノートを開く",
    "faq.q1.q": "「一つのセンター、二つの拠点」とは？",
    "faq.q1.a":
      "VIFCは2つの専門ハブで構成：ホーチミン市は資本市場と銀行のグローバルゲートウェイ、ダナンはフィンテック・デジタル資産・資産運用・グリーンファイナンスの革新中心地。ダナンには物流企業に有利な自由貿易区があります。",
    "faq.q2.q": "申請費用はありますか？",
    "faq.q2.a": "2025–2026の移行期はIFC申請費用が免除されています。",
    "faq.q3.q": "IFC会員として家族はどれくらい滞在できますか？",
    "faq.q3.a":
      "適格な戦略投資家・管理職・専門家は最大10年のビザ／一時滞在カード（UD1）取得が可能。配偶者と18歳未満の子どもは同期間のUD2カードを取得します。",
    "faq.q4.q": "就労許可は必要ですか？",
    "faq.q4.a": "執行機関が定める高度専門基準を満たす外国人専門家と家族は免除される場合があります。",
    "faq.q5.q": "IFCで100%所有は可能ですか？",
    "faq.q5.a": "はい、IFC会員として登録された経済組織の資本を100%所有できます。",
    "faq.q6.q": "外国人が選べる法人形態は？",
    "faq.q6.a": "単独有限責任会社、複数有限責任会社、株式会社、パートナーシップが可能です。",
    "faq.q7.q": "英語で業務運営できますか？",
    "faq.q7.a": "はい。センター内の取引、記録、公式文書で英語を主要言語として使用できます。",
    "faq.q8.q": "会社の税制優遇は？",
    "faq.q8.a":
      "法人税(CIT) 10%が30年または15%が15年。税優遇（最大4年全免＋9年50%減免）。",
    "faq.q9.q": "個人の税制優遇は？",
    "faq.q9.a": "適格な管理職・専門家の給与・賞与PITは2030年末まで免除。",
    "faq.q10.q": "最低資本金はいくらですか？",
    "faq.q10.a":
      "証券など規制金融分野は最低8000億VND。非規制の専門サービス（カテゴリー3）は固定最低額なしだが、銀行残高証明や監査報告で財務能力を示す必要があります。",
    "faq.q11.q": "オフィス所在地はどこですか？",
    "faq.q11.a": "IFCの物理的境界内（例：ダナンのICTタワー）に本社を置き維持する必要があります。",
    "faq.q12.q": "会計基準は何を使いますか？",
    "faq.q12.a": "国際財務報告基準（IFRS）を適用します。",
    "faq.q13.q": "新技術向けの「サンドボックス」はありますか？",
    "faq.q13.a":
      "はい。IFCはフィンテックやデジタル資産向けの管理された試験環境（Sandbox）を提供します。",
    "cta.title": "適格性レビューを依頼",
    "cta.subtitle": "基本情報を共有してください。48時間以内に次のステップをご案内します。",
    "cta.note": "限定注記：2025–2026の移行期はIFC会費が非常に有利になる見込みです。",
    "cta.button": "評価フォームを開く",
    "cta.micro": "当社は仲介サービスです。最終的な適格性は公式機関が決定します。",
    "footer.title": "法的枠組みの参照先：",
    "footer.source1": "ベトナム国際金融センターに関する国会決議222/2025/QH15",
    "footer.source2": "IFC設立に関する政府政令323/2025/ND-CP",
    "footer.source3": "IFC税制優遇の概要（法人・個人）",
    "footer.disclaimer": "VietnamIFC Services (VFCS) は仲介サービスであり、法務・税務の助言は提供しません。",
  },
};

const availableLanguages = ["en", "fa", "ru", "cn", "kr", "jp"];

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

if (langSelect) {
  Array.from(langSelect.options).forEach((option) => {
    if (!availableLanguages.includes(option.value)) {
      option.disabled = true;
    }
  });

  langSelect.addEventListener("change", () => {
    const selected = langSelect.value;
    if (availableLanguages.includes(selected)) {
      applyLanguage(selected);
    }
  });
}

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
