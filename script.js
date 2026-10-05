const milestones = [
  {
    year: 1965,
    shortName: "Prediction",
    label: "THE PREDICTION",
    title: "Gordon Moore Makes His Observation",
    count: null,
    countDisplay: "—",
    text: "Gordon Moore published an article predicting extraordinary growth in the number of components that could be placed economically on integrated circuits. The idea later became known as Moore's Law.",
    source: "https://newsroom.intel.com/press-kit/moores-law"
  },
  {
    year: 1971,
    shortName: "Intel 4004",
    label: "EARLY MICROPROCESSOR",
    title: "Intel 4004",
    count: 2300,
    countDisplay: "2,300",
    text: "Intel introduced the 4004, an early commercial microprocessor. It contained 2,300 transistors and helped demonstrate how much computing logic could fit on a tiny piece of silicon.",
    source: "https://timeline.intel.com/1971/the-first-programmable-microprocessor%3A-the-4004"
  },
  {
    year: 1978,
    shortName: "Intel 8086",
    label: "16-BIT ERA",
    title: "Intel 8086",
    count: 29000,
    countDisplay: "29,000",
    text: "The Intel 8086 contained 29,000 transistors. Only seven years after the 4004, the transistor count had increased by more than twelve times.",
    source: "https://software.intel.com/content/dam/www/public/us/en/documents/corporate-information/museum-transistors-to-transformations-brochure.pdf"
  },
  {
    year: 1982,
    shortName: "Intel 286",
    label: "PERSONAL COMPUTING GROWS",
    title: "Intel 286",
    count: 134000,
    countDisplay: "134,000",
    text: "Intel's 286 processor reached 134,000 transistors. Increasing transistor density helped support more sophisticated personal computers.",
    source: "https://software.intel.com/content/dam/www/public/us/en/documents/corporate-information/museum-transistors-to-transformations-brochure.pdf"
  },
  {
    year: 1993,
    shortName: "Pentium",
    label: "MILLIONS OF TRANSISTORS",
    title: "Intel Pentium",
    count: 3100000,
    countDisplay: "3.1 million",
    text: "The original Intel Pentium used about 3.1 million transistors. The industry had moved from thousands of transistors per processor to millions.",
    source: "https://www.intel.com/content/dam/www/public/us/en/documents/technology-briefs/intel-labs-single-chip-cloud-article.pdf"
  },
  {
    year: 2006,
    shortName: "Core 2 Duo",
    label: "HUNDREDS OF MILLIONS",
    title: "Intel Core 2 Duo",
    count: 291000000,
    countDisplay: "291 million",
    text: "Intel's Core 2 Duo desktop processor contained 291 million transistors. At this point, transistor counts had increased more than 126,000-fold from the 4004.",
    source: "https://www.intel.com/pressroom/archive/releases/2006/20060727comp.htm"
  },
  {
    year: 2022,
    shortName: "Apple M2",
    label: "BILLIONS OF TRANSISTORS",
    title: "Apple M2",
    count: 20000000000,
    countDisplay: "20 billion",
    text: "Apple announced that the M2 system-on-a-chip contains 20 billion transistors. Modern chips combine many functions on one piece of silicon, showing how dramatically semiconductor complexity has grown.",
    source: "https://www.apple.com/newsroom/2022/06/apple-unveils-m2-with-breakthrough-performance-and-capabilities/"
  }
];

const timeline = document.getElementById("timeline");
const detailYear = document.getElementById("detailYear");
const detailLabel = document.getElementById("detailLabel");
const detailTitle = document.getElementById("detailTitle");
const detailText = document.getElementById("detailText");
const detailCount = document.getElementById("detailCount");
const detailMultiplier = document.getElementById("detailMultiplier");
const sourceLink = document.getElementById("sourceLink");
const barChart = document.getElementById("barChart");

function formatMultiplier(count) {
  if (!count) return "Before the 4004";
  const multiplier = count / 2300;

  if (multiplier === 1) return "Baseline";
  if (multiplier < 1000) return `${multiplier.toFixed(1)}×`;
  if (multiplier < 1000000) return `${Math.round(multiplier).toLocaleString()}×`;
  return `${(multiplier / 1000000).toFixed(1)} million ×`;
}

function selectMilestone(index) {
  const item = milestones[index];

  detailYear.textContent = item.year;
  detailLabel.textContent = item.label;
  detailTitle.textContent = item.title;
  detailText.textContent = item.text;
  detailCount.textContent = item.countDisplay;
  detailMultiplier.textContent = formatMultiplier(item.count);
  sourceLink.href = item.source;

  document.querySelectorAll(".timeline-point").forEach((button, i) => {
    button.classList.toggle("active", i === index);
    button.setAttribute("aria-pressed", i === index ? "true" : "false");
  });

  document.getElementById("detailCard").animate(
    [
      { opacity: 0.55, transform: "translateY(6px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    { duration: 230, easing: "ease-out" }
  );
}

milestones.forEach((item, index) => {
  const button = document.createElement("button");
  button.className = "timeline-point";
  button.type = "button";
  button.setAttribute("aria-label", `${item.year}: ${item.shortName}`);
  button.setAttribute("aria-pressed", "false");

  button.innerHTML = `
    <span class="timeline-dot" aria-hidden="true"></span>
    <span class="timeline-year">${item.year}</span>
    <span class="timeline-name">${item.shortName}</span>
  `;

  button.addEventListener("click", () => selectMilestone(index));
  timeline.appendChild(button);
});

// Build a logarithmic bar chart for selected milestones with transistor counts.
const chartItems = milestones.filter(item => item.count);
const logs = chartItems.map(item => Math.log10(item.count));
const minLog = Math.min(...logs);
const maxLog = Math.max(...logs);

chartItems.forEach(item => {
  const log = Math.log10(item.count);
  const normalized = (log - minLog) / (maxLog - minLog);
  const height = 60 + normalized * 225;

  const wrapper = document.createElement("div");
  wrapper.className = "bar-item";
  wrapper.innerHTML = `
    <div class="bar-count">${item.countDisplay}</div>
    <div class="bar" style="height: ${height}px" title="${item.year}: ${item.countDisplay} transistors"></div>
    <div class="bar-label">${item.year}</div>
  `;
  barChart.appendChild(wrapper);
});

// Open with the 1965 milestone selected.
selectMilestone(0);
