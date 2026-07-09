// ── TOPICS DATA ───────────────────────────────────────────────────────────────
const TOPICS = {
  "opinions":{ label:"Opinions", topics:[
    {t:"Social media does more harm than good",d:"easy"},{t:"Everyone should learn to cook",d:"easy"},{t:"Remote work is the future of every industry",d:"easy"},{t:"Hustle culture is toxic",d:"easy"},{t:"Everyone needs a mentor",d:"easy"},{t:"Failure is overrated as a teacher",d:"medium"},{t:"Talent is mostly just practice in disguise",d:"easy"},{t:"Most meetings should be emails",d:"easy"},{t:"Networking is just being genuinely helpful",d:"easy"},{t:"Perfectionism is fear wearing a productive mask",d:"medium"},{t:"Optimism without a plan is just wishful thinking",d:"medium"},{t:"Schools teach compliance more than thinking",d:"medium"},{t:"Passion is a terrible reason to start a business",d:"medium"},{t:"The best leaders make themselves unnecessary",d:"medium"},{t:"Authenticity online is a performance",d:"hard"},{t:"Comfort is the enemy of growth — argue both sides",d:"hard"},{t:"Is originality dead in the age of AI?",d:"hard"},{t:"The attention economy is more dangerous than social media",d:"hard"},{t:"Why most productivity advice fails the people who need it most",d:"hard"},{t:"The myth of the self-made person",d:"hard"},{t:"Why being average is underrated",d:"medium"},{t:"Discipline is more important than motivation",d:"easy"},{t:"We mistake busyness for productivity",d:"easy"},{t:"Vulnerability is a strategy, not just a feeling",d:"medium"},{t:"Speed is more valuable than perfection in the early stage",d:"easy"},{t:"Why copying is the best way to learn",d:"easy"},{t:"Status is more motivating than money for most people",d:"hard"},{t:"The difference between confidence and arrogance",d:"medium"}
  ]},
  "design":{ label:"Design", topics:[
    {t:"What makes a great user onboarding experience",d:"easy"},{t:"The difference between UI and UX in plain terms",d:"easy"},{t:"Why simplicity is the hardest thing to design",d:"easy"},{t:"How to give useful design feedback",d:"easy"},{t:"What design systems are and why teams need them",d:"medium"},{t:"The most common mistake junior designers make",d:"easy"},{t:"How to design for users who don't read",d:"medium"},{t:"Why accessibility makes products better for everyone",d:"easy"},{t:"The role of motion in modern UI design",d:"medium"},{t:"What no-code tools mean for the future of design",d:"medium"},{t:"How colour psychology affects conversion rates",d:"medium"},{t:"Why most app redesigns fail their users",d:"hard"},{t:"The problem with designing for the average user",d:"hard"},{t:"How to present a design concept to a skeptical client",d:"medium"},{t:"Why dark mode is more than just aesthetics",d:"easy"},{t:"The difference between a good designer and a great one",d:"easy"},{t:"How AI tools are changing the designer's workflow",d:"medium"},{t:"When should designers push back on a client brief?",d:"hard"},{t:"Why typography is the most underrated design skill",d:"medium"},{t:"How to conduct a useful usability test with five people",d:"medium"},{t:"What makes a landing page actually convert?",d:"easy"},{t:"Design for trust: what signals make users feel safe?",d:"hard"},{t:"Why empty states are the most neglected part of any product",d:"medium"},{t:"The ethics of dark patterns in UX",d:"hard"},{t:"What separates a portfolio that gets hired from one that doesn't",d:"easy"},{t:"How to transition from graphic design to UX",d:"easy"},{t:"Why the best UI feels invisible",d:"medium"},{t:"The role of a design critique in a healthy team",d:"medium"},{t:"How to charge more as a freelance designer",d:"hard"},{t:"What it means to design for emotion, not just function",d:"hard"}
  ]},
  "storytelling":{ label:"Storytelling", topics:[
    {t:"Tell me about a time you overcame a real fear",d:"easy"},{t:"The moment you knew you were on the right path",d:"easy"},{t:"A decision that changed everything for you",d:"easy"},{t:"The biggest lesson from your worst project",d:"easy"},{t:"Describe your proudest moment without bragging",d:"medium"},{t:"A person who changed how you see the world",d:"easy"},{t:"The day something didn't go as planned — and what happened next",d:"medium"},{t:"What you wish someone had told you five years ago",d:"easy"},{t:"How you got into the work you do now",d:"easy"},{t:"The most interesting problem you've ever solved",d:"medium"},{t:"A moment you felt like giving up — and what kept you going",d:"medium"},{t:"Tell the story of a project you are most proud of",d:"easy"},{t:"A time you had to have a difficult conversation",d:"medium"},{t:"How a failure led to your biggest insight",d:"medium"},{t:"A moment that made you laugh at yourself",d:"easy"},{t:"The first time you realised you were good at something",d:"easy"},{t:"Tell a story in exactly three sentences",d:"hard"},{t:"Describe a turning point without using the word 'but'",d:"hard"},{t:"A risk you took that paid off unexpectedly",d:"easy"},{t:"The hardest feedback you ever received and what you did with it",d:"medium"},{t:"Tell a story that illustrates who you are as a professional",d:"hard"},{t:"The time you had to start over",d:"medium"},{t:"A moment you surprised yourself",d:"easy"}
  ]},
  "impromptu":{ label:"Impromptu", topics:[
    {t:"If you could automate one part of your life, what would it be?",d:"easy"},{t:"What's a skill that took you longest to learn?",d:"easy"},{t:"Describe your city to someone who's never been there",d:"easy"},{t:"If you had to teach something tomorrow, what would it be?",d:"easy"},{t:"What would you do with an unexpected free week?",d:"easy"},{t:"Explain what you do to a 10-year-old",d:"easy"},{t:"What's something most people get wrong about your field?",d:"medium"},{t:"What does success actually look like to you?",d:"medium"},{t:"If money wasn't the goal, what would you build?",d:"medium"},{t:"What's one thing you changed your mind about recently?",d:"medium"},{t:"What object in your home best represents your personality?",d:"easy"},{t:"Describe your perfect productive day in detail",d:"easy"},{t:"What's something you believe that most people in your industry don't?",d:"hard"},{t:"What question do you hate being asked and why?",d:"medium"},{t:"What's the best piece of advice you've ignored?",d:"medium"},{t:"What are you better at than you give yourself credit for?",d:"easy"},{t:"What problem in your industry makes you frustrated every time?",d:"medium"},{t:"What habit has had the biggest impact on your life?",d:"easy"},{t:"What would your 15-year-old self think of your life right now?",d:"medium"},{t:"What belief do you hold that you can't fully defend?",d:"hard"},{t:"What's something you've stopped doing that improved your life?",d:"easy"},{t:"If you wrote a book tomorrow, what would it be about?",d:"medium"}
  ]},
  "persuasion":{ label:"Persuasion", topics:[
    {t:"Convince me to start learning UI/UX design today",d:"easy"},{t:"Why building in public is worth the vulnerability",d:"medium"},{t:"Make the case for taking a gap year",d:"easy"},{t:"Argue that constraints make you more creative",d:"medium"},{t:"Why everyone should try teaching what they know",d:"easy"},{t:"Convince me that slow growth is better than hype",d:"medium"},{t:"The case for niching down hard as a freelancer",d:"medium"},{t:"Make the case for a product you use every day",d:"easy"},{t:"Convince a skeptic that design is a business skill, not decoration",d:"hard"},{t:"Argue that AI will create more creative jobs than it destroys",d:"hard"},{t:"Make the case for charging premium prices as a freelancer",d:"hard"},{t:"Convince me that content creation is a legitimate business strategy",d:"medium"},{t:"Argue that learning to code makes you a better designer",d:"medium"},{t:"Convince an executive to invest in UX research before building",d:"hard"},{t:"Argue that social proof is more powerful than advertising",d:"medium"},{t:"Make the case for working fewer hours to produce better work",d:"medium"},{t:"Convince me that a portfolio matters more than a degree",d:"easy"},{t:"Convince a non-designer to care about typography",d:"easy"},{t:"Make the case that feedback culture saves companies money",d:"medium"},{t:"Argue that the best marketing is just being remarkably useful",d:"medium"},{t:"Convince me that a personal brand is not optional for creatives",d:"easy"},{t:"Make the case for saying no more often as a freelancer",d:"medium"},{t:"Argue that the best portfolio piece is a product that actually ships",d:"medium"}
  ]}
};

const TIPS = ["Start with a bold claim, not a definition.","Speak to one person, not a crowd.","Use a pause instead of 'um'.","End with a clear statement, not a fade-out.","Tell a micro-story in the first 10 seconds.","Use contrast — 'most people think X, but actually...'","Name something specific. Numbers and names build trust.","Slow down at key points for emphasis.","Ask yourself: what's the one thing I want them to remember?","Open with a question, not an answer.","Vary your sentence length. Short sentences hit hard.","Don't summarize — build toward a conclusion."];
const FEEDBACK = {
  complete:[{t:`Full rep done <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="margin-left:4px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,b:"You stayed the whole time. That's the habit. Do it again without stopping to think."},{t:"Rep complete.",b:"The discomfort you felt? That's the work. Next rep, try starting with a story instead of a point."},{t:"Solid.",b:"Now rate yourself honestly — structure, pacing, confidence. Pick one to improve next round."}],
  early:[{t:"You stopped early.",b:"That's fine — it happens. Next time, commit to keeping talking even if you repeat yourself. Fluency > perfection."},{t:"Cut short.",b:"When you go blank, try bridging: 'what that means is...' or 'the reason I say this is...' — buys you 5 seconds to find your thread."}]
};
const FILLER_WORDS = ["um","uh","like","you know","basically","literally","right","so","actually","kind of","sort of"];

// ── SUPABASE STATE ────────────────────────────────────────────────────────────
const SUPABASE_URL = "INJECT_SUPABASE_URL";
const SUPABASE_ANON_KEY = "INJECT_SUPABASE_ANON_KEY";
var supabaseClient = null;
var supabaseUser = null;
var activeAuthWallTab = 'signIn';

// ── PRACTICE STATE ────────────────────────────────────────────────────────────
var selectedDur=60,timerSec=60,timerMax=60,interval=null,isRunning=false;
var currentTopic=null,currentCat=null,currentDiff=null;
var activeCats=Object.keys(TOPICS),diffFilter="all",hardUnlocked=false;
var sessionHistory=[],bookmarks=[],reps=0,completed=0,bestSec=0;
var recognition=null,micAllowed=false,fillerCounts={},lastFillerCounts={};

// ── LEARN STATE ───────────────────────────────────────────────────────────────
var learnItems=[];
var learnFilter='all';
var learnIdCounter=0;
var openScriptIds = new Set();
var practiceModes = {};
var practiceActiveRoles = {};

// ── STORY FINDER STATE ────────────────────────────────────────────────────────
var sfActiveStoryType = null;
var sfHistory = [];
var sfAnatomyState = { mission: null, obstacle: null, firstGuess: null, discovery: null, lesson: null, naturalHook: null };
var sfIsLoading = false;
var sfOfflineStep = 0;
var sfGymPoints = 0;

// ── LOCALSTORAGE KEYS ────────────────────────────────────────────────────────
const LS_KEY = 'yaplab_learn_v3';
const LS_BOOKMARKS = 'yaplab_bookmarks_v1';
const LS_STATS = 'yaplab_stats_v1';
const LS_HISTORY = 'yaplab_history_v1';
const THEME_KEY = 'yaplab_theme';
const OFFLINE_KEY = 'yaplab_offline';

function saveLearn() {
  localStorage.setItem(LS_KEY, JSON.stringify(learnItems));
}
function loadLearn() {
  const raw = localStorage.getItem(LS_KEY);
  if (raw) {
    try {
      learnItems = JSON.parse(raw);
    } catch(e) {
      console.error(e);
    }
  }
}
function savePracticeLocal() {
  localStorage.setItem(LS_BOOKMARKS, JSON.stringify(bookmarks));
  localStorage.setItem(LS_STATS, JSON.stringify({ reps, completed, bestSec }));
  localStorage.setItem(LS_HISTORY, JSON.stringify(sessionHistory));
}
function loadPracticeLocal() {
  try {
    const bm = localStorage.getItem(LS_BOOKMARKS);
    if (bm) bookmarks = JSON.parse(bm);
    
    const st = localStorage.getItem(LS_STATS);
    if (st) {
      const o = JSON.parse(st);
      reps = o.reps || 0;
      completed = o.completed || 0;
      bestSec = o.bestSec || 0;
    }
    
    const hi = localStorage.getItem(LS_HISTORY);
    if (hi) sessionHistory = JSON.parse(hi);
  } catch(e) {
    console.error(e);
  }
}

// ── THEME TOGGLE ──────────────────────────────────────────────────────────────
var isLight = localStorage.getItem(THEME_KEY)==='light';

function applyTheme(){
  const icon = document.getElementById('settingsThemeIcon');
  const label = document.getElementById('settingsThemeLabel');
  if(isLight){
    document.documentElement.classList.add('light');
    if (label) label.textContent='Dark Mode';
    if (icon) {
      while(icon.firstChild) icon.removeChild(icon.firstChild);
      const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx','12');c.setAttribute('cy','12');c.setAttribute('r','5');
      c.setAttribute('fill','none');c.setAttribute('stroke','currentColor');c.setAttribute('stroke-width','2');
      icon.appendChild(c);
      [[12,1,12,3],[12,21,12,23],[4.22,4.22,5.64,5.64],[18.36,18.36,19.78,19.78],
       [1,12,3,12],[21,12,23,12],[4.22,19.78,5.64,18.36],[18.36,5.64,19.78,4.22]].forEach(function(p){
        const l=document.createElementNS('http://www.w3.org/2000/svg','line');
        l.setAttribute('x1',p[0]);l.setAttribute('y1',p[1]);l.setAttribute('x2',p[2]);l.setAttribute('y2',p[3]);
        l.setAttribute('stroke','currentColor');l.setAttribute('stroke-width','2');
        icon.appendChild(l);
      });
    }
  } else {
    document.documentElement.classList.remove('light');
    if (label) label.textContent='Light Mode';
    if (icon) {
      while(icon.firstChild) icon.removeChild(icon.firstChild);
      const p=document.createElementNS('http://www.w3.org/2000/svg','path');
      p.setAttribute('d','M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
      p.setAttribute('fill','none');p.setAttribute('stroke','currentColor');p.setAttribute('stroke-width','2');
      icon.appendChild(p);
    }
  }
}

function toggleTheme(){
  isLight = !isLight;
  localStorage.setItem(THEME_KEY, isLight?'light':'dark');
  applyTheme();
}

// ── AUTHENTICATION AND STARTUP ────────────────────────────────────────────────
window.yaplabStateReady = false;

async function initSupabaseAtStartup() {
  const isOffline = localStorage.getItem(OFFLINE_KEY) === 'true';
  if (isOffline) {
    supabaseClient = null;
    supabaseUser = { id: 'offline-user', email: 'offline-mode@yaplab.local' };
    await transitionToApp();
    return;
  }

  if (SUPABASE_URL === "INJECT_SUPABASE_URL" || SUPABASE_ANON_KEY === "INJECT_SUPABASE_ANON_KEY" || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
    document.getElementById('authWall').style.display = 'flex';
    const mainEl = document.querySelector('.main');
    if (mainEl) mainEl.style.display = 'none';
    const navEl = document.getElementById('bottomNav');
    if (navEl) navEl.style.display = 'none';
    
    const statusEl = document.getElementById('authWallStatus');
    if (statusEl) {
      statusEl.className = 'modal-status error';
      statusEl.style.display = 'block';
      statusEl.innerHTML = `
        Please configure your SUPABASE_URL and SUPABASE_ANON_KEY environment variables on Vercel to deploy.
        <button class="btn btn-secondary" onclick="runOffline()" style="justify-content:center; margin-top:12px; width:100%; border-color:var(--border);">
          Run Offline (Local Storage Mode)
        </button>
      `;
    }
    return;
  }

  try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data } = await supabaseClient.auth.getSession();
    if (data && data.session) {
      supabaseUser = data.session.user;
      await transitionToApp();
    } else {
      document.getElementById('authWall').style.display = 'flex';
      const mainEl = document.querySelector('.main');
      if (mainEl) mainEl.style.display = 'none';
      const navEl = document.getElementById('bottomNav');
      if (navEl) navEl.style.display = 'none';
    }
  } catch(e) {
    console.error('Failed to initialize Supabase client:', e);
    document.getElementById('authWall').style.display = 'flex';
    const mainEl = document.querySelector('.main');
    if (mainEl) mainEl.style.display = 'none';
    const navEl = document.getElementById('bottomNav');
    if (navEl) navEl.style.display = 'none';

    const statusEl = document.getElementById('authWallStatus');
    if (statusEl) {
      statusEl.className = 'modal-status error';
      statusEl.style.display = 'block';
      statusEl.innerHTML = `
        Failed to connect to Supabase: ${e.message}
        <button class="btn btn-secondary" onclick="runOffline()" style="justify-content:center; margin-top:12px; width:100%; border-color:var(--border);">
          Run Offline (Local Storage Mode)
        </button>
      `;
    }
  }
}

async function transitionToApp() {
  const authEl = document.getElementById('authWall');
  if (authEl) {
    authEl.style.display = 'none';
    authEl.innerHTML = ''; // Clear login inputs to block browser autofill
  }
  
  const mainEl = document.querySelector('.main');
  if (mainEl) mainEl.style.display = 'flex';
  const navEl = document.getElementById('bottomNav');
  if (navEl) navEl.style.display = 'flex';
  
  const emailEl = document.getElementById('settingsUserEmail');
  if (emailEl) emailEl.textContent = supabaseUser.email;

  if (supabaseClient && supabaseUser) {
    // Clear any existing localStorage data (bypass local only completely)
    localStorage.removeItem(LS_KEY);
    localStorage.removeItem(LS_BOOKMARKS);
    localStorage.removeItem(LS_STATS);
    localStorage.removeItem(LS_HISTORY);

    // Sync data directly
    await syncAllData();
  } else {
    // Local storage fallback mode
    loadLearn();
    loadPracticeLocal();
  }

  // Load gym points from local storage
  sfGymPoints = parseInt(localStorage.getItem('sf_gym_points') || '0');
  if (typeof updateGymStatsUI === 'function') updateGymStatsUI();

  // Notify page scripts that state is ready
  window.yaplabStateReady = true;
  window.dispatchEvent(new CustomEvent('yaplabStateReady'));
}

function runOffline() {
  localStorage.setItem(OFFLINE_KEY, 'true');
  supabaseClient = null;
  supabaseUser = { id: 'offline-user', email: 'offline-mode@yaplab.local' };
  transitionToApp();
}

async function signOut() {
  if (supabaseClient) {
    try {
      await supabaseClient.auth.signOut();
    } catch (e) {
      console.error(e);
    }
  }
  localStorage.removeItem(OFFLINE_KEY);
  supabaseUser = null;
  
  // Clear any cache/local states
  learnItems = [];
  bookmarks = [];
  sessionHistory = [];
  reps = 0; completed = 0; bestSec = 0;
  
  // Redirect to landing page to show auth wall
  window.location.href = 'index.html';
}

function switchAuthWallTab(tab) {
  activeAuthWallTab = tab;
  const t1 = document.getElementById('authWallTabSignInBtn');
  const t2 = document.getElementById('authWallTabSignUpBtn');
  const btn = document.getElementById('authWallSubmitBtn');
  if (t1) t1.classList.toggle('active', tab === 'signIn');
  if (t2) t2.classList.toggle('active', tab === 'signUp');
  if (btn) btn.textContent = tab === 'signIn' ? 'Sign In' : 'Sign Up';
}

function showAuthWallStatus(type, msg) {
  const el = document.getElementById('authWallStatus');
  if(!el) return;
  el.className = 'modal-status ' + type;
  el.style.display = 'block';
  el.textContent = msg;
}

async function submitAuthWall() {
  const email = document.getElementById('authWallEmail').value.trim();
  const password = document.getElementById('authWallPassword').value.trim();
  if (!email || !password) {
    showAuthWallStatus('error', 'Please fill in all fields.');
    return;
  }
  showAuthWallStatus('info', 'Processing...');
  try {
    if (activeAuthWallTab === 'signUp') {
      const { data, error } = await supabaseClient.auth.signUp({ email, password });
      if (error) throw error;
      if (data.user && data.session) {
        supabaseUser = data.user;
        showAuthWallStatus('success', 'Signed up successfully!');
        transitionToApp();
      } else {
        showAuthWallStatus('success', 'Registration successful! Please check your email for a confirmation link.');
      }
    } else if (activeAuthWallTab === 'signIn') {
      const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      supabaseUser = data.user;
      showAuthWallStatus('success', 'Signed in successfully!');
      transitionToApp();
    }
  } catch (e) {
    console.error(e);
    showAuthWallStatus('error', e.message);
  }
}

// ── SYNC LOGIC ────────────────────────────────────────────────────────────────
let cloudSaveTimeout = null;
function triggerCloudSave() {
  if (supabaseClient && supabaseUser) {
    clearTimeout(cloudSaveTimeout);
    cloudSaveTimeout = setTimeout(() => {
      syncLearnItems().catch(err => console.error('Auto-sync failed:', err));
    }, 1500);
  }
}

async function syncAllData() {
  if (!supabaseClient || !supabaseUser) return;
  try {
    await Promise.all([
      syncLearnItems(),
      syncBookmarks(),
      syncStats(),
      syncHistory()
    ]);
  } catch(e) {
    console.error('Data loading/sync failed:', e);
  }
}

async function syncLearnItems() {
  if (!supabaseClient || !supabaseUser) return;
  const { data: remoteItems, error } = await supabaseClient
    .from('learn_items')
    .select('*')
    .order('updated_at', { ascending: false });
  if (error) throw error;

  learnItems = remoteItems.map(remote => ({
    id: remote.id,
    title: remote.title,
    category: remote.category,
    status: remote.status,
    sections: remote.sections || [],
    updatedAt: remote.updated_at ? new Date(remote.updated_at).getTime() : Date.now()
  }));

  const maxId = learnItems.reduce((max, item) => item.id > max ? item.id : max, 0);
  learnIdCounter = Math.max(learnIdCounter, maxId);

  if (typeof renderLearnList === 'function') renderLearnList();
  if (typeof updateLearnStats === 'function') updateLearnStats();
}

async function syncBookmarks() {
  if (!supabaseClient || !supabaseUser) return;
  const { data: remoteBookmarks, error } = await supabaseClient
    .from('bookmarks')
    .select('*');
  if (error) throw error;

  bookmarks = remoteBookmarks.map(remote => ({
    t: remote.topic,
    c: remote.category,
    d: remote.difficulty
  }));

  if (typeof renderBookmarks === 'function') renderBookmarks();
}

async function syncStats() {
  if (!supabaseClient || !supabaseUser) return;
  const { data: remote, error } = await supabaseClient
    .from('practice_stats')
    .select('*')
    .eq('user_id', supabaseUser.id)
    .maybeSingle();

  if (error) throw error;

  if (remote) {
    reps = remote.reps || 0;
    completed = remote.completed || 0;
    bestSec = remote.best_sec || 0;
  } else {
    reps = 0;
    completed = 0;
    bestSec = 0;
  }

  if (typeof updateStatsDisplay === 'function') updateStatsDisplay();
  if (typeof updateUnlock === 'function') updateUnlock();
}

async function syncHistory() {
  if (!supabaseClient || !supabaseUser) return;
  const { data: remote, error } = await supabaseClient
    .from('session_history')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) throw error;

  sessionHistory = remote.map(r => ({
    topic: r.topic,
    elapsed: r.elapsed_seconds,
    fillers: undefined,
    createdAt: r.created_at ? new Date(r.created_at).getTime() : Date.now()
  }));

  if (typeof renderHistory === 'function') renderHistory();
}

// ── UTILITIES ─────────────────────────────────────────────────────────────────
function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// ── DOM LOAD TRIGGER ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  applyTheme();
  await initSupabaseAtStartup();
});
