const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const locationEl = document.getElementById('location');
const weatherIconEl = document.getElementById('weather-icon');
const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const charImg = document.getElementById('character-img');

const animeQuotes = [
  { anime: "One Punch Man", character: "Saitama", quote: "Human strength lies in the ability to change yourself." },
  { anime: "Naruto", character: "Itachi Uchiha", quote: "You can give up on your path, but you cannot give up on your dream." },
  { anime: "Naruto", character: "Naruto Uzumaki", quote: "Hard work is worthless for those that don’t believe in themselves." },
  { anime: "Demon Slayer", character: "Tanjiro Kamado", quote: "The strong should aid and protect the weak. Then, the weak will become strong, and they in turn will aid and protect those weaker than them." },
  { anime: "Fullmetal Alchemist", character: "Roy Mustang", quote: "Nothing’s perfect, the world’s not perfect, but it’s there for us, trying the best it can. That’s what makes it so damn beautiful." },
  { anime: "One Piece", character: "Monkey D. Luffy", quote: "If you don’t take risks, you can’t create a future." },
  { anime: "Attack on Titan", character: "Ymir", quote: "You’re gonna care what other people think and be someone you’re not your whole life? You’re fine as you are." },
  { anime: "Code Geass", character: "Lelouch Lamperouge", quote: "You will never be able to love anybody else until you love yourself." },
  { anime: "Violet Evergarden", character: "Violet Evergarden", quote: "Dead people receive more flowers than living ones because regret is stronger than gratitude." },
  { anime: "Dragon Ball Z", character: "Vegeta", quote: "Push through the pain. Giving up hurts more." }
];

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  timeEl.textContent = `${hours}:${minutes}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString(undefined, options);

  const hour = now.getHours();
  let fakeTemp;

  if (hour >= 5 && hour < 12) {
    document.body.style.background = "linear-gradient(135deg, #FFD194 0%, #D1913C 100%)";
    weatherIconEl.textContent = "🌤️";
    fakeTemp = 22;
  } else if (hour >= 12 && hour < 17) {
    document.body.style.background = "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)";
    weatherIconEl.textContent = "☀️";
    fakeTemp = 30;
  } else if (hour >= 17 && hour < 20) {
    document.body.style.background = "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)";
    weatherIconEl.textContent = "🌇";
    fakeTemp = 25;
  } else {
    document.body.style.background = "linear-gradient(135deg, #232526 0%, #414345 100%)";
    weatherIconEl.textContent = "🌙";
    fakeTemp = 18;
  }

  tempEl.textContent = `${fakeTemp}°C`;
  locationEl.textContent = "Your Sky ☁️";
}

async function getQuote() {
  try {
    const randomIndex = Math.floor(Math.random() * animeQuotes.length);
    const { anime, character, quote } = animeQuotes[randomIndex];
    quoteEl.textContent = `"${quote}"`;
    authorEl.textContent = `— ${character} (${anime})`;

    const imgRes = await fetch(`https://api.jikan.moe/v4/characters?q=${character}&limit=1`);
    const imgData = await imgRes.json();

    if (imgData.data && imgData.data.length > 0) {
      charImg.src = imgData.data[0].images.jpg.image_url;
      charImg.style.display = "block";
    } else {
      charImg.style.display = "none";
    }
  } catch (err) {
    quoteEl.textContent = "Even heroes need rest sometimes...";
    authorEl.textContent = "— Unknown";
    charImg.style.display = "none";
  }
}

newQuoteBtn.addEventListener('click', getQuote);
updateClock();
setInterval(updateClock, 1000);
getQuote();
