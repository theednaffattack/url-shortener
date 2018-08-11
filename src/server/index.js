const express = require('express');
const os = require('os');

const ifaces = os.networkInterfaces();

const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const btoa = require('btoa');
const atob = require('atob');
// const promise;
const connectionString = process.env.MONGO_ATLAS_CONNECTION_STRING;

const port = process.env.PORT || 8080;

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

// app.listen(port, () => console.log(`Listening on port ${objCatcher[Object.keys(objCatcher)[0]]}/${port}!`));

app.listen(port, () => {
  Object.keys(ifaces).forEach((ifname) => {
    let alias = 0;

    ifaces[ifname].forEach((iface) => {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(`Listening on http://${iface.address}/${port}`);
      } else {
        // this interface has only one ipv4 adress
        console.log(`Listening on http://${iface.address}/${port}`);
      }
      ++alias;
    });
  });
});
