import { useState, useCallback } from "react";
import { shortenUrl } from "../services/api";
import Countdown from "./Countdown";

function UrlForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);

    try {
      const data = await shortenUrl(url);
      setShortUrl(data.shortUrl);
      setUrl("");
      onShorten();
    } catch (err) {
      if (err.response) {
        if (err.response.status === 429) {
          setRetryAfter(err.response.data.retryAfter);
          return;
        }
        setError(err.response.data.message || "Something went wrong");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCountdownFinish = useCallback(() => {
    setRetryAfter(0);
  }, []);

  return (
    <div className="url-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading || retryAfter > 0}>
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {shortUrl && (
        <p className="success">
          Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </p>
      )}
      {retryAfter > 0 && (
        <Countdown seconds={retryAfter} onFinish={handleCountdownFinish} />
      )}
    </div>
  );
}

export default UrlForm;
