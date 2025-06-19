Activity Selection Algorithm - Algoritmo de Seleção de Atividades
Uma implementação interativa e visual do clássico Algoritmo de Seleção de Atividades usando React, demonstrando tanto a abordagem iterativa quanto recursiva do algoritmo guloso.
📋 Sobre o Projeto
O problema da seleção de atividades é um problema clássico de otimização onde temos um conjunto de atividades, cada uma com um tempo de início e fim, e queremos selecionar o maior número possível de atividades que não se sobreponham.
🎯 Objetivos

Demonstrar visualmente como funciona o algoritmo guloso
Comparar implementações iterativa e recursiva
Fornecer uma ferramenta educacional interativa
Ilustrar a eficiência da estratégia gulosa

🚀 Funcionalidades

✅ Visualização em Timeline: Gráfico visual mostrando todas as atividades e as selecionadas
✅ Entrada Interativa: Modificação dinâmica dos dados de entrada
✅ Dupla Implementação: Algoritmos iterativo e recursivo
✅ Comparação em Tempo Real: Resultados lado a lado
✅ Interface Responsiva: Funciona em desktop e mobile
✅ Explicação Didática: Descrição clara do funcionamento

📊 Como Funciona o Algoritmo
Estratégia Gulosa (Greedy)

Ordena as atividades por tempo de término
Seleciona sempre a atividade que termina mais cedo
Elimina atividades que se sobrepõem à selecionada
Repete até não haver mais atividades compatíveis

📁 Estrutura do Código
javascript// Implementação Iterativa
const activitySelection = (starts, finishes) => {
  const activities = starts.map((s, i) => [s, finishes[i]]);
  activities.sort((a, b) => a[1] - b[1]); // Ordena por fim
  
  const selected = [];
  let lastFinish = -1;
  
  for (const [s, f] of activities) {
    if (s >= lastFinish) { // Não há sobreposição
      selected.push([s, f]);
      lastFinish = f;
    }
  }
  return selected;
};

// Implementação Recursiva
const activitySelectionRecursive = (starts, finishes, lastFinish = -1, index = 0) => {
  if (index === starts.length) return [];
  
  if (starts[index] >= lastFinish) {
    return [[starts[index], finishes[index]]].concat(
      activitySelectionRecursive(starts, finishes, finishes[index], index + 1)
    );
  } else {
    return activitySelectionRecursive(starts, finishes, lastFinish, index + 1);
  }
};

🎮 Como Usar
1. Dados de Entrada

Tempos de Início: Lista de quando cada atividade começa
Tempos de Término: Lista de quando cada atividade termina

2. Exemplos de Teste
Exemplo Padrão:
Início:  [1, 3, 0, 5, 8, 5]
Término: [2, 4, 6, 7, 9, 9]
Resultado: [0,6], [8,9] = 2 atividades
Sem Sobreposição:
Início:  [1, 2, 3, 4]
Término: [2, 3, 4, 5]
Resultado: Todas as 4 atividades
Com Muitas Sobreposições:
Início:  [0, 1, 2, 1, 2]
Término: [3, 3, 3, 4, 4]
Resultado: [0,3] = 1 atividade
📈 Complexidade

Tempo: O(n log n) - devido à ordenação
Espaço: O(n) - para armazenar as atividades

🎨 Interface Visual
Timeline

Barras Cinzas: Todas as atividades disponíveis
Barras Verdes: Atividades selecionadas pelo algoritmo
Eixo X: Linha do tempo
Marcadores: Pontos temporais numerados

Painéis de Resultado

Atividades Originais: Lista com marcação das selecionadas
Resultado Iterativo: Atividades escolhidas pelo método iterativo
Resultado Recursivo: Atividades escolhidas pelo método recursivo

🔧 Instalação e Execução
Pré-requisitos

Node.js (v14 ou superior)
npm ou yarn

Passos
bash# Clone o repositório
git clone [seu-repositorio]

# Entre no diretório
cd activity-selection-algorithm

# Instale as dependências
npm install

# Execute o projeto
npm start
📚 Conceitos Abordados

Algoritmos Gulosos (Greedy)
Otimização Combinatória
Programação Dinâmica vs Gulosa
Análise de Complexidade
Visualização de Algoritmos
