const mongoose = require('mongoose');
const Aircraft = require('./models/Aircraft'); // Adjust path if needed

mongoose.connect('mongodb+srv://sourashis7ps7sabud:IndiGo@6e@cluster0.mg5hcrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sampleAircrafts = [
  {
    name: "Airbus A320",
    manufacturer: "Airbus",
    price: 98000000,
    capacity: 180,
    range: 6100,
    image: "https://cdn.jetphotos.com/full/5/776495_1748590773.jpg",
    description: "Short-to-medium range narrow-body aircraft."
  },
  {
    name: "Boeing 737 MAX",
    manufacturer: "Boeing",
    price: 121600000,
    capacity: 210,
    range: 6570,
    image: "https://cdn.jetphotos.com/full/5/367855_1748837381.jpg",
    description: "Modernized narrow-body airliner."
  },
  {
    name: "Embraer E190",
    manufacturer: "Embraer",
    price: 50000000,
    capacity: 114,
    range: 4537,
    image: "https://cdn.jetphotos.com/full/6/1064349_1729832940.jpg",
    description: "Efficient regional jet."
  },
  {
    name: "Bombardier CRJ900",
    manufacturer: "Bombardier",
    price: 47000000,
    capacity: 90,
    range: 2956,
    image: "https://www.lufthansa.com/content/dam/lh/images/local_images/discover-lufthansa/fleet/CRJ900.jpg.transform/lh-dcep-transform-width-1440/img.jpg",
    description: "Regional jet used worldwide."
  },
  {
    name: "Airbus A380",
    manufacturer: "Airbus",
    price: 445000000,
    capacity: 850,
    range: 15000,
    image: "https://cdn.jetphotos.com/full/5/428039_1747838543.jpg",
    description: "World’s largest passenger airliner."
  },
  {
    name: "Boeing 787 Dreamliner",
    manufacturer: "Boeing",
    price: 239000000,
    capacity: 296,
    range: 14100,
    image: "https://cdn.jetphotos.com/full/6/2069801_1747412417.jpg",
    description: "Fuel-efficient long-haul airliner."
  },
  {
    name: "Cessna Citation X",
    manufacturer: "Cessna",
    price: 23000000,
    capacity: 12,
    range: 6112,
    image: "https://images.aircharterservice.com/global/aircraft-guide/private-charter/cessna-citation-x-plus.jpg",
    description: "Fastest business jet."
  },
  {
    name: "Dassault Falcon 7X",
    manufacturer: "Dassault",
    price: 52000000,
    capacity: 16,
    range: 11000,
    image: "https://www.claylacy.com/wp-content/uploads/2019/05/N16HA-01-1.jpg",
    description: "High-performance trijet for business travel."
  },
  {
    name: "Antonov An-225",
    manufacturer: "Antonov",
    price: 250000000,
    capacity: 250,
    range: 15400,
    image: "https://flyingmag1.b-cdn.net/wp-content/uploads/sites/2/2022/03/shutterstock_1065944747-1-1-scaled-1.jpg?width=2560&height=1709",
    description: "Largest cargo aircraft ever built."
  },
  {
    name: "Concorde",
    manufacturer: "Aérospatiale-BAC",
    price: 200000000,
    capacity: 100,
    range: 7250,
    image: "https://live.staticflickr.com/5244/5267278766_46c3935447_b.jpg",
    description: "Supersonic passenger airliner (retired)."
  }
];

async function seed() {
  await Aircraft.deleteMany(); // clear old data
  await Aircraft.insertMany(sampleAircrafts);
  console.log("✅ Aircraft data inserted!");
  mongoose.disconnect();
}

seed();
