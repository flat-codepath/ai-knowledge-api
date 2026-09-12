export default function AnswerDisplay({ question, answer, sources, loading }) {
  if (!question && !answer && !loading) return null;

  return (
    <>
      {question && (
        <div className="message-bubble message-user">
          <div className="content">{question}</div>
        </div>
      )}

      {(answer || loading) && (
        <div className="message-bubble message-ai">
          <div style={{marginTop: '12px', marginRight: '16px'}}>
            {/* Sparkle SVG icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gemini-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1f6bff" />
                  <stop offset="50%" stopColor="#d96570" />
                  <stop offset="100%" stopColor="#f6946a" />
                </linearGradient>
              </defs>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
          </div>
          
          <div className="content">
            {loading ? (
              <div className="loader-pill"></div>
            ) : (
              <>
                <div style={{lineHeight: 1.6, whiteSpace: 'pre-wrap'}}>{answer}</div>
                
                {sources && sources.length > 0 && (
                  <div className="sources-container">
                    {sources.map((src, i) => (
                      <a key={i} href={src.startsWith('http') ? src : undefined} target="_blank" rel="noreferrer" className="source-chip" style={{textDecoration: 'none'}}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                        {src.replace(/^https?:\/\//, '').split('/')[0]}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
