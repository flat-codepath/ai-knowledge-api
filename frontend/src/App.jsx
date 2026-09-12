import { useEffect, useState } from 'react';
import { useKnowledge } from './hooks/useKnowledge';
import Sidebar from './components/Sidebar';
import MainChat from './components/MainChat';

function App() {
  const { items, loading, error, fetchItems, addKnowledge, askQuestion } = useKnowledge();

  // Track the current chat state locally in App
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answerData, setAnswerData] = useState(null);
  const [loadingAnswer, setLoadingAnswer] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleQuery = async (question) => {
    setCurrentQuestion(question);
    setAnswerData(null);
    setLoadingAnswer(true);
    try {
      const res = await askQuestion(question);
      setAnswerData(res);
    } catch (e) {
      console.error(e);
      // Fallback state on error
      setAnswerData({ answer: "Sorry, I encountered an error answering that.", sources: [] });
    } finally {
      setLoadingAnswer(false);
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        items={items}
        onIngest={addKnowledge}
        loadingIngest={loading}
        loadingItems={loading}
      />

      <MainChat
        question={currentQuestion}
        answer={answerData?.answer}
        sources={answerData?.sources}
        loadingAnswer={loadingAnswer}
        onQuery={handleQuery}
      />

      {/* Toast notification for errors (optional overlay) */}
      {error && (
        <div style={{
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999,
          background: '#d96570', color: 'white', padding: '12px 24px',
          borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
