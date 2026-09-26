from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import random
import time
import io
from typing import Optional

app = FastAPI(title="GreenBin AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

WASTE_DATABASE = [
    {
        "detectedItem": "Plastic Water Bottle",
        "category": "Plastic",
        "confidence": 96,
        "recyclable": True,
        "recommendedBin": "♻️ Blue Recyclable Bin",
        "ecoPoints": 10,
        "disposalInstructions": [
            "Empty the bottle completely.",
            "Rinse with water if possible.",
            "Remove the cap — it may be a different material.",
            "Flatten to save bin space.",
            "Place in the blue recyclable bin."
        ],
        "sustainabilityTip": "Switching to a reusable stainless steel bottle can save up to 156 plastic bottles per year."
    },
    {
        "detectedItem": "Newspaper",
        "category": "Paper",
        "confidence": 94,
        "recyclable": True,
        "recommendedBin": "🟡 Yellow Paper Recycling",
        "ecoPoints": 10,
        "disposalInstructions": [
            "Keep paper dry — wet paper cannot be recycled.",
            "Stack newspapers neatly.",
            "Do not mix with food-contaminated paper.",
            "Bundle with string if possible.",
            "Place in the yellow paper recycling bin."
        ],
        "sustainabilityTip": "Recycling one tonne of paper saves 17 trees, 7,000 gallons of water, and 600 kWh of electricity."
    },
    {
        "detectedItem": "Food Scraps",
        "category": "Organic",
        "confidence": 91,
        "recyclable": False,
        "recommendedBin": "🟢 Green Compost Bin",
        "ecoPoints": 8,
        "disposalInstructions": [
            "Separate from plastics and dry waste.",
            "Drain excess liquid before disposal.",
            "Include vegetable peels, fruit cores, eggshells.",
            "Avoid meat and dairy in home compost.",
            "Place in green compost or organic waste bin."
        ],
        "sustainabilityTip": "Composting food waste creates nutrient-rich soil and reduces landfill methane emissions by up to 50%."
    },
    {
        "detectedItem": "Old Smartphone",
        "category": "E-Waste",
        "confidence": 88,
        "recyclable": False,
        "recommendedBin": "🟣 Authorized E-Waste Centre",
        "ecoPoints": 20,
        "disposalInstructions": [
            "Remove and back up all personal data.",
            "Factory reset the device.",
            "Remove SIM card and memory card.",
            "Do NOT place in regular household bins.",
            "Drop at an authorized e-waste collection centre."
        ],
        "sustainabilityTip": "E-waste recycling recovers precious metals like gold, silver, and palladium, reducing dangerous mining."
    },
    {
        "detectedItem": "Glass Bottle",
        "category": "Glass",
        "confidence": 97,
        "recyclable": True,
        "recommendedBin": "⚪ Glass Recycling Container",
        "ecoPoints": 10,
        "disposalInstructions": [
            "Rinse to remove food residue.",
            "Remove metal lids and recycle separately.",
            "Do not break intentionally — sharp glass is dangerous.",
            "Do not mix with ceramic or pyrex.",
            "Place in the glass recycling container."
        ],
        "sustainabilityTip": "Glass can be recycled indefinitely without quality loss — one recycled bottle saves enough energy for a 100W bulb for 4 hours."
    },
    {
        "detectedItem": "Aluminium Can",
        "category": "Metal",
        "confidence": 95,
        "recyclable": True,
        "recommendedBin": "⚫ Metal Recycling Bin",
        "ecoPoints": 10,
        "disposalInstructions": [
            "Rinse to remove liquid residue.",
            "Crush gently to save space (optional).",
            "Keep separate from glass.",
            "Do not mix with general household waste.",
            "Place in the metal recycling bin."
        ],
        "sustainabilityTip": "Recycling aluminium uses 95% less energy than making new aluminium — an infinitely recyclable material."
    },
    {
        "detectedItem": "Old Paint Container",
        "category": "Hazardous",
        "confidence": 82,
        "recyclable": False,
        "recommendedBin": "🔴 Specialized Hazardous Waste Collection",
        "ecoPoints": 15,
        "disposalInstructions": [
            "Do NOT pour paint down drains or on soil.",
            "Keep container sealed if possible.",
            "Allow water-based paint to dry out before disposal.",
            "Take oil-based paint to hazardous waste collection point.",
            "Check local municipal collection events."
        ],
        "sustainabilityTip": "Leftover paint can be donated to community groups or art organizations to extend its useful life."
    },
    {
        "detectedItem": "Mixed Waste",
        "category": "General Waste",
        "confidence": 75,
        "recyclable": False,
        "recommendedBin": "⚙️ General Waste Bin",
        "ecoPoints": 5,
        "disposalInstructions": [
            "Separate any recyclable components if possible.",
            "Check if parts can be repaired or donated.",
            "Place non-recyclable portions in general waste bin.",
            "Avoid overfilling bins — use appropriate bag sizes.",
            "Consider reducing purchase of non-recyclable items."
        ],
        "sustainabilityTip": "Try to segregate before binning — even removing the plastic from a foam container doubles the recycling potential."
    },
]

def analyze_image(filename: str) -> dict:
    """
    Mock AI analysis. In production, replace this with actual model inference.
    Architecture: image -> preprocessing -> model.predict() -> category + confidence
    """
    # Simulate processing time
    time.sleep(random.uniform(0.5, 1.5))
    
    # Select result (in production: run through CNN model)
    result = random.choice(WASTE_DATABASE).copy()
    
    # Add some variance to confidence
    variance = random.randint(-3, 3)
    result["confidence"] = max(60, min(99, result["confidence"] + variance))
    
    return result


@app.get("/")
def root():
    return {"service": "GreenBin AI Service", "version": "1.0.0", "status": "ready"}

@app.get("/health")
def health():
    return {"status": "ok", "model": "mock_classifier_v1"}

@app.post("/analyze")
async def analyze_waste(image: UploadFile = File(...)):
    """
    Analyze a waste image and return classification result.
    
    Production implementation would:
    1. Load image with PIL
    2. Preprocess: resize to 224x224, normalize
    3. Run through model (MobileNetV2/EfficientNet/YOLO)
    4. Get top prediction + confidence score
    5. Map to waste category
    """
    # Validate file type
    if image.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(status_code=400, detail="Invalid file type. JPG, PNG, WebP only.")
    
    # Read image bytes
    contents = await image.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large. Max 5MB.")
    
    # Run analysis (mock)
    result = analyze_image(image.filename)
    
    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
