import { useState } from 'react';

export default function QueryBox({ onQuery, loading }) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    onQuery(question);
    setQuestion('');
  };

  return (
    <div className="query-wrapper">
      <form onSubmit={handleSubmit} className="query-box">
        <input
          type="text"
          placeholder="Ask anything about the knowledge you've saved..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />
        <button 
          type="submit" 
          className="btn-ask" 
          disabled={loading || !question.trim()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}
