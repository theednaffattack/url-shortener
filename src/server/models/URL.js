const mongoose = require('mongoose');

const countersSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  count: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', countersSchema);

const urlSchema = new mongoose.Schema({
  _id: { type: Number },
  url: '',
  created_at: ''
});

urlSchema.pre('save', function (next) {
  console.log('running pre-save');
  const doc = this;
  Counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { count: 1 } }, (err, counter) => {
    if (err) return next(err);
    console.log(counter);
    console.log(counter.count);
    doc._id = counter.count;
    doc.created_at = new Date();
    console.log(doc);
    next();
  });
});

const URL = mongoose.model('URL', urlSchema);

module.exports = { URL, Counter };
