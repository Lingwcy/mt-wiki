/**
 * 管理员详情模态框功能
 * 用于显示管理员的详细信息
 */

(function() {
  // 确保脚本在页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // 确保在单页应用路由变化时也能重新初始化
  window.addEventListener('hashchange', init);
  
  function init() {
    console.log('Team details script initializing...');
    setTimeout(initTeamDetails, 500); // 延迟执行，确保DOM已完全渲染
  }

  // 初始化团队详情功能
  function initTeamDetails() {
    console.log('Setting up team details...');
    
    // 查找按钮和模态框
    const detailBtns = document.querySelectorAll('.team-details-btn');
    const modal = document.getElementById('team-modal');
    
    // 检查是否找到元素
    console.log('Detail buttons found:', detailBtns.length);
    console.log('Modal found:', !!modal);
    
    if (detailBtns.length === 0 || !modal) {
      console.log('Required elements not found, setting up observer...');
      setupMutationObserver();
      return;
    }
    
    setupModalEvents();
  }
  
  // 设置DOM监视器，等待元素出现
  function setupMutationObserver() {
    const observer = new MutationObserver((mutations, obs) => {
      const detailBtns = document.querySelectorAll('.team-details-btn');
      const modal = document.getElementById('team-modal');
      
      if (detailBtns.length > 0 && modal) {
        console.log('Elements found via MutationObserver');
        setupModalEvents();
        obs.disconnect(); // 停止观察
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // 设置模态框事件
  function setupModalEvents() {
    // 获取模态框元素
    const modal = document.getElementById('team-modal');
    const modalBody = document.getElementById('team-modal-body');
    const closeBtn = document.querySelector('.team-modal-close');
    const detailBtns = document.querySelectorAll('.team-details-btn');
    const detailTemplate = document.getElementById('team-detail-template');
    
    if (!modal || !modalBody || !detailTemplate) {
      console.error('Could not find required modal elements');
      return;
    }
    
    // 点击"了解详细"按钮打开模态框
    detailBtns.forEach(btn => {
      // 移除之前可能存在的事件监听器
      btn.removeEventListener('click', handleButtonClick);
      // 添加新的事件监听器
      btn.addEventListener('click', handleButtonClick);
      console.log('Added click event to button:', btn);
    });
    
    function handleButtonClick() {
      const memberId = this.getAttribute('data-member-id');
      console.log('Button clicked for member:', memberId);
      
      const memberDetails = detailTemplate.querySelector(`#${memberId}-details`);
      
      if (memberDetails) {
        modalBody.innerHTML = ''; // 清空之前的内容
        modalBody.appendChild(memberDetails.cloneNode(true));
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
        console.log('Modal opened');
      } else {
        console.error('Member details not found for ID:', memberId);
      }
    }
    
    // 点击关闭按钮关闭模态框
    if (closeBtn) {
      closeBtn.removeEventListener('click', closeModalHandler);
      closeBtn.addEventListener('click', closeModalHandler);
    }
    
    // 点击模态框外部关闭
    window.removeEventListener('click', windowClickHandler);
    window.addEventListener('click', windowClickHandler);
    
    // 按ESC键关闭模态框
    document.removeEventListener('keydown', keydownHandler);
    document.addEventListener('keydown', keydownHandler);
    
    function closeModalHandler() {
      closeModal(modal);
    }
    
    function windowClickHandler(event) {
      if (event.target === modal) {
        closeModal(modal);
      }
    }
    
    function keydownHandler(e) {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal(modal);
      }
    }
  }
  
  // 关闭模态框
  function closeModal(modal) {
    console.log('Closing modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
})();
