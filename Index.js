const mineflayer = require('mineflayer');

// Configurações de conexão do bot
const bot = mineflayer.createBot({
  host: 'SEU_IP_DO_ATERNOS.aternos.me', // Substitua pelo IP do seu servidor
  port: 25565,                           // Porta padrão do Aternos
  username: 'BotCaminhador',             // Nome do bot no jogo
  version: '1.20.1'                      // Altere para a versão do seu servidor
});

// Função para fazer o bot andar aleatoriamente
function andarAleatoriamente() {
  if (!bot.entity) return;

  // Lista de direções possíveis
  const direcoes = ['forward', 'back', 'left', 'right'];
  // Escolhe uma direção aleatória
  const direcaoSorteada = direcoes[Math.floor(Math.random() * direcoes.length)];

  // Ativa o movimento
  bot.setControlState(direcaoSorteada, true);

  // Anda por 1 a 3 segundos, depois para e escolhe outra direção
  setTimeout(() => {
    bot.clearControlStates(); // Para de andar
    
    // Espera um tempo aleatório antes de andar de novo
    setTimeout(andarAleatoriamente, Math.random() * 3000 + 1000);
  }, Math.random() * 2000 + 1000);
}

// Inicia o movimento assim que o bot spawnar no mundo
bot.on('spawn', () => {
  console.log('Bot entrou no servidor!');
  andarAleatoriamente();
});

// Mensagem caso o bot seja desconectado
bot.on('end', () => {
  console.log('Bot foi desconectado. Tentando reconectar...');
});
