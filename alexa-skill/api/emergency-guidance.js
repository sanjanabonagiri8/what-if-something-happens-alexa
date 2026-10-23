
module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://what-if-emergency-assistant.lovable.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST." });
  }

  const message = String(req.body?.message || "").toLowerCase();

  if (!message.trim()) {
    return res.status(400).json({
      guidance: "Please describe the situation so I can offer general safety guidance."
    });
  }

  let guidance;

  if (/fire|smoke|trapped|can't breathe|cannot breathe|unconscious|severe bleeding/.test(message)) {
    guidance = "If someone is in immediate danger, call 911 in the United States now. Move to safety if you can do so without increasing the danger. Follow instructions from emergency responders.";
  } else {
    guidance = "Stay calm and assess your surroundings. If there is immediate danger, call 911 in the United States. Move to a safer location if possible, contact a trusted person when safe, and follow local emergency instructions.";
  }

  return res.status(200).json({ guidance });
};
