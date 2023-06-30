/* --------------------
  OPERAZIONI INIZIALI
---------------------- */
import API_KEY from "./config.js";
// Configurazione di ChatGPT
const API_BASE_URL = 'https://api.openai.com/v1';
const GPT_MODEL = 'gpt-3.5-turbo';

// Recuperiamo gli elementi principali dalla pagina
const loader = document.querySelector('.loader');
const genreButtons = document.querySelectorAll('.genre');
const placeholder = document.querySelector('#placeholder');
const stageTemplate = document.querySelector('#stage-template');
const gameoverTemplate = document.querySelector('#gameover-template');

// Preparo una variabile per tenere tutta la chat
const completeChat = [];

// Preparo una variabile per il genere selezionato
let selectedGenre;


/* --------------------
  LOGICA DI GIOCO
--------------------- */

// Per ogni bottone dei generi...
genreButtons.forEach(function (button) {
  // Al click...
  button.addEventListener('click', function () {
    // 1. recuperiamo il genere cliccato
    // 2. Lo impostiamo come selectedGenre
    selectedGenre = button.dataset.genre;
    console.log(selectedGenre);

    // 3. Avviamo la partita
    startGame();
  });
});

// # Funzione per avviare la partita
function startGame() {
  // 1 Inserisco la classe "game-started"
  document.body.classList.add('game-started');

  // 2. Preparo le istruzioni iniziali per Chat GPT
  completeChat.push({
    role: `system`, // ? come si deve omportare chatGPT
    content: `Comportati come un classico gioco di avventura testuale. Io sarò protagonista e giocatore principale. Non fare riferimento a te stesso. L\'ambientazione di questo gioco sarà a tema ${selectedGenre}. Ogni ambientazione ha una descrizione di 150 caratteri seguita da una array di 3 azioni possibili che il giocatore può compiere. Una di queste azioni è mortale e termina il gioco. Non aggiungere mai altre spiegazioni. Non fare riferimento a te stesso. Le tue risposte sono solo in formato JSON come questo esempio:\n\n###\n\n{"description":"descrizione ambientazione","actions":["azione 1", "azione 2", "azione 3"]}###`
  });

  // 3. Genero il primo livello
  setStage();
}

// # Funzione per generare un livello
async function setStage() {
  // 0. Svuotare il placeholder
  placeholder.innerHTML = '';

  // 1. mostrare il loader
  loader.classList.remove('hidden');

  // 2. Chiedere a chatGPT di inventare il livello
  const gptResponse = await makeRequest('/chat/completions', {
    temperature: 0.7,
    model: GPT_MODEL,
    messages: completeChat
  });


  // 3. Nascondere il loader
  loader.classList.add('hidden');

  // 4. Prendiamo il messaggio di chatGPT e lo inseriamo nello storico chat
  const message = gptResponse.choices[0].message;
  completeChat.push(message);

  // 5. Recuperare il contenuto del messaggio per estrapolare le azioni e la descrizione del livello
  const content = JSON.parse(message.content);
  const actions = content.actions;
  const description = content.description;
  console.log(actions);
  console.log(description);

  if (actions.length === 0) {
    setGameOver(description);
  } else {

    // 6. Mostriamo la descrizione del livello
    setStageDescription(description);

    // 7. Generiamo e mostriamo un'immagine per il livello
    await setStagePicture(description);

    // 8. Mostriamo le azioni disponibili per questo livello
    setStageActions(actions);
  }
}


// # Funzione per effettuare richieste
async function makeRequest(endpoint, payload) {
  const url = API_BASE_URL + endpoint;

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + API_KEY
    }
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}

// # Funzione per mostrare la descrizione del livello
function setStageDescription(description) {
  // 1. Clonare il template dello stage
  const stageElement = stageTemplate.content.cloneNode(true);

  // 2. Inseriamo la descrizione
  stageElement.querySelector('.stage-description').innerText = description;

  // 3. Montiamo in pagina il template
  placeholder.appendChild(stageElement);
}


// # Funzione per generare e mostrare l'immagine del livello
async function setStagePicture(description) {
  // 1. Chiedo a OpenAI di generare un'immagine
  const generatedImage = await makeRequest('/images/generations', {
    n: 1,
    size: '512x512',
    response_format: 'url',
    prompt: `questa è una storia basata su ${selectedGenre}. ${description}`
  });

  // 2. Recuperiamo l'url dell'immagine
  const imageUrl = generatedImage.data[0].url;

  // 3. Creiamo un tag immagine
  const image = `<img alt="${description}" src="${imageUrl}">`;

  // 4. Lo inseriamo in pagina
  document.querySelector('.stage-picture').innerHTML = image;

}

// # Funzione per mostrare le azioni del livello
function setStageActions(actions) {

  // 1. Costruiamo l'HTML delle azioni
  let actionsHTML = '';
  actions.forEach(function (action) {
    actionsHTML += `<button>${action}</button>`;
  });

  // 2. Montiamoli in pagina
  document.querySelector('.stage-actions').innerHTML = actionsHTML;

  // 3. Li recuperiamo
  const actionButtons = document.querySelectorAll('.stage-actions button');

  // 4. Per ciascuno di essi...
  actionButtons.forEach(function (button) {
    // al click...
    button.addEventListener('click', function () {
      // 1. Recuperiamo l'azione scelta
      const selectedAction = button.innerText;

      // 2. Prepariamo un messaggio per chatGPT
      completeChat.push({
        role: `user`,
        content: `${selectedAction}. Se questa azione è mortale l'elenco delle azioni è vuoto. Non dare altro testo che non sia un oggetto JSON. Le tue risposte sono solo in formato JSON come questo esempio: {"description": "sei morto per questa motivazione", "actions": []}`
      });

      // 3. Richiediamo la generazione di un nuovo livello
      setStage();
    })
  });

  console.log(actionsHTML);
}

// # Funzione per gestire il gameover

function setGameOver(description) {
  // 1. Clonare il template del gameover
  const gameoverElement = gameoverTemplate.content.cloneNode(true);

  // 2. Inseriamo la descrizione nel template
  gameoverElement.querySelector('.gameover-message').innerText = description;

  // 3. Inserire il template in pagina
  placeholder.appendChild(gameoverElement);

  // 4. Recupero il bottone dal template
  const replayButton = document.querySelector('.gameover button');

  // 5. Al click...
  replayButton.addEventListener('click', function () {
    // Riavviamo la pagina e di conseguenza ripartiamo da capo
    window.location.reload();
  })

}