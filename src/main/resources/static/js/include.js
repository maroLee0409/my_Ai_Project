// HTML Include 함수
function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    
    elements.forEach(async (element) => {
        const file = element.getAttribute('data-include');
        if (file) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const html = await response.text();
                    element.innerHTML = html;
                    element.removeAttribute('data-include');
                    
                    // 네비게이션이 로드된 후 이벤트 리스너 재등록
                    if (file.includes('navigation.html')) {
                        initializeNavigation();
                    }
                } else {
                    element.innerHTML = `<p>Error loading ${file}</p>`;
                }
            } catch (error) {
                element.innerHTML = `<p>Error loading ${file}: ${error.message}</p>`;
            }
        }
    });
}

// 네비게이션 이벤트 리스너 초기화
function initializeNavigation() {
    // 로그인 상태 관리
    let isLoggedIn = false;

    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const loginSection = document.getElementById('loginSection');
    const userSection = document.getElementById('userSection');
    const username = document.getElementById('username');

    if (!loginBtn || !logoutBtn || !settingsBtn) return;

    // 로그인 버튼 클릭
    loginBtn.addEventListener('click', function() {
        isLoggedIn = true;
        username.textContent = '홍길동님';
        updateUIBasedOnLoginStatus();
        showToast('로그인에 성공했습니다!', 'success');
    });

    // 로그아웃 버튼 클릭
    logoutBtn.addEventListener('click', function() {
        isLoggedIn = false;
        updateUIBasedOnLoginStatus();
        showToast('로그아웃되었습니다.', 'info');
    });

    // 설정 드롭다운 관련 요소들
    const settingsDropdown = document.getElementById('settingsDropdown');
    const profileEditBtn = document.getElementById('profileEditBtn');
    const settingsMenuBtn = document.getElementById('settingsMenuBtn');

    // 설정 버튼 클릭 - 드롭다운 토글
    settingsBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // 이벤트 버블링 방지
        toggleSettingsDropdown();
    });

    // 드롭다운 토글 함수
    function toggleSettingsDropdown() {
        if (settingsDropdown) {
            settingsDropdown.classList.toggle('hidden');
        }
    }

    // 회원정보 수정 버튼 클릭
    if (profileEditBtn) {
        profileEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideSettingsDropdown();
            showToast('회원정보 수정 페이지로 이동합니다!', 'info');
        });
    }

    // 설정하기 버튼 클릭
    if (settingsMenuBtn) {
        settingsMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideSettingsDropdown();
            showToast('설정 페이지로 이동합니다!', 'info');
        });
    }

    // 드롭다운 숨기기 함수
    function hideSettingsDropdown() {
        if (settingsDropdown) {
            settingsDropdown.classList.add('hidden');
        }
    }

    // 문서 클릭 시 드롭다운 닫기
    document.addEventListener('click', function(e) {
        if (settingsDropdown && !settingsDropdown.contains(e.target) && !settingsBtn.contains(e.target)) {
            hideSettingsDropdown();
        }
    });

    // UI 업데이트 함수
    function updateUIBasedOnLoginStatus() {
        if (isLoggedIn) {
            loginSection.classList.add('hidden');
            userSection.classList.remove('hidden');
        } else {
            loginSection.classList.remove('hidden');
            userSection.classList.add('hidden');
        }
    }
}

// Toast 메시지 함수
function showToast(message, type = 'info', duration = 3000) {
    const toastContainer = document.getElementById('toastContainer');
    
    // Toast 요소 생성
    const toast = document.createElement('div');
    toast.className = `transform transition-all duration-300 ease-in-out translate-x-full opacity-0`;
    
    // 타입별 스타일 설정
    let bgColor, textColor, icon;
    switch(type) {
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            icon = '✅';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            icon = '❌';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            textColor = 'text-white';
            icon = '⚠️';
            break;
        default:
            bgColor = 'bg-blue-500';
            textColor = 'text-white';
            icon = 'ℹ️';
    }
    
    toast.innerHTML = `
        <div class="${bgColor} ${textColor} px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 min-w-80">
            <span class="text-lg">${icon}</span>
            <span class="font-medium">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-xl hover:opacity-75">
                ×
            </button>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // 애니메이션으로 표시
    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
        toast.classList.add('translate-x-0', 'opacity-100');
    }, 100);
    
    // 자동 제거
    setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, duration);
}

// 페이지 로드 시 HTML include 실행
document.addEventListener('DOMContentLoaded', includeHTML);