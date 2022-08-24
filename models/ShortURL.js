const linkSchema = new mongoose.Schema({
    identifier: {
      required: true,
      type: String,
    },
    url: {
      required: true,
      type: String,
    },
    clicks: {
      required: true,
      type: Number,
      default: 0,
    }
  });
