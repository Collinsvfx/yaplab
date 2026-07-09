// ── STORY FINDER STATE ────────────────────────────────────────────────────────

function updateGymStatsUI() {
  const ptsEl = document.getElementById('sfGymPoints');
  const lvlEl = document.getElementById('sfGymLevel');
  if (ptsEl) ptsEl.textContent = sfGymPoints;
  if (lvlEl) {
    let levelName = "Novice Creator";
    if (sfGymPoints >= 30) levelName = "Scene Builder";
    if (sfGymPoints >= 60) levelName = "Plot Architect";
    if (sfGymPoints >= 100) levelName = "Story Master";
    lvlEl.textContent = levelName;
  }
}

// ── STORY FINDER ACTIONS ──────────────────────────────────────────────────────
function startStorySession(type) {
  sfActiveStoryType = type;
  sfHistory = [];
  sfAnatomyState = { mission: null, obstacle: null, firstGuess: null, visuals: null, discovery: null, lesson: null, outcome: null, naturalHook: null };
  sfIsLoading = false;

  // Load Socratic Gym Points
  sfGymPoints = parseInt(localStorage.getItem('sf_gym_points') || '0');
  updateGymStatsUI();

  const STORY_TYPES = {
    solvedProblem:  { label: 'I Solved a Problem',    icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` },
    builtSomething: { label: 'I Built Something New', icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>` },
    madeProgress:   { label: 'I Made Progress',       icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>` },
    learnedSomething: { label: 'I Learned Something', icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line></svg>` },
    surprisedMe:    { label: 'Something Surprised Me',icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line><circle cx="12" cy="14" r="1.5"></circle></svg>` },
    changedMind:    { label: 'I Changed My Mind',     icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"></path><path d="M23 20v-6h-6"></path><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>` },
    haveOpinion:    { label: 'I Have An Opinion',     icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>` },
    dayInLife:      { label: 'A Day In My Life',      icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>` }
  };
  
  const info = STORY_TYPES[type] || { label: 'General Storytelling', icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>` };
  document.getElementById('sfActiveIcon').innerHTML = info.icon;
  document.getElementById('sfActiveLabel').textContent = info.label;

  // Clear UI elements
  document.getElementById('sfChatWindow').innerHTML = '';
  updateAnatomyUI();
  document.getElementById('sfXrayContent').innerHTML = '<div style="font-size:12px; color:var(--muted); font-style:italic;">Your latest response will be analyzed for visual specificity, conflict, and turning points.</div>';
  document.getElementById('sfMovieContent').innerHTML = '<div style="font-size:12px; color:var(--muted); font-style:italic;">Visual suggestions (Show vs Tell) will appear here as you tell your story.</div>';
  const scoreCard = document.getElementById('sfScoreCard');
  if (scoreCard) scoreCard.style.display = 'none';
  
  const reviewCard = document.getElementById('sfStoryReviewCard');
  if (reviewCard) reviewCard.style.display = 'none';

  const anglesCard = document.getElementById('sfStoryAnglesCard');
  if (anglesCard) anglesCard.style.display = 'none';
  sfStoryAngles = [];
  
  // Reset input state
  const chatInput = document.getElementById('sfChatInput');
  chatInput.value = '';
  chatInput.disabled = false;
  chatInput.placeholder = 'Type your answer to the coach...';
  document.getElementById('sfSendBtn').disabled = false;

  // Transition UI
  document.getElementById('sfLandingState').style.display = 'none';
  document.getElementById('sfActiveSessionState').style.display = 'block';

  // Seed with coach's first greeting / question
  sendStoryMessage(true);
}

function exitStorySession() {
  document.getElementById('sfConfirmModal').style.display = 'flex';
}

function closeSfConfirmModal() {
  document.getElementById('sfConfirmModal').style.display = 'none';
}

function confirmExitStorySession() {
  document.getElementById('sfConfirmModal').style.display = 'none';
  document.getElementById('sfActiveSessionState').style.display = 'none';
  document.getElementById('sfLandingState').style.display = 'block';
  // Reset session-end cards
  const reviewCard = document.getElementById('sfStoryReviewCard');
  const scoreCard = document.getElementById('sfScoreCard');
  const anglesCard = document.getElementById('sfStoryAnglesCard');
  if (reviewCard) reviewCard.style.display = 'none';
  if (scoreCard) scoreCard.style.display = 'none';
  if (anglesCard) anglesCard.style.display = 'none';
  sfStoryAngles = [];
  sfActiveStoryType = null;
  sfHistory = [];
  // Refresh streak display on landing
  renderStreakOnLanding();
}

async function sendStoryMessage(isInit = false) {
  console.log('[StoryFinder] sendStoryMessage called, isInit:', isInit, 'loading:', sfIsLoading);
  if (sfIsLoading) return;
  
  const inputEl = document.getElementById('sfChatInput');
  const userText = isInit ? '' : inputEl.value.trim();
  console.log('[StoryFinder] userText:', userText);
  
  if (!isInit && !userText) {
    inputEl.focus();
    return;
  }

  const chatWindow = document.getElementById('sfChatWindow');
  if (!isInit) {
    console.log('[StoryFinder] Adding user bubble for text:', userText);
    const userBubble = document.createElement('div');
    userBubble.className = 'sf-msg user';
    userBubble.textContent = userText;
    chatWindow.appendChild(userBubble);
    sfHistory.push({ role: 'user', text: userText });
    
    // Clear and lock inputs
    inputEl.value = '';
    inputEl.disabled = true;
    document.getElementById('sfSendBtn').disabled = true;
    console.log('[StoryFinder] Cleared input box value:', inputEl.value);
  }

  if (!supabaseClient) {
    simulateOfflineStorySession(isInit, userText);
    return;
  }

  // Create loading bubble
  const loadingBubble = document.createElement('div');
  loadingBubble.className = 'sf-msg loading';
  loadingBubble.id = 'sfCoachLoadingBubble';
  loadingBubble.innerHTML = '<span class="preflight-spinner"></span> Coach is thinking...';
  chatWindow.appendChild(loadingBubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  sfIsLoading = true;

  try {
    const res = await fetch('/api/story-coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        storyType: sfActiveStoryType,
        history: sfHistory,
        userMessage: isInit ? null : userText,
        anatomyState: sfAnatomyState
      })
    });

    if (!res.ok) {
      throw new Error('Coach failed to respond. Check server logs or retry.');
    }

    const result = await res.json();

    // Remove loading indicator
    const lb = document.getElementById('sfCoachLoadingBubble');
    if (lb) lb.remove();

    // Render coach bubble
    const coachBubble = document.createElement('div');
    coachBubble.className = 'sf-msg coach';
    coachBubble.textContent = result.coachMessage;
    chatWindow.appendChild(coachBubble);
    sfHistory.push({ role: 'model', text: result.coachMessage });

    // Update Story Anatomy
    if (result.extractedAnatomy) {
      sfAnatomyState = result.extractedAnatomy;
      updateAnatomyUI();
    }

    // Update Highlights (Story X-Ray)
    updateXrayUI(result.xRayHighlights);

    // Update Movie Test
    updateMovieTestUI(result.movieTest);

    // Handle session end
    if (result.isComplete) {
      inputEl.placeholder = 'Session complete!';
      inputEl.disabled = true;
      document.getElementById('sfSendBtn').disabled = true;

      window.sfLastScriptOutline = result.scriptOutline || [];
      sfStoryAngles = result.storyAngles || [];

      // If multiple story angles were found, show the picker first
      if (sfStoryAngles.length > 1) {
        renderStoryAngles(sfStoryAngles);
        // Pre-load the strongest angle's score into the review card (hidden)
        if (result.score) {
          renderStoryScore(result.score);
        }
      } else {
        // Single story — go straight to review
        if (result.score) {
          renderStoryScore(result.score);
        }
      }
    } else {
      inputEl.disabled = false;
      document.getElementById('sfSendBtn').disabled = false;
      inputEl.placeholder = 'Type your answer to the coach...';
      inputEl.focus();
    }

  } catch (err) {
    const lb = document.getElementById('sfCoachLoadingBubble');
    if (lb) lb.remove();

    const errBubble = document.createElement('div');
    errBubble.className = 'sf-msg coach';
    errBubble.style.color = 'var(--danger)';
    errBubble.textContent = 'Error: ' + err.message;
    chatWindow.appendChild(errBubble);

    if (!isInit) {
      inputEl.disabled = false;
      document.getElementById('sfSendBtn').disabled = false;
    }
  } finally {
    sfIsLoading = false;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}

function simulateOfflineStorySession(isInit = false, userText = '') {
  const chatWindow = document.getElementById('sfChatWindow');
  const inputEl = document.getElementById('sfChatInput');

  if (isInit) {
    sfOfflineStep = 0;
    sfIsLoading = true;
    inputEl.disabled = true;
    document.getElementById('sfSendBtn').disabled = true;
    
    setTimeout(() => {
      const welcome = "Mission: Let's discover today's story. What were you trying to accomplish?";
      const bubble = document.createElement('div');
      bubble.className = 'sf-msg coach';
      bubble.textContent = `[Offline Mode] ${welcome}`;
      chatWindow.appendChild(bubble);
      sfHistory.push({ role: 'model', text: welcome });
      chatWindow.scrollTop = chatWindow.scrollHeight;
      sfIsLoading = false;
      inputEl.disabled = false;
      document.getElementById('sfSendBtn').disabled = false;
      inputEl.focus();
      updateAnatomyUI();
    }, 800);
    return;
  }

  sfIsLoading = true;
  const loadingBubble = document.createElement('div');
  loadingBubble.className = 'sf-msg loading';
  loadingBubble.id = 'sfCoachLoadingBubble';
  loadingBubble.innerHTML = '<span class="preflight-spinner"></span> Coach is thinking...';
  chatWindow.appendChild(loadingBubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    const lb = document.getElementById('sfCoachLoadingBubble');
    if (lb) lb.remove();

    let coachReply = '';
    sfOfflineStep++;

    if (sfOfflineStep === 1) {
      sfAnatomyState.mission = userText;
      coachReply = "Got it. Now — what blocked you? What was the first sign that something wasn't going to plan?";
    } else if (sfOfflineStep === 2) {
      sfAnatomyState.obstacle = userText;
      coachReply = "What was your first guess about what was causing it? What did you think the problem was?";
    } else if (sfOfflineStep === 3) {
      sfAnatomyState.firstGuess = userText;
      coachReply = "Did it work? And when you realized it didn't — what made you realize you were wrong?";
    } else if (sfOfflineStep === 4) {
      sfAnatomyState.discovery = userText;
      coachReply = "What's the one lesson you'd take from this that someone else could use tomorrow?";
    } else if (sfOfflineStep === 5) {
      sfAnatomyState.lesson = userText;
      coachReply = "One more: when you realized something was wrong, what was actually on your screen? Don't interpret it — just describe exactly what you saw.";
    } else if (sfOfflineStep === 6) {
      sfAnatomyState.visuals = userText;
      coachReply = "Last question. If you were telling this story to your best friend over dinner tonight, where would you naturally start?";
    } else {
      sfAnatomyState.naturalHook = userText;
      coachReply = "Perfect. That right there — that's probably your strongest opening. Your Story Review is ready below.";

      const mockScore = {
        whatWentWell: [
          "You clearly explained your mission and roadblock.",
          "You described a visual scene: '" + (sfAnatomyState.visuals || 'the captions Glowed but MP4 spat out standard block text') + "'"
        ],
        nextTimeToPractice: [
          "Next time, make sure to describe your first guess's logic in detail rather than just the action."
        ],
        checklist: {
          mission: true,
          obstacle: true,
          firstGuess: true,
          visualScene: true,
          discovery: true,
          lesson: true
        }
      };
      renderStoryScore(mockScore);

      // Seed Script Outline
      window.sfLastScriptOutline = [
        { label: '🎯 The Moment Everything Started', text: `Your natural opening: "${sfAnatomyState.naturalHook}"` },
        { label: '🚧 The Obstacle', text: `The roadblock you hit: "${sfAnatomyState.obstacle}". Visual scene: "${sfAnatomyState.visuals || 'Describe what you saw on screen'}"` },
        { label: '🧪 The Struggle', text: `Your first guess was: "${sfAnatomyState.firstGuess}". Describe the decision-making process, not just the action.` },
        { label: '💡 The Discovery', text: `The moment everything changed: "${sfAnatomyState.discovery}"` },
        { label: '🎁 The Lesson', text: `What anyone watching should take away: "${sfAnatomyState.lesson}"` }
      ];

      inputEl.placeholder = 'Session complete!';
      inputEl.disabled = true;
      document.getElementById('sfSendBtn').disabled = true;
    }

    // Update highlights and movie test with mock reviews
    const mockHighlights = [
      { text: userText.slice(0, Math.min(25, userText.length)), type: 'conflict', critique: 'Defines the tension and obstacle clearly.' },
      { text: userText.slice(Math.min(25, userText.length), Math.min(60, userText.length)), type: 'visual', critique: 'Includes visual cues representing active design.' }
    ].filter(h => h.text.length > 0);
    
    updateXrayUI(mockHighlights);
    updateAnatomyUI();

    const mockMovieTest = {
      before: "I spent hours trying to debug the error.",
      after: "I stared at a console of 12 recurring red error codes for three hours.",
      explanation: "Shows specific, visual evidence of debug stress instead of abstract time summary."
    };
    updateMovieTestUI(mockMovieTest);

    // Show coach bubble
    const bubble = document.createElement('div');
    bubble.className = 'sf-msg coach';
    bubble.textContent = `[Offline Mode] ${coachReply}`;
    chatWindow.appendChild(bubble);
    sfHistory.push({ role: 'model', text: coachReply });
    chatWindow.scrollTop = chatWindow.scrollHeight;

    sfIsLoading = false;
    if (sfOfflineStep <= 6) {
      inputEl.disabled = false;
      document.getElementById('sfSendBtn').disabled = false;
      inputEl.placeholder = 'Type your answer to the coach...';
      inputEl.focus();
    }
  }, 1000);
}

function updateAnatomyUI() {
  const steps = ['mission', 'obstacle', 'firstGuess', 'visuals', 'discovery', 'lesson', 'outcome', 'naturalHook'];
  let foundActive = false;
  steps.forEach(step => {
    const val = sfAnatomyState[step];
    const el = document.getElementById('anat-' + step);
    if (el) {
      if (val && val.trim() !== '' && val !== 'Not yet identified') {
        el.classList.add('filled');
        el.classList.remove('locked', 'active-step');
        el.querySelector('.sf-anatomy-value').textContent = val;
      } else {
        el.classList.remove('filled');
        el.querySelector('.sf-anatomy-value').textContent = '—';
        if (!foundActive) {
          el.classList.add('active-step');
          el.classList.remove('locked');
          foundActive = true;
        } else {
          el.classList.add('locked');
          el.classList.remove('active-step');
        }
      }
    }
  });
}

function renderStoryMap() {
  const mapEl = document.getElementById('sfStoryMapFlow');
  if (!mapEl) return;

  const stages = [
    { icon: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`, label: 'Natural Hook', key: 'naturalHook' },
    { icon: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`, label: 'Mission', key: 'mission' },
    { icon: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`, label: 'Obstacle', key: 'obstacle' },
    { icon: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><path d="M10 2v7.31L4.75 17c-.77 1.08-.02 2.59 1.31 2.59h11.88c1.33 0 2.08-1.5 1.31-2.59L14 9.31V2h-4z"></path><line x1="8.5" y1="2" x2="15.5" y2="2"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>`, label: 'First Guess', key: 'firstGuess' },
    { icon: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`, label: 'Visual Scene', key: 'visuals' },
    { icon: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line></svg>`, label: 'Discovery', key: 'discovery' },
    { icon: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>`, label: 'Lesson', key: 'lesson' },
    { icon: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>`, label: 'Outcome', key: 'outcome' }
  ];

  const mapBoxStyle = 'background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:12px 14px; display:flex; flex-direction:column; gap:4px;';
  const arrowStyle = 'text-align:center; color:var(--muted); font-size:18px; line-height:1.2; padding:2px 0;';

  let html = '';
  stages.forEach((s, i) => {
    const val = sfAnatomyState[s.key];
    const displayVal = val && val.trim() ? val : '<span style="color:var(--muted); font-style:italic;">Not captured</span>';
    html += `<div style="${mapBoxStyle}">
      <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--muted);">${s.icon} ${s.label}</div>
      <div style="font-size:13px; color:var(--text); line-height:1.5;">${displayVal}</div>
    </div>`;
    if (i < stages.length - 1) {
      html += `<div style="${arrowStyle}">↓</div>`;
    }
  });

  mapEl.innerHTML = html;
  document.getElementById('sfStoryMapCard').style.display = 'block';
}

function saveInstinctNote(note) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const stored = JSON.parse(localStorage.getItem('sf_instinct_notes') || '[]');
  // Keep only last 7 unique days
  const filtered = stored.filter(n => n.date !== today);
  filtered.unshift({ date: today, note });
  const trimmed = filtered.slice(0, 7);
  localStorage.setItem('sf_instinct_notes', JSON.stringify(trimmed));

  // Show on instinct card
  const card = document.getElementById('sfInstinctCard');
  const textEl = document.getElementById('sfInstinctText');
  if (card && textEl) {
    textEl.textContent = note;
    card.style.display = 'block';
  }
}

function renderStreakOnLanding() {
  const stored = JSON.parse(localStorage.getItem('sf_instinct_notes') || '[]');
  const section = document.getElementById('sfStreakSection');
  const list = document.getElementById('sfStreakList');
  if (!section || !list) return;
  
  if (stored.length === 0) {
    section.style.display = 'none';
    return;
  }

  const fmt = dateStr => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  list.innerHTML = stored.map(n => `
    <div style="background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:10px 14px; display:flex; flex-direction:column; gap:4px;">
      <div style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:0.04em;">${fmt(n.date)}</div>
      <div style="font-size:12px; color:var(--text); line-height:1.5; font-style:italic;">"${n.note}"</div>
    </div>
  `).join('');

  section.style.display = 'block';
}

function updateXrayUI(highlights) {
  const xrayDiv = document.getElementById('sfXrayContent');
  if (!xrayDiv) return;
  if (!highlights || highlights.length === 0) {
    xrayDiv.innerHTML = '<div style="font-size:12px; color:var(--muted); font-style:italic;">Your latest response will be analyzed for visual specificity, conflict, and turning points.</div>';
    return;
  }

  let html = '<div class="sf-xray-text">';
  highlights.forEach(h => {
    const xrClass = 'xr-highlight xr-' + h.type;
    html += `<span class="${xrClass}" title="${esc(h.critique)}">${esc(h.text)}</span> `;
  });
  html += '</div>';

  html += `
    <div class="sf-xray-legend">
      <span class="sf-legend-item"><span style="width:6px; height:6px; border-radius:50%; background:var(--easy); display:inline-block; vertical-align:middle; margin-right:3px;"></span>Visual</span>
      <span class="sf-legend-item"><span style="width:6px; height:6px; border-radius:50%; background:var(--medium); display:inline-block; vertical-align:middle; margin-right:3px;"></span>Conflict</span>
      <span class="sf-legend-item"><span style="width:6px; height:6px; border-radius:50%; background:#a855f7; display:inline-block; vertical-align:middle; margin-right:3px;"></span>Turn</span>
      <span class="sf-legend-item"><span style="width:6px; height:6px; border-radius:50%; background:var(--hard); display:inline-block; vertical-align:middle; margin-right:3px;"></span>Explanation</span>
      <span class="sf-legend-item"><span style="width:6px; height:6px; border-radius:50%; background:#f59e0b; display:inline-block; vertical-align:middle; margin-right:3px;"></span>Story Drift</span>
    </div>
  `;

  xrayDiv.innerHTML = html;
}

function updateMovieTestUI(movieTest) {
  const movieDiv = document.getElementById('sfMovieContent');
  if (!movieDiv) return;
  if (!movieTest || !movieTest.before) {
    movieDiv.innerHTML = '<div style="font-size:12px; color:var(--muted); font-style:italic;">Visual suggestions (Show vs Tell) will appear here as you tell your story.</div>';
    return;
  }

  // When 'after' is null, the AI is asking the user to describe what they saw
  if (!movieTest.after) {
    movieDiv.innerHTML = `
      <div class="sf-movie-comp fadeIn">
        <div class="sf-movie-box before" style="margin-bottom:6px;">
          <div class="lbl">Too Abstract</div>
          <div style="font-style:italic; color:var(--muted);">"${esc(movieTest.before)}"</div>
        </div>
        <div style="background:rgba(var(--accent-rgb,99,102,241),0.08); border:1px solid var(--border); border-radius:8px; padding:10px 12px; font-size:12px; color:var(--text); line-height:1.5;">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>${esc(movieTest.explanation || 'Describe exactly what you saw on screen.')}
        </div>
      </div>
    `;
    return;
  }

  movieDiv.innerHTML = `
    <div class="sf-movie-comp fadeIn">
      <div class="sf-movie-box before" style="margin-bottom:6px;">
        <div class="lbl">Before (Telling)</div>
        <div style="font-style:italic; color:var(--muted);">"${esc(movieTest.before)}"</div>
      </div>
      <div class="sf-movie-box after" style="margin-bottom:6px;">
        <div class="lbl">After (Showing Movie)</div>
        <strong>"${esc(movieTest.after)}"</strong>
      </div>
      <div style="font-size:11px; color:var(--muted); line-height:1.4;">${esc(movieTest.explanation)}</div>
    </div>
  `;
}

function renderStoryScore(score) {
  // Hide old legacy scorecard
  const scoreCard = document.getElementById('sfScoreCard');
  if (scoreCard) scoreCard.style.display = 'none';

  const reviewCard = document.getElementById('sfStoryReviewCard');
  if (!reviewCard) return;

  const wellEl = document.getElementById('sfReviewWell');
  const practiceEl = document.getElementById('sfReviewPractice');
  const checklistEl = document.getElementById('sfReviewChecklist');

  // Fill What you did well
  if (wellEl && score.whatWentWell) {
    wellEl.innerHTML = score.whatWentWell.map(w => `<div style="margin-bottom:4px;">• ${esc(w)}</div>`).join('');
  } else if (wellEl) {
    wellEl.innerHTML = `<div style="margin-bottom:4px;">• Great job establishing the stakes and outlining the conflict.</div>`;
  }

  // Fill Next thing to practice
  if (practiceEl && score.nextTimeToPractice) {
    practiceEl.innerHTML = score.nextTimeToPractice.map(p => `<div style="margin-bottom:4px;">• ${esc(p)}</div>`).join('');
  } else if (practiceEl) {
    practiceEl.innerHTML = `<div style="margin-bottom:4px;">• Next time, try to add more sensory detail about what was literally visible on your screen.</div>`;
  }

  // Fill Checklist Grid
  if (checklistEl && score.checklist) {
    const keys = [
      { label: 'Mission', val: score.checklist.mission },
      { label: 'Obstacle', val: score.checklist.obstacle },
      { label: 'First Guess', val: score.checklist.firstGuess },
      { label: 'Visual Scene', val: score.checklist.visualScene },
      { label: 'Discovery', val: score.checklist.discovery },
      { label: 'Lesson', val: score.checklist.lesson },
      { label: 'Outcome', val: score.checklist.outcome }
    ];
    checklistEl.innerHTML = keys.map(k => `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <span>${esc(k.label)}</span>
        <span>${k.val ? `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#10b981" stroke-width="3" class="inline-svg" style="vertical-align:middle;margin:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>` : `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#facc15" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin:0;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`}</span>
      </div>
    `).join('');
  } else if (checklistEl) {
    // Fallback for mock/offline score structure
    const keys = [
      { label: 'Mission', val: true },
      { label: 'Obstacle', val: true },
      { label: 'First Guess', val: true },
      { label: 'Visual Scene', val: true },
      { label: 'Discovery', val: true },
      { label: 'Lesson', val: true },
      { label: 'Outcome', val: true }
    ];
    checklistEl.innerHTML = keys.map(k => `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px;">
        <span>${esc(k.label)}</span>
        <span>${k.val ? `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#10b981" stroke-width="3" class="inline-svg" style="vertical-align:middle;margin:0;"><polyline points="20 6 9 17 4 12"></polyline></svg>` : `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#facc15" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin:0;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`}</span>
      </div>
    `).join('');
  }

  reviewCard.style.display = 'block';
}

function renderStoryAngles(angles) {
  const card = document.getElementById('sfStoryAnglesCard');
  const subtitle = document.getElementById('sfAnglesSubtitle');
  const list = document.getElementById('sfAnglesList');
  if (!card || !subtitle || !list) return;

  subtitle.textContent = `I found ${angles.length} stories in your session. Which one would you like to tell?`;

  list.innerHTML = angles.map((angle, i) => `
    <div style="background:var(--bg); border:1px solid ${i === 0 ? 'var(--accent)' : 'var(--border)'}; border-radius:12px; padding:14px 16px; display:flex; flex-direction:column; gap:8px; transition:border-color 0.15s;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:20px; line-height:1;">${esc(angle.emoji)}</span>
        <div>
          <div style="font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:var(--text);">${esc(angle.title)}</div>
          ${i === 0 ? '<div style="font-size:10px; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:0.06em; margin-top:1px;">Strongest angle</div>' : ''}
        </div>
      </div>
      <div style="font-size:12px; color:var(--muted); line-height:1.5;">${esc(angle.focus)}</div>
      <div style="font-size:12px; color:var(--text); font-style:italic; border-left:2px solid var(--border); padding-left:10px; margin:2px 0; line-height:1.5;">&ldquo;${esc(angle.hook)}&rdquo;</div>
      <button class="btn btn-primary" onclick="selectStoryAngle(${i})" style="align-self:flex-start; font-size:12px; padding:6px 14px; font-weight:600; margin-top:4px;">Tell This Story →</button>
    </div>
  `).join('');

  card.style.display = 'block';
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function selectStoryAngle(index) {
  const angle = sfStoryAngles[index];
  if (!angle) return;

  // Set the selected angle's script outline as the active one
  window.sfLastScriptOutline = angle.scriptOutline || [];

  // Hide the angles picker
  const anglesCard = document.getElementById('sfStoryAnglesCard');
  if (anglesCard) anglesCard.style.display = 'none';

  // Show the story review card
  const reviewCard = document.getElementById('sfStoryReviewCard');
  if (reviewCard) {
    reviewCard.style.display = 'block';
    reviewCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}


async function exportStoryToScriptBuilder() {
  if (!window.sfLastScriptOutline || window.sfLastScriptOutline.length === 0) {
    alert('No script outline found to export.');
    return;
  }

  const title = `Story: My ${sfActiveStoryType} Day`;
  
  const sections = [
    { type: 'preflight', emotionalEntry: sfAnatomyState.lesson || '', whoFeels: 'My Audience', hookTest: sfAnatomyState.mission || '' }
  ];

  window.sfLastScriptOutline.forEach((sec, idx) => {
    sections.push({
      id: Date.now() + idx,
      label: sec.label,
      placeholder: 'Write details...',
      text: sec.text
    });
  });

  let newId = null;

  if (supabaseClient && supabaseUser) {
    try {
      const { data, error } = await supabaseClient
        .from('learn_items')
        .insert({
          user_id: supabaseUser.id,
          title,
          category: 'storytelling',
          status: 'unread',
          sections,
          updated_at: new Date().toISOString()
        })
        .select();
      if (error) throw error;
      if (data && data[0]) {
        newId = data[0].id;
        learnItems.unshift({
          id: newId,
          title: data[0].title,
          category: data[0].category,
          status: data[0].status,
          sections: data[0].sections || [],
          updatedAt: new Date(data[0].updated_at).getTime()
        });
      }
    } catch (e) {
      console.error(e);
      alert('Failed to save to database. Exporting locally...');
    }
  }

  if (!newId) {
    newId = Date.now();
    learnItems.unshift({
      id: newId,
      title,
      category: 'storytelling',
      status: 'unread',
      sections,
      updatedAt: Date.now()
    });
    saveLearn();
  }

  // Set the open script flag for the learn page
  sessionStorage.setItem('open_script_id', newId);

  // Restore Story Finder inputs
  document.getElementById('sfSendBtn').disabled = false;
  document.getElementById('sfChatInput').disabled = false;
  document.getElementById('sfChatInput').placeholder = 'Type your answer to the coach...';

  // Return to landing state in Story Finder
  document.getElementById('sfActiveSessionState').style.display = 'none';
  document.getElementById('sfLandingState').style.display = 'block';
  sfActiveStoryType = null;
  sfHistory = [];

  // Redirect to learn page
  window.location.href = 'learn.html';
}

// ── INITIALIZE PAGE ───────────────────────────────────────────────────────────
function initStoryFinderPage() {
  sfGymPoints = parseInt(localStorage.getItem('sf_gym_points') || '0');
  updateGymStatsUI();
  renderStreakOnLanding();

  const sfInput = document.getElementById('sfChatInput');
  if (sfInput) {
    sfInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        sendStoryMessage();
      }
    });
  }
}

if (window.yaplabStateReady) {
  initStoryFinderPage();
} else {
  window.addEventListener('yaplabStateReady', initStoryFinderPage);
}
