const mineflayer = require('mineflayer');

// Configurações exatas do seu servidor do Aternos
const CONFIG = {
  host: 'Cabosemfio.aternos.me', 
  port: 61495,                  
  username: 'BotAntiAFK',       
  version: '1.21.0'             // Compatibilidade para o protocolo Bedrock v26.2
};

let bot;

function criarBot() {
  console.log('🤖 Tentando conectar ao servidor Bedrock...');
  
  // Cria o bot em modo offline (Cracked) necessário para o Aternos
  bot = mineflayer.createBot({
    ...CONFIG,
    auth: 'offline'
  });

  // Ação executada assim que o bot entra no mundo
  bot.on('spawn', () => {
    console.log('✅ Bot entrou com sucesso! Iniciando rotina anti-AFK...');
    executarAcaoAleatoria();
  });

  // Sistema de reconexão automática caso o bot seja expulso ou caia
  bot.on('end', (reason) => {
    console.log(`❌ Bot desconectado (${reason}). Tentando reconectar em 30 segundos...`);
    setTimeout(criarBot, 30000);
  });

  // Captura de erros para evitar que o script trave na nuvem
  bot.on('error', (err) => {
    console.log('⚠️ Erro detectado no bot:', err.message);
  });
}

// Controla o comportamento randômico do bot para enganar o sistema anti-AFK
function executarAcaoAleatoria() {
  if (!bot || !bot.entity) return;

  const acoes = [andar, pular, olharAoRedor, interagirComOAr];
  const acaoSorteada = acoes[Math.floor(Math.random() * acoes.length)];
  
  acaoSorteada();

  // Espera um tempo aleatório entre 5 e 15 segundos para mudar de ação
  const proximoTempo = Math.random() * 10000 + 5000;
  setTimeout(executarAcaoAleatoria, proximoTempo);
}

// --- Funções de Movimentação Realista ---

function andar() {
  const direcoes = ['forward', 'back', 'left', 'right'];
  const dir = direcoes[Math.floor(Math.random() * direcoes.length)];
  bot.setControlState(dir, true);
  
  // Anda por 1 a 3 segundos e depois para
  setTimeout(() => bot.clearControlStates(), Math.random() * 2000 + 1000);
}

function pular() {
  bot.setControlState('jump', true);
  setTimeout(() => bot.setControlState('jump', false), 500);
}

function olharAoRedor() {
  const yaw = Math.random() * Math.PI * 2;
  const pitch = (Math.random() - 0.5) * Math.PI / 2;
  bot.look(yaw, pitch, true);
}

function interagirComOAr() {
  bot.swingArm('right'); // Finge que está quebrando blocos
}

// Inicia o processo
criarBot();
