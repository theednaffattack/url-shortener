const express = require('express');
const os = require('os');
const cors = require('cors');

const whitelist = [
  'http://192.168.180.160:3000',
  'http://192.168.180.248:3000',
  'http://localhost:3000'
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// const corsOptions = {
//   origin: 'http://localhost:3000/',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

const ifaces = os.networkInterfaces();

const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const app = express();
// const http = require('http').Server(app);
const mongoose = require('mongoose');
const btoa = require('btoa');
const atob = require('atob');

const { URL, Counter } = require('./models/URL');
// const Counter = require('./models/Counter');
// const promise;
const connectionString = process.env.MONGO_ATLAS_CONNECTION_STRING;

const port = process.env.PORT || 8080;

const userObj = { username: os.userInfo().username };

console.log(`userObj ${JSON.stringify(userObj, null, 2)}`);

app.use(cors(corsOptions));
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/getUsername', (req, res) => res.send(userObj));

app.get('/:hash', (req, res) => {
  const baseId = req.params.hash;
  const id = atob(baseId);
  URL.findOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.redirect(doc.url);
    } else {
      res.redirect('/');
    }
  });
});
// app.listen(port, () => console.log(`Listening on port ${objCatcher[Object.keys(objCatcher)[0]]}/${port}!`));

app.post('/shorten', (req, res, next) => {
  console.log(req.body.url);
  const urlData = req.body.url;
  URL.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log('entry found in db');
      res.send({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: 'OK'
      });
    } else {
      console.log('entry NOT found in db, saving new');
      const url = new URL({
        url: urlData
      });
      url.save(() => {
        if (err) return next(err); // console.error(err);
        res.send({
          url: urlData,
          hash: btoa(url._id),
          status: 200,
          statusTxt: 'OK'
        });
      });
    }
  });
});

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
        console.log(`Listening on http://${iface.address}:${port}`);
      } else {
        // this interface has only one ipv4 adress
        console.log(`Listening on http://${iface.address}:${port}`);
      }
      ++alias;
    });
  });
});

const db = mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    dbName: 'test'
  }
);

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   // we're connected!
//   console.log("we're connected!");
// });

db.then(
  (database) => {
    console.log("we're connected!");

    console.log(connectionString);
    const urlCollection = database.connection.db.collection('URL');
    const counterCollection = database.connection.db.collection('Counter');
    // console.log(database.connection.db.collection('URL'));
    urlCollection.remove({}, () => {
      console.log('URL collection removed');
    });
    counterCollection.remove({}, () => {
      console.log('Counter collection removed');
    });
    counterCollection.remove({}, () => {
      console.log('Pre-save Counter collection removal');
      const counter = new Counter({ _id: 'url_count', count: 0 });
      counter.save((err) => {
        if (err) return console.error(err);
        console.log('counter inserted');
      });
    });
  },
  (err) => {
    console.error(`stuff ${err}`);
  }
).catch((err) => {
  console.error(err);
});
