import React, { useState } from 'react';

const ActivitySelectionComplete = () => {
  const [starts, setStarts] = useState([1, 3, 0, 5, 8, 5]);
  const [finishes, setFinishes] = useState([2, 4, 6, 7, 9, 9]);

  // Função recursiva baseada no código original
  const activitySelectionRecursive = (starts, finishes, lastFinish = -1, index = 0) => {
    // Caso base: não há mais atividades para processar
    if (index === starts.length) {
      return [];
    }
    
    // Verifica se a atividade atual é compatível
    if (starts[index] >= lastFinish) {
      // Inclui a atividade atual
      const include = [[starts[index], finishes[index]]].concat(
        activitySelectionRecursive(starts, finishes, finishes[index], index + 1)
      );
      return include;
    } else {
      // Pula a atividade atual
      const include = activitySelectionRecursive(starts, finishes, lastFinish, index + 1);
      return include;
    }
  };

  // Função iterativa baseada no código original
  const activitySelection = (starts, finishes) => {
    // Combina as listas de inícios e términos em uma lista de tuplas (início e término)
    const activities = starts.map((s, i) => [s, finishes[i]]);
    // Ordena as atividades pelo tempo de término em ordem crescente
    activities.sort((a, b) => a[1] - b[1]);
    
    const selected = [];
    let lastFinish = -1;
    
    // Itera sobre cada atividade ordenada
    for (const [s, f] of activities) {
      // Verifica se a atividade atual começa após a última selecionada ter terminado
      if (s >= lastFinish) {
        selected.push([s, f]);
        lastFinish = f;
      }
    }
    
    return selected;
  };

  // Executa ambos os algoritmos
  const selectedIterative = activitySelection(starts, finishes);
  
  // Pré-processa ordenando por tempo de término para o recursivo
  const activities = starts.map((s, i) => [s, finishes[i]]).sort((a, b) => a[1] - b[1]);
  const sortedStarts = activities.map(a => a[0]);
  const sortedFinishes = activities.map(a => a[1]);
  const selectedRecursive = activitySelectionRecursive(sortedStarts, sortedFinishes);

  const maxTime = Math.max(...finishes) + 1;
  const yLevel = 1;
  const height = 30;

  // Verifica se uma atividade foi selecionada
  const isSelected = (start, finish) => {
    return selectedIterative.some(([s, f]) => s === start && f === finish);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Seleção de Atividades - Algoritmo Guloso</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Algoritmo:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Ordena atividades por tempo de término</li>
          <li>Seleciona a primeira atividade (termina mais cedo)</li>
          <li>Seleciona próximas que não se sobreponham</li>
          <li>Implementa versões iterativa e recursiva</li>
        </ol>
      </div>

      {/* Entrada de Dados */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-3">Dados das Atividades:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tempos de Início:</label>
            <input
              type="text"
              value={starts.join(', ')}
              onChange={(e) => {
                const values = e.target.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
                setStarts(values);
              }}
              className="w-full px-3 py-1 border rounded"
              placeholder="1, 3, 0, 5, 8, 5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tempos de Término:</label>
            <input
              type="text"
              value={finishes.join(', ')}
              onChange={(e) => {
                const values = e.target.value.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
                setFinishes(values);
              }}
              className="w-full px-3 py-1 border rounded"
              placeholder="2, 4, 6, 7, 9, 9"
            />
          </div>
        </div>
      </div>

      {/* Visualização Timeline */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Timeline - Atividades Selecionadas em Verde</h3>
        <div className="relative bg-gray-50 p-4 rounded-lg" style={{ height: '200px' }}>
          {/* Eixo do tempo */}
          <div className="absolute bottom-12 left-8 right-8 h-px bg-gray-400"></div>
          
          {/* Marcadores de tempo */}
          {Array.from({ length: maxTime + 1 }, (_, i) => (
            <div
              key={i}
              className="absolute bottom-12 text-xs text-gray-600"
              style={{ left: `${8 + (i / maxTime) * (100 - 16)}%` }}
            >
              <div className="w-px h-2 bg-gray-400 -mt-2"></div>
              <span className="ml-1">{i}</span>
            </div>
          ))}

          {/* Label do eixo Y */}
          <div 
            className="absolute left-2 text-xs text-gray-600"
            style={{ top: `${yLevel * 40 + 20}px` }}
          >
            Atividades
          </div>

          {/* Todas as atividades em cinza */}
          {starts.map((start, index) => {
            if (index >= finishes.length) return null;
            const finish = finishes[index];
            const left = 8 + (start / maxTime) * (100 - 16);
            const width = ((finish - start) / maxTime) * (100 - 16);
            
            return (
              <div
                key={`gray-${index}`}
                className="absolute bg-gray-300 border border-black"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  top: `${yLevel * 40}px`,
                  height: `${height}px`
                }}
              />
            );
          })}

          {/* Atividades selecionadas em verde (sobrepondo as cinzas) */}
          {selectedIterative.map(([start, finish], index) => {
            const left = 8 + (start / maxTime) * (100 - 16);
            const width = ((finish - start) / maxTime) * (100 - 16);
            
            return (
              <div
                key={`green-${index}`}
                className="absolute bg-green-400 border border-green-600"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  top: `${yLevel * 40}px`,
                  height: `${height}px`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Atividades Originais */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Atividades Originais:</h3>
          <div className="space-y-2">
            {starts.map((start, index) => {
              if (index >= finishes.length) return null;
              const finish = finishes[index];
              const selected = isSelected(start, finish);
              return (
                <div 
                  key={index} 
                  className={`text-sm p-2 rounded ${selected ? 'bg-green-100 border border-green-300' : ''}`}
                >
                  Atividade {index}: [{start}, {finish}]
                  {selected && <span className="text-green-600 ml-2">✓</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Resultado Iterativo */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Selecionadas (Iterativo):</h3>
          <div className="space-y-2">
            {selectedIterative.map(([start, finish], index) => (
              <div key={index} className="text-sm text-green-800">
                [{start}, {finish}]
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm font-medium">
            Total: {selectedIterative.length} atividades
          </div>
        </div>

        {/* Resultado Recursivo */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Selecionadas (Recursivo):</h3>
          <div className="space-y-2">
            {selectedRecursive.map(([start, finish], index) => (
              <div key={index} className="text-sm text-blue-800">
                [{start}, {finish}]
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm font-medium">
            Total: {selectedRecursive.length} atividades
          </div>
        </div>
      </div>

      {/* Explicação do Algoritmo */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold mb-2">Como o algoritmo funciona:</h3>
        <p className="text-sm mb-2">
          <strong>Estratégia Gulosa:</strong> Sempre escolhe a atividade que termina mais cedo entre as disponíveis.
        </p>
        <p className="text-sm">
          <strong>Por que funciona:</strong> Ao escolher sempre a que termina mais cedo, maximizamos o espaço disponível 
          para as próximas atividades, garantindo a solução ótima.
        </p>
      </div>
    </div>
  );
};

export default ActivitySelectionComplete;