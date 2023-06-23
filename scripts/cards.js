function openModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  }
  
  function closeModal() {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  }


  const cardsData = [
    {
      imgSrc: "./src/images/screen-1.png",
      imgAlt: "Day One",
      description: "HTML and CSS, first lesson project, Landing Page",
      href: "./landing-page/project-1.html",
    },
    {
      imgSrc: "./src/images/screen-2.png",
      imgAlt: "Quote from a Bot.",
      description: "Lesson Project covering Javascript",
      href: '#',
    },
    {
      imgSrc: "./src/images/screen-3.png",
      imgAlt: "Emoji Chef Project",
      description: "Lesson Project realized using OpenAI platform",
      href: "#",
    },
    {
      imgSrc: "./src/images/screen-4.png",
      imgAlt: "Venture Game Project",
      description: "Lesson Project realized using OpenAI platform",
      href: "#",
    },
  ];
  
  
  function createCards(cardsData) {
    const container = document.querySelector(".cards");
  
    const cardTemplate = (card) => `
      <div class="card" style="width: 22rem">
        <div class="card-image">
          <img src="${card.imgSrc}" class="card-img-top" alt="${card.imgAlt}">
        </div>
        <div class="card-body">
          <p class="card-text">${card.description}</p>
        </div>
        <div class="card-footer">
          <a href="${card.href}" class="btn btn-primary view-btn">View</a>
        </div>
      </div>
    `;
  
    const cardsHtml = cardsData.map(cardTemplate).join("");
  
    container.innerHTML = cardsHtml;
  
    // Just for working progress projects
    const viewButtons = document.querySelectorAll(".view-btn");
    for (let i = 0; i < viewButtons.length; i++) {
      const button = viewButtons[i];
      button.addEventListener("click", function (event) {
        event.preventDefault();
        if (i >= cardsData.length - 3) {
          openModal();
        } else {
          window.location.href = button.getAttribute("href");
        }
      });
    }
  }

  
  createCards(cardsData);
  
  window.onload = function () {
    var cards = document.querySelectorAll(".card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.add("visible");
    }
  };
  
  // Aggiungi l'evento click per chiudere il modale
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", closeModal);
  
