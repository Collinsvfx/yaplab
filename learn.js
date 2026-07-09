const CAT_LABELS={design:'Design',opinions:'Opinions',persuasion:'Persuasion',storytelling:'Storytelling',impromptu:'Impromptu',other:'Other'};
const STATUS_LABELS={unread:'· Unread',read:'✓ Read',ready:'✦ Ready to speak'};
const WPM = 130; // words per minute speaking pace

const TEMPLATES = {
  viral: {
    label: 'Viral (Experience/Experiment)',
    sections: [
      { label: 'Hook', placeholder: `Open with the problem or the challenge — make the viewer feel the stakes immediately.\n\nExamples:\n• "My app has been getting signups — but users open it once and never come back. I think I finally know why."\n• "I tried to add one feature to my product. It broke everything. Here's what actually happened."` },
      { label: 'Stakes', placeholder: `Why does this matter to you — and why should it matter to the viewer?\n\nExamples:\n• "Every user who churns in week one is money I'll never make. And I was losing almost all of them."\n• "I had three paying customers watching me. I couldn't ship something broken."` },
      { label: 'The Plan', placeholder: `What are you about to do, and how are you approaching it?\n\nExamples:\n• "So here's what I decided to build — a two-phase onboarding. Get them to upload. Then show them where everything lives."\n• "I gave myself one afternoon. No extensions, no excuses. Here's the exact plan I followed."` },
      { label: 'The Build', placeholder: `Show the actual work. Walk through the decisions you're making as you go.\n\nExamples:\n• "I started with the welcome screen. One screen, not four. People skip long intros — I've seen it in every app I've tested."\n• "The first thing I did was map the flow on paper before touching any tool. That saved me two hours of back-and-forth."` },
      { label: 'The Struggle', placeholder: `Show a moment where something went wrong or didn't work as expected. This is what makes it real.\n\nExamples:\n• "The progress screen looked fine on desktop. On a smaller window, it completely broke. I almost missed it."\n• "I built the whole thing in one direction — then realized I'd solved the wrong problem entirely."` },
      { label: 'The Result', placeholder: `Show the before and after. Make it visual and concrete.\n\nExamples:\n• "This is what a new user sees now — clear direction from the first second. Sign up, upload, get your clips, done."\n• "Here's the old version. Here's the new one. The difference took less than three hours to build."` },
      { label: 'Reflection & Outro', placeholder: `What did you learn? What's next? End with something that sticks.\n\nExamples:\n• "Is it perfect? No. But it's a thousand times better than leaving users to figure it out alone. The next thing I'm adding is a quote card generator — that's a different video."\n• "The lesson: solve the first 60 seconds of your user's experience before you build anything else. I'll see you in the next one."` }
    ]
  },
  story: {
    label: 'Story Arc',
    sections: [
      { label: 'Opening Image', placeholder: `Drop the viewer into a specific moment — a scene, not a summary.\n\nExamples:\n• "It's 11pm. I'm staring at a screen that says 'zero signups.' I've been building for six months."\n• "The client's on the call. I'm sharing my screen. And the prototype is broken."` },
      { label: 'Setup', placeholder: `Give context — who you are, what the world looked like before things changed.\n\nExamples:\n• "At the time, I was three months into freelancing. Two clients, steady income, thought I had it figured out."\n• "I'd been teaching design for a year. I knew the theory. I just hadn't shipped anything real yet."` },
      { label: 'Problem', placeholder: `What disrupted the normal? What forced a change?\n\nExamples:\n• "Then I lost both clients in the same week. No warning, no reason — just gone."\n• "The feedback from my first real user was brutal. They didn't understand a single screen I'd designed."` },
      { label: 'Rising Action', placeholder: `What did you try? What happened as you worked through it?\n\nExamples:\n• "I spent two weeks reaching out to 40 potential clients. Heard back from three. Booked one."\n• "I redesigned the whole flow — twice. Each version taught me something the last one didn't."` },
      { label: 'Climax / Turn', placeholder: `The pivotal moment. The thing that changed everything.\n\nExamples:\n• "Then one conversation shifted how I saw the whole problem. A mentor asked me one question I couldn't answer."\n• "I almost gave up. And then — at 2am — it clicked. I had been solving the wrong thing the entire time."` },
      { label: 'Resolution', placeholder: `What happened after? What does the world look like now?\n\nExamples:\n• "Three months later, I had more clients than I could take. Not because I got better at pitching — because I stopped pitching."\n• "The product shipped. It wasn't perfect. But users got it. And that was everything."` },
      { label: 'Takeaway', placeholder: `What's the one thing you want them to walk away with?\n\nExamples:\n• "The lesson I keep coming back to: the people who figure it out aren't the ones who never struggle — they're the ones who don't stop when they do."\n• "If you're in the hard part right now, you're not behind. You're exactly where the learning happens."` }
    ]
  },
  persuasion: {
    label: 'Persuasion',
    sections: [
      { label: 'Bold Claim', placeholder: `Start with a statement that challenges what most people assume.\n\nExamples:\n• "Most designers are solving the wrong problem — and they don't even know it."\n• "Your onboarding is costing you more revenue than your pricing ever will."` },
      { label: 'Why It Matters', placeholder: `Explain the stakes. Why should they care right now?\n\nExamples:\n• "Every user who doesn't understand your product in the first 60 seconds is gone — probably forever."\n• "Design isn't decoration. It's the difference between a product people trust and one they abandon."` },
      { label: 'Common Objection', placeholder: `Steelman the opposing view before you dismantle it.\n\nExamples:\n• "I know what you're thinking — 'I don't have time for UX research, I just need to ship.'"\n• "Most people say: 'Users will figure it out.' And maybe they will. But will they stick around long enough?"` },
      { label: 'Evidence / Example', placeholder: `Use a specific story, number, or example — not a vague claim.\n\nExamples:\n• "I ran a test. Two versions of the same screen. The one with a single clear CTA converted 40% better."\n• "Slack's onboarding doesn't teach you every feature. It gets you to send one message. That's it. And it works."` },
      { label: 'Reframe', placeholder: `Shift how they see the issue entirely.\n\nExamples:\n• "This isn't about making things pretty. It's about making sure people don't leave confused."\n• "Onboarding isn't a feature. It's the first impression your product makes — and you only get one."` },
      { label: 'Call to Action', placeholder: `End with something specific they can do right now.\n\nExamples:\n• "Open your app as if you're a brand new user. Time how long it takes to understand what to do. That number will tell you everything."\n• "Before you build the next feature, sit with one real user for 20 minutes. Watch where they get stuck. That's your roadmap."` }
    ]
  },
  tutorial: {
    label: 'Tutorial / How-To',
    sections: [
      { label: 'Hook — The Result', placeholder: `Show or describe what they'll be able to do by the end. Lead with the outcome.\n\nExamples:\n• "By the end of this, you'll have a fully working onboarding flow — built in under two hours."\n• "I'm going to show you exactly how I structure my design tokens so I never have to guess which colour to use."` },
      { label: 'What You Need', placeholder: `Set them up for success — tools, context, prerequisites.\n\nExamples:\n• "You'll need Figma, a basic component library, and about 45 minutes. That's it."\n• "This works whether you're using Antigravity, Cursor, or building vanilla. The logic is the same."` },
      { label: 'Step 1', placeholder: `First action — be specific. Tell them exactly what to do and why.\n\nExamples:\n• "Start with your welcome screen. One screen, one message, one button. Resist the urge to explain everything here."\n• "Before you open any tool, write the user's goal in one sentence. That sentence becomes your north star for every decision."` },
      { label: 'Step 2', placeholder: `Next step — continue the sequence.\n\nExamples:\n• "Now set up your progress state. While the app is processing, don't show a blank screen — show momentum."\n• "Map your token names to their purpose, not their value. 'color-text-primary' is useful. 'gray-900' is not."` },
      { label: 'Step 3', placeholder: `Third step — keep moving forward.\n\nExamples:\n• "Finally, build the feature tour. Three steps maximum — clips, preview, export. Dismiss on any click outside."\n• "Now wire up the alias layer. Every component references an alias token, never a base token directly."` },
      { label: 'Common Mistakes', placeholder: `Warn them about the things that trip most people up.\n\nExamples:\n• "The mistake I see most often: building a 6-step onboarding when users just want to do the thing."\n• "Don't name tokens after their visual appearance. If the colour changes, your name becomes a lie."` },
      { label: 'Wrap Up', placeholder: `Summarise what they built and point to what's next.\n\nExamples:\n• "That's your full onboarding — welcome screen, progress state, feature tour. Now go test it on someone who's never seen your product."\n• "You now have a token system that scales. The next layer is theming — swapping the whole brand with one variable."` }
    ]
  },
  roleplay: {
    label: 'Roleplay',
    sections: [
      { role: 'J', label: 'Junior', placeholder: 'Junior: Ask a question or start the conversation...' },
      { role: 'S', label: 'Senior', placeholder: 'Senior: Answer, guide, or challenge...' }
    ]
  }
};

let scriptSaveTimeout = null;
function triggerScriptSave(itemId) {
  clearTimeout(scriptSaveTimeout);
  scriptSaveTimeout = setTimeout(() => {
    saveSectionsToSupabase(itemId);
  }, 1000);
}

async function saveSectionsToSupabase(itemId) {
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  if (supabaseClient && supabaseUser) {
    try {
      const { error } = await supabaseClient
        .from('learn_items')
        .update({
          sections: item.sections,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId);
      if (error) throw error;
    } catch(e) {
      console.error('Failed to save script:', e);
    }
  } else {
    saveLearn();
  }
}

async function addLearnItem(){
  const input=document.getElementById('learnInput');
  const title=input.value.trim(); if(!title){input.focus();return;}
  const cat=document.getElementById('learnCatSelect').value;
  input.disabled = true;
  
  if (supabaseClient && supabaseUser) {
    try {
      const { data, error } = await supabaseClient
        .from('learn_items')
        .insert({
          user_id: supabaseUser.id,
          title,
          category: cat,
          status: 'unread',
          sections: [],
          updated_at: new Date().toISOString()
        })
        .select();
      if (error) throw error;
      if (data && data[0]) {
        learnItems.unshift({
          id: data[0].id,
          title: data[0].title,
          category: data[0].category,
          status: data[0].status,
          sections: data[0].sections || [],
          updatedAt: new Date(data[0].updated_at).getTime()
        });
        renderLearnList();
        updateLearnStats();
      }
    } catch (e) {
      console.error(e);
    } finally {
      input.disabled = false;
      input.value = '';
    }
  } else {
    const localId = Date.now();
    learnItems.unshift({
      id: localId,
      title,
      category: cat,
      status: 'unread',
      sections: [],
      updatedAt: Date.now()
    });
    saveLearn();
    renderLearnList();
    updateLearnStats();
    input.disabled = false;
    input.value = '';
  }
}

function setLearnFilter(filter,btn){
  learnFilter=filter;
  document.querySelectorAll('.learn-filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderLearnList();
}

async function cycleStatus(id){
  const item=learnItems.find(i=>i.id===id); if(!item)return;
  const nextStatus = {unread:'read',read:'ready',ready:'unread'}[item.status];
  
  if (supabaseClient && supabaseUser) {
    try {
      const { error } = await supabaseClient
        .from('learn_items')
        .update({
          status: nextStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      if (error) throw error;
      item.status = nextStatus;
      item.updatedAt = Date.now();
      renderLearnList();
      updateLearnStats();
    } catch (e) {
      console.error(e);
    }
  } else {
    item.status = nextStatus;
    item.updatedAt = Date.now();
    saveLearn();
    renderLearnList();
    updateLearnStats();
  }
}

async function deleteLearnItem(id){
  if (!confirm('Are you sure you want to delete this topic?')) return;
  if (supabaseClient && supabaseUser) {
    try {
      const { error } = await supabaseClient
        .from('learn_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
      learnItems=learnItems.filter(i=>i.id!==id);
      renderLearnList();
      updateLearnStats();
    } catch(e) {
      console.error(e);
    }
  } else {
    learnItems=learnItems.filter(i=>i.id!==id);
    saveLearn();
    renderLearnList();
    updateLearnStats();
  }
}

function toggleScript(id){
  const area=document.getElementById('script-area-'+id); if(!area)return;
  const opening = !area.classList.contains('open');
  if (opening) {
    area.classList.add('open');
    openScriptIds.add(id);
    const tog=document.getElementById('script-toggle-'+id);
    if(tog) tog.textContent='▲ Hide script';
  } else {
    area.classList.remove('open');
    openScriptIds.delete(id);
    renderLearnList();
  }
}

function wordCount(text){ return text.trim()===''?0:text.trim().split(/\s+/).length; }

function formatDur(words){
  const secs=Math.round((words/WPM)*60);
  if(secs<60) return secs+'s';
  const m=Math.floor(secs/60),s=secs%60;
  return s>0?`${m}m ${s}s`:`${m}m`;
}

async function addRoleplaySection(itemId, role) {
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  if(!item.sections) item.sections=[];
  item.sections.push({
    id: Date.now() + Math.random(),
    role: role,
    label: role === 'J' ? 'Junior' : 'Senior',
    placeholder: role === 'J' ? 'Junior: Type dialogue here...' : 'Senior: Type dialogue here...',
    text: ''
  });
  item.updatedAt=Date.now();
  renderScriptSections(itemId);
  await saveSectionsToSupabase(itemId);
}

function toggleRoleplayPractice(itemId) {
  practiceModes[itemId] = !practiceModes[itemId];
  if (practiceModes[itemId] && !practiceActiveRoles[itemId]) {
    practiceActiveRoles[itemId] = 'J';
  }
  renderLearnList();
}

function setPracticeActiveRole(itemId, role) {
  practiceActiveRoles[itemId] = role;
  renderScriptSections(itemId);
}

async function addSection(itemId, labelOverride, placeholderOverride){
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  if(!item.sections) item.sections=[];
  const idx=item.sections.length+1;
  item.sections.push({id:Date.now()+Math.random(),label:labelOverride||'Section '+idx,placeholder:placeholderOverride||'',text:''});
  item.updatedAt=Date.now();
  renderScriptSections(itemId);
  await saveSectionsToSupabase(itemId);
}

async function deleteSection(itemId, secId){
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  item.sections=item.sections.filter(s=>s.id!==secId);
  item.updatedAt=Date.now();
  renderScriptSections(itemId);
  await saveSectionsToSupabase(itemId);
}

function updateSectionLabel(itemId, secId, value){
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  const sec=item.sections.find(s=>s.id===secId); if(!sec)return;
  sec.label=value;
  item.updatedAt=Date.now();
  triggerScriptSave(itemId);
}

function updateSectionText(itemId, secId, value){
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  const sec=item.sections.find(s=>s.id===secId); if(!sec)return;
  sec.text=value;
  item.updatedAt=Date.now();
  updateSectionStats(itemId, secId, value);
  
  // Dynamically update Roleplay per-role stats
  const isRoleplay = item.sections.some(s => s.role !== undefined && s.role !== null);
  if (isRoleplay) {
    const juniorSections = item.sections.filter(s => s.role === 'J');
    const seniorSections = item.sections.filter(s => s.role === 'S');
    const wcJunior = juniorSections.reduce((sum, s) => sum + wordCount(s.text), 0);
    const wcSenior = seniorSections.reduce((sum, s) => sum + wordCount(s.text), 0);
    
    const jStatsEl = document.getElementById(`roleplay-stats-j-${itemId}`);
    if (jStatsEl) {
      jStatsEl.innerHTML = `Junior: <strong>${wcJunior} words</strong> · <strong>~${wcJunior > 0 ? formatDur(wcJunior) : '—'}</strong>`;
    }
    const sStatsEl = document.getElementById(`roleplay-stats-s-${itemId}`);
    if (sStatsEl) {
      sStatsEl.innerHTML = `Senior: <strong>${wcSenior} words</strong> · <strong>~${wcSenior > 0 ? formatDur(wcSenior) : '—'}</strong>`;
    }
  }

  updateTotalBar(itemId);
  triggerScriptSave(itemId);
}

function updateSectionStats(itemId, secId, text){
  const wc=wordCount(text);
  const secIdSafe=String(secId).replace('.','_');
  const wcEl=document.getElementById(`sec-wc-${itemId}-${secIdSafe}`);
  const durEl=document.getElementById(`sec-dur-${itemId}-${secIdSafe}`);
  if(wcEl) wcEl.textContent=wc+' words';
  if(durEl) durEl.textContent=wc>0?'~'+formatDur(wc):'—';
}

function updateTotalBar(itemId){
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  const totalWc=(item.sections||[]).filter(s => s.type !== 'preflight').reduce((a,s)=>a+wordCount(s.text),0);
  const twcEl=document.getElementById(`total-wc-${itemId}`);
  const tdurEl=document.getElementById(`total-dur-${itemId}`);
  if(twcEl) twcEl.textContent=totalWc+' words';
  if(tdurEl) tdurEl.textContent=totalWc>0?'~'+formatDur(totalWc):'—';
}

async function loadTemplate(itemId, tplKey){
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  const tpl=TEMPLATES[tplKey]; if(!tpl)return;
  
  const dialogueSections = (item.sections || []).filter(s => s.type !== 'preflight');
  if(dialogueSections.length>0){
    if(!confirm('This will replace your current sections. Continue?'))return;
  }
  
  const preflight = (item.sections || []).find(s => s.type === 'preflight');
  const newSections = tpl.sections.map((s,idx)=>({
    id:Date.now()+idx,
    label:s.label || (s.role === 'J' ? 'Junior' : s.role === 'S' ? 'Senior' : ''),
    role: s.role || null,
    placeholder:s.placeholder || '',
    text:''
  }));
  
  if (preflight) {
    item.sections = [preflight, ...newSections];
  } else {
    item.sections = [
      { type: 'preflight', emotionalEntry: '', whoFeels: '', hookTest: '' },
      ...newSections
    ];
  }
  
  item.updatedAt=Date.now();
  renderScriptSections(itemId);
  await saveSectionsToSupabase(itemId);
}

function copyScriptToClipboard(itemId, btn) {
  const item = learnItems.find(i => i.id === itemId);
  if (!item) return;
  
  const sections = (item.sections || []).filter(s => s.type !== 'preflight');
  let content = '';
  sections.forEach((sec, idx) => {
    const label = sec.label || (sec.role === 'J' ? 'Junior' : sec.role === 'S' ? 'Senior' : `Section ${idx + 1}`);
    const speaker = sec.role ? ` [${sec.role}]` : '';
    content += `Line ${idx + 1} (${label}${speaker}):\n${sec.text}\n\n`;
  });
  
  navigator.clipboard.writeText(content.trim()).then(() => {
    const originalText = btn.innerHTML;
    btn.innerHTML = `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="margin-right:2px;display:inline-block;vertical-align:middle"><path d="M20 6L9 17l-5-5"/></svg> Copied!`;
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

function exportToWord(itemId) {
  const item = learnItems.find(i => i.id === itemId);
  if (!item) return;
  
  const sections = (item.sections || []).filter(s => s.type !== 'preflight');
  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <title>${esc(item.title)}</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; margin: 1in; }
        h1 { font-size: 24pt; color: #111; border-bottom: 2px solid #ccc; padding-bottom: 10px; margin-bottom: 20px; }
        h2 { font-size: 14pt; color: #555; margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; }
        p { font-size: 11pt; color: #333; margin-bottom: 15px; }
        .meta { font-size: 10pt; color: #777; margin-bottom: 30px; font-style: italic; }
      </style>
    </head>
    <body>
      <h1>${esc(item.title)}</h1>
      <div class="meta">Category: ${CAT_LABELS[item.category] || item.category} | Created: ${new Date(item.updatedAt).toLocaleDateString()}</div>
  `;
  
  sections.forEach((sec, idx) => {
    const label = sec.label || (sec.role === 'J' ? 'Junior' : sec.role === 'S' ? 'Senior' : `Section ${idx + 1}`);
    const speaker = sec.role ? ` (${sec.role})` : '';
    html += `<h2>Line ${idx + 1} - ${esc(label)}${speaker}</h2>`;
    html += `<p>${esc(sec.text).replace(/\n/g, '<br>') || '<em>[No content]</em>'}</p>`;
  });
  
  html += `</body></html>`;
  
  const blob = new Blob(['\ufeff' + html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_script.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportToText(itemId) {
  const item = learnItems.find(i => i.id === itemId);
  if (!item) return;
  
  const sections = (item.sections || []).filter(s => s.type !== 'preflight');
  let content = `${item.title.toUpperCase()}\n`;
  content += `Category: ${CAT_LABELS[item.category] || item.category}\n`;
  content += `====================================================\n\n`;
  
  sections.forEach((sec, idx) => {
    const label = sec.label || (sec.role === 'J' ? 'Junior' : sec.role === 'S' ? 'Senior' : `Section ${idx + 1}`);
    const speaker = sec.role ? ` [${sec.role}]` : '';
    content += `--- Line ${idx + 1}: ${label}${speaker} ---\n`;
    content += `${sec.text || '[No content]'}\n\n`;
  });
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_script.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function renderPreflightHtml(item) {
  let preflight = (item.sections || []).find(s => s.type === 'preflight');
  if (!preflight) {
    preflight = { type: 'preflight', emotionalEntry: '', whoFeels: '', hookTest: '' };
    if (!item.sections) item.sections = [];
    item.sections.unshift(preflight);
  }
  
  const emotionalEntry = preflight.emotionalEntry || '';
  const whoFeels = preflight.whoFeels || '';
  const hookTest = preflight.hookTest || '';
  
  const isComplete = emotionalEntry.trim() !== '' && whoFeels.trim() !== '' && hookTest.trim() !== '';
  const checkmark = isComplete ? `<span class="preflight-complete-checkmark" title="Pre-script complete">✓</span>` : '';
  
  return `
    <div class="preflight-card" id="preflight-${item.id}">
      <div class="preflight-header">
        <div style="display:flex; align-items:center;">
          <span class="preflight-title">Pre-Script: Find Your Hook</span>
          ${checkmark}
        </div>
        <span class="preflight-badge">Not included in duration</span>
      </div>
      
      <div class="preflight-body">
        <div class="preflight-field">
          <label class="preflight-label">What's the feeling behind this topic?</label>
          <textarea class="preflight-input" rows="2" placeholder="e.g. I kept getting rejected from jobs and didn't know why — that frustration is why I made this video."
            oninput="updatePreflightField(${item.id}, 'emotionalEntry', this.value)">${esc(emotionalEntry)}</textarea>
        </div>
        
        <div class="preflight-field-row">
          <div class="preflight-field" style="flex:1;">
            <label class="preflight-label">Who specifically feels this?</label>
            <input class="preflight-input" type="text" placeholder="e.g. Junior designers who've sent 20+ applications" value="${esc(whoFeels)}"
              oninput="updatePreflightField(${item.id}, 'whoFeels', this.value)">
          </div>
          <div class="preflight-field" style="flex:1;">
            <label class="preflight-label">Rewrite your title as a hook sentence</label>
            <input class="preflight-input" type="text" placeholder="e.g. I audited 10 job descriptions and found I was missing 70% of the skills — so I fixed it." value="${esc(hookTest)}"
              oninput="updatePreflightField(${item.id}, 'hookTest', this.value)">
          </div>
        </div>
        
        <div class="preflight-ai-section">
          <button class="btn btn-secondary preflight-ai-btn" onclick="checkScriptAlignment(${item.id}, this)">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="margin-right:2px;display:inline-block;vertical-align:middle"><path d="M9.813 15.904L9 21L7.188 15.904L2 15L7.188 14.096L9 9L9.813 14.096L15 15L9.813 15.904Z"/><path d="M19.071 4.929a10 10 0 00-14.142 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Analyze Script Alignment
          </button>
          <div class="preflight-ai-result" id="preflight-ai-result-${item.id}" style="display:none;"></div>
        </div>
      </div>
    </div>
  `;
}

function updatePreflightField(itemId, field, value) {
  const item = learnItems.find(i => i.id === itemId);
  if (!item) return;
  
  let preflight = (item.sections || []).find(s => s.type === 'preflight');
  if (!preflight) {
    preflight = { type: 'preflight', emotionalEntry: '', whoFeels: '', hookTest: '' };
    if (!item.sections) item.sections = [];
    item.sections.unshift(preflight);
  }
  
  preflight[field] = value;
  item.updatedAt = Date.now();
  
  const isComplete = (preflight.emotionalEntry || '').trim() !== '' && 
                     (preflight.whoFeels || '').trim() !== '' && 
                     (preflight.hookTest || '').trim() !== '';
  
  const card = document.getElementById(`preflight-${itemId}`);
  if (card) {
    const headerContainer = card.querySelector('.preflight-header div');
    let checkmark = headerContainer.querySelector('.preflight-complete-checkmark');
    if (isComplete) {
      if (!checkmark) {
        headerContainer.insertAdjacentHTML('beforeend', '<span class="preflight-complete-checkmark" title="Pre-script complete">✓</span>');
      }
    } else {
      if (checkmark) checkmark.remove();
    }
  }
  
  triggerScriptSave(itemId);
}

async function checkScriptAlignment(itemId, btn) {
  const item = learnItems.find(i => i.id === itemId);
  if (!item) return;
  
  let preflight = (item.sections || []).find(s => s.type === 'preflight');
  if (!preflight) return;
  
  const resultEl = document.getElementById(`preflight-ai-result-${itemId}`);
  if (!resultEl) return;
  
  resultEl.style.display = 'block';
  resultEl.innerHTML = `<div class="preflight-ai-loading"><span class="preflight-spinner"></span> Analyzing your script alignment...</div>`;
  btn.disabled = true;
  
  const dialogueSections = (item.sections || []).filter(s => s.type !== 'preflight');
  const fullScriptText = dialogueSections.map((s, idx) => {
    const label = s.label || (s.role === 'J' ? 'Junior' : s.role === 'S' ? 'Senior' : `Section ${idx + 1}`);
    return `[${label}]: ${s.text}`;
  }).join('\n\n');
  
  try {
    if (!supabaseClient) {
      // Mock result for offline local storage testing
      setTimeout(() => {
        const mockResult = {
          status: 'partial_match',
          critique: '[Local Offline Mock] Your script matches your target audience well, but your hook could highlight the core tension more clearly.',
          suggestions: [
            'Try opening with a stronger hook line matching your planning.',
            'Deploy to Vercel with GEMINI_API_KEY configured to get live AI reviews!'
          ]
        };
        renderAlignmentResult(itemId, mockResult);
        btn.disabled = false;
      }, 1200);
      return;
    }
    
    const res = await fetch('/api/check-alignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emotionalEntry: preflight.emotionalEntry,
        whoFeels: preflight.whoFeels,
        hookTest: preflight.hookTest,
        fullScriptText: fullScriptText
      })
    });
    
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Server error');
    }
    
    const alignmentResult = await res.json();
    renderAlignmentResult(itemId, alignmentResult);
  } catch (err) {
    resultEl.innerHTML = `<div class="preflight-ai-error">Failed to check alignment: ${esc(err.message)}</div>`;
  } finally {
    btn.disabled = false;
  }
}

function renderAlignmentResult(itemId, result) {
  const resultEl = document.getElementById(`preflight-ai-result-${itemId}`);
  if (!resultEl) return;
  
  const statusLabels = {
    strong_match: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><polyline points="20 6 9 17 4 12"></polyline></svg>Strong Match`,
    partial_match: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Partial Match`,
    mismatch: `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="vertical-align:middle;margin-right:4px;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>Mismatch`
  };
  
  const statusClasses = {
    strong_match: 'strong',
    partial_match: 'partial',
    mismatch: 'mismatch'
  };
  
  const statusLabel = statusLabels[result.status] || 'Unknown';
  const statusClass = statusClasses[result.status] || '';
  
  const suggestionsHtml = (result.suggestions || []).map(s => `<li>${esc(s)}</li>`).join('');
  
  resultEl.innerHTML = `
    <div class="preflight-result-card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:600;font-size:12px;color:var(--text);">AI Assessment</span>
        <span class="preflight-status-badge ${statusClass}">${statusLabel}</span>
      </div>
      <p class="preflight-result-critique">${esc(result.critique)}</p>
      ${suggestionsHtml ? `<ul class="preflight-result-suggestions">${suggestionsHtml}</ul>` : ''}
      ${result.modelUsed ? `<div style="font-size:9px;color:var(--muted);margin-top:10px;text-align:right;">Model: ${esc(result.modelUsed)}</div>` : ''}
    </div>
  `;
}

// ── DRAG TO REORDER ───────────────────────────────────────────────────────────
let dragSrcItemId=null, dragSrcSecId=null, dragEl=null;

function onDragStart(e, itemId, secId){
  dragSrcItemId=itemId; dragSrcSecId=secId;
  dragEl=e.currentTarget.closest('.script-section');
  dragEl.classList.add('dragging');
  e.dataTransfer.effectAllowed='move';
  e.dataTransfer.setData('text/plain','');
}
function onDragOver(e, itemId, secId){
  e.preventDefault(); e.dataTransfer.dropEffect='move';
  if(secId===dragSrcSecId) return;
  document.querySelectorAll('.script-section').forEach(el=>el.classList.remove('drag-over'));
  e.currentTarget.classList.add('drag-over');
}
function onDragLeave(e){ e.currentTarget.classList.remove('drag-over'); }
async function onDrop(e, itemId, secId){
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if(secId===dragSrcSecId||itemId!==dragSrcItemId) return;
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  const fromIdx=item.sections.findIndex(s=>s.id===dragSrcSecId);
  const toIdx=item.sections.findIndex(s=>s.id===secId);
  if(fromIdx<0||toIdx<0) return;
  const [moved]=item.sections.splice(fromIdx,1);
  item.sections.splice(toIdx,0,moved);
  item.updatedAt=Date.now();
  renderScriptSections(itemId);
  await saveSectionsToSupabase(itemId);
}
function onDragEnd(e){
  document.querySelectorAll('.script-section').forEach(el=>el.classList.remove('dragging','drag-over'));
  dragSrcItemId=null; dragSrcSecId=null; dragEl=null;
}

function renderRoleplayScriptSections(itemId, container, sections) {
  const inPractice = practiceModes[itemId] || false;
  const activeRole = practiceActiveRoles[itemId] || 'J';

  const dialogueSections = sections.filter(s => s.type !== 'preflight');

  const juniorSections = dialogueSections.filter(s => s.role === 'J');
  const seniorSections = dialogueSections.filter(s => s.role === 'S');
  const wcJunior = juniorSections.reduce((sum, s) => sum + wordCount(s.text), 0);
  const wcSenior = seniorSections.reduce((sum, s) => sum + wordCount(s.text), 0);
  const totalWc = wcJunior + wcSenior;

  if (inPractice) {
    const practiceHeader = document.createElement('div');
    practiceHeader.className = 'roleplay-practice-header fadeIn';
    practiceHeader.innerHTML = `
      <span class="roleplay-practice-title">Practice Active Roleplay</span>
      <div class="roleplay-role-selector">
        <button class="roleplay-selector-btn j ${activeRole === 'J' ? 'active' : ''}" onclick="setPracticeActiveRole(${itemId}, 'J')">Junior</button>
        <button class="roleplay-selector-btn s ${activeRole === 'S' ? 'active' : ''}" onclick="setPracticeActiveRole(${itemId}, 'S')">Senior</button>
      </div>
    `;
    container.appendChild(practiceHeader);

    const colsContainer = document.createElement('div');
    colsContainer.className = 'roleplay-cols-container fadeIn';

    const juniorCol = document.createElement('div');
    juniorCol.className = `roleplay-col roleplay-col-junior ${activeRole !== 'J' ? 'dimmed' : 'highlighted'}`;
    juniorCol.innerHTML = `<div class="roleplay-col-header">Junior</div>`;
    
    const juniorBlocksDiv = document.createElement('div');
    juniorBlocksDiv.className = 'roleplay-blocks';

    const seniorCol = document.createElement('div');
    seniorCol.className = `roleplay-col roleplay-col-senior ${activeRole !== 'S' ? 'dimmed' : 'highlighted'}`;
    seniorCol.innerHTML = `<div class="roleplay-col-header">Senior</div>`;
    
    const seniorBlocksDiv = document.createElement('div');
    seniorBlocksDiv.className = 'roleplay-blocks';

    dialogueSections.forEach((sec, idx) => {
      const lineNum = idx + 1;
      const block = document.createElement('div');
      block.className = 'roleplay-practice-block';
      block.innerHTML = `
        <div class="roleplay-practice-block-head">
          <span class="roleplay-badge ${sec.role.toLowerCase()}">${sec.role}</span>
          <span class="roleplay-line-num">Line ${lineNum}</span>
        </div>
        <div class="roleplay-practice-text">${esc(sec.text || '[Silence]')}</div>
      `;

      if (sec.role === 'J') {
        juniorBlocksDiv.appendChild(block);
      } else {
        seniorBlocksDiv.appendChild(block);
      }
    });

    juniorCol.appendChild(juniorBlocksDiv);
    seniorCol.appendChild(seniorBlocksDiv);

    const juniorStats = document.createElement('div');
    juniorStats.className = 'roleplay-col-stats';
    juniorStats.innerHTML = `Junior: <strong>${wcJunior} words</strong> · <strong>~${wcJunior > 0 ? formatDur(wcJunior) : '—'}</strong>`;
    juniorCol.appendChild(juniorStats);

    const seniorStats = document.createElement('div');
    seniorStats.className = 'roleplay-col-stats';
    seniorStats.innerHTML = `Senior: <strong>${wcSenior} words</strong> · <strong>~${wcSenior > 0 ? formatDur(wcSenior) : '—'}</strong>`;
    seniorCol.appendChild(seniorStats);

    colsContainer.appendChild(juniorCol);
    colsContainer.appendChild(seniorCol);
    container.appendChild(colsContainer);

  } else {
    const colsContainer = document.createElement('div');
    colsContainer.className = 'roleplay-cols-container fadeIn';

    const juniorCol = document.createElement('div');
    juniorCol.className = 'roleplay-col roleplay-col-junior';
    juniorCol.innerHTML = `<div class="roleplay-col-header">Junior</div>`;
    
    const juniorBlocksDiv = document.createElement('div');
    juniorBlocksDiv.className = 'roleplay-blocks';

    const seniorCol = document.createElement('div');
    seniorCol.className = 'roleplay-col roleplay-col-senior';
    seniorCol.innerHTML = `<div class="roleplay-col-header">Senior</div>`;
    
    const seniorBlocksDiv = document.createElement('div');
    seniorBlocksDiv.className = 'roleplay-blocks';

    dialogueSections.forEach((sec, idx) => {
      const lineNum = idx + 1;
      const block = document.createElement('div');
      block.className = 'roleplay-block';
      block.innerHTML = `
        <div class="roleplay-block-head">
          <span class="roleplay-badge ${sec.role.toLowerCase()}">${sec.role}</span>
          <span class="roleplay-line-num">Line ${lineNum}</span>
          <button class="roleplay-del-btn" onclick="deleteSection(${itemId}, ${sec.id})" title="Delete line">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <textarea placeholder="${esc(sec.placeholder || 'Type line dialogue...')}"
          oninput="updateSectionText(${itemId}, ${sec.id}, this.value)">${esc(sec.text)}</textarea>
      `;

      if (sec.role === 'J') {
        juniorBlocksDiv.appendChild(block);
      } else {
        seniorBlocksDiv.appendChild(block);
      }
    });

    juniorCol.appendChild(juniorBlocksDiv);
    seniorCol.appendChild(seniorBlocksDiv);

    const addJuniorBtn = document.createElement('button');
    addJuniorBtn.className = 'add-roleplay-btn';
    addJuniorBtn.innerHTML = `<svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>+ Junior line`;
    addJuniorBtn.onclick = () => addRoleplaySection(itemId, 'J');
    juniorCol.appendChild(addJuniorBtn);

    const addSeniorBtn = document.createElement('button');
    addSeniorBtn.className = 'add-roleplay-btn';
    addSeniorBtn.innerHTML = `<svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>+ Senior line`;
    addSeniorBtn.onclick = () => addRoleplaySection(itemId, 'S');
    seniorCol.appendChild(addSeniorBtn);

    const juniorStats = document.createElement('div');
    juniorStats.className = 'roleplay-col-stats';
    juniorStats.id = `roleplay-stats-j-${itemId}`;
    juniorStats.innerHTML = `Junior: <strong>${wcJunior} words</strong> · <strong>~${wcJunior > 0 ? formatDur(wcJunior) : '—'}</strong>`;
    juniorCol.appendChild(juniorStats);

    const seniorStats = document.createElement('div');
    seniorStats.className = 'roleplay-col-stats';
    seniorStats.id = `roleplay-stats-s-${itemId}`;
    seniorStats.innerHTML = `Senior: <strong>${wcSenior} words</strong> · <strong>~${wcSenior > 0 ? formatDur(wcSenior) : '—'}</strong>`;
    seniorCol.appendChild(seniorStats);

    colsContainer.appendChild(juniorCol);
    colsContainer.appendChild(seniorCol);
    container.appendChild(colsContainer);
  }

  const twcEl = document.getElementById(`total-wc-${itemId}`);
  const tdurEl = document.getElementById(`total-dur-${itemId}`);
  if (twcEl) twcEl.textContent = totalWc + ' words';
  if (tdurEl) tdurEl.textContent = totalWc > 0 ? '~' + formatDur(totalWc) : '—';
}

function renderScriptSections(itemId){
  const item=learnItems.find(i=>i.id===itemId); if(!item)return;
  const container=document.getElementById(`sections-${itemId}`); if(!container)return;
  container.innerHTML='';

  const allSections=item.sections||[];
  const sections=allSections.filter(s => s.type !== 'preflight');
  const isRoleplay = sections.some(s => s.role !== undefined && s.role !== null);
  if (isRoleplay) {
    renderRoleplayScriptSections(itemId, container, sections);
    return;
  }

  if(sections.length===0){
    container.innerHTML='<div class="script-empty-hint">No sections yet — load a template or add a section manually.</div>';
  } else {
    sections.forEach((sec,idx)=>{
      const wc=wordCount(sec.text);
      const ph=sec.placeholder||'Write this section…';
      const secIdSafe=String(sec.id).replace('.','_');
      const div=document.createElement('div');
      div.className='script-section fadeIn';
      div.draggable=true;
      div.dataset.secId=sec.id;
      div.addEventListener('dragstart', e=>onDragStart(e,itemId,sec.id));
      div.addEventListener('dragover',  e=>onDragOver(e,itemId,sec.id));
      div.addEventListener('dragleave', e=>onDragLeave(e));
      div.addEventListener('drop',      e=>onDrop(e,itemId,sec.id));
      div.addEventListener('dragend',   e=>onDragEnd(e));
      const emojiMap = {
        '🎯': `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="margin-left:4px;"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`,
        '🧭': `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="margin-left:4px;"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`,
        '🚧': `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="margin-left:4px;"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
        '🧪': `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="margin-left:4px;"><path d="M10 2v7.31L4.75 17c-.77 1.08-.02 2.59 1.31 2.59h11.88c1.33 0 2.08-1.5 1.31-2.59L14 9.31V2h-4z"></path><line x1="8.5" y1="2" x2="15.5" y2="2"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>`,
        '👁️': `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="margin-left:4px;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        '👁': `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="margin-left:4px;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
        '💡': `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="margin-left:4px;"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><line x1="9" y1="18" x2="15" y2="18"></line><line x1="10" y1="22" x2="14" y2="22"></line></svg>`,
        '🎁': `<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" class="inline-svg" style="margin-left:4px;"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>`
      };
      let secIcon = '';
      let displayLabel = sec.label || '';
      for (const [emoji, svg] of Object.entries(emojiMap)) {
        if (displayLabel.startsWith(emoji)) {
          secIcon = svg;
          displayLabel = displayLabel.slice(emoji.length).trim();
          break;
        }
      }
      div.innerHTML=`
        <div class="script-section-head">
          <div class="drag-handle" title="Drag to reorder">
            <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor"><circle cx="4" cy="3" r="1.5"/><circle cx="8" cy="3" r="1.5"/><circle cx="4" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="4" cy="13" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg>
          </div>
          <span class="section-num">${idx+1}</span>
          ${secIcon}
          <input class="section-label-input" value="${esc(displayLabel)}" placeholder="Section name…"
            onchange="updateSectionLabel(${itemId},${sec.id},this.value)"
            oninput="updateSectionLabel(${itemId},${sec.id},this.value)">
          <div class="section-stats">
            <span class="section-wc" id="sec-wc-${itemId}-${secIdSafe}">${wc} words</span>
            <span class="section-dur" id="sec-dur-${itemId}-${secIdSafe}">${wc>0?'~'+formatDur(wc):'—'}</span>
          </div>
          <button class="section-del-btn" onclick="deleteSection(${itemId},${sec.id})" title="Remove section">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <textarea placeholder="${esc(ph)}"
          oninput="updateSectionText(${itemId},${sec.id},this.value)">${esc(sec.text)}</textarea>`;
      container.appendChild(div);
    });
  }

  // total bar
  const totalWc=sections.reduce((a,s)=>a+wordCount(s.text),0);
  const twcEl=document.getElementById(`total-wc-${itemId}`);
  const tdurEl=document.getElementById(`total-dur-${itemId}`);
  if(twcEl) twcEl.textContent=totalWc+' words';
  if(tdurEl) tdurEl.textContent=totalWc>0?'~'+formatDur(totalWc):'—';
}

function renderLearnList(){
  learnItems.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  const list=document.getElementById('learnList'); if (!list) return;
  const filtered=learnFilter==='all'?learnItems:learnItems.filter(i=>i.status===learnFilter);
  if(!filtered.length){
    list.innerHTML=learnItems.length===0
      ?'<div class="learn-empty"><strong>Nothing here yet</strong>Add a topic above to start writing your first script.</div>'
      :'<div class="learn-empty"><strong>No items with this status</strong>Try a different filter.</div>';
    return;
  }
  list.innerHTML='';
  filtered.forEach(item=>{
    if(!item.sections) item.sections=[];
    const hasScript=item.sections.filter(s => s.type !== 'preflight').length>0;
    const isOpen=openScriptIds.has(item.id);
    const totalWc=item.sections.filter(s => s.type !== 'preflight').reduce((a,s)=>a+wordCount(s.text),0);
    const isRoleplay = item.sections.some(s => s.role !== undefined && s.role !== null);
    const inPractice = practiceModes[item.id] || false;

    let toolbarHtml = `<div class="script-toolbar">
      <span class="script-toolbar-label">Template:</span>
      ${Object.entries(TEMPLATES).map(([k,t])=>`<button class="template-btn" onclick="loadTemplate(${item.id},'${k}')">${t.label}</button>`).join('')}`;

    if (isRoleplay) {
      toolbarHtml += `
        <button class="practice-toggle-btn ${inPractice ? 'practicing' : ''}" onclick="toggleRoleplayPractice(${item.id})">
          ${inPractice ? `
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="margin-right:2px;display:inline-block;vertical-align:middle"><path d="M11 5H6a2 2 0 0 0-2 2v11M14 9l3-3-3-3M17 6H9"/></svg>Edit script
          ` : `
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" style="margin-right:2px;display:inline-block;vertical-align:middle"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Practice this roleplay
          `}
        </button>
      `;
    } else {
      toolbarHtml += `
        <button class="add-section-btn" onclick="addSection(${item.id})">
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>Add section
        </button>
      `;
    }
    toolbarHtml += `</div>`;

    const div=document.createElement('div'); div.className='learn-item fadeIn';
    div.innerHTML=`
      <div class="learn-item-top">
        <div class="learn-item-title-wrap" id="title-wrap-${item.id}">
          <div class="learn-item-title" id="title-display-${item.id}">${esc(item.title)}</div>
          <button class="title-edit-btn" onclick="startEditTitle(${item.id})" title="Edit title">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
        </div>
        <div class="learn-item-actions">
          <button class="status-btn ${item.status}" onclick="cycleStatus(${item.id})">${STATUS_LABELS[item.status]}</button>
          <button class="learn-item-del" onclick="deleteLearnItem(${item.id})" title="Remove"><svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg></button>
        </div>
      </div>
      <div class="learn-item-meta">
        <span class="learn-cat-pill">${CAT_LABELS[item.category]||item.category}</span>
        ${hasScript?`<span style="font-size:10px;color:var(--accent);font-weight:600;">${item.sections.filter(s => s.type !== 'preflight').length} ${isRoleplay ? 'lines' : 'sections'} · ${totalWc>0?'~'+formatDur(totalWc):'0 words'}</span>`:''}
        <button class="notes-toggle" id="script-toggle-${item.id}" onclick="toggleScript(${item.id})">${isOpen ? '▲ Hide script' : (hasScript ? '▼ View script' : '▼ Write script')}</button>
      </div>
      <div class="notes-area ${isOpen ? 'open' : ''}" id="script-area-${item.id}">
        ${renderPreflightHtml(item)}
        ${toolbarHtml}
        <div class="script-sections" id="sections-${item.id}"></div>
        <div class="script-total-bar" id="total-bar-${item.id}">
          <span class="script-total-label">${isRoleplay ? 'Combined Total' : 'Total script'}</span>
          <div class="script-total-nums">
            <span class="script-total-wc" id="total-wc-${item.id}">${totalWc} words</span>
            <span class="script-total-dur" id="total-dur-${item.id}">${totalWc>0?'~'+formatDur(totalWc):'—'}</span>
          </div>
        </div>
        <div class="script-export-row">
          <button class="export-btn" onclick="copyScriptToClipboard(${item.id}, this)">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:2px"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy to Clipboard
          </button>
          <button class="export-btn" onclick="exportToWord(${item.id})">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:2px"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Export Word (.doc)
          </button>
          <button class="export-btn" onclick="exportToText(${item.id})">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:middle;margin-right:2px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Export Text (.txt)
          </button>
        </div>
        <div class="notes-hint">Speaking pace: ~130 words/min · ${isRoleplay ? 'Columns sit side-by-side · Switch active role mid-session' : 'Drag <svg style="display:inline;vertical-align:middle" width="10" height="13" viewBox="0 0 12 16" fill="currentColor"><circle cx="4" cy="3" r="1.5"/><circle cx="8" cy="3" r="1.5"/><circle cx="4" cy="8" r="1.5"/><circle cx="8" cy="8" r="1.5"/><circle cx="4" cy="13" r="1.5"/><circle cx="8" cy="13" r="1.5"/></svg> to reorder'} · Auto-saves · Mark <strong>Ready to speak</strong> when done</div>
      </div>`;
    list.appendChild(div);
    renderScriptSections(item.id);
  });
}

function updateLearnStats(){
  const unreadEl = document.getElementById('lsUnread');
  const readEl = document.getElementById('lsRead');
  const readyEl = document.getElementById('lsReady');
  if (unreadEl) unreadEl.textContent=learnItems.filter(i=>i.status==='unread').length;
  if (readEl) readEl.textContent=learnItems.filter(i=>i.status==='read').length;
  if (readyEl) readyEl.textContent=learnItems.filter(i=>i.status==='ready').length;
}

// ── TITLE EDITING ─────────────────────────────────────────────────────────────
function startEditTitle(id){
  const item=learnItems.find(i=>i.id===id); if(!item)return;
  const wrap=document.getElementById('title-wrap-'+id); if(!wrap)return;
  wrap.innerHTML=`
    <input class="title-edit-input" id="title-input-${id}" value="${esc(item.title)}" maxlength="120" />
    <button class="title-edit-btn" onclick="saveEditTitle(${id})" title="Save">
      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
    </button>
    <button class="title-edit-btn" onclick="cancelEditTitle(${id})" title="Cancel">
      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>`;
  const inp=document.getElementById('title-input-'+id);
  inp.focus(); inp.select();
  inp.addEventListener('keydown',e=>{
    if(e.key==='Enter') saveEditTitle(id);
    if(e.key==='Escape') cancelEditTitle(id);
  });
}

async function saveEditTitle(id){
  const item=learnItems.find(i=>i.id===id); if(!item)return;
  const inp=document.getElementById('title-input-'+id); if(!inp)return;
  const val=inp.value.trim();
  if(!val) return;
  
  if (supabaseClient && supabaseUser) {
    try {
      const { error } = await supabaseClient
        .from('learn_items')
        .update({
          title: val,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);
      if (error) throw error;
      item.title = val;
      item.updatedAt = Date.now();
      renderLearnList(); updateLearnStats();
    } catch (e) {
      console.error(e);
    }
  } else {
    item.title = val;
    item.updatedAt = Date.now();
    saveLearn();
    renderLearnList(); updateLearnStats();
  }
}

function cancelEditTitle(id){
  const wrap=document.getElementById('title-wrap-'+id); if(!wrap)return;
  const item=learnItems.find(i=>i.id===id); if(!item)return;
  wrap.innerHTML=`
    <div class="learn-item-title" id="title-display-${id}">${esc(item.title)}</div>
    <button class="title-edit-btn" onclick="startEditTitle(${id})" title="Edit title">
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    </button>`;
}

// ── INITIALIZE PAGE ───────────────────────────────────────────────────────────
function initLearnPage() {
  renderLearnList();
  updateLearnStats();
  const input = document.getElementById('learnInput');
  if (input) {
    input.addEventListener('keydown', e => {
      if(e.key==='Enter') addLearnItem();
    });
  }
}

if (window.yaplabStateReady) {
  initLearnPage();
} else {
  window.addEventListener('yaplabStateReady', initLearnPage);
}
