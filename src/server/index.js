const express = require('express');
const os = require('os');
const cors = require('cors');
const chalk = require('chalk');

const { log } = console;

const whitelist = [
  'http://192.168.180.160:3000',
  'http://192.168.180.248:3000',
  'http://localhost:3000',
  'http://192.168.180.160:8001',
  'http://192.168.180.248:8001',
  'http://localhost:8001'
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      console.log('origin');
      console.log(origin);
      callback(null, true);
    } else {
      console.log(origin);
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

// parse application/json
app.use(bodyParser.json());

app.get('/api/getUsername', (req, res) => res.send(userObj));

app.post('/api/getShortLink', (req, res, next) => {
  // const { hash } = req.body;
  console.log('hash');
  console.log(req.body);
  // const id = atob(hash);
  // let shortLink = {hash: baseId, }
  // TODO: add the host data
  res.send(req.body);
});

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
  console.log('Inside post req.body.url');
  console.log(req.body);
  const urlData = req.body.uri;
  URL.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log('entry found in db');
      console.log({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: 'OK'
      });
      res.send({
        url: urlData,
        hash: btoa(doc._id),
        status: 200,
        statusTxt: 'OK'
      });
    } else {
      console.log('entry NOT found in db, saving new');
      const stringUrl = urlData.toString();
      const url = new URL({
        url: stringUrl
      });
      url.save(() => {
        // Use any CSS color name

        // crayon('#ffcc00').log('old gold');

        // Compose multiple styles using the chainable API
        // log(chalk.grey.bgGreen.bold('FROM SAVE'));

        log(
          chalk
            .bgHex('#89CFF0')
            .hex('#36454F')
            .bold('\n      FROM SAVE    \n')
        );
        console.log('url._id');
        console.log(url._id);
        console.log('btoa');
        console.log(btoa(url._id));
        if (err) console.error(err);
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

const whaa = new Error('whaa');

const promiseMe = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, whaa);
});

promiseMe
  .then((successMessage) => {
    console.log(`Hooray ${successMessage}`);
  })
  .catch((errorMessage) => {
    console.log(`Error ${errorMessage}`);
  });

db.then(
  (database) => {
    console.log("we're connected!");

    console.log(connectionString);
    // console.log(database.connection.db);
    // const urlCollection = database.connection.db.collection('Url');
    // const counterCollection = database.connection.db.collection('Counter');
    // console.log(database.connection.db.collection('URL'));
    // counterCollection.remove({}, (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log('Counter collection removed');
    // });

    // Counter.remove({}, () => {
    //   console.log('Pre-save Counter collection removal');
    //   const counter = new Counter({ _id: 'url_count', count: 0 });
    //   counter.save((err) => {
    //     if (err) return console.error(err);
    //     console.log('counter inserted');
    //   });
    // });
    // URL.remove({}, (err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log('Url collection removed');
    // });
  },
  (err) => {
    console.error(`stuff ${err}`);
  }
).catch((err) => {
  console.error(err);
});
