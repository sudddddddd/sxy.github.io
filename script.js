const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const header = document.querySelector(".site-header");

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-label", isDark ? "切换为浅色模式" : "切换为深色模式");
  themeColor.setAttribute("content", isDark ? "#090909" : "#f0f0ed");
}

const storedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
applyTheme(storedTheme || preferredTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  mobileNav.hidden = true;
}

menuToggle.addEventListener("click", () => {
  const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(willOpen));
  mobileNav.hidden = !willOpen;
});

mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

const educationData = [
  {
    id: "high-school",
    time: "09/2019 – 06/2022",
    location: "广东广州",
    school: "广州市培英中学",
    degree: "高中",
  },
  {
    id: "undergraduate",
    time: "09/2022 – 06/2026",
    location: "广东河源",
    school: "广东技术师范大学",
    degree: "本科",
    major: "数据科学与大数据技术",
  },
  {
    id: "graduate",
    time: "09/2026 – 至今",
    location: "广东深圳",
    school: "深圳大学",
    degree: "硕士研究生",
    major: "计算机技术",
  },
];

const awardsData = [
  {
    id: "lanqiao-cup",
    time: "2024/06",
    name: "第十五届蓝桥杯广东赛区 C/C++ B组一等奖",
    event: "蓝桥杯全国软件和信息技术专业人才大赛",
    level: "广东赛区一等奖",
  },
  {
    id: "teddy-cup",
    time: "2024/06",
    name: "第12届泰迪杯数据挖掘比赛全国三等奖",
    event: "泰迪杯数据挖掘挑战赛",
    level: "全国三等奖",
  },
  {
    id: "huashu-cup",
    time: "2024/08",
    name: "华数杯数学建模比赛二等奖",
    event: "华数杯数学建模竞赛",
    level: "二等奖",
  },
  {
    id: "guangdong-modeling",
    time: "2024/09",
    name: "广东省数学建模比赛二等奖",
    event: "广东省数学建模比赛",
    level: "二等奖",
  },
];

const experienceData = [
  {
    id: "competition-department",
    time: "09/2023 – 09/2024",
    organization: "广东技术师范大学科创中心",
    position: "竞赛部副部长",
    description: [
      "统筹校级“互联网+”“挑战杯”等核心创新创业赛事全流程筹备，完成赛务对接、参赛材料初审、评审现场协调等工作，保障多场校级赛事零失误落地。",
      "负责竞赛板块公众号宣传运营，撰写赛事预告、获奖公示等原创推文，单篇最高阅读量突破2000。",
    ],
  },
  {
    id: "counselor-assistant",
    time: "09/2023 – 06/2025",
    organization: "广东技术师范大学自动化学院",
    position: "辅导员助理",
    description: [
      "协助辅导员处理学生档案、成绩记录等日常事务。",
      "牵头策划班级团建、专业学术讲座等多场学生活动，搭建师生日常沟通与学术交流渠道。",
    ],
  },
];

const educationList = document.querySelector("#education-list");
const awardsList = document.querySelector("#awards-list");
const experienceList = document.querySelector("#experience-list");

if (educationList) {
  educationList.innerHTML = educationData
    .map(
      (item) => `
        <article class="education-card" data-entry-id="${item.id}">
          <div class="education-meta">
            <div class="education-time">${item.time}</div>
          </div>
          <div class="education-content">
            <div class="education-info-row">
              <span class="content-label">${item.degree}</span>
              <span class="education-location">${item.location}</span>
            </div>
            <h4>${item.school}</h4>
            ${item.major ? `<p>${item.major}</p>` : ""}
          </div>
        </article>`
    )
    .join("");
}

if (awardsList) {
  awardsList.innerHTML = awardsData
    .map(
      (item) => `
        <article class="award-card" data-entry-id="${item.id}">
          <span class="award-year">${item.time}</span>
          <p class="award-event">${item.event}</p>
          <h4>${item.name}</h4>
          <p>${item.level}</p>
        </article>`
    )
    .join("");
}

if (experienceList) {
  experienceList.innerHTML = experienceData
    .map(
      (item) => `
        <article class="resume-card" data-entry-id="${item.id}">
          <div class="resume-card-meta"><span>${item.time}</span></div>
          <p class="card-state">${item.organization}</p>
          <h4>${item.position}</h4>
          <div class="resume-card-description">
            ${item.description.map((paragraph) => `<p>${paragraph}</p>`).join("")}
          </div>
        </article>`
    )
    .join("");
}

const aboutTabs = [...document.querySelectorAll(".about-tab")];
const aboutPanels = [...document.querySelectorAll(".about-panel")];

function activateAboutTab(tab, moveFocus = false) {
  const panelId = tab.getAttribute("aria-controls");

  aboutTabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });

  aboutPanels.forEach((panel) => {
    panel.classList.remove("is-active");
    panel.hidden = panel.id !== panelId;
  });

  const activePanel = document.querySelector(`#${panelId}`);
  requestAnimationFrame(() => {
    if (!activePanel.hidden) activePanel.classList.add("is-active");
  });

  if (moveFocus) tab.focus();
}

aboutTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateAboutTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % aboutTabs.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + aboutTabs.length) % aboutTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = aboutTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateAboutTab(aboutTabs[nextIndex], true);
  });
});

const skillItems = [
  {
    name: "DATA ANALYSIS",
    percentage: "70%",
    icon: '<path d="M4 19v-8M10 19V5M16 19v-5M22 19H2"></path>',
  },
  {
    name: "C/C++",
    percentage: "80%",
    icon: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"></path>',
  },
  {
    name: "PHOTO SHOOTING",
    percentage: "100%",
    icon: '<path d="M14.5 5 13 3h-2L9.5 5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.5Z"></path><circle cx="12" cy="12" r="4"></circle>',
  },
  {
    name: "DANCE",
    percentage: "75%",
    icon: '<circle cx="12" cy="4.5" r="2"></circle><path d="m8 21 2-7-3-3 3-4 4 2 3 1M14 21l-2-7 3-3"></path>',
  },
  {
    name: "DRUM KIT",
    percentage: "50%",
    icon: '<ellipse cx="12" cy="10" rx="7" ry="3"></ellipse><path d="M5 10v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M9 18l-1 4M15 18l1 4M7 6 4 2M17 6l3-4"></path>',
  },
  {
    name: "BOARD GAME",
    percentage: "80%",
    icon: '<rect x="4" y="4" width="16" height="16" rx="3"></rect><circle cx="9" cy="9" r="1"></circle><circle cx="15" cy="15" r="1"></circle><circle cx="15" cy="9" r="1"></circle><circle cx="9" cy="15" r="1"></circle>',
  },
];

const skillImages = {
  "DATA ANALYSIS": [
    { src: "assets/skills/data-analysis-1.jpg", alt: "数据分析软件图标", fit: "contain" },
    { src: "assets/skills/data-analysis-2.png", alt: "SQL 数据库图标", fit: "contain" },
    { src: "assets/skills/data-analysis-3.jpg", alt: "数据分析技术图标", fit: "contain" },
  ],
  "PHOTO SHOOTING": [
    { src: "assets/skills/photo-1.jpg", alt: "喷泉与红色郁金香摄影作品", fit: "cover", position: "center 58%" },
    { src: "assets/skills/photo-2.jpg", alt: "餐桌食物摄影作品", fit: "cover", position: "center center" },
    { src: "assets/skills/photo-3.jpg", alt: "森林中拍摄者的摄影作品", fit: "cover", position: "center 68%" },
  ],
  "DRUM KIT": [
    { src: "assets/skills/drum-1.jpg", alt: "黑色架子鼓设备", fit: "contain" },
    { src: "assets/skills/drum-2.jpg", alt: "竖屏架子鼓演奏画面", fit: "cover", position: "center 26%" },
    { src: "assets/skills/drum-3.jpg", alt: "架子鼓演奏近景", fit: "cover", position: "center center" },
  ],
  "BOARD GAME": [
    { src: "assets/skills/board-game-1.jpg", alt: "家庭主题桌游", fit: "cover" },
    { src: "assets/skills/board-game-2.jpg", alt: "桌游棋盘与配件", fit: "cover" },
    { src: "assets/skills/board-game-3.jpg", alt: "飞行棋桌游", fit: "cover" },
  ],
};

const skillPreviewPlacement = {
  "DATA ANALYSIS": "top",
  "PHOTO SHOOTING": "top",
};

const skillsContainer = document.querySelector("#skills-honeycomb");

if (skillsContainer) {
  skillsContainer.innerHTML = skillItems
    .map(
      (item) => {
        const hasImages = Boolean(skillImages[item.name]);
        const interactiveAttributes = hasImages
          ? ` data-skill-preview="${item.name}" role="button" tabindex="0" aria-label="${item.name}，${item.percentage}，查看图片"`
          : ` aria-label="${item.name}，${item.percentage}"`;

        return `
        <article class="hex-card${hasImages ? " has-preview" : ""}"${interactiveAttributes}>
          <div class="hex-card-reveal">
            <div class="hex-card-shape">
              <div class="hex-card-content">
                <span class="hex-card-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">${item.icon}</svg>
                </span>
                <h3>${item.name}</h3>
              </div>
            </div>
            <span class="hex-percentage">${item.percentage}</span>
          </div>
        </article>
      `;
      }
    )
    .join("");

  const skillRevealMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const skillRevealItems = [...skillsContainer.querySelectorAll(".hex-card-reveal")];

  if (!skillRevealMotion.matches && "IntersectionObserver" in window) {
    skillsContainer.classList.add("has-blur-reveal");
    skillRevealItems.forEach((item, index) => item.style.setProperty("--skill-reveal-delay", `${index * 100}ms`));

    const skillRevealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    skillRevealItems.forEach((item) => skillRevealObserver.observe(item));
    window.addEventListener("pagehide", () => skillRevealObserver.disconnect(), { once: true });
  } else {
    skillRevealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const previewLayer = document.createElement("div");
  previewLayer.className = "skill-image-preview";
  previewLayer.id = "skill-image-preview";
  previewLayer.setAttribute("aria-hidden", "true");
  previewLayer.innerHTML = `
    <button class="skill-preview-backdrop" type="button" aria-label="关闭图片预览"></button>
    <div class="skill-preview-stage"></div>
    <button class="skill-preview-close" type="button" aria-label="关闭图片预览">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg>
    </button>
  `;
  document.body.append(previewLayer);

  const previewStage = previewLayer.querySelector(".skill-preview-stage");
  const previewClose = previewLayer.querySelector(".skill-preview-close");
  const previewBackdrop = previewLayer.querySelector(".skill-preview-backdrop");
  const previewCards = [...skillsContainer.querySelectorAll(".hex-card.has-preview")];
  const touchPreview = window.matchMedia("(max-width: 767px), (hover: none), (pointer: coarse)");
  const previewMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activePreviewCard = null;
  let previewOpenTimer;
  let previewCloseTimer;
  let previewToken = 0;

  function buildPreviewImages(skillName) {
    previewStage.replaceChildren(
      ...skillImages[skillName].map((image, index) => {
        const frame = document.createElement("figure");
        frame.className = `skill-preview-frame fit-${image.fit}`;
        frame.style.setProperty("--preview-index", index);
        const previewImage = document.createElement("img");
        previewImage.src = image.src;
        previewImage.alt = image.alt;
        previewImage.decoding = "async";
        previewImage.draggable = false;
        previewImage.style.objectPosition = image.position || "center";
        previewImage.addEventListener("load", () => frame.classList.add("is-loaded"), { once: true });
        previewImage.addEventListener("error", () => frame.remove(), { once: true });
        if (previewImage.complete && previewImage.naturalWidth > 0) frame.classList.add("is-loaded");
        frame.append(previewImage);
        return frame;
      })
    );
  }

  function positionDesktopPreview(card) {
    const cardRect = card.getBoundingClientRect();
    const headingRect = document.querySelector(".skills-heading").getBoundingClientRect();
    const placement = skillPreviewPlacement[card.dataset.skillPreview] || "auto";
    const forceTop = placement === "top";
    const frameHalfSpan = 252;
    const center = Math.min(
      Math.max(cardRect.left + cardRect.width / 2, frameHalfSpan),
      window.innerWidth - frameHalfSpan
    );
    const topCandidate = cardRect.top - 162;
    const canOpenAbove = forceTop || topCandidate > Math.max(12, headingRect.bottom + 12);
    const top = forceTop
      ? Math.max(12, cardRect.top - 176)
      : canOpenAbove
        ? topCandidate
        : Math.min(cardRect.bottom + 18, window.innerHeight - 166);
    previewStage.style.left = `${Math.round(center)}px`;
    previewStage.style.top = `${Math.round(Math.max(12, top))}px`;
    previewLayer.dataset.direction = canOpenAbove ? "above" : "below";
    previewLayer.dataset.placement = placement;
  }

  function clearActiveCard() {
    previewCards.forEach((card) => card.classList.remove("is-preview-active"));
  }

  function showPreview(card, useModal = false) {
    const skillName = card.dataset.skillPreview;
    if (!skillImages[skillName]) return;
    const token = ++previewToken;
    window.clearTimeout(previewOpenTimer);
    window.clearTimeout(previewCloseTimer);
    previewLayer.classList.remove("is-visible");
    previewLayer.classList.toggle("is-modal", useModal);
    previewLayer.removeAttribute("role");
    previewLayer.removeAttribute("aria-modal");
    clearActiveCard();
    activePreviewCard = card;
    card.classList.add("is-preview-active");

    previewOpenTimer = window.setTimeout(() => {
      if (token !== previewToken || activePreviewCard !== card) return;
      buildPreviewImages(skillName);
      if (!useModal) positionDesktopPreview(card);
      else {
        previewLayer.setAttribute("role", "dialog");
        previewLayer.setAttribute("aria-modal", "true");
      }
      previewLayer.setAttribute("aria-hidden", "false");
      requestAnimationFrame(() => {
        if (token !== previewToken) return;
        previewLayer.classList.add("is-visible");
        if (useModal) previewClose.focus({ preventScroll: true });
      });
    }, previewStage.childElementCount ? 100 : 0);
  }

  function hidePreview(immediate = false, restoreFocus = false) {
    const closingCard = activePreviewCard;
    ++previewToken;
    window.clearTimeout(previewOpenTimer);
    window.clearTimeout(previewCloseTimer);
    previewLayer.classList.remove("is-visible");
    clearActiveCard();
    activePreviewCard = null;

    previewCloseTimer = window.setTimeout(() => {
      previewLayer.classList.remove("is-modal");
      previewLayer.removeAttribute("role");
      previewLayer.removeAttribute("aria-modal");
      previewLayer.setAttribute("aria-hidden", "true");
      previewStage.replaceChildren();
      if (restoreFocus && closingCard) closingCard.focus({ preventScroll: true });
    }, immediate || previewMotion.matches ? 0 : 450);
  }

  previewCards.forEach((card) => {
    card.addEventListener("pointerenter", () => {
      if (!touchPreview.matches) showPreview(card);
    });
    card.addEventListener("pointerleave", () => {
      if (!touchPreview.matches && document.activeElement !== card) {
        window.clearTimeout(previewCloseTimer);
        previewCloseTimer = window.setTimeout(() => hidePreview(), 130);
      }
    });
    card.addEventListener("focus", () => {
      if (!touchPreview.matches) showPreview(card);
    });
    card.addEventListener("blur", () => {
      if (!touchPreview.matches) hidePreview();
    });
    card.addEventListener("click", () => {
      if (touchPreview.matches) showPreview(card, true);
    });
    card.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && touchPreview.matches) {
        event.preventDefault();
        showPreview(card, true);
      }
    });
  });

  previewClose.addEventListener("click", () => hidePreview(false, true));
  previewBackdrop.addEventListener("click", () => hidePreview(false, true));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activePreviewCard) {
      hidePreview(false, previewLayer.classList.contains("is-modal"));
    }
  });
  window.addEventListener(
    "scroll",
    () => {
      if (activePreviewCard && !previewLayer.classList.contains("is-modal")) {
        positionDesktopPreview(activePreviewCard);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", () => {
    if (!activePreviewCard) return;
    if (touchPreview.matches) showPreview(activePreviewCard, true);
    else {
      previewLayer.classList.remove("is-modal");
      positionDesktopPreview(activePreviewCard);
    }
  });
}

const projectItems = [
  {
    number: "01",
    year: "待补充",
    title: "工业生产线故障自动识别模型",
    category: "机器学习项目",
    description: [
      "本项目面向工业生产线设备运维场景，目标实现装置故障的自动识别与预测。项目中我独立完成故障数据集的预处理工作，针对 9 类不同设备故障的业务特点完成定制化特征工程；针对工业数据集普遍存在的样本类别不平衡问题开展数据优化处理。",
      "为横向验证算法效果，搭建 SVM、XGBoost、随机森林三种机器学习模型进行对照实验。考虑到故障检测场景漏检的业务风险，选取召回率、PR-AUC 曲线作为核心评估指标，完成多模型性能对比分析，筛选得到最优模型，完成机器故障的精准预测。",
    ],
    tags: ["Python", "SVM", "XGBoost", "Random Forest", "特征工程", "PR-AUC"],
    images: [
      { src: "assets/projects/fault-1.png", alt: "设备故障自动识别与预测端到端流程图", fit: "contain" },
      { src: "assets/projects/fault-2.png", alt: "SVM、XGBoost 与随机森林模型对比及评估指标图", fit: "contain" },
      { src: "assets/projects/fault-3.png", alt: "工业设备故障数据预处理与特征工程图", fit: "contain" },
    ],
  },
  {
    number: "02",
    year: "待补充",
    title: "网上蛋糕商城系统",
    category: "电商系统",
    description: [
      "本项目为 B/S 架构网上蛋糕电商商城，基于 MVC 分层模式进行开发。后端使用 Servlet 作为控制器接收、分发前端请求，利用 JavaBean 完成业务逻辑封装与数据实体映射；前端结合 JSP+CSS 实现动态网页渲染，底层采用 MySQL 存储业务数据。",
      "数据库层面完成整体表结构设计，设计用户、商品、订单、订单项、商品分类、推荐位 6 张核心数据表，通过外键建立表间关联关系，保证业务关联数据的一致性。",
      "系统划分前台用户端与后台管理端两大模块：后台实现用户登录认证、商品信息 CRUD 以及商品上下架管理，支持订单从未付款、已付款、配送中到已完成的完整状态流转管控；面向普通用户的前台实现商品分类展示、热销与新品推荐、购物车增删改、订单生成与状态查询、个人信息维护等核心电商业务，完整实现蛋糕商城的业务闭环。",
    ],
    tags: ["Java", "Servlet", "JSP", "CSS", "MySQL", "MVC"],
    images: [
      { src: "assets/projects/cake-1.png", alt: "蛋糕商城首页", fit: "contain" },
      { src: "assets/projects/cake-2.png", alt: "蛋糕商城商品分类页面", fit: "contain" },
      { src: "assets/projects/cake-3.png", alt: "蛋糕商城热销商品页面", fit: "contain" },
    ],
  },
  {
    number: "03",
    year: "待补充",
    title: "进销存管理系统",
    category: "管理系统",
    description: [
      "本项目是面向中小企业业务场景的进销存管理系统，采用模拟 MVC 分层架构进行开发。项目运用 Java 接口与多态特性对业务模块解耦，划分不同业务层级，降低模块耦合度，提升代码可维护性。",
      "数据层先通过 Java 集合完成商品、订单数据的内存模拟存储；引入 JDBC 驱动对接 MySQL 数据库，实现业务数据持久化，完成商品、订单信息的增删改查。",
      "系统实现完整的身份登录验证逻辑，通过正则表达式校验账号密码格式，增加 4 位随机验证码机制提升登录安全性；支持商品关键词模糊搜索，完成库存数量的动态调整。",
      "订单管理模块支持订单号、客户姓名、时间范围的多条件组合查询，新建订单可自动生成系统时间戳记录下单时间，覆盖商品入库、出库、订单查询等进销存核心业务。",
    ],
    tags: ["Java", "JDBC", "MySQL", "MVC", "Collections", "OOP"],
    images: [
      { src: "assets/projects/inventory-1.png", alt: "进销存管理系统模拟 MVC 分层架构图", fit: "contain" },
      { src: "assets/projects/inventory-2.png", alt: "进销存管理系统内存模拟与 MySQL 数据持久化流程图", fit: "contain" },
      { src: "assets/projects/inventory-3.png", alt: "进销存管理系统核心业务模块图", fit: "contain" },
    ],
  },
];

const projectCarousel = document.querySelector("#project-carousel");

if (projectCarousel) {
  const projectPosition = document.querySelector("#project-position");
  const projectYear = document.querySelector("#project-year");
  const projectKicker = document.querySelector("#project-kicker");
  const projectName = document.querySelector("#project-name");
  const projectDescription = document.querySelector("#project-description");
  const projectTags = document.querySelector("#project-tags");
  const projectGallery = document.querySelector("#project-gallery");
  const projectMainImage = document.querySelector("#project-main-image");
  const projectThumbnails = document.querySelector("#project-thumbnails");
  const projectCategory = document.querySelector("#project-category");
  const projectDots = document.querySelector("#project-dots");
  const previousProject = document.querySelector("#project-prev");
  const nextProject = document.querySelector("#project-next");
  const pauseProject = document.querySelector("#project-pause");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const autoplayDelay = 3000;
  let currentProject = 0;
  let autoplayTimer;
  let transitionTimer;
  let galleryTimer;
  let currentProjectImage = 0;
  let pointerInside = false;
  let focusInside = false;
  let userPaused = false;

  projectDots.innerHTML = projectItems
    .map(
      (item, index) =>
        `<button class="project-dot" type="button" aria-label="查看项目 ${item.number}" data-project-index="${index}"></button>`
    )
    .join("");

  const dotButtons = [...projectDots.querySelectorAll(".project-dot")];

  function autoplayIsPaused() {
    return userPaused || pointerInside || focusInside || document.hidden || reducedMotion.matches;
  }

  function stopAutoplay() {
    window.clearTimeout(autoplayTimer);
  }

  function scheduleAutoplay() {
    stopAutoplay();
    if (autoplayIsPaused()) return;
    autoplayTimer = window.setTimeout(() => changeProject(currentProject + 1), autoplayDelay);
  }

  function updateGallerySelection(project, imageIndex) {
    const image = project.images[imageIndex];
    if (!image) return;
    currentProjectImage = imageIndex;
    projectMainImage.src = image.src;
    projectMainImage.alt = image.alt;
    projectMainImage.style.objectFit = image.fit || "cover";
    [...projectThumbnails.querySelectorAll(".project-thumbnail")].forEach((thumbnail, index) => {
      const isActive = index === imageIndex;
      thumbnail.classList.toggle("is-active", isActive);
      thumbnail.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function selectGalleryImage(imageIndex) {
    const project = projectItems[currentProject];
    window.clearTimeout(galleryTimer);
    if (reducedMotion.matches) {
      updateGallerySelection(project, imageIndex);
      return;
    }
    projectGallery.classList.add("is-switching");
    galleryTimer = window.setTimeout(() => {
      updateGallerySelection(project, imageIndex);
      requestAnimationFrame(() => projectGallery.classList.remove("is-switching"));
    }, 160);
  }

  function renderProjectGallery(project) {
    window.clearTimeout(galleryTimer);
    projectGallery.classList.remove("is-switching");
    projectThumbnails.replaceChildren(
      ...project.images.map((image, index) => {
        const button = document.createElement("button");
        button.className = "project-thumbnail";
        button.type = "button";
        button.setAttribute("aria-label", `查看${project.title}图片 ${index + 1}`);
        button.dataset.imageIndex = String(index);
        const thumbnail = document.createElement("img");
        thumbnail.src = image.src;
        thumbnail.alt = "";
        thumbnail.loading = "lazy";
        thumbnail.style.objectFit = image.fit || "cover";
        button.append(thumbnail);
        return button;
      })
    );
    updateGallerySelection(project, 0);
  }

  function updateProjectContent() {
    const project = projectItems[currentProject];
    projectPosition.textContent = `项目 ${project.number} / ${String(projectItems.length).padStart(2, "0")}`;
    projectYear.textContent = `年份${project.year}`;
    projectKicker.textContent = project.category;
    projectName.textContent = project.title;
    projectDescription.replaceChildren(
      ...project.description.map((paragraph) => {
        const element = document.createElement("p");
        element.textContent = paragraph;
        return element;
      })
    );
    projectDescription.scrollTop = 0;
    projectCategory.textContent = project.category;
    renderProjectGallery(project);
    projectTags.replaceChildren(
      ...project.tags.map((tag) => {
        const item = document.createElement("li");
        item.textContent = tag;
        return item;
      })
    );
    dotButtons.forEach((dot, index) => {
      const isActive = index === currentProject;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  function changeProject(nextIndex, animate = true) {
    window.clearTimeout(transitionTimer);
    currentProject = (nextIndex + projectItems.length) % projectItems.length;

    if (animate && !reducedMotion.matches) {
      projectCarousel.classList.add("is-changing");
      transitionTimer = window.setTimeout(() => {
        updateProjectContent();
        requestAnimationFrame(() => projectCarousel.classList.remove("is-changing"));
      }, 200);
    } else {
      projectCarousel.classList.remove("is-changing");
      updateProjectContent();
    }

    scheduleAutoplay();
  }

  previousProject.addEventListener("click", () => changeProject(currentProject - 1));
  nextProject.addEventListener("click", () => changeProject(currentProject + 1));
  dotButtons.forEach((dot, index) => dot.addEventListener("click", () => changeProject(index)));
  projectThumbnails.addEventListener("click", (event) => {
    const thumbnail = event.target.closest(".project-thumbnail");
    if (!thumbnail) return;
    selectGalleryImage(Number(thumbnail.dataset.imageIndex));
  });

  pauseProject.addEventListener("click", () => {
    userPaused = !userPaused;
    pauseProject.setAttribute("aria-pressed", String(userPaused));
    pauseProject.setAttribute("aria-label", userPaused ? "继续自动轮播" : "暂停自动轮播");
    if (userPaused) stopAutoplay();
    else scheduleAutoplay();
  });

  projectCarousel.addEventListener("mouseenter", () => {
    pointerInside = true;
    stopAutoplay();
  });
  projectCarousel.addEventListener("mouseleave", () => {
    pointerInside = false;
    scheduleAutoplay();
  });
  projectCarousel.addEventListener("focusin", () => {
    focusInside = true;
    stopAutoplay();
  });
  projectCarousel.addEventListener("focusout", () => {
    requestAnimationFrame(() => {
      focusInside = projectCarousel.contains(document.activeElement);
      scheduleAutoplay();
    });
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else scheduleAutoplay();
  });
  reducedMotion.addEventListener("change", scheduleAutoplay);

  updateProjectContent();
  scheduleAutoplay();
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
const sections = document.querySelectorAll("main > section[id]");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener(
  "scroll",
  () => header.classList.toggle("is-scrolled", window.scrollY > 12),
  { passive: true }
);

const visitKey = "academic-portfolio-visits";
const visits = Number.parseInt(localStorage.getItem(visitKey) || "0", 10) + 1;
localStorage.setItem(visitKey, String(visits));
document.querySelector("#visit-count").textContent = visits.toLocaleString("zh-CN");
document.querySelector("#current-year").textContent = new Date().getFullYear();
