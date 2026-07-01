function UrlList({ urls, selectedId, onSelect }) {
  return (
    <div className="url-list">
      <h2>All Shortened URLs</h2>
      {urls.length === 0 ? (
        <p className="empty">No URLs yet. Create one above.</p>
      ) : (
        <ul>
          {urls.map((u) => (
            <li
              key={u._id}
              className={u._id === selectedId ? "active" : ""}
              onClick={() => onSelect(u._id)}
            >
              <span className="short">{u.shortCode}</span>
              <span className="original">{u.originalUrl}</span>
              <span className="date">
                {new Date(u.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UrlList;
