const API_BASE = "http://127.0.0.1:5000";

async function fetchProfs() {
  const res = await fetch(`${API_BASE}/professors`);
  const data = await res.json();
  const container = document.getElementById("profList");
  container.innerHTML = '';

  data.sort((a, b) => b.score - a.score);

  data.forEach(prof => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded-2xl shadow-md flex flex-col items-center";

    div.innerHTML = `
      <h2 class="text-xl font-semibold text-purple-700">${prof.name}</h2>
      <p class="text-gray-500 mb-2">Score: ${prof.score}</p>
      <div class="flex gap-2">
        <button class="bg-purple-500 text-white px-3 py-1 rounded-xl hover:bg-purple-700" onclick="vote('${prof.name}', 1)">⬆️ Upvote</button>
        <button class="bg-red-400 text-white px-3 py-1 rounded-xl hover:bg-red-600" onclick="vote('${prof.name}', -1)">⬇️ Downvote</button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function fetchProfs() {
  try {
    const response = await fetch("profs.json");
    const data = await response.json();
    displayProfs(data);
  } catch (error) {
    console.error("Failed to load professor data:", error);
  }
}

fetchProfs();
