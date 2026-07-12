// ── QUICK LOG DATA — Exact Story Lab v3 Questions ────────────────────────────

const QL_STORAGE_KEY = 'sf_quick_log';
let qlCurrentScenario = null;
let qlEditingId = null;

const QL_SCENARIOS = {
  solvedProblem: {
    icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="13" rx="6" ry="7"/><path d="M12 6V3"/><path d="M9 4 7 2"/><path d="M15 4 17 2"/><path d="M6 11H2"/><path d="M6 15H2"/><path d="M18 11H22"/><path d="M18 15H22"/><path d="M9 20 7 22"/><path d="M15 20 17 22"/></svg>`,
    label: 'I solved a problem', stamp: 'INCIDENT LOG',
    desc: 'Something broke or blocked you, and you fixed it.',
    questions: [
      'What were you trying to do?',
      'What went wrong?',
      'What did you think was happening?',
      'What actually happened?',
      'What\u2019s the exact moment you realized what was really going on?',
      'How did you solve it?',
      'What did you learn?',
      'If someone only remembers one thing from this story, what should it be?'
    ]
  },
  builtSomething: {
    icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 2 21 7 21 17 12 22 3 17 3 7Z"/><path d="M12 2 12 22"/><path d="M3 7 12 12 21 7"/></svg>`,
    label: 'I built something new', stamp: 'BUILD LOG',
    desc: 'Shipped a feature, a screen, a flow.',
    questions: [
      'What did you build?',
      'Why did it matter?',
      'What does it let people do now?',
      'What part are you most proud of?',
      'What surprised you while building it?',
      'What\u2019s one specific detail \u2014 a number, a decision, a moment \u2014 someone outside your head wouldn\u2019t guess?',
      "What's next?",
      'If someone only remembers one thing from this story, what should it be?'
    ]
  },
  madeProgress: {
    icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="3,17 9,11 13,15 21,6"/><polyline points="15,6 21,6 21,12"/></svg>`,
    label: 'I made progress', stamp: 'PROGRESS LOG',
    desc: 'No drama \u2014 just forward motion.',
    questions: [
      'What moved forward today?',
      'What almost didn\u2019t happen today?',
      "What's still unfinished or stuck?",
      'What\u2019s one concrete number or detail that shows the progress?',
      "What's the next small unlock?",
      'If someone only remembers one thing from this story, what should it be?'
    ]
  },
  learnedSomething: {
    icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z"/></svg>`,
    label: 'I learned something', stamp: 'INSIGHT LOG',
    desc: 'Your thinking shifted on something.',
    questions: [
      'What belief are you changing?',
      'Why did you believe that in the first place?',
      'What changed your mind?',
      'What was the single idea or example that convinced you?',
      'What do you believe now?',
      'What\'s the one thing people should remember?'
    ]
  },
  surprisedMe: {
    icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/><circle cx="12" cy="14" r="1.5"/></svg>`,
    label: 'Something surprised me', stamp: 'SURPRISE LOG',
    desc: 'An unexpected result, reaction, or discovery.',
    questions: [
      'What happened that surprised you?',
      'What were you expecting instead?',
      'What was your first reaction when you saw it?',
      'Why do you think it happened \u2014 what was the real reason?',
      'What did you do differently because of this?',
      'What should other people know about this?',
      'If someone only remembers one thing from this story, what should it be?'
    ]
  },
  changedMind: {
    icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>`,
    label: 'I changed my mind', stamp: 'FLIP LOG',
    desc: 'A belief, approach, or opinion that flipped.',
    questions: [
      'What did you change your mind about?',
      'What did you believe before?',
      'What happened that made you question it?',
      'Was there a specific moment, piece of evidence, or conversation that tipped you?',
      'What do you believe now \u2014 and why is it better?',
      'What would you tell your past self?',
      'If someone only remembers one thing from this story, what should it be?'
    ]
  },
  haveOpinion: {
    icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 2c1 3-3 4-3 8a3 3 0 0 0 6 0c0-1-1-2-1-2 2 1 3 3 3 5a5 5 0 0 1-10 0c0-4 3-5 3-9 0-1 1-2 2-2Z"/></svg>`,
    label: 'I have an opinion', stamp: 'HOT TAKE',
    desc: 'You want to say something, not report something.',
    questions: [
      "What's the opinion?",
      'Why do most people think the opposite?',
      'What experience changed your mind?',
      'Tell me the story that made you believe this.',
      'Why does this matter?',
      'What should people do instead?',
      'If someone only remembers one thing from this story, what should it be?'
    ]
  },
  dayInLife: {
    icon: `<svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 8h3l2-2h6l2 2h3v11H4Z"/><circle cx="12" cy="13" r="3.5"/></svg>`,
    label: 'I want to document my day', stamp: 'FIELD NOTE',
    desc: 'Nothing exciting happened \u2014 that\u2019s fine too.',
    questions: [
      'What did you spend most of your time on?',
      'Why was it important?',
      'What small decision did you make today?',
      'What\u2019s one specific detail from today worth remembering \u2014 a number, a quote, a moment?',
      'What\u2019s one thing you\u2019d tell someone who asked how your day went?',
      'If someone only remembers one thing from this story, what should it be?'
    ]
  }
};

const QL_TOOLTIPS = {
  // Solved Problem
  'What were you trying to do?': 'e.g., "Implement a search bar with auto-suggestions"',
  'What went wrong?': 'e.g., "The API requests rate-limited the client after 3 keystrokes"',
  'What did you think was happening?': 'e.g., "Thought the debounce timer was too short"',
  'What actually happened?': 'e.g., "The keyup event was triggering multiple times because of duplicate event listeners"',
  'What\'s the exact moment you realized what was really going on?': 'e.g., "When I added console.log to the listener and saw it printed 5 times on one keypress"',
  'How did you solve it?': 'e.g., "Cleaned up old event listeners in useEffect"',
  'What did you learn?': 'e.g., "Always clean up side-effects in React component mounts"',
  
  // Built Something
  'What did you build?': 'e.g., "A real-time notification widget"',
  'Why did it matter?': 'e.g., "Users were missing mentions when offline"',
  'What does it let people do now?': 'e.g., "Get immediate updates on their screen without reloading"',
  'What part are you most proud of?': 'e.g., "The smooth animation transitions using pure CSS keyframes"',
  'What surprised you while building it?': 'e.g., "WebSockets connection was incredibly easy to set up with Socket.io"',
  'What\'s one specific detail - a number, a decision, a moment - someone outside your head wouldn\'t guess?': 'e.g., "I refactored the database schema three times to ensure notification reads are fast"',
  "What's next?": 'e.g., "Add push notifications for mobile devices"',
  
  // Made Progress
  'What moved forward today?': 'e.g., "Finished 80% of the settings page layout"',
  'What almost didn\'t happen today?': 'e.g., "Adding the dark mode toggle due to CSS variable inheritance issues"',
  'What\'s still unfinished or stuck?': 'e.g., "Database persistence for user preferences"',
  'What\'s one concrete number or detail that shows the progress?': 'e.g., "Reduced page load time by 30% after optimizing images"',
  'What\'s the next small unlock?': 'e.g., "Connecting the settings panel API endpoints"',
  
  // Learned Something
  'What belief are you changing?': 'e.g., "I used to believe storytelling was about writing scripts."',
  'Why did you believe that in the first place?': 'e.g., "Because I spent four months practicing scripts and nothing felt engaging."',
  'What changed your mind?': 'e.g., "I read Storytelling 101."',
  'What was the single idea or example that convinced you?': 'e.g., "The book explained that every great story starts with identifying a moment before writing."',
  'What do you believe now?': 'e.g., "Storytelling starts with identifying moments, not writing."',
  'What\'s the one thing people should remember?': 'e.g., "Never start writing until you\'ve identified the moment."',
  
  // Surprised Me
  'What happened that surprised you?': 'e.g., "50% of beta users disabled dark mode within an hour"',
  'What were you expecting instead?': 'e.g., "Expected everyone to prefer dark mode by default"',
  'What was your first reaction when you saw it?': 'e.g., "I thought the theme selector had a bug"',
  'Why do you think it happened - what was the real reason?': 'e.g., "The contrast on the light-gray text on dark-gray cards was too low for readability"',
  'What did you do differently because of this?': 'e.g., "Increased the default contrast ratios for all dark theme text elements"',
  'What should other people know about this?': 'e.g., "Always test your interfaces under various light conditions"',
  
  // Changed Mind
  'What did you change your mind about?': 'e.g., "Using TailwindCSS for styling"',
  'What did you believe before?': 'e.g., "I believed TailwindCSS was too verbose and cluttered the HTML"',
  'What happened that made you question it?': 'e.g., "I built a project with vanilla CSS and spent 3 hours resolving flexbox alignments"',
  'Was there a specific moment, piece of evidence, or conversation that tipped you?': 'e.g., "I watched a coworker build a complete dashboard in 15 minutes using Tailwind utility classes"',
  'What do you believe now - and why is it better?': 'e.g., "Tailwind reduces CSS bloat and speeds up UI prototyping"',
  'What would you tell your past self?': 'e.g., "Stop fighting utility classes and just try it for one small build"',
  
  // Have Opinion
  'What\'s the opinion?': 'e.g., "Single-page apps are overused for content-heavy sites"',
  'Why do most people think the opposite?': 'e.g., "Because SPA frameworks are hyped and have great developer experience"',
  'What experience changed your mind?': 'e.g., "I had to optimize SEO on a client\'s website built with pure client-side React"',
  'Tell me the story that made you believe this.': 'e.g., "Google Search couldn\'t index our pricing tables for 3 weeks because of client-side loading"',
  'Why does this matter?': 'e.g., "Organic traffic drops cost real money to business clients"',
  'What should people do instead?': 'e.g., "Use SSR or static site generation for public-facing content pages"',
  
  // Day in Life
  'What did you spend most of your time on?': 'e.g., "Reviewing and resolving 12 pull requests"',
  'Why was it important?': 'e.g., "Needed to clear the queue before the production release on Friday"',
  'What small decision did you make today?': 'e.g., "Approved a refactor of the user profile component rather than deferring it"',
  'What\'s one specific detail from today worth remembering - a number, a quote, a moment?': 'e.g., "A teammate said: \'This is the cleanest state machine I have ever seen.\'"',
  'What\'s one thing you\'d tell someone who asked how your day went?': 'e.g., "It was a productive code-review marathon that saved us from potential bugs"',
  
  // Shared signature
  'If someone only remembers one thing from this story, what should it be?': 'e.g., "Choose technical stack based on user search patterns, not developer preferences"'
};

function getNormalizedQuestionKey(q) {
  if (!q) return '';
  return q
    .replace(/[\u2018\u2019]/g, "'") // Normalize curly single quotes / apostrophes to '
    .replace(/[\u201C\u201D]/g, '"') // Normalize curly double quotes to "
    .replace(/[\u2013\u2014]/g, '-') // Normalize en/em dashes to -
    .trim();
}

// Global click handler to dismiss any active Story Lab tooltips and export menus
document.addEventListener('click', () => {
  document.querySelectorAll('.sl-tooltip-container.active').forEach(el => {
    el.classList.remove('active');
  });
  document.querySelectorAll('.entry-export-container.active').forEach(el => {
    el.classList.remove('active');
  });
});

// ── STORY LAB NAVIGATION & UTILITIES ──────────────────────────────────────────

function showQuickLogPanel() {
  document.getElementById('sfStoryLabContainer').style.display = 'block';
  renderSlScenarioGrid();
  switchSlTab('today');
}

function showLogHistoryPanel() {
  document.getElementById('sfStoryLabContainer').style.display = 'block';
  switchSlTab('log');
}

function showAiCoachGrid() {
  document.getElementById('sfStoryLabContainer').style.display = 'block';
  switchSlTab('coach');
}

function switchSlTab(name) {
  document.getElementById('view-today').classList.toggle('active', name === 'today');
  document.getElementById('view-log').classList.toggle('active', name === 'log');
  document.getElementById('view-interview').classList.toggle('active', name === 'interview');
  document.getElementById('view-coach').classList.toggle('active', name === 'coach');
  
  document.getElementById('slNavTodayBtn').classList.toggle('active', name === 'today');
  document.getElementById('slNavLogBtn').classList.toggle('active', name === 'log');
  
  const coachBtn = document.getElementById('slNavCoachBtn');
  if (coachBtn) coachBtn.classList.toggle('active', name === 'coach');

  if (name === 'log') {
    renderSlLog();
  }
  updateSlStreakBox();
}

function backToTodayView() {
  qlEditingId = null;
  switchSlTab('today');
}

// ── STORY LAB RENDERING (Matching Story Lab v3) ───────────────────────────────

function renderSlScenarioGrid() {
  const grid = document.getElementById('slScenarioGrid');
  grid.innerHTML = '';
  Object.entries(QL_SCENARIOS).forEach(([key, s]) => {
    const card = document.createElement('button');
    card.className = 'scenario-card';
    card.innerHTML = `
      <span class="icon">${s.icon}</span>
      <div class="label">${s.label}</div>
      <div class="desc">${s.desc}</div>
    `;
    card.addEventListener('click', () => openSlInterview(key));
    grid.appendChild(card);
  });
}

function openSlInterview(key, existingEntry) {
  qlCurrentScenario = key;
  qlEditingId = existingEntry ? existingEntry.id : null;
  const s = QL_SCENARIOS[key];

  document.getElementById('slInterviewStamp').innerHTML = `${s.icon} ${s.stamp}`;
  document.getElementById('slInterviewTitle').textContent = qlEditingId ? `Editing: ${s.label}` : s.label;
  const saveBtn = document.getElementById('slSaveBtn');
  if (saveBtn) {
    saveBtn.disabled = false;
    saveBtn.textContent = qlEditingId ? 'Update entry' : 'Save entry';
  }
  document.getElementById('slSaveHint').textContent = qlEditingId ? 'Changes overwrite this entry.' : 'Answer what applies — skip the rest.';

  const list = document.getElementById('slQuestionList');
  list.innerHTML = '';
  s.questions.forEach((q, i) => {
    const existingAnswer = existingEntry ? (existingEntry.answers[i]?.a || '') : '';
    const tooltipText = QL_TOOLTIPS[getNormalizedQuestionKey(q)] || '';
    const block = document.createElement('div');
    block.className = 'question-block';
    block.innerHTML = `
      <label style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
        <span><span class="qnum">Q${i + 1}</span>${q}</span>
        ${tooltipText ? `
          <span class="sl-tooltip-container" onclick="event.stopPropagation(); this.classList.toggle('active')">
            <button type="button" class="sl-tooltip-btn" aria-label="Show example">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="16" x2="12" y2="12"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </button>
            <span class="sl-tooltip-popup">${tooltipText}</span>
          </span>
        ` : ''}
      </label>
      <textarea data-q="${i}" placeholder="Write a sentence or two...">${existingAnswer}</textarea>
    `;
    list.appendChild(block);
  });

  list.querySelectorAll('textarea').forEach(t => t.addEventListener('input', updateSlProgress));
  updateSlProgress();
  switchSlTab('interview');
}

function updateSlProgress() {
  const textareas = document.querySelectorAll('#slQuestionList textarea');
  const filled = Array.from(textareas).filter(t => t.value.trim().length > 0).length;
  const pct = textareas.length ? Math.round((filled / textareas.length) * 100) : 0;
  document.getElementById('slProgressFill').style.width = pct + '%';
}

// ── SAVE ENTRY (Dual LocalStorage + Supabase learn_items) ────────────────────

async function saveSlEntry() {
  const s = QL_SCENARIOS[qlCurrentScenario];
  const textareas = document.querySelectorAll('#slQuestionList textarea');
  const answers = [];
  let anyFilled = false;
  textareas.forEach((t, i) => {
    const val = t.value.trim();
    if (val) anyFilled = true;
    answers.push({ q: s.questions[i], a: val });
  });

  if (!anyFilled) {
    alert('Answer at least one question before saving.');
    return;
  }

  const saveBtn = document.getElementById('slSaveBtn');
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.textContent = qlEditingId ? 'Updating...' : 'Saving...';
  }

  try {
    const entries = getQlEntries();
    let savedEntry;

    if (qlEditingId) {
      const idx = entries.findIndex(e => String(e.id) === String(qlEditingId));
      if (idx !== -1) {
        entries[idx] = { ...entries[idx], answers };
        savedEntry = entries[idx];
      }
      saveQlLocal(entries);
    } else {
      savedEntry = {
        id: Date.now().toString(),
        scenario: qlCurrentScenario,
        date: new Date().toISOString(),
        answers
      };
      entries.unshift(savedEntry);
      saveQlLocal(entries);
    }

    // Supabase save
    if (supabaseClient && supabaseUser && supabaseUser.id !== 'offline-user') {
      const dbPayload = {
        user_id: supabaseUser.id,
        title: qlCurrentScenario,
        category: 'storylab',
        status: 'unread',
        sections: answers.map(ans => ({ label: ans.q, text: ans.a })),
        updated_at: new Date().toISOString()
      };

      if (qlEditingId) {
        const dbId = /^\d+$/.test(qlEditingId) ? parseInt(qlEditingId, 10) : qlEditingId;
        await supabaseClient
          .from('learn_items')
          .update(dbPayload)
          .eq('id', dbId)
          .eq('user_id', supabaseUser.id);
          
        // Update local learnItems memory array
        const globalIdx = learnItems.findIndex(item => String(item.id) === String(qlEditingId));
        if (globalIdx !== -1) {
          learnItems[globalIdx].sections = dbPayload.sections;
          learnItems[globalIdx].updatedAt = Date.now();
        }
      } else {
        const { data, error } = await supabaseClient
          .from('learn_items')
          .insert(dbPayload)
          .select();
        if (error) throw error;
        if (data && data[0]) {
          savedEntry.id = data[0].id;
          
          // Add to global learnItems memory array
          learnItems.unshift({
            id: data[0].id,
            title: data[0].title,
            category: data[0].category,
            status: data[0].status,
            sections: data[0].sections || [],
            updatedAt: new Date(data[0].updated_at).getTime()
          });

          // Sync local ID
          const localEntries = getQlEntries();
          const firstLocal = localEntries[0];
          if (firstLocal) {
            firstLocal.id = data[0].id;
            saveQlLocal(localEntries);
          }
        }
      }
    }
  } catch (e) {
    console.warn('[QuickLog] Supabase save failed (local copy preserved):', e.message);
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.textContent = qlEditingId ? 'Update entry' : 'Save entry';
    }
  }

  qlEditingId = null;
  switchSlTab('log');
}

function updateSlStreakBox() {
  const entries = getQlEntries();
  const streak = computeQlStreak(entries);
  const box = document.getElementById('slStreakBox');
  if (box) {
    if (entries.length === 0) {
      box.innerHTML = 'No entries yet';
    } else {
      box.innerHTML = `<b>${entries.length}</b> logged &middot; <b>${streak}</b> day streak`;
    }
  }
}

// ── LOG HISTORY RENDERING ─────────────────────────────────────────────────────

function computeQlStreak(entries) {
  if (entries.length === 0) return 0;
  const days = new Set(entries.map(e => new Date(e.date).toDateString()));
  let streak = 0;
  const cursor = new Date();
  while (true) {
    if (days.has(cursor.toDateString())) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function fmtQlDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function getQlEntries() {
  const local = [];
  try {
    const raw = localStorage.getItem(QL_STORAGE_KEY);
    if (raw) Object.assign(local, JSON.parse(raw));
  } catch (e) {}

  if (supabaseClient && supabaseUser && supabaseUser.id !== 'offline-user') {
    const remote = learnItems
      .filter(item => item.category === 'storylab')
      .map(item => ({
        id: item.id,
        scenario: item.title,
        date: item.date || new Date(item.updatedAt).toISOString(),
        answers: item.sections.map(sec => ({ q: sec.label || sec.q, a: sec.text || sec.a }))
      }));
    if (remote.length > 0) return remote;
  }
  return local;
}

function saveQlLocal(entries) {
  localStorage.setItem(QL_STORAGE_KEY, JSON.stringify(entries));
}

function renderSlLog() {
  const entries = getQlEntries();
  
  const totalEl = document.getElementById('slStatTotal');
  const weekEl = document.getElementById('slStatWeek');
  const streakEl = document.getElementById('slStatStreak');
  
  if (totalEl) totalEl.textContent = entries.length;
  if (weekEl) {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    weekEl.textContent = entries.filter(e => new Date(e.date) >= weekAgo).length;
  }
  if (streakEl) streakEl.textContent = computeQlStreak(entries);

  const list = document.getElementById('slLogList');
  list.innerHTML = '';

  if (entries.length === 0) {
    list.innerHTML = `
      <div class="empty-log">
        <span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="width:26px;height:26px;margin:0 auto;display:block;"><rect x="4" y="3" width="14" height="18" rx="1"/><path d="M8 3v18"/><path d="M11 8h4"/><path d="M11 12h4"/></svg></span>
        No entries yet. Log today's experience to start your record.
      </div>`;
    return;
  }

  entries.forEach(entry => {
    const s = QL_SCENARIOS[entry.scenario] || { label: entry.scenario, stamp: 'LOG', icon: '' };
    const firstAnswer = entry.answers.find(a => a.a)?.a || '';
    const snippet = firstAnswer.length > 90 ? firstAnswer.slice(0, 90) + '…' : firstAnswer;

    const el = document.createElement('div');
    el.className = 'entry';
    el.innerHTML = `
      <div class="entry-top">
        <div class="entry-stamp">${s.icon}</div>
        <div class="entry-meta">
          <div class="entry-label">${s.label}</div>
          <div class="entry-date">${fmtQlDate(entry.date)}</div>
          <div class="entry-snippet">${snippet}</div>
        </div>
        <div class="entry-actions">
          <button class="entry-pack" data-id="${entry.id}">Content Pack</button>
          
          <div class="entry-export-container">
            <button class="entry-export-btn" data-id="${entry.id}">
              Export
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="margin-left:4px">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div class="entry-export-menu">
              <button class="export-opt-copy" data-id="${entry.id}">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                Copy to Clipboard
              </button>
              <button class="export-opt-word" data-id="${entry.id}">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Word Document (.doc)
              </button>
              <button class="export-opt-txt" data-id="${entry.id}">
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Plain Text (.txt)
              </button>
            </div>
          </div>

          <button class="entry-edit" data-id="${entry.id}" title="Edit Entry">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          
          <button class="entry-delete" data-id="${entry.id}" title="Delete Entry">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="entry-detail">
        ${entry.answers.filter(a => a.a).map(a => `
          <div class="qa">
            <div class="q">${a.q}</div>
            <div class="a">${a.a}</div>
          </div>
        `).join('')}
      </div>
    `;

    el.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('entry-delete') || 
        e.target.closest('.entry-delete') ||
        e.target.classList.contains('entry-edit') || 
        e.target.closest('.entry-edit') ||
        e.target.classList.contains('entry-pack') ||
        e.target.closest('.entry-pack') ||
        e.target.classList.contains('entry-export-btn') ||
        e.target.closest('.entry-export-btn') ||
        e.target.closest('.entry-export-menu')
      ) return;
      el.classList.toggle('expanded');
    });

    el.querySelector('.entry-edit').addEventListener('click', (e) => {
      e.stopPropagation();
      showQuickLogPanel();
      openSlInterview(entry.scenario, entry);
    });

    el.querySelector('.entry-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      showSlConfirmModal('Delete Entry?', 'Are you sure you want to delete this entry? This action cannot be undone.', () => {
        const remaining = getQlEntries().filter(en => String(en.id) !== String(entry.id));
        saveQlLocal(remaining);
        if (supabaseClient && supabaseUser && supabaseUser.id !== 'offline-user') {
          const dbId = /^\d+$/.test(entry.id) ? parseInt(entry.id, 10) : entry.id;
          supabaseClient.from('learn_items').delete().eq('id', dbId).eq('user_id', supabaseUser.id)
            .catch(err => console.warn('[QuickLog] Supabase delete failed:', err.message));
          
          const globalIdx = learnItems.findIndex(item => String(item.id) === String(entry.id));
          if (globalIdx !== -1) learnItems.splice(globalIdx, 1);
        }
        renderSlLog();
        updateSlStreakBox();
      });
    });

    el.querySelector('.entry-pack').addEventListener('click', (e) => {
      e.stopPropagation();
      openCpModal(entry);
    });

    const exportContainer = el.querySelector('.entry-export-container');
    const exportBtn = el.querySelector('.entry-export-btn');
    
    exportBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.entry-export-container.active').forEach(c => {
        if (c !== exportContainer) c.classList.remove('active');
      });
      exportContainer.classList.toggle('active');
    });

    el.querySelector('.export-opt-copy').addEventListener('click', (e) => {
      e.stopPropagation();
      exportContainer.classList.remove('active');
      copyStoryToClipboard(entry, exportBtn);
    });

    el.querySelector('.export-opt-txt').addEventListener('click', (e) => {
      e.stopPropagation();
      exportContainer.classList.remove('active');
      exportStoryToText(entry);
    });

    el.querySelector('.export-opt-word').addEventListener('click', (e) => {
      e.stopPropagation();
      exportContainer.classList.remove('active');
      exportStoryToWord(entry);
    });

    list.appendChild(el);
  });

  let clearBtn = document.querySelector('.storylab-theme .clear-all');
  if (!clearBtn) {
    clearBtn = document.createElement('button');
    clearBtn.className = 'clear-all';
    clearBtn.textContent = 'Clear all entries';
    clearBtn.addEventListener('click', () => {
      showSlConfirmModal('Clear All Entries?', 'This will permanently delete every logged entry. Continue?', () => {
        localStorage.removeItem(QL_STORAGE_KEY);
        if (supabaseClient && supabaseUser && supabaseUser.id !== 'offline-user') {
          supabaseClient.from('learn_items').delete().eq('category', 'storylab').eq('user_id', supabaseUser.id)
            .catch(err => console.warn('[QuickLog] Supabase clear failed:', err.message));
          
          for (let i = learnItems.length - 1; i >= 0; i--) {
            if (learnItems[i].category === 'storylab') {
              learnItems.splice(i, 1);
            }
          }
        }
        renderSlLog();
        updateSlStreakBox();
      });
    });
    document.getElementById('view-log').appendChild(clearBtn);
  }
}

// ── CONTENT PACK — MODAL (for Quick Log entries) ──────────────────────────────

let cpModalCurrentEntry = null;
let cpModalData = null;

function openCpModal(entry) {
  cpModalCurrentEntry = entry;
  cpModalData = null;

  // Reset all tabs to loading state
  ['mshort', 'mlinkedin', 'mxthread', 'myoutube'].forEach(tab => {
    const loading = document.getElementById('sfCpModalLoading' + capitalizeFirst(tab));
    const content = document.getElementById('sfCpModalContent' + capitalizeFirst(tab));
    const btn = content ? content.nextElementSibling : null;
    if (loading) { loading.style.display = 'flex'; }
    if (content) { content.classList.remove('visible'); content.textContent = ''; }
    if (btn) btn.classList.remove('visible');
  });

  // Reset to first tab
  switchCpModalTab('mshort');

  document.getElementById('sfContentPackModal').classList.add('open');
  generateContentPack('quicklog', { storyType: entry.scenario, answers: entry.answers });
}

function closeCpModal() {
  document.getElementById('sfContentPackModal').classList.remove('open');
  cpModalCurrentEntry = null;
  cpModalData = null;
}

function switchCpModalTab(tab) {
  document.querySelectorAll('#sfCpModalTabs .sf-cp-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  ['mshort', 'mlinkedin', 'mxthread', 'myoutube'].forEach(t => {
    const panel = document.getElementById('sfCpModalPanel' + capitalizeFirst(t));
    if (panel) panel.classList.toggle('active', t === tab);
  });
}

function copyCpModalContent(tab) {
  const contentEl = document.getElementById('sfCpModalContent' + capitalizeFirst(tab));
  if (!contentEl || !contentEl.textContent) return;
  navigator.clipboard.writeText(contentEl.textContent).then(() => {
    const btn = contentEl.nextElementSibling;
    if (btn) { btn.textContent = 'Copied!'; btn.classList.add('copied'); setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000); }
  });
}

// ── CONTENT PACK — SIDEBAR (for AI sessions) ──────────────────────────────────

function switchCpTab(tab) {
  document.querySelectorAll('#sfCpTabs .sf-cp-tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  ['short', 'linkedin', 'xthread', 'youtube'].forEach(t => {
    const panel = document.getElementById('sfCpPanel' + capitalizeFirst(t));
    if (panel) panel.classList.toggle('active', t === tab);
  });
}

function copyCpContent(tab) {
  const contentEl = document.getElementById('sfCpContent' + capitalizeFirst(tab));
  if (!contentEl || !contentEl.textContent) return;
  navigator.clipboard.writeText(contentEl.textContent).then(() => {
    const btn = contentEl.nextElementSibling;
    if (btn) { btn.textContent = 'Copied!'; btn.classList.add('copied'); setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000); }
  });
}

// ── CONTENT PACK — SHARED API CALL ────────────────────────────────────────────

async function generateContentPack(source, payload) {
  // Determine which UI to update
  const isModal = (source === 'quicklog');
  const prefix = isModal ? 'sfCpModal' : 'sfCp';
  const tabIds = isModal
    ? ['mshort', 'mlinkedin', 'mxthread', 'myoutube']
    : ['short', 'linkedin', 'xthread', 'youtube'];

  // Show the sidebar card if session source
  if (!isModal) {
    const card = document.getElementById('sfContentPackCard');
    if (card) {
      card.style.display = 'block';
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    // Reset sidebar panels to loading
    tabIds.forEach(tab => {
      const loading = document.getElementById('sfCpLoading' + capitalizeFirst(tab));
      const content = document.getElementById('sfCpContent' + capitalizeFirst(tab));
      const btn = content ? content.nextElementSibling : null;
      if (loading) loading.style.display = 'flex';
      if (content) { content.classList.remove('visible'); content.textContent = ''; }
      if (btn) btn.classList.remove('visible');
    });
    // Build session payload from current state
    payload = {
      storyType: sfActiveStoryType,
      anatomy: sfAnatomyState,
      history: sfHistory
    };
  }

  if (!supabaseClient) {
    // Offline fallback — brief placeholder
    const fallbackData = {
      shortFormScript: '[Offline] Connect to the internet to generate your Content Pack.',
      linkedInPost: '[Offline] Connect to the internet to generate your Content Pack.',
      xThread: ['[Offline] Connect to the internet to generate your Content Pack.'],
      youtubeOutline: '[Offline] Connect to the internet to generate your Content Pack.'
    };
    renderContentPackResult(source, fallbackData);
    return;
  }

  try {
    const body = { source, ...payload };
    const res = await fetch('/api/content-pack', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error('Content Pack API failed. Check server logs.');
    const result = await res.json();
    renderContentPackResult(source, result);
  } catch (err) {
    const errorData = {
      shortFormScript: 'Error generating content: ' + err.message,
      linkedInPost: 'Error generating content: ' + err.message,
      xThread: ['Error generating content: ' + err.message],
      youtubeOutline: 'Error generating content: ' + err.message
    };
    renderContentPackResult(source, errorData);
  }
}

function renderContentPackResult(source, data) {
  const isModal = (source === 'quicklog');
  const pfx = isModal ? 'sfCpModal' : 'sfCp';
  const tabMap = isModal
    ? { short: 'Mshort', linkedin: 'Mlinkedin', xthread: 'Mxthread', youtube: 'Myoutube' }
    : { short: 'Short', linkedin: 'Linkedin', xthread: 'Xthread', youtube: 'Youtube' };

  const pairs = [
    { key: 'short',    suffix: tabMap.short,    text: data.shortFormScript || '' },
    { key: 'linkedin', suffix: tabMap.linkedin,  text: data.linkedInPost || '' },
    { key: 'xthread',  suffix: tabMap.xthread,   text: Array.isArray(data.xThread) ? data.xThread.join('\n\n---\n\n') : (data.xThread || '') },
    { key: 'youtube',  suffix: tabMap.youtube,   text: data.youtubeOutline || '' }
  ];

  pairs.forEach(({ suffix, text }) => {
    const loading = document.getElementById(pfx + 'Loading' + suffix);
    const content = document.getElementById(pfx + 'Content' + suffix);
    const btn = content ? content.nextElementSibling : null;
    if (loading) loading.style.display = 'none';
    if (content) { content.textContent = text; content.classList.add('visible'); }
    if (btn) btn.classList.add('visible');
  });
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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
  document.getElementById('sfStoryLabContainer').style.display = 'none';
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

let slConfirmCallback = null;

function showSlConfirmModal(title, message, onConfirm) {
  document.getElementById('slConfirmTitle').textContent = title;
  document.getElementById('slConfirmMessage').textContent = message;
  slConfirmCallback = onConfirm;
  document.getElementById('slConfirmModal').style.display = 'flex';
}
window.showSlConfirmModal = showSlConfirmModal;

function closeSlConfirmModal() {
  document.getElementById('slConfirmModal').style.display = 'none';
  slConfirmCallback = null;
}
window.closeSlConfirmModal = closeSlConfirmModal;

function executeSlConfirm() {
  if (typeof slConfirmCallback === 'function') {
    slConfirmCallback();
  }
  closeSlConfirmModal();
}
window.executeSlConfirm = executeSlConfirm;

function confirmExitStorySession() {
  document.getElementById('sfConfirmModal').style.display = 'none';
  document.getElementById('sfActiveSessionState').style.display = 'none';
  showQuickLogPanel();
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

  const buildBtn = document.getElementById('sfBuildScriptBtn');
  let origText = '';
  if (buildBtn) {
    buildBtn.disabled = true;
    origText = buildBtn.innerHTML;
    buildBtn.innerHTML = 'Building...';
  }

  try {
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
    showQuickLogPanel();
    sfActiveStoryType = null;
    sfHistory = [];

    // Redirect to learn page
    window.location.href = 'learn.html';
  } catch (err) {
    console.error('Export failed:', err);
    if (buildBtn) {
      buildBtn.disabled = false;
      buildBtn.innerHTML = origText;
    }
  }
}

// ── INITIALIZE PAGE ───────────────────────────────────────────────────────────
function initStoryFinderPage() {
  sfGymPoints = parseInt(localStorage.getItem('sf_gym_points') || '0');
  updateGymStatsUI();
  renderStreakOnLanding();
  
  // Load Story Lab as the primary view
  showQuickLogPanel();

  const sfInput = document.getElementById('sfChatInput');
  if (sfInput) {
    sfInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        sendStoryMessage();
      }
    });
  }

  const cancelBtn = document.getElementById('slConfirmCancelBtn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      closeSlConfirmModal();
    });
  }
  const confirmBtn = document.getElementById('slConfirmActionBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      executeSlConfirm();
    });
  }
}

if (window.yaplabStateReady) {
  initStoryFinderPage();
} else {
  window.addEventListener('yaplabStateReady', initStoryFinderPage);
}

// ── EXPORT STORIES FUNCTIONS ──────────────────────────────────────────────────
function copyStoryToClipboard(entry, btn) {
  const s = QL_SCENARIOS[entry.scenario] || { label: entry.scenario };
  let content = `STORY LAB - ${s.label.toUpperCase()}\n`;
  content += `Date Logged: ${fmtQlDate(entry.date)}\n`;
  content += `====================================================\n\n`;
  
  entry.answers.filter(ans => ans.a).forEach((ans, idx) => {
    content += `Q${idx + 1}: ${ans.q}\n`;
    content += `A: ${ans.a}\n\n`;
  });
  
  navigator.clipboard.writeText(content.trim()).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="margin-right:4px"><path d="M20 6L9 17l-5-5"/></svg> Copied!`;
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

function exportStoryToText(entry) {
  const s = QL_SCENARIOS[entry.scenario] || { label: entry.scenario };
  let content = `STORY LAB - ${s.label.toUpperCase()}\n`;
  content += `Date Logged: ${fmtQlDate(entry.date)}\n`;
  content += `====================================================\n\n`;
  
  entry.answers.filter(ans => ans.a).forEach((ans, idx) => {
    content += `Q${idx + 1}: ${ans.q}\n`;
    content += `A: ${ans.a}\n\n`;
  });
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const filename = `${s.label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_story.txt`;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportStoryToWord(entry) {
  const s = QL_SCENARIOS[entry.scenario] || { label: entry.scenario };
  
  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <title>Story Lab - ${esc(s.label)}</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; margin: 1in; }
        h1 { font-size: 24pt; color: #111; border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 20px; }
        .meta { font-size: 10pt; color: #777; margin-bottom: 30px; font-style: italic; }
        .qa { margin-bottom: 20px; }
        .q { font-size: 11pt; font-weight: bold; color: #555; margin-bottom: 4px; }
        .a { font-size: 11pt; color: #111; line-height: 1.5; }
      </style>
    </head>
    <body>
      <h1>Story Lab - ${esc(s.label)}</h1>
      <div class="meta">Date Logged: ${fmtQlDate(entry.date)}</div>
  `;
  
  entry.answers.filter(ans => ans.a).forEach((ans, idx) => {
    html += `
      <div class="qa">
        <div class="q">Q${idx + 1}: ${esc(ans.q)}</div>
        <div class="a">${esc(ans.a).replace(/\n/g, '<br>')}</div>
      </div>
    `;
  });
  
  html += `</body></html>`;
  
  const blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const filename = `${s.label.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_story.doc`;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
