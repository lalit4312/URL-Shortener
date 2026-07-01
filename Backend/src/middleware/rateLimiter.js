const requestCounts = new Map();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;

  const now = Date.now();

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  const timestamps = requestCounts.get(ip).filter((ts) => now - ts < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0];
    const retryAfter = Math.ceil((oldest + WINDOW_MS - now) / 1000);

    return res.status(429).json({
      message: "Rate limit exceeded",
      retryAfter,
    });
  }

  timestamps.push(now);
  requestCounts.set(ip, timestamps);

  next();
}

module.exports = rateLimiter;
