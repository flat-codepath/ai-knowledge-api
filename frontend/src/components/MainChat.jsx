import QueryBox from './QueryBox';
import AnswerDisplay from './AnswerDisplay';

export default function MainChat({ question, answer, sources, loadingAnswer, onQuery }) {
  const showHeader = !question && !answer && !loadingAnswer;

  return (
    <div className="main-content">
      <div className="chat-header">
        {showHeader && <h1>AI Knowledge Inbox</h1>}
      </div>

      <div className="chat-container">
        {showHeader ? (
          <div style={{
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            opacity: 0.7
          }}>
            <h2 style={{fontSize: '32px', fontWeight: 500, marginBottom: '16px'}}>
              Hello.
            </h2>
            <p style={{fontSize: '18px', color: 'var(--text-secondary)'}}>
              What do you want to ask your knowledge base today?
            </p>
          </div>
        ) : (
          <AnswerDisplay 
            question={question} 
            answer={answer} 
            sources={sources} 
            loading={loadingAnswer} 
          />
        )}
      </div>

      <QueryBox onQuery={onQuery} loading={loadingAnswer} />
    </div>
  );
}
