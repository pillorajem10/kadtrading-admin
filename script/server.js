const path = require('path');
const express = require('express');
const proxyMiddleWare = require("http-proxy-middleware");
const compression = require('compression');

// const proxyPath = "http://www.hapichair.com";
// const proxyOption = { target: proxyPath, changeOrigin: true, secure: false };

const app = express();

app.use(compression());

  app.use(
    "/product",
    proxyMiddleWare({
      target: "https://www.hapichair.com",
      changeOrigin: true
    })
  );
  app.use(
    "/storage",
    proxyMiddleWare({
      target: "https://www.hapichair.com",
      changeOrigin: true
    })
  );
  app.use(
    "/common",
    proxyMiddleWare({
      target: "https://www.hapichair.com",
      changeOrigin: true
    })
  );
  app.use(
    "/account",
    proxyMiddleWare({
      target: "https://www.hapichair.com",
      changeOrigin: true
    })
  );

app.use(express.static('build'));
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build/index.html'));
});

app.listen(3000, function (err) {

    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:3000');
});
