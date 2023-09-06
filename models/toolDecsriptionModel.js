const mongoose = require("mongoose");


const FieldSchema = new mongoose.Schema({
    type: {
      type: String,
      required: [true, "you should add a type"],
      enum: ['input', 'textarea']
    },
    inputType: {
      type: String,
      required: [true, "you should add an input"],
      enum: ['text', 'number']
    },
    label: {
      type: String,
      required: [true, "you should add a label"],
      minLength: 2,
      maxLength: 100
    },
    placeholder: {
      type: String,
      required: [true, "you should add a placeholder"],
      minLength: 2,
      maxLength: 100
    }
  });
  
  const FormSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tool',
        required: true,
        maxLength: 100
    },
    link: {
      type: String,
      required: [true, "you should add a link"],
      required: true
    },
    fields: [FieldSchema]
  }, { timestamps: true });
  

  module.exports = mongoose.model("Tool_description", FormSchema);
