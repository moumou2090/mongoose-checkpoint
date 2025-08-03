// 📁 server.js
require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/Person');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connecté à MongoDB"))
.catch((err) => console.error("❌ Erreur de connexion :", err));

// Créer une personne
const createPerson = () => {
  const person = new Person({
    name: "Ahmed",
    age: 25,
    favoriteFoods: ["Pizza", "Couscous"],
  });

  person.save((err, data) => {
    if (err) return console.error(err);
    console.log("✅ Personne enregistrée :", data);
  });
};

// Créer plusieurs personnes
const createManyPeople = () => {
  const arrayOfPeople = [
    { name: "John", age: 30, favoriteFoods: ["Burger"] },
    { name: "Mary", age: 22, favoriteFoods: ["Pasta"] },
    { name: "Ali", age: 28, favoriteFoods: ["Burrito", "Pizza"] },
  ];

  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    console.log("✅ Personnes créées :", data);
  });
};

// Rechercher une personne par nom
const findPeopleByName = (name) => {
  Person.find({ name }, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
};

// Rechercher une personne par aliment favori
const findOneByFood = (food) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
};

// Rechercher par ID
const findPersonById = (id) => {
  Person.findById(id, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
};

// Modifier un document
const updateFavoriteFood = (id) => {
  Person.findById(id, (err, person) => {
    if (err) return console.error(err);
    person.favoriteFoods.push("hamburger");
    person.save((err, updated) => {
      if (err) return console.error(err);
      console.log("✅ Mis à jour :", updated);
    });
  });
};

// Modifier avec findOneAndUpdate
const updateAgeByName = (name) => {
  Person.findOneAndUpdate(
    { name },
    { age: 20 },
    { new: true },
    (err, data) => {
      if (err) return console.error(err);
      console.log("✅ Mis à jour :", data);
    }
  );
};

// Supprimer une personne par ID
const deleteById = (id) => {
  Person.findByIdAndRemove(id, (err, data) => {
    if (err) return console.error(err);
    console.log("✅ Supprimé :", data);
  });
};

// Supprimer toutes les Mary
const deleteManyMary = () => {
  Person.remove({ name: "Mary" }, (err, result) => {
    if (err) return console.error(err);
    console.log("✅ Résultat suppression :", result);
  });
};

// Recherche enchaînée
const complexQuery = () => {
  Person.find({ favoriteFoods: "burrito" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.error(err);
      console.log("✅ Résultat filtré :", data);
    });
};

// Décommenter la fonction à tester :
// createPerson();
// createManyPeople();
// findPeopleByName("Mary");
// findOneByFood("Burrito");
// findPersonById("votre_id");
// updateFavoriteFood("votre_id");
// updateAgeByName("John");
// deleteById("votre_id");
// deleteManyMary();
// complexQuery();
module.exports = {
  createPerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  updateFavoriteFood,
  updateAgeByName,
  deleteById,
  deleteManyMary,
  complexQuery
};