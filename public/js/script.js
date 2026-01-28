/* ===== MOBILE MENU FUNCTIONS ===== */
function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.getElementById("mobileMenuToggle");
  
  if (navMenu && menuToggle) {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    
    // Previne scroll do body quando menu está aberto
    if (navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
}

function closeMobileMenu() {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.getElementById("mobileMenuToggle");
  
  if (navMenu && menuToggle) {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Fechar menu ao clicar fora
document.addEventListener("click", function(event) {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.getElementById("mobileMenuToggle");
  const navContent = document.querySelector(".nav-content");
  
  if (navMenu && menuToggle && navContent) {
    if (!navContent.contains(event.target) && navMenu.classList.contains("active")) {
      closeMobileMenu();
    }
  }
});

/* ===== SCROLL FUNCTIONS ===== */
function scrollToOrcamento() {
  closeMobileMenu();
  const formSection = document.getElementById("contato");
  if (formSection) {
    formSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ===== VIDEO MODAL FUNCTIONS ===== */
function openVideoModal() {
  const modal = document.getElementById("videoModal");
  const videoPlayer = document.getElementById("videoPlayer");

  if (modal && videoPlayer) {
    // ============================================
    // CONFIGURE SEU VÍDEO AQUI:
    // ============================================

    // OPÇÃO 1: YouTube
    // Substitua 'VIDEO_ID' pelo ID do seu vídeo do YouTube
    // Exemplo: Se o link é https://www.youtube.com/watch?v=dQw4w9WgXcQ
    //          Use: 'dQw4w9WgXcQ'
    const youtubeVideoId = "BdIY74LY_r8"; // <-- SUBSTITUA AQUI
    const videoUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`;

    // OPÇÃO 2: Vimeo
    // Descomente e ajuste se usar Vimeo ao invés de YouTube
    // const vimeoVideoId = 'VIDEO_ID'; // <-- SUBSTITUA AQUI
    // const videoUrl = `https://player.vimeo.com/video/${vimeoVideoId}?autoplay=1`;

    // OPÇÃO 3: Vídeo Local
    // Se usar vídeo local, comente as linhas acima e descomente abaixo
    // const videoUrl = ''; // Deixe vazio se usar tag <video> no HTML

    // ============================================

    // Carrega o vídeo no iframe (YouTube/Vimeo)
    if (videoPlayer.tagName === "IFRAME" && videoUrl && videoUrl !== "") {
      videoPlayer.src = videoUrl;
    }

    // Abre o modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Previne scroll do body

    // Se você usar vídeo local (tag <video>), descomente abaixo:
    // if (videoPlayer.tagName === 'VIDEO') {
    //   videoPlayer.play();
    // }
  }
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const videoPlayer = document.getElementById("videoPlayer");

  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = ""; // Restaura scroll do body

    // Para iframe (YouTube/Vimeo)
    if (videoPlayer && videoPlayer.tagName === "IFRAME") {
      videoPlayer.src = ""; // Para o vídeo
    }

    // Para vídeo local
    if (videoPlayer && videoPlayer.tagName === "VIDEO") {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
  }
}

// Fechar modal com tecla ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeVideoModal();
    closeMobileMenu();
  }
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          closeMobileMenu();
        }
      }
    });
  });

  // Header scroll effect
  let lastScroll = 0;
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.12)";
    } else {
      header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
    }

    lastScroll = currentScroll;
  });

  // Form de Cadastro
  const formCad = document.getElementById("form-cad");
  if (formCad) {
    formCad.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(formCad);
      const data = {
        primeiro_nome: formData.get("primeiro_nome"),
        ultimo_nome: formData.get("ultimo_nome"),
        email: formData.get("email"),
        telefone: formData.get("telefone"),
      };

      // Disable button during submission
      const submitBtn = formCad.querySelector(".btn-submit");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';

      // Enviar os dados via fetch para o backend
      fetch("/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((data) => {
          alert(
            "Orçamento enviado com sucesso! Entraremos em contato em breve."
          );
          formCad.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        })
        .catch((error) => {
          console.error("Erro:", error);
          alert("Erro ao enviar formulário. Por favor, tente novamente.");
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        });
    });
  }

  // Form de Ajuda
  const formHelp = document.getElementById("form-help");
  if (formHelp) {
    formHelp.addEventListener("submit", function (e) {
      e.preventDefault();

      // Captura dos dados do formulário
      const ajuda = document.getElementById("ajuda").value;
      const mensagem = document.getElementById("msg").value;

      if (!mensagem.trim()) {
        alert("Por favor, escreva uma mensagem.");
        return;
      }

      // Disable button during submission
      const submitBtn = formHelp.querySelector(".btn-submit");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';

      // Monta a mensagem para o WhatsApp
      const mensagemWhatsApp = `Olá! Tenho interesse no Funcionário 24h para WhatsApp.\n\nAssunto: ${ajuda}\n\nMensagem: ${mensagem}`;

      // Número de telefone para o WhatsApp (formato internacional)
      const numeroWhatsApp = "5511957809625";

      // Cria a URL para abrir no WhatsApp
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
        mensagemWhatsApp
      )}`;

      // Abre a janela do WhatsApp com a mensagem
      window.open(urlWhatsApp, "_blank");

      // Limpa o formulário
      formHelp.reset();

      // Reset button after a short delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1000);
    });
  }

  // Animate on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe feature cards and benefit cards
  document
    .querySelectorAll(".feature-card, .benefit-card, .use-case-card")
    .forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });
});

