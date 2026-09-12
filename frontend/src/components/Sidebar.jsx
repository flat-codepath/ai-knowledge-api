import IngestForm from './IngestForm';
import ItemList from './ItemList';

export default function Sidebar({ items, onIngest, loadingIngest, loadingItems }) {
  return (
    <div className="sidebar">
      <div>
        <h1 style={{fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px'}}>
          Knowledge Inbox
        </h1>
        <p style={{fontSize: '13px', color: 'var(--text-tertiary)'}}>
          Save notes & URLs.
        </p>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <h2>Add to Brain</h2>
        <IngestForm onIngest={onIngest} loading={loadingIngest} />
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflow: 'hidden'}}>
        <h2>Recent ({items.length})</h2>
        <ItemList items={items} loading={loadingItems} />
      </div>
    </div>
  );
}
