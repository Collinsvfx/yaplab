// ── DIFFICULTY FILTER ─────────────────────────────────────────────────────────
function setDiffFilter(diff,btn) {
  if(diff==='hard'&&!hardUnlocked)return;
  diffFilter=diff;
  document.querySelectorAll('.diff-filter-btn').forEach(b=>b.className='diff-filter-btn');
  btn.classList.add('active-'+diff);
}

// ── UNLOCK ────────────────────────────────────────────────────────────────────
function updateUnlock() {
  const pct=Math.min(100,(completed/10)*100);
  const fillEl = document.getElementById('unlockFill');
  const countEl = document.getElementById('unlockCount');
  if (fillEl) fillEl.style.width=pct+'%';
  if (countEl) countEl.textContent=completed;
  
  if(completed>=10&&!hardUnlocked){
    hardUnlocked=true;
    const labelEl = document.getElementById('hardLockLabel');
    if (labelEl) labelEl.textContent='— unlocked!';
    const btnEl = document.getElementById('hardFilterBtn');
    if (btnEl) btnEl.style.opacity='1';
    const barEl = document.getElementById('unlockBar');
    if (barEl) {
      barEl.innerHTML=`<div style="font-size:12px;color:var(--hard);font-weight:500;display:flex;align-items:center;"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>Hard topics unlocked! <span style="color:var(--muted);margin-left:4px;">— ${completed} completed reps</span></div>`;
    }
  }
}

// ── CATEGORIES ────────────────────────────────────────────────────────────────
function toggleCat(key,btn){
  const idx=activeCats.indexOf(key);
  if(idx>-1){if(activeCats.length===1)return;activeCats.splice(idx,1);btn.classList.remove('on');}
  else{activeCats.push(key);btn.classList.add('on');}
}

// ── TOPIC LOGIC ───────────────────────────────────────────────────────────────
function newTopic(){
  if(isRunning)resetTimer();
  let pool=activeCats.flatMap(c=>TOPICS[c].topics.map(item=>({...item,c})));
  if(diffFilter!=='all') pool=pool.filter(i=>i.d===diffFilter);
  else if(!hardUnlocked) pool=pool.filter(i=>i.d!=='hard');
  if(pool.length===0) pool=activeCats.flatMap(c=>TOPICS[c].topics.filter(i=>i.d==='easy').map(i=>({...i,c})));
  const pick=pool[Math.floor(Math.random()*pool.length)];
  currentTopic=pick.t; currentCat=pick.c; currentDiff=pick.d;
  const el=document.getElementById('topicText');
  el.classList.add('fading');
  setTimeout(()=>{el.textContent=pick.t;el.classList.remove('fading');el.classList.add('fadeIn');setTimeout(()=>el.classList.remove('fadeIn'),400);},200);
  document.getElementById('catBadge').textContent=TOPICS[pick.c].label;
  const badge=document.getElementById('difficultyBadge');
  badge.style.display='inline-flex'; badge.className='diff-badge '+pick.d;
  badge.innerHTML={easy:'<svg width="10" height="10" fill="var(--easy)" viewBox="0 0 24 24" class="inline-svg"><circle cx="12" cy="12" r="10"></circle></svg> Easy',medium:'<svg width="10" height="10" fill="var(--medium)" viewBox="0 0 24 24" class="inline-svg"><circle cx="12" cy="12" r="10"></circle></svg> Medium',hard:'<svg width="10" height="10" fill="var(--hard)" viewBox="0 0 24 24" class="inline-svg"><circle cx="12" cy="12" r="10"></circle></svg> Hard'}[pick.d]||pick.d;
  const tl=timerSec<=30?"Quick fire":timerSec<=60?"Short form":timerSec<=180?"Standard":"Long form";
  document.getElementById('diffPill').innerHTML=`<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> ${tl}`;
  document.getElementById('tipText').textContent=TIPS[Math.floor(Math.random()*TIPS.length)];
  document.getElementById('tipPill').style.display='flex';
  document.getElementById('topicCard').classList.add('active');
  document.getElementById('feedbackWrap').classList.remove('show');
  document.getElementById('bookmarkBtn').style.display='flex';
  updateBookmarkBtn();
}

// ── BOOKMARKS ─────────────────────────────────────────────────────────────────
async function toggleBookmark(){
  if(!currentTopic)return;
  const idx=bookmarks.findIndex(b=>b.t===currentTopic);
  if(supabaseClient && supabaseUser) {
    try {
      if (idx>-1) {
        const { error } = await supabaseClient
          .from('bookmarks')
          .delete()
          .eq('user_id', supabaseUser.id)
          .eq('topic', currentTopic);
        if (error) throw error;
        bookmarks.splice(idx,1);
      } else {
        const { error } = await supabaseClient
          .from('bookmarks')
          .insert({
            user_id: supabaseUser.id,
            topic: currentTopic,
            category: currentCat,
            difficulty: currentDiff
          });
        if (error) throw error;
        bookmarks.push({t:currentTopic,c:currentCat,d:currentDiff});
      }
      updateBookmarkBtn();
      renderBookmarks();
    } catch (e) {
      console.error('Failed to toggle bookmark:', e);
    }
  } else {
    // Offline mode bookmark saving
    if (idx>-1) {
      bookmarks.splice(idx,1);
    } else {
      bookmarks.push({t:currentTopic,c:currentCat,d:currentDiff});
    }
    savePracticeLocal();
    updateBookmarkBtn();
    renderBookmarks();
  }
}

function updateBookmarkBtn(){
  const btn = document.getElementById('bookmarkBtn');
  if (!btn) return;
  const isSaved=bookmarks.some(b=>b.t===currentTopic);
  btn.classList.toggle('saved',isSaved);
  document.getElementById('bookmarkLabel').textContent=isSaved?'Saved':'Save topic';
  btn.querySelector('svg').setAttribute('fill',isSaved?'currentColor':'none');
}

function renderBookmarks(){
  const list=document.getElementById('bookmarkList'); if (!list) return;
  list.innerHTML='';
  if(!bookmarks.length){list.innerHTML='<div class="bookmark-empty">No saved topics yet.</div>';return;}
  bookmarks.forEach((b,i)=>{
    const dot={easy:'<svg width="10" height="10" fill="var(--easy)" viewBox="0 0 24 24" class="inline-svg" style="vertical-align:middle;margin-right:2px;"><circle cx="12" cy="12" r="10"></circle></svg>',medium:'<svg width="10" height="10" fill="var(--medium)" viewBox="0 0 24 24" class="inline-svg" style="vertical-align:middle;margin-right:2px;"><circle cx="12" cy="12" r="10"></circle></svg>',hard:'<svg width="10" height="10" fill="var(--hard)" viewBox="0 0 24 24" class="inline-svg" style="vertical-align:middle;margin-right:2px;"><circle cx="12" cy="12" r="10"></circle></svg>'}[b.d]||'';
    const item=document.createElement('div'); item.className='bookmark-item fadeIn';
    item.innerHTML=`<span class="bookmark-item-text">${b.t}</span><div class="bookmark-item-meta"><span style="font-size:11px;color:var(--muted)">${dot} ${TOPICS[b.c]?.label||b.c}</span><button class="bookmark-load-btn" onclick="loadBookmark(${i})">Use</button><button class="bookmark-del-btn" onclick="removeBookmark(${i})"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></button></div>`;
    list.appendChild(item);
  });
}

function loadBookmark(i){
  const b=bookmarks[i]; if(!b)return;
  if(isRunning)resetTimer();
  currentTopic=b.t; currentCat=b.c; currentDiff=b.d;
  const el=document.getElementById('topicText');
  el.classList.add('fading');
  setTimeout(()=>{el.textContent=b.t;el.classList.remove('fading');el.classList.add('fadeIn');setTimeout(()=>el.classList.remove('fadeIn'),400);},200);
  document.getElementById('catBadge').textContent=TOPICS[b.c]?.label||b.c;
  const badge=document.getElementById('difficultyBadge');
  badge.style.display='inline-flex'; badge.className='diff-badge '+b.d;
  badge.innerHTML={easy:'<svg width="10" height="10" fill="var(--easy)" viewBox="0 0 24 24" class="inline-svg"><circle cx="12" cy="12" r="10"></circle></svg> Easy',medium:'<svg width="10" height="10" fill="var(--medium)" viewBox="0 0 24 24" class="inline-svg"><circle cx="12" cy="12" r="10"></circle></svg> Medium',hard:'<svg width="10" height="10" fill="var(--hard)" viewBox="0 0 24 24" class="inline-svg"><circle cx="12" cy="12" r="10"></circle></svg> Hard'}[b.d]||b.d;
  document.getElementById('tipText').textContent=TIPS[Math.floor(Math.random()*TIPS.length)];
  document.getElementById('tipPill').style.display='flex';
  document.getElementById('topicCard').classList.add('active');
  document.getElementById('feedbackWrap').classList.remove('show');
  document.getElementById('bookmarkBtn').style.display='flex';
  updateBookmarkBtn();
}

async function removeBookmark(i){
  const b=bookmarks[i]; if(!b)return;
  if(supabaseClient && supabaseUser){
    try {
      const { error } = await supabaseClient
        .from('bookmarks')
        .delete()
        .eq('user_id', supabaseUser.id)
        .eq('topic', b.t);
      if(error) throw error;
      bookmarks.splice(i,1);
      if(currentTopic)updateBookmarkBtn();
      renderBookmarks();
    } catch(e) {
      console.error(e);
    }
  } else {
    // Offline mode remove bookmark
    bookmarks.splice(i,1);
    savePracticeLocal();
    if(currentTopic)updateBookmarkBtn();
    renderBookmarks();
  }
}

// ── FILLER ────────────────────────────────────────────────────────────────────
function initFiller(){
  if(!('webkitSpeechRecognition' in window)&&!('SpeechRecognition' in window)){
    document.getElementById('micError').classList.add('show'); return;
  }
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  recognition=new SR(); recognition.continuous=true; recognition.interimResults=true; recognition.lang='en-US';
  recognition.onresult=(e)=>{
    for(let i=e.resultIndex;i<e.results.length;i++){
      const t=e.results[i][0].transcript.toLowerCase();
      if(e.results[i].isFinal){FILLER_WORDS.forEach(w=>{const m=t.match(new RegExp('\\b'+w.replace(/ /g,'\\s+')+'\\b','gi'));if(m)fillerCounts[w]=(fillerCounts[w]||0)+m.length;});}
    }
    renderFillerGrid();
  };
  recognition.onerror=(e)=>{if(e.error==='not-allowed')document.getElementById('micError').classList.add('show');};
  recognition.onend=()=>{if(isRunning){try{recognition.start();}catch(e){}}};
}

function renderFillerGrid(){
  const grid=document.getElementById('fillerGrid'); if (!grid) return;
  grid.innerHTML=''; let total=0;
  FILLER_WORDS.forEach(w=>{
    const count=fillerCounts[w]||0; total+=count;
    const chip=document.createElement('div'); chip.className='filler-chip'+(count>0?' hit':'');
    chip.innerHTML=`<span class="word">${w}</span><span class="count">${count}</span>`;
    grid.appendChild(chip);
  });
  document.getElementById('fillerTotal').innerHTML=`Total fillers: <strong>${total}</strong>`;
}

function startMic(){
  if(!recognition)initFiller();
  fillerCounts={}; renderFillerGrid();
  document.getElementById('fillerWrap').classList.add('show');
  document.getElementById('micIndicator').classList.add('active');
  try{recognition.start();micAllowed=true;document.getElementById('micError').classList.remove('show');}catch(e){}
}

function stopMic(){
  const indicator = document.getElementById('micIndicator');
  if (indicator) indicator.classList.remove('active');
  try{recognition.stop();}catch(e){}
  lastFillerCounts={...fillerCounts};
}

// ── TIMER ─────────────────────────────────────────────────────────────────────
function startStop(){
  if(!currentTopic){newTopic();return;}
  if(isRunning){
    clearInterval(interval);isRunning=false;
    stopMic();showFeedback(false,timerSec);
    logSession(currentTopic,timerMax-timerSec);
    updateStartBtn(); document.getElementById('resetBtn').disabled=false;
  } else {
    if(timerSec<=0)resetTimer();
    isRunning=true; updateStartBtn(); document.getElementById('resetBtn').disabled=true;
    startMic(); interval=setInterval(tick,1000);
  }
}

function tick(){
  timerSec--;updateDisplay();updateBar(timerSec/timerMax);
  if(timerSec<=0){
    clearInterval(interval);isRunning=false;
    stopMic();showFeedback(true,timerMax);logSession(currentTopic,timerMax);
    updateStartBtn(); document.getElementById('resetBtn').disabled=false;
    document.getElementById('timerDisplay').classList.add('accent');
    setTimeout(()=>document.getElementById('timerDisplay').classList.remove('accent'),2000);
  }
}

function resetTimer(){
  clearInterval(interval);if(isRunning)stopMic();
  isRunning=false;timerSec=selectedDur;timerMax=selectedDur;
  updateDisplay();updateBar(1);updateStartBtn();
  document.getElementById('resetBtn').disabled=true;
  document.getElementById('feedbackWrap').classList.remove('show');
  const d=document.getElementById('timerDisplay');d.classList.remove('warn','danger','accent');
  document.getElementById('timerBar').classList.remove('warn','danger');
}

function updateDisplay(){
  const m=Math.floor(timerSec/60),s=timerSec%60;
  const el = document.getElementById('timerDisplay');
  if (!el) return;
  el.textContent=`${m}:${String(s).padStart(2,'0')}`;
  el.classList.remove('warn','danger','accent');
  const pct=timerSec/timerMax;
  if(pct<=0.15)el.classList.add('danger'); else if(pct<=0.33)el.classList.add('warn');
}

function updateBar(ratio){
  const bar=document.getElementById('timerBar');
  if (!bar) return;
  bar.style.width=Math.max(0,ratio*100)+'%';
  bar.classList.remove('warn','danger');
  if(ratio<=0.15)bar.classList.add('danger'); else if(ratio<=0.33)bar.classList.add('warn');
}

function updateStartBtn(){
  const btn=document.getElementById('startBtn');
  if (!btn) return;
  if(isRunning){btn.innerHTML=`<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> Pause`;btn.classList.remove('pulsing');}
  else{btn.innerHTML=`<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Start`;if(currentTopic)btn.classList.add('pulsing');}
}

function showFeedback(isComplete,sec){
  const pool=isComplete?FEEDBACK.complete:FEEDBACK.early;
  const pick=pool[Math.floor(Math.random()*pool.length)];
  document.getElementById('feedbackTitle').innerHTML=pick.t;
  document.getElementById('feedbackText').innerHTML=pick.b;
  const total=Object.values(lastFillerCounts).reduce((a,b)=>a+b,0);
  const note=document.getElementById('feedbackFillerNote');
  if(total>0){
    const top=Object.entries(lastFillerCounts).sort((a,b)=>b[1]-a[1])[0];
    note.textContent=`Filler words this rep: ${total} total. Most used: "${top[0]}" (${top[1]}×). Try replacing it with a pause.`;
    note.classList.add('show');
  } else if(micAllowed){note.textContent='Zero filler words detected. Clean delivery.';note.classList.add('show');}
  else note.classList.remove('show');
  document.getElementById('feedbackWrap').classList.add('show');
}

async function logSession(topic,elapsed){
  if(elapsed<3)return;
  reps++;const done=elapsed>=timerMax;if(done)completed++;if(elapsed>bestSec)bestSec=elapsed;
  document.getElementById('statReps').textContent=reps;
  document.getElementById('statStreak').textContent=completed;
  const bm=Math.floor(bestSec/60),bs=bestSec%60;
  document.getElementById('statBest').textContent=bestSec>=60?`${bm}m${String(bs).padStart(2,'0')}s`:`${bestSec}s`;
  updateUnlock();
  
  const list=document.getElementById('historyList');
  const empty=list.querySelector('.history-empty');if(empty)empty.remove();
  const em=Math.floor(elapsed/60),es=elapsed%60;
  const timeStr=elapsed>=60?`${em}:${String(es).padStart(2,'0')}`:`0:${String(elapsed).padStart(2,'0')}`;
  const tf=Object.values(lastFillerCounts).reduce((a,b)=>a+b,0);
  const fs=micAllowed?` · ${tf} fillers`:'';
  const item=document.createElement('div');item.className='history-item fadeIn';
  item.innerHTML=`<span class="history-topic">${topic}</span><div class="history-right"><span class="history-filler">${fs}</span><span class="history-time">${timeStr}</span></div>`;
  list.insertBefore(item,list.firstChild);
  sessionHistory.unshift({topic,elapsed,fillers:tf});
  if(sessionHistory.length>10){list.removeChild(list.lastChild);sessionHistory.pop();}
  
  if (supabaseClient && supabaseUser) {
    try {
      await Promise.all([
        supabaseClient
          .from('practice_stats')
          .upsert({
            user_id: supabaseUser.id,
            reps: reps,
            completed: completed,
            best_sec: bestSec,
            updated_at: new Date().toISOString()
          }),
        supabaseClient
          .from('session_history')
          .insert({
            user_id: supabaseUser.id,
            topic: topic,
            elapsed_seconds: elapsed
          })
      ]);
    } catch(e) {
      console.error('Failed to save session to database:', e);
    }
  } else {
    // Offline mode session log save
    savePracticeLocal();
  }
}

function updateStatsDisplay() {
  const repsEl = document.getElementById('statReps');
  const streakEl = document.getElementById('statStreak');
  const bestEl = document.getElementById('statBest');
  if (repsEl) repsEl.textContent = reps;
  if (streakEl) streakEl.textContent = completed;
  if (bestEl) {
    if (bestSec > 0) {
      const bm = Math.floor(bestSec / 60), bs = bestSec % 60;
      bestEl.textContent = bestSec >= 60 ? `${bm}m${String(bs).padStart(2, '0')}s` : `${bestSec}s`;
    } else {
      bestEl.textContent = '—';
    }
  }
  updateUnlock();
}

function renderHistory() {
  const list = document.getElementById('historyList'); if (!list) return;
  list.innerHTML = '';
  if (!sessionHistory.length) {
    list.innerHTML = '<div class="history-empty">No sessions yet. Start your first rep.</div>';
    return;
  }
  sessionHistory.forEach(h => {
    const em = Math.floor(h.elapsed / 60), es = h.elapsed % 60;
    const timeStr = h.elapsed >= 60 ? `${em}:${String(es).padStart(2, '0')}` : `0:${String(h.elapsed).padStart(2, '0')}`;
    const fs = h.fillers !== undefined ? ` · ${h.fillers} fillers` : '';
    const item = document.createElement('div');
    item.className = 'history-item fadeIn';
    item.innerHTML = `<span class="history-topic">${h.topic}</span><div class="history-right"><span class="history-filler">${fs}</span><span class="history-time">${timeStr}</span></div>`;
    list.appendChild(item);
  });
}

// ── INITIALIZE PAGE ───────────────────────────────────────────────────────────
function initPracticePage() {
  // Set up categories buttons
  const catRow = document.getElementById('catRow');
  if (catRow) {
    catRow.innerHTML = '';
    Object.entries(TOPICS).forEach(([key,val])=>{
      const b=document.createElement('button');
      b.className='cat-btn on'; b.textContent=val.label; b.dataset.cat=key;
      b.onclick=()=>toggleCat(key,b);
      catRow.appendChild(b);
    });
  }

  // Set up duration click handlers
  document.querySelectorAll('.dur-btn').forEach(b=>{
    b.addEventListener('click',()=>{
      if(isRunning)return;
      document.querySelectorAll('.dur-btn').forEach(x=>x.classList.remove('selected'));
      b.classList.add('selected');
      selectedDur=parseInt(b.dataset.sec); timerSec=selectedDur; timerMax=selectedDur;
      updateDisplay(); updateBar(1);
      document.getElementById('feedbackWrap').classList.remove('show');
    });
  });

  // Initial renders
  updateDisplay();
  initFiller();
  renderBookmarks();
  renderHistory();
  updateStatsDisplay();
}

if (window.yaplabStateReady) {
  initPracticePage();
} else {
  window.addEventListener('yaplabStateReady', initPracticePage);
}
