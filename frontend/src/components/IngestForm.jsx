import { useState } from 'react';

export default function IngestForm({ onIngest, loading }) {
  const [activeTab, setActiveTab] = useState('text');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'text' && !content.trim()) return;
    if (activeTab === 'url' && !url.trim()) return;

    try {
      await onIngest(activeTab, activeTab === 'text' ? content : null, activeTab === 'url' ? url : null);
      setContent('');
      setUrl('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ingest-form">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        <button 
          style={{ flex: 1, padding: '8px', background: activeTab === 'text' ? 'var(--bg-secondary)' : 'transparent', color: activeTab === 'text' ? 'var(--text-primary)' : 'var(--text-tertiary)', borderRadius: 'var(--border-radius-sm)' }}
          onClick={() => setActiveTab('text')}
        >
          Note
        </button>
        <button 
          style={{ flex: 1, padding: '8px', background: activeTab === 'url' ? 'var(--bg-secondary)' : 'transparent', color: activeTab === 'url' ? 'var(--text-primary)' : 'var(--text-tertiary)', borderRadius: 'var(--border-radius-sm)' }}
          onClick={() => setActiveTab('url')}
        >
          URL
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {activeTab === 'text' ? (
          <textarea
            rows="3"
            placeholder="Paste your notes here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <input
            type="url"
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        )}
        <button 
          type="submit" 
          className="btn-submit" 
          disabled={loading || (activeTab === 'text' ? !content : !url)}
        >
          {loading ? 'Adding...' : '+ Add'}
        </button>
      </form>
    </div>
  );
}
