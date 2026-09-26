const express = require('express');
const router = express.Router();

const CENTERS = [
  { id: 1, name: 'GreenCycle Recycling Hub', address: '24 MG Road, Bangalore 560001', lat: 12.9758, lng: 77.6094, acceptedWasteTypes: ['Plastic','Paper','Glass','Metal'], openingHours: 'Mon–Sat 8am–6pm', phone: '+91-80-2345-6789' },
  { id: 2, name: 'E-Waste Disposal Centre', address: '56 Indiranagar, Bangalore 560038', lat: 12.9784, lng: 77.6408, acceptedWasteTypes: ['E-Waste','Batteries'], openingHours: 'Mon–Fri 9am–5pm', phone: '+91-80-4567-8901' },
  { id: 3, name: 'City Composting Yard', address: 'Whitefield Main Rd, Bangalore 566066', lat: 12.9698, lng: 77.7499, acceptedWasteTypes: ['Organic','Garden Waste'], openingHours: 'Daily 7am–8pm', phone: '+91-80-2109-3456' },
  { id: 4, name: 'Hazardous Waste Facility', address: 'KSPCB Campus, Rajajinagar 560010', lat: 13.0068, lng: 77.5562, acceptedWasteTypes: ['Hazardous','Chemicals','Medical'], openingHours: 'Mon–Fri 10am–4pm', phone: '+91-80-2338-5555' },
];

router.get('/', (req, res) => {
  const { type } = req.query;
  if (type) {
    return res.json(CENTERS.filter(c => c.acceptedWasteTypes.some(t => t.toLowerCase().includes(type.toLowerCase()))));
  }
  res.json(CENTERS);
});

module.exports = router;
