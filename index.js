const mineflayer = require('mineflayer');
const http = require('http');

// Mantém o servidor web falso online para a Render aceitar o plano gratuito
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot do Minecraft Java está rodando perfeitamente!');
});

const PORTA_WEB = process.env.PORT || 3000;
server.listen(PORTA_WEB, () => {
  console.log(`🌐 Servidor Web ativo na porta ${PORTA_WEB}`);
});

// Configurações exatas para o seu Spigot Java no Aternos
const CONFIG = {
  host: 'Cabosemfio.aternos.me', 
  port: 25565,        // Porta padrão Java do Aternos
  username: 'BotAntiAFK',
  version: '1.21'     // Travado na versão Java 1.21 para limpar o erro do autoVersion
};

let bot;

function criarBot() {
  console.log('🤖 Tentando conectar ao servidor Java 1.21...');
  
  bot = mineflayer.createBot({
    ...CONFIG,
    auth: 'offline'
  });

  bot.on('spawn', () => {
    console.log('✅ Bot entrou com sucesso no mundo Java! Iniciando rotina anti-AFK...');
    executarAcaoAleatoria();
  });

  bot.on('end', (reason) => {
    console.log(`❌ Bot desconectado (${reason}). Tentando reconectar em 30 segundos...`);
    setTimeout(criarBot, 30000);
  });

  bot.on('error', (err) => {
    console.log('⚠️ Erro detectado no bot:', err.message);
  });
}

function executarAcaoAleatoria() {
  if (!bot || !bot.entity) return;
  const acoes = [andar, pular, olharAoRedor, interagirComOAr];
  const acaoSorteada = acoes[Math.floor(Math.random() * acoes.length)];
  acaoSorteada();
  setTimeout(executarAcaoAleatoria, Math.random() * 10000 + 5000);
}

function andar() {
  const direcoes = ['forward', 'back', 'left', 'right'];
  bot.setControlState(direcoes[Math.floor(Math.random() * direcoes.length)], true);
  setTimeout(() => bot.clearControlStates(), Math.random() * 2000 + 1000);
}

function pular() {
  bot.setControlState('jump', true);
  setTimeout(() => bot.setControlState('jump', false), 500);
}

function olharAoRedor() {
  bot.look(Math.random() * Math.PI * 2, (Math.random() - 0.5) * Math.PI / 2, true);
}

function interagirComOAr() {
  bot.swingArm('right');
}

criarBot();
