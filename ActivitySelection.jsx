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