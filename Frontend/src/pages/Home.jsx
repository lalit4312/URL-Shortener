import { useState, useEffect, useCallback } from "react";
import UrlForm from "../components/UrlForm";
import UrlList from "../components/UrlList";
import AnalyticsChart from "../components/AnalyticsChart";
import { getUrls } from "../services/api";

function Home() {
  const [urls, setUrls] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchUrls = useCallback(async () => {
    try {
      const data = await getUrls();
      setUrls(data);
    } catch {
      console.error("Failed to fetch URLs");
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const handleShorten = () => {
    fetchUrls();
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="home">
      <h1>URL Shortener</h1>

      <UrlForm onShorten={handleShorten} />

      <UrlList
        urls={urls}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      {selectedId && (
        <button className="refresh-btn" onClick={handleRefresh}>
          Refresh Chart
        </button>
      )}

      <AnalyticsChart urlId={selectedId} refreshKey={refreshKey} />
    </div>
  );
}

export default Home;
