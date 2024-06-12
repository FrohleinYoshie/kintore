import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // CSSファイルをインポート

interface Exercise {
  name: string;
  count: number;
  completed: boolean;
}

const App: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [allCompleted, setAllCompleted] = useState(false);

  const getRandomExercises = async () => {
    try {
      const response = await axios.get('http://localhost:8080/exercises');
      const exercisesWithCompletion = response.data.map((exercise: Exercise) => ({
        ...exercise,
        completed: false
      }));
      setExercises(exercisesWithCompletion);
      setAllCompleted(false); 
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const toggleCompletion = (index: number) => {
    setExercises(prevExercises =>
      prevExercises.map((exercise, i) =>
        i === index ? { ...exercise, completed: !exercise.completed } : exercise
      )
    );
  };

  useEffect(() => {
    // すべての筋トレが完了しているかどうかをチェック
    const allCompleted = exercises.length > 0 && exercises.every(exercise => exercise.completed);
    setAllCompleted(allCompleted);
  }, [exercises]);

  return (
    <div>
      <h1>1日の筋トレメニュー作成表</h1>
      <button onClick={getRandomExercises}>メニュー表を作る</button>
      {exercises.length > 0 ? (
        <>
          <ul className="exercise-list">
            {exercises.map((exercise, index) => (
              <li key={index} className="exercise-item">
                <div className="exercise-block">
                  {exercise.name}: {exercise.count} 回
                  <input
                    type="checkbox"
                    checked={exercise.completed}
                    onChange={() => toggleCompletion(index)}
                    className="exercise-checkbox"
                  />
                </div>
              </li>
            ))}
          </ul>
          {allCompleted && <h2>Excellent! 明日もその調子で頑張ろう！</h2>}
        </>
      ) : (
        <p>さあボタンをクリックして目標を決めよう！</p>
      )}
    </div>
  );
};

export default App;