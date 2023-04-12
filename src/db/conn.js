const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deepakbadnaware69:villian_DS12@cluster69.bgupsqu.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});
