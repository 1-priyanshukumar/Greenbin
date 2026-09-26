const fs = require('fs');
const path = require('path');

const WASTE_DATABASE = [
  {
    detectedItem: "Plastic Water Bottle",
    category: "Plastic",
    confidence: 96,
    recyclable: true,
    recommendedBin: "♻️ Blue Recyclable Bin",
    ecoPoints: 10,
    disposalInstructions: [
      "Empty the bottle completely.",
      "Rinse with water if possible.",
      "Remove the cap — it may be a different material.",
      "Flatten to save bin space.",
      "Place in the blue recyclable bin."
    ],
    sustainabilityTip: "Switching to a reusable stainless steel bottle can save up to 156 plastic bottles per year."
  },
  {
    detectedItem: "Newspaper",
    category: "Paper",
    confidence: 94,
    recyclable: true,
    recommendedBin: "🟡 Yellow Paper Recycling",
    ecoPoints: 10,
    disposalInstructions: [
      "Keep paper dry — wet paper cannot be recycled.",
      "Stack newspapers neatly.",
      "Do not mix with food-contaminated paper.",
      "Bundle with string if possible.",
      "Place in the yellow paper recycling bin."
    ],
    sustainabilityTip: "Recycling one tonne of paper saves 17 trees, 7,000 gallons of water, and 600 kWh of electricity."
  },
  {
    detectedItem: "Food Scraps",
    category: "Organic",
    confidence: 91,
    recyclable: false,
    recommendedBin: "🟢 Green Compost Bin",
    ecoPoints: 8,
    disposalInstructions: [
      "Separate from plastics and dry waste.",
      "Drain excess liquid before disposal.",
      "Include vegetable peels, fruit cores, eggshells.",
      "Avoid meat and dairy in home compost.",
      "Place in green compost or organic waste bin."
    ],
    sustainabilityTip: "Composting food waste creates nutrient-rich soil and reduces landfill methane emissions by up to 50%."
  },
  {
    detectedItem: "Old Smartphone",
    category: "E-Waste",
    confidence: 88,
    recyclable: false,
    recommendedBin: "🟣 Authorized E-Waste Centre",
    ecoPoints: 20,
    disposalInstructions: [
      "Remove and back up all personal data.",
      "Factory reset the device.",
      "Remove SIM card and memory card.",
      "Do NOT place in regular household bins.",
      "Drop at an authorized e-waste collection centre."
    ],
    sustainabilityTip: "E-waste recycling recovers precious metals like gold, silver, and palladium, reducing dangerous mining."
  },
  {
    detectedItem: "Glass Bottle",
    category: "Glass",
    confidence: 97,
    recyclable: true,
    recommendedBin: "⚪ Glass Recycling Container",
    ecoPoints: 10,
    disposalInstructions: [
      "Rinse to remove food residue.",
      "Remove metal lids and recycle separately.",
      "Do not break intentionally — sharp glass is dangerous.",
      "Do not mix with ceramic or pyrex.",
      "Place in the glass recycling container."
    ],
    sustainabilityTip: "Glass can be recycled indefinitely without quality loss — one recycled bottle saves enough energy for a 100W bulb for 4 hours."
  },
  {
    detectedItem: "Aluminium Can",
    category: "Metal",
    confidence: 95,
    recyclable: true,
    recommendedBin: "⚫ Metal Recycling Bin",
    ecoPoints: 10,
    disposalInstructions: [
      "Rinse to remove liquid residue.",
      "Crush gently to save space (optional).",
      "Keep separate from glass.",
      "Do not mix with general household waste.",
      "Place in the metal recycling bin."
    ],
    sustainabilityTip: "Recycling aluminium uses 95% less energy than making new aluminium — an infinitely recyclable material."
  },
  {
    detectedItem: "Old Paint Container",
    category: "Hazardous",
    confidence: 82,
    recyclable: false,
    recommendedBin: "🔴 Specialized Hazardous Waste Collection",
    ecoPoints: 15,
    disposalInstructions: [
      "Do NOT pour paint down drains or on soil.",
      "Keep container sealed if possible.",
      "Allow water-based paint to dry out before disposal.",
      "Take oil-based paint to hazardous waste collection point.",
      "Check local municipal collection events."
    ],
    sustainabilityTip: "Leftover paint can be donated to community groups or art organizations to extend its useful life."
  },
  {
    detectedItem: "Mixed Waste Item",
    category: "General Waste",
    confidence: 75,
    recyclable: false,
    recommendedBin: "⚙️ General Waste Bin",
    ecoPoints: 5,
    disposalInstructions: [
      "Separate any recyclable components if possible.",
      "Check if parts can be repaired or donated.",
      "Place non-recyclable portions in general waste bin.",
      "Avoid overfilling bins — use appropriate bag sizes.",
      "Consider reducing purchase of non-recyclable items."
    ],
    sustainabilityTip: "Try to segregate before binning — even removing the plastic from a foam container doubles the recycling potential."
  }
];

async function analyzeWasteImage(file) {
  // Simulate processing time for computer vision inference
  await new Promise(resolve => setTimeout(resolve, 800));

  // Heuristic/Random matching for realistic classification
  let selected = WASTE_DATABASE[Math.floor(Math.random() * WASTE_DATABASE.length)];
  
  if (file && file.originalname) {
    const name = file.originalname.toLowerCase();
    if (name.includes('bottle') || name.includes('plastic') || name.includes('container')) {
      selected = WASTE_DATABASE[0];
    } else if (name.includes('paper') || name.includes('news') || name.includes('cardboard')) {
      selected = WASTE_DATABASE[1];
    } else if (name.includes('food') || name.includes('apple') || name.includes('banana') || name.includes('organic')) {
      selected = WASTE_DATABASE[2];
    } else if (name.includes('phone') || name.includes('electronic') || name.includes('cable') || name.includes('battery')) {
      selected = WASTE_DATABASE[3];
    } else if (name.includes('glass') || name.includes('jar')) {
      selected = WASTE_DATABASE[4];
    } else if (name.includes('can') || name.includes('metal') || name.includes('tin')) {
      selected = WASTE_DATABASE[5];
    }
  }

  const result = { ...selected };
  // Add realistic confidence variance
  const variance = Math.floor(Math.random() * 7) - 3;
  result.confidence = Math.max(60, Math.min(99, result.confidence + variance));
  
  return result;
}

module.exports = { analyzeWasteImage, WASTE_DATABASE };
