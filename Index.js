const mineflayer = require('mineflayer');

const CONFIG = {
  host: 'SEU_IP_DO_ATERNOS.aternos.me', // Substitua pelo seu IP do Aternos
  port: 25565,
  username: 'BotAntiAFK',                // Nome do bot
  version: '1.20.1'                     // Altere para a versão do seu servidor
};

let bot;

function criarBot() {
  bot = mineflayer.createBot(CONFIG);

  bot.on('spawn', () => {
    console.log('🤖 Bot entrou no servidor! Iniciando rotina anti-AFK...');
    executarAcaoAleatoria();
  });

  bot.on('end', (reason) => {
    console.log(`❌ Bot desconectado (${reason}). Tentando reconectar em 30 segundos...`);
    setTimeout(criarBot, 30000); // Tenta reconectar a cada 30 segundos se o servidor cair
  });

  bot.on('error', (err) => console.log('⚠️ Erro no bot:', err));
}

// Função principal que escolhe uma atividade aleatória para o bot fazer
function executarAcaoAleatoria() {
  if (!bot || !bot.entity) return;

  const acoes = [andar, pular, olharAoRedor, interagirComOAr, falarNoChat];
  // Sorteia uma das ações da lista acima
  const acaoSorteada = acoes[Math.floor(Math.random() * acoes.length)];
  
  acaoSorteada();

  // Espera entre 5 a 15 segundos para inventar a próxima moda
  const proximoTempo = Math.random() * 10000 + 5000;
  setTimeout(executarAcaoAleatoria, proximoTempo);
}

// ---- LISTA DE AÇÕES DO BOT ----

function andar() {
  const direcoes = ['forward', 'back', 'left', 'right'];
  const dir = direcoes[Math.floor(Math.random() * direcoes.length)];
  
  bot.setControlState(dir, true);
  
  // Anda por 1 a 3 segundos e para
  setTimeout(() => {
    bot.clearControlStates();
  }, Math.random() * 2000 + 1000);
}

function pular() {
  bot.setControlState('jump', true);
  setTimeout(() => bot.setControlState('jump', false), 500);
}

function olharAoRedor() {
  // Sorteia um ângulo aleatório para olhar (horizontal e vertical)
  const yaw = Math.random() * Math.PI * 2;
  const pitch = (Math.random() - 0.5) * Math.PI / 2;
  bot.look(yaw, pitch, true);
}

function interagirComOAr() {
  // Finge que está batendo/quebrando um bloco no ar para gerar atividade física no jogo
  bot.swingArm('right');
}

function falarNoChat() {
  // Envia uma mensagem muito raramente (10% de chance quando essa função é chamada)
  // Isso evita spam e banimentos por administradores
  if (Math.random() < 0.1) {
    const frases = ['Apenas minerando...', 'Opa!', 'Achei um lugar legal', 'Aternos 24/7 ligado!'];
    const frase = frases[Math.floor(Math.random() * frases.length)];
    bot.chat(frase);
  }
}

// Inicializa o bot pela primeira vez
criarBot();
  
