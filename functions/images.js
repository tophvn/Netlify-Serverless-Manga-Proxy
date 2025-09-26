// images.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const url = event.queryStringParameters.url;
  if (!url) {
    return { statusCode: 400, body: 'Missing url' };
  }
  try {
    const response = await fetch(url);
    const buffer = await response.buffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600'
      },
      body: buffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    return { statusCode: 502, body: 'Proxy error: ' + err.message };
  }
};
