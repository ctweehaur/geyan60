// 自动合并所有独立引入的 motto 数据源
const allMottos = [
    ...(typeof data1 !== 'undefined' ? data1 : []),
    ...(typeof data2 !== 'undefined' ? data2 : []),
    ...(typeof data3 !== 'undefined' ? data3 : []),
    ...(typeof data4 !== 'undefined' ? data4 : []),
    ...(typeof data5 !== 'undefined' ? data5 : []),
    ...(typeof data6 !== 'undefined' ? data6 : []),
    ...(typeof data7 !== 'undefined' ? data7 : []),
    ...(typeof data8 !== 'undefined' ? data8 : []),
    ...(typeof data9 !== 'undefined' ? data9 : []),
    ...(typeof data10 !== 'undefined' ? data10 : []),
    ...(typeof data11 !== 'undefined' ? data11 : []),
    ...(typeof data12 !== 'undefined' ? data12 : []),
    ...(typeof data13 !== 'undefined' ? data13 : [])
];

let currentPlan = [];       
let currentIndex = 0;       
let isFlipped = false;      
let isWeaknessMode = false;  
let activeCategory = '全部'; 

let quizQuestions = [];     
let quizCurrentIndex = 0;   
let quizScore = 0;          
const QUIZ_TOTAL = 10;      

function generateRubyMarkup(text, pinyinStr) {
    const cleanChars = text ? text.replace(/[，。；：！？、]/g, '').split('') : [];
    const pinyins = pinyinStr ? pinyinStr.split(' ') : [];
    
    let html = '';
    let pyIdx = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/[，。；：！？、]/.test(char)) {
            html += `<span class="mx-0.5 text-stone-400">${char}</span>`;
        } else {
            const py = pinyins[pyIdx] || '';
            html += `<ruby class="mx-0.5 sm:mx-1">${char}<rt>${py}</rt></ruby>`;
            pyIdx++;
        }
    }
    return html;
}

function initApp() {
    try {
        let wrongList = JSON.parse(localStorage.getItem('minju_wrong_list')) || [];
        updateWeaknessButton(wrongList.length);

        updateAvailableButtons(); // <-- 新增：初始化时更新字母按钮状态
        filterCategoryData();
        setupFlipEvent();
        renderCard();
        updateMasteryProgress();
    } catch (error) {
        console.error("初始化加载错误:", error);
    }
}

function filterCategoryData() {
    if (activeCategory === '全部') {
        currentPlan = [...allMottos];
    } else {
        currentPlan = allMottos.filter(item => item.pinyin_key === activeCategory);
    }
    currentIndex = 0;
}

function renderCard() {
    if (currentPlan.length === 0) {
        showEmptyState();
        return;
    }
    if (currentIndex >= currentPlan.length) { currentIndex = 0; }

    const currentItem = currentPlan[currentIndex];
    const flipCardEl = document.getElementById('flip-card');
    if (flipCardEl) flipCardEl.classList.remove('rotate-y-180');
    isFlipped = false;

    const rubyContainer = document.getElementById('card-idiom-ruby');
    if (rubyContainer) {
        rubyContainer.innerHTML = generateRubyMarkup(currentItem.text, currentItem.pinyin);
    }

    document.getElementById('card-def-zh').innerText = currentItem.meaning || '暂无释义';
    document.getElementById('card-def-en').innerText = currentItem.en || 'No translation available.';
    document.getElementById('card-def-bm').innerText = currentItem.bm || 'Tiada terjemahan.';
    
    const exampleEl = document.getElementById('card-example');
    if (exampleEl) {
        const textContent = currentItem.text || '';
        let exampleText = currentItem.example || '暂无例句。';
        if (textContent && exampleText.includes(textContent)) {
            exampleText = exampleText.replace(textContent, ` ______ `);
        }
        exampleEl.innerText = exampleText;
    }

    const progressEl = document.getElementById('progress-indicator');
    if (progressEl) {
        progressEl.innerText = `进度：${currentIndex + 1} / ${currentPlan.length} ${isWeaknessMode ? '（错题训练中）' : ''}`;
    }
}

function setupFlipEvent() {
    const container = document.getElementById('card-container');
    const flipCardEl = document.getElementById('flip-card');
    if (container && flipCardEl) {
        container.onclick = null;
        container.onclick = function() {
            isFlipped = !isFlipped;
            flipCardEl.classList.toggle('rotate-y-180', isFlipped);
        };
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-stone-800 text-white' : 'bg-red-50 border border-red-200 text-red-800';
    toast.className = `${bgClass} px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 animate-bounce pointer-events-auto transition-all duration-300`;
    toast.innerHTML = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => { toast.remove(); }, 300);
    }, 2500);
}

function updateMasteryProgress() {
    let wrongList = JSON.parse(localStorage.getItem('minju_wrong_list')) || [];
    const totalWords = allMottos.length;
    const wrongCount = wrongList.length;
    const masteredCount = Math.max(0, totalWords - wrongCount);
    
    const percent = totalWords > 0 ? Math.round((masteredCount / totalWords) * 100) : 0;
    
    const bar = document.getElementById('mastery-progress-bar');
    if (bar) bar.style.width = `${percent}%`;
    
    const txt = document.getElementById('mastery-status');
    if (txt) txt.innerText = `已掌握 ${masteredCount} / ${totalWords} 词 (${percent}%)`;
}

function markMastery(isMastered) {
    if (currentPlan.length === 0) return;
    const currentItem = currentPlan[currentIndex];
    let wrongList = JSON.parse(localStorage.getItem('minju_wrong_list')) || [];

    if (!isMastered) {
        if (!wrongList.some(item => item.id === currentItem.id)) { wrongList.push(currentItem); }
        showToast("📌 已加入待加强训练库");
    } else {
        wrongList = wrongList.filter(item => item.id !== currentItem.id);
        showToast("🎉 太棒了，这个名句已经熟练掌握！");
    }

    localStorage.setItem('minju_wrong_list', JSON.stringify(wrongList));
    updateWeaknessButton(wrongList.length);
    updateMasteryProgress();
    currentIndex++;
    
    if (currentIndex >= currentPlan.length) {
        if (isWeaknessMode) {
            showToast("👑 太棒了！本轮错题专项集训全部通关！");
            isWeaknessMode = false;
            filterCategory('全部');
            return;
        } else {
            showToast("🌟 该类目的名句已全部通读完毕！");
            currentIndex = 0; 
        }
    }
    renderCard();
}

function startWeaknessTraining() {
    const wrongList = JSON.parse(localStorage.getItem('minju_wrong_list')) || [];
    if (wrongList.length === 0) {
        showToast("✨ 极好！当前没有任何待加强的错词！");
        return;
    }
    isWeaknessMode = true;
    currentPlan = [...wrongList].sort(() => 0.5 - Math.random()); 
    currentIndex = 0;
    renderCard();
}

function filterCategory(categoryName) {
    isWeaknessMode = false;
    activeCategory = categoryName;

    const buttons = document.querySelectorAll('#filterNav button');
    buttons.forEach(btn => {
        // 跳过被禁用的按钮，防止样式覆盖干扰
        if (btn.disabled) return; 

        if (btn.innerText.includes(categoryName)) {
            btn.classList.add('bg-stone-800', 'text-white', 'border-stone-800');
            btn.classList.remove('bg-white', 'text-stone-600', 'border-stone-200');
        } else {
            btn.classList.remove('bg-stone-800', 'text-white', 'border-stone-800');
            btn.classList.add('bg-white', 'text-stone-600', 'border-stone-200');
        }
    });

    filterCategoryData();
    renderCard();
}

function updateWeaknessButton(count) {
    const btn = document.querySelector('button[onclick="startWeaknessTraining()"]');
    if (btn) btn.innerHTML = `🎯 错题训练 (<span class="text-amber-600 font-bold">${count}</span>)`;
}

function showEmptyState() {
    const rubyContainer = document.getElementById('card-idiom-ruby');
    if (rubyContainer) rubyContainer.innerHTML = `<span class="text-base text-stone-400">该类目下暂无名句数据</span>`;
}

function startQuiz() {
    const quizSource = currentPlan;

    if (!quizSource || quizSource.length === 0) {
        showToast("⚠️ 当前选中的类目下暂无名句，无法开始测验！", "error");
        return;
    }
    if (allMottos.length < 4) {
        showToast("⚠️ 全库名句总数少于4个，无法生成选择干扰项！", "error");
        return;
    }

    document.getElementById('quiz-question-container').classList.remove('hidden');
    document.getElementById('quiz-result-container').classList.add('hidden');

    const titleText = isWeaknessMode ? "错题本挑战" : `首字母 [${activeCategory}] 专项挑战`;
    document.getElementById('quiz-title-text').innerText = `🎯 ${titleText}`;

    const shuffled = [...quizSource].sort(() => 0.5 - Math.random());
    const actualTotal = Math.min(QUIZ_TOTAL, quizSource.length);
    quizQuestions = shuffled.slice(0, actualTotal);
    
    quizQuestions = quizQuestions.map(q => {
        return {
            ...q,
            qType: Math.floor(Math.random() * 3)
        };
    });

    quizCurrentIndex = 0;
    quizScore = 0;

    document.getElementById('quiz-modal').classList.remove('hidden');
    renderQuizQuestion();
}

// 检查数据并动态更新字母按钮状态（无数据则置灰且无法点击）
function updateAvailableButtons() {
    // 提取出当前全库里存在的所有首字母
    const existingKeys = new Set(allMottos.map(item => item.pinyin_key));
    // 获取筛选栏内所有附带 data-letter 属性的按钮
    const buttons = document.querySelectorAll('#filterNav button[data-letter]');

    buttons.forEach(btn => {
        const letter = btn.getAttribute('data-letter');

        if (existingKeys.has(letter)) {
            // 有对应的数据，正常激活状态
            btn.disabled = false;
            btn.classList.remove('opacity-30', 'cursor-not-allowed', 'bg-stone-100', 'text-stone-400');
            btn.classList.add('bg-white', 'text-stone-600', 'border-stone-200');
        } else {
            // 没有对应的数据，按钮置灰且彻底停用
            btn.disabled = true;
            btn.classList.remove('bg-white', 'text-stone-600', 'hover:border-stone-400', 'hover:bg-stone-50');
            btn.classList.add('opacity-30', 'cursor-not-allowed', 'bg-stone-100', 'text-stone-400', 'border-stone-200');
        }
    });
}

function closeQuiz() {
    document.getElementById('quiz-modal').classList.add('hidden');
}

function renderQuizQuestion() {
    const currentQ = quizQuestions[quizCurrentIndex];
    
    document.getElementById('quiz-q-num').innerText = `题目 ${quizCurrentIndex + 1} / ${quizQuestions.length}`;
    const percent = ((quizCurrentIndex) / quizQuestions.length) * 100;
    document.getElementById('quiz-progress-bar').style.width = `${percent}%`;

    const questionWordEl = document.getElementById('quiz-question-word');

    const distractors = allMottos
        .filter(item => item.id !== currentQ.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    const options = [currentQ, ...distractors].sort(() => 0.5 - Math.random());
    const optionsContainer = document.getElementById('quiz-options');

    if (currentQ.qType === 0) {
        questionWordEl.innerHTML = `<span class="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-sans font-medium">看句猜意</span><br>${currentQ.text}`;
        
        optionsContainer.innerHTML = options.map(opt => {
            const isCorrect = (opt.id === currentQ.id);
            return `
                <button onclick="handleQuizAnswer(this, ${isCorrect})" class="w-full text-left p-3.5 rounded-xl border-2 border-stone-100 hover:border-amber-400 hover:bg-amber-50/50 transition-all font-sans text-stone-700 text-sm leading-relaxed">
                    ${opt.meaning}
                </button>
            `;
        }).join('');

    } else if (currentQ.qType === 1) {
        questionWordEl.innerHTML = `<span class="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-sans font-medium block w-max mx-auto mb-2">根据释义选名句</span><p class="text-sm font-medium font-sans px-4 text-stone-700 leading-relaxed text-left">${currentQ.meaning}</p>`;
        
        optionsContainer.innerHTML = options.map(opt => {
            const isCorrect = (opt.id === currentQ.id);
            return `
                <button onclick="handleQuizAnswer(this, ${isCorrect})" class="w-full text-center p-3.5 rounded-xl border-2 border-stone-100 hover:border-amber-400 hover:bg-amber-50/50 transition-all font-serif font-bold text-stone-800 text-sm">
                    ${opt.text}
                </button>
            `;
        }).join('');

    } else if (currentQ.qType === 2) {
        let exampleText = currentQ.example || '暂无例句。';
        if (currentQ.text && exampleText.includes(currentQ.text)) {
            exampleText = exampleText.replace(currentQ.text, ` ______ `);
        }
        
        questionWordEl.innerHTML = `<span class="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-sans font-medium block w-max mx-auto mb-2">语境填空</span><p class="text-sm font-normal font-sans px-4 text-stone-700 leading-relaxed text-left">${exampleText}</p>`;
        
        optionsContainer.innerHTML = options.map(opt => {
            const isCorrect = (opt.id === currentQ.id);
            return `
                <button onclick="handleQuizAnswer(this, ${isCorrect})" class="w-full text-center p-3.5 rounded-xl border-2 border-stone-100 hover:border-amber-400 hover:bg-amber-50/50 transition-all font-serif font-bold text-stone-800 text-sm">
                    ${opt.text}
                </button>
            `;
        }).join('');
    }
}

function handleQuizAnswer(buttonEl, isCorrect) {
    const allButtons = document.getElementById('quiz-options').querySelectorAll('button');
    allButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        quizScore++;
        buttonEl.classList.remove('border-stone-100', 'hover:border-amber-400');
        buttonEl.classList.add('border-green-500', 'bg-green-50/60', 'text-green-800');
    } else {
        buttonEl.classList.remove('border-stone-100', 'hover:border-amber-400');
        buttonEl.classList.add('border-red-500', 'bg-red-50/60', 'text-red-800');
        
        allButtons.forEach(btn => {
            if (btn.getAttribute('onclick').includes('true')) {
                btn.classList.add('border-green-500', 'bg-green-50/40');
            }
        });

        let wrongList = JSON.parse(localStorage.getItem('minju_wrong_list')) || [];
        const currentQ = quizQuestions[quizCurrentIndex];
        if (!wrongList.some(item => item.id === currentQ.id)) {
            wrongList.push(currentQ);
            localStorage.setItem('minju_wrong_list', JSON.stringify(wrongList));
            updateWeaknessButton(wrongList.length);
            updateMasteryProgress();
        }
    }

    setTimeout(() => {
        quizCurrentIndex++;
        if (quizCurrentIndex < quizQuestions.length) {
            renderQuizQuestion();
        } else {
            showQuizResults();
        }
    }, 1200);
}

function showQuizResults() {
    document.getElementById('quiz-progress-bar').style.width = `100%`;
    document.getElementById('quiz-question-container').classList.add('hidden');
    document.getElementById('quiz-result-container').classList.remove('hidden');

    document.getElementById('quiz-score').innerText = `${quizScore} / ${quizQuestions.length}`;
    
    let evaluation = "再接再厉，多刷刷闪卡吧！";
    if (quizScore === quizQuestions.length) {
        evaluation = "👑 太厉害了！满分通关！";
    } else if (quizScore >= Math.floor(quizQuestions.length * 0.8)) {
        evaluation = "🌟 优秀！底子非常扎实！";
    } else if (quizScore >= Math.floor(quizQuestions.length * 0.6)) {
        evaluation = "👍 及格啦，答错的词已经自动帮你放入错题库啰！";
    }
    document.getElementById('quiz-eval').innerText = evaluation;
}

window.onload = function() {
    initApp();
    filterCategory('全部');
};
