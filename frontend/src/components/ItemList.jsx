export default function ItemList({ items, loading }) {
  if (loading) {
    return <div style={{color: 'var(--text-tertiary)', fontSize: '13px'}}>Loading inbox...</div>;
  }

  if (items.length === 0) {
    return <div style={{color: 'var(--text-tertiary)', fontSize: '13px'}}>Your inbox is empty.</div>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <div key={item.id} className="item-card">
          <span className="type">{item.source_type}</span>
          <span className="snippet">
            {item.source_type === 'url' ? item.url : item.content}
          </span>
        </div>
      ))}
    </div>
  );
}
