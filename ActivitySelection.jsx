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