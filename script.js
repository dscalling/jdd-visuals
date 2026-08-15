const esc = (v) => String(v)
  .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
  .replaceAll('"',"&quot;").replaceAll("'","&#039;");

document.title = `${SITE.brand.name} — ${SITE.brand.tagline}`;

document.querySelector("#availability").textContent = SITE.brand.availability;
document.querySelector("#availability2").textContent = SITE.brand.availability;
document.querySelector("#heroEyebrow").textContent = SITE.hero.eyebrow;
document.querySelector("#heroTitle").innerHTML = SITE.hero.title;
document.querySelector("#heroText").textContent = SITE.hero.text;
document.querySelector("#heroPrimary").innerHTML = `${esc(SITE.hero.primaryButton)} <span>↗</span>`;
document.querySelector("#heroSecondary").textContent = SITE.hero.secondaryButton;

document.querySelector("#servicesGrid").innerHTML = SITE.services.map(s => `
  <article class="service">
    <span class="service-num">${esc(s.number)}</span>
    <div>
      <h3>${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
    </div>
  </article>`).join("");

document.querySelector("#processGrid").innerHTML = SITE.process.map(s => `
  <article class="step">
    <span class="step-num">${esc(s[0])}</span>
    <h3>${esc(s[1])}</h3>
    <p>${esc(s[2])}</p>
  </article>`).join("");

document.querySelector("#projectsGrid").innerHTML = SITE.projects.map(p => `
  <article class="project">
    <span class="tag">${esc(p.category)}</span>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.description)}</p>
  </article>`).join("");

document.querySelector("#statsGrid").innerHTML = SITE.stats.map(([v,l]) => `
  <div class="stat"><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join("");

document.querySelector("#faqList").innerHTML = SITE.faq.map(([q,a]) => `
  <article class="faq-item">
    <div class="faq-question"><span>${esc(q)}</span><span>+</span></div>
    <div class="faq-answer">${esc(a)}</div>
  </article>`).join("");

document.querySelector("#instagram").textContent = SITE.brand.instagram;
document.querySelector("#footerBrand").textContent = SITE.brand.name;
document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#legalOwner").textContent = SITE.brand.legal.owner;
document.querySelector("#legalAddress").textContent = SITE.brand.legal.address;
document.querySelector("#legalPhone").textContent = SITE.brand.legal.phone;
document.querySelector("#legalEmail").textContent = SITE.brand.legal.email;
document.querySelector("#privacyText").textContent = SITE.legal.privacyText;
document.querySelector("#cookieText").textContent = SITE.legal.cookieText;

// FAQ auf-/zuklappbar
document.querySelectorAll(".faq-item").forEach(item => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  answer.hidden = true;
  question.addEventListener("click", () => {
    const open = !answer.hidden;
    answer.hidden = open;
    item.classList.toggle("open", !open);
    question.lastElementChild.textContent = open ? "+" : "−";
  });
});

// Cookie-Hinweis: einfache Auswahl für technisch notwendige Cookies.
const cookieBanner = document.querySelector("#cookieBanner");
const cookieKey = "jdd_cookie_choice";
const savedCookieChoice = localStorage.getItem(cookieKey);
if (!savedCookieChoice) cookieBanner.hidden = false;

function closeCookieBanner(choice) {
  localStorage.setItem(cookieKey, choice);
  cookieBanner.hidden = true;
}
document.querySelector("#cookieAccept").addEventListener("click", () => closeCookieBanner("accepted"));
document.querySelector("#cookieNecessary").addEventListener("click", () => closeCookieBanner("necessary"));
document.querySelector("#cookieSettings").addEventListener("click", () => {
  cookieBanner.hidden = false;
});

document.querySelector(".menu").addEventListener("click", () => {
  const nav = document.querySelector(".nav nav");
  const open = nav.dataset.open === "true";
  nav.dataset.open = String(!open);
  nav.style.display = open ? "" : "flex";
  if (!open) {
    nav.style.position="absolute"; nav.style.top="82px"; nav.style.left="0"; nav.style.right="0";
    nav.style.padding="22px 6vw"; nav.style.background="#070707";
    nav.style.flexDirection="column"; nav.style.alignItems="flex-start";
  }
});


// ============================================================
// PROJEKTANFRAGE – EMAILJS
// ============================================================
emailjs.init({
  publicKey: SITE.emailjs.publicKey
});

const projectForm = document.querySelector("#projectForm");
const formSuccess = document.querySelector("#formSuccess");
const formError = document.querySelector("#formError");

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = projectForm.querySelector(".form-submit");
  const originalButton = submitButton.innerHTML;

  formSuccess.hidden = true;
  formError.hidden = true;
  submitButton.disabled = true;
  submitButton.innerHTML = "Wird gesendet …";

  try {
    // 1. Anfrage an JDD Visuals
    await emailjs.sendForm(
      SITE.emailjs.serviceId,
      SITE.emailjs.inquiryTemplateId,
      projectForm
    );

    // 2. Deutsche Bestätigungs-Mail an den Auftraggeber
    await emailjs.sendForm(
      SITE.emailjs.serviceId,
      SITE.emailjs.autoReplyTemplateId,
      projectForm
    );

    projectForm.reset();
    window.location.href = "./thanks.html";
  } catch (error) {
    console.error("EmailJS error:", error);
    formError.hidden = false;
    submitButton.disabled = false;
    submitButton.innerHTML = originalButton;
  }
});
