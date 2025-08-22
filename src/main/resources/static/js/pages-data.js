// 페이지 데이터 관리 모듈
// 페이지 관리와 메뉴 접근권한에서 공유하는 데이터

let pagesData = {
    'home': {
        id: 'home',
        name: '메인 페이지',
        url: '/index.html',
        level: 'public',
        category: '메인',
        lastModified: '2025-08-21'
    },
    'dashboard': {
        id: 'dashboard', 
        name: '대시보드',
        url: '/dashboard.html',
        level: 'user',
        category: '분석',
        lastModified: '2025-08-22'
    },
    'analysis': {
        id: 'analysis',
        name: '주식 분석',
        url: '/analysis.html', 
        level: 'user',
        category: '분석',
        lastModified: '2025-08-22'
    },
    'portfolio': {
        id: 'portfolio',
        name: '포트폴리오',
        url: '/portfolio.html',
        level: 'user', 
        category: '관리',
        lastModified: '2025-08-22'
    },
    'ai': {
        id: 'ai',
        name: 'AI 예측',
        url: '/ai-prediction.html',
        level: 'user',
        category: 'AI',
        lastModified: '2025-08-22'
    },
    'settings': {
        id: 'settings',
        name: '설정 개요',
        url: '/settings-overview.html',
        level: 'admin',
        category: '관리',
        lastModified: '2025-08-22'
    },
    'users': {
        id: 'users',
        name: '회원 관리',
        url: '/user-management.html',
        level: 'admin',
        category: '사용자 관리',
        lastModified: '2025-08-22'
    },
    'pages': {
        id: 'pages',
        name: '페이지 관리',
        url: '/page-management.html',
        level: 'admin',
        category: '관리',
        lastModified: '2025-08-22'
    },
    'logs': {
        id: 'logs',
        name: '로그 관리',
        url: '/log-management.html',
        level: 'admin',
        category: '로그',
        lastModified: '2025-08-22'
    },
    'permissions': {
        id: 'permissions',
        name: '메뉴 접근권한',
        url: '/menu-permissions.html',
        level: 'admin',
        category: '권한 관리',
        lastModified: '2025-08-22'
    },
    'codes': {
        id: 'codes',
        name: '코드 관리',
        url: '/code-management.html',
        level: 'admin',
        category: '코드 관리',
        lastModified: '2025-08-22'
    }
};

// 페이지 데이터 조회 함수들
function getPagesData() {
    return pagesData;
}

function getPageById(pageId) {
    return pagesData[pageId];
}

function getAllPageIds() {
    return Object.keys(pagesData);
}

function getPagesByLevel(level) {
    return Object.values(pagesData).filter(page => page.level === level);
}

// 페이지 데이터 수정 함수들
function addPage(pageData) {
    if (pagesData[pageData.id]) {
        return false; // 이미 존재하는 ID
    }
    pagesData[pageData.id] = pageData;
    
    // 메뉴 접근권한 페이지의 데이터도 업데이트
    updateMenuPermissionsData();
    return true;
}

function updatePage(pageId, pageData) {
    if (pagesData[pageId]) {
        pagesData[pageId] = pageData;
        
        // 메뉴 접근권한 페이지의 데이터도 업데이트
        updateMenuPermissionsData();
        return true;
    }
    return false;
}

function removePage(pageId) {
    if (pagesData[pageId]) {
        delete pagesData[pageId];
        
        // 메뉴 접근권한 페이지의 데이터도 업데이트
        updateMenuPermissionsData();
        return true;
    }
    return false;
}

// 메뉴 접근권한 연동 함수
function updateMenuPermissionsData() {
    // 메뉴 접근권한 페이지가 로드되어 있다면 업데이트
    if (typeof window.refreshPermissionsPage === 'function') {
        window.refreshPermissionsPage();
    }
}

// 페이지 정보를 권한 관리용 형태로 변환
function getPagesForPermissions() {
    return Object.values(pagesData).map(page => ({
        id: page.id,
        name: page.name,
        category: page.category
    }));
}

// 로컬 스토리지에 데이터 저장/로드 (선택사항)
function savePagesToStorage() {
    try {
        localStorage.setItem('stockai_pages_data', JSON.stringify(pagesData));
    } catch (error) {
        console.warn('Failed to save pages data to localStorage:', error);
    }
}

function loadPagesFromStorage() {
    try {
        const stored = localStorage.getItem('stockai_pages_data');
        if (stored) {
            const loadedData = JSON.parse(stored);
            // 기본 데이터와 병합
            pagesData = { ...pagesData, ...loadedData };
        }
    } catch (error) {
        console.warn('Failed to load pages data from localStorage:', error);
    }
}

// 페이지 로드 시 로컬 스토리지에서 데이터 로드
document.addEventListener('DOMContentLoaded', function() {
    loadPagesFromStorage();
});

// 창이 닫힐 때 데이터 저장
window.addEventListener('beforeunload', function() {
    savePagesToStorage();
});