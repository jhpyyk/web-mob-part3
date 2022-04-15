const args = process.argv.slice(2);

const mongoose = require("mongoose");

const url =
  "mongodb+srv://jhpyyk:<pw>@web-mob-phonebook.7mhmx.mongodb.net/web-mob-phonebook?retryWrites=true&w=majority";

mongoose.connect(url);

const Person = mongoose.model("Person", {
  name: String,
  number: String,
});

if (args.length === 0) {
  Person.find({}).then((result) => {
    console.log("puhelinluettelo:");
    result.forEach((person) => {
      console.log(person.name + " " + person.number);
    });
    mongoose.connection.close();
  });
} else if (args.length === 2) {
  const person = new Person({
    name: args[0],
    number: args[1],
  });

  person.save().then((result) => {
    console.log("person saved!");
    mongoose.connection.close();
  });
} else {
  mongoose.connection.close();
}
