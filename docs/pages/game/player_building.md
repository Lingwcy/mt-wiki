# 🏗️ 玩家建筑鉴赏

<div class="intro-card">
  <p>这里展示了喵镇服务器中玩家们精心创作的各类建筑作品。每一座建筑都代表着玩家们的创意和热情，展现了喵镇多样化的建筑风格。</p>
  <p>如果你也想在这里展示自己的建筑作品，请联系服务器管理员进行投稿！</p>
</div>

## 优秀建筑作品

<!-- 灯箱模态框 -->
<div id="lightbox" class="lightbox">
  <div class="lightbox-content">
    <span class="lightbox-close">&times;</span>
    <img id="lightbox-img" class="lightbox-img">
    <div class="lightbox-caption" id="lightbox-caption"></div>
  </div>
</div>

<div class="building-grid">
  <!-- 建筑卡片示例1 -->
  <div class="building-card" data-category="fantasy">
    <div class="building-header">
      <h3 class="building-title">喵镇</h3>
      <span class="building-author">作者: <strong>LoverHan5</strong></span>
    </div>
    <div class="building-gallery">
      <div class="gallery-container">
        <div class="gallery-main">
          <img src="https://pic1.imgdb.cn/item/67bd841ad0e0a243d40509b1.png" alt="主视图" class="main-image">
        </div>
        <div class="gallery-thumbs">
          <img src="https://pic1.imgdb.cn/item/67bd841ad0e0a243d40509b1.png" alt="视图1" class="thumb active">
        </div>
      </div>
    </div>
    <div class="building-info">
      <div class="building-coords">坐标: MiaoTown</div>
      <div class="building-desc">
        <p>喵镇VI，一个新的开始！</p>
      </div>
      <div class="building-date">完成时间: 2023年12月10日</div>
    </div>
  </div>
  
  <!-- 建筑卡片示例2 -->
  <div class="building-card" data-category="modern">
    <div class="building-header">
      <h3 class="building-title">百外</h3>
      <span class="building-author">作者: <strong>Fastiks、Heimao2009</strong></span>
    </div>
    <div class="building-gallery">
      <div class="gallery-container">
        <div class="gallery-main">
          <img src="https://pic1.imgdb.cn/item/67f13cd30ba3d5a1d7ede74e.jpg" alt="百外主视图" class="main-image">
        </div>
        <div class="gallery-thumbs">
          <img src="https://pic1.imgdb.cn/item/67f13cd30ba3d5a1d7ede74e.jpg" alt="视图1" class="thumb active">
        </div>
      </div>
    </div>
    <div class="building-info">
      <div class="building-coords">坐标: X: 49149, Y: 87, Z: 51728</div>
      <div class="building-desc">
        <p>玩家还未填写介绍..</p>
      </div>
      <div class="building-date">收录时间: 2024年4月5日</div>
    </div>
  </div>
  
  <!-- 建筑卡片示例3 -->
  <div class="building-card" data-category="traditional">
    <div class="building-header">
      <h3 class="building-title">LingYuXu的领地</h3>
      <span class="building-author">作者: <strong>LingYuXu</strong></span>
    </div>
    <div class="building-gallery">
      <div class="gallery-container">
        <div class="gallery-main">
          <img src="https://pic1.imgdb.cn/item/67f144990ba3d5a1d7edea9d.jpg" alt="主视图" class="main-image">
        </div>
        <div class="gallery-thumbs">
          <img src="https://pic1.imgdb.cn/item/67f144990ba3d5a1d7edea9d.jpg" alt="视图1" class="thumb active">
        </div>
      </div>
    </div>
    <div class="building-info">
      <div class="building-coords">坐标: X: 49273, Y: 70, Z: 52485</div>
      <div class="building-desc">
        <p>玩家还未填写介绍..</p>
      </div>
      <div class="building-date">收录时间: 2024年4月5日</div>
    </div>
  </div>
</div>

## 如何提交您的建筑作品

<div class="submission-guide">
  <ol>
    <li>在游戏中完成您的建筑作品</li>
    <li>截取2-3张精美的建筑截图（不同角度）</li>
    <li>准备建筑的基本信息：标题、坐标、简介</li>
    <li>联系管理员提交您的作品</li>
  </ol>
  
  <div class="submission-note">
    <p>注意：提交的建筑作品需要原创，我们会对建筑进行实地查看确认。每位玩家最多可以展示3个建筑作品。</p>
  </div>
</div>

<script setup>
import { onMounted } from 'vue'

// Only run in client side
onMounted(() => {
  console.log('Script loaded and DOM mounted');
  
  // 切换主图片的函数
  window.changeMainImage = function(thumbEl) {
    console.log('changeMainImage called for', thumbEl.src);
    // 获取所有缩略图和当前画廊的主图片元素
    const galleryContainer = thumbEl.closest('.gallery-container');
    const mainImage = galleryContainer.querySelector('.main-image');
    const thumbs = galleryContainer.querySelectorAll('.thumb');
    
    // 更新主图片
    mainImage.src = thumbEl.src;
    mainImage.alt = thumbEl.alt;
    
    // 更新缩略图激活状态
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbEl.classList.add('active');
  }

  // 添加建筑类型过滤功能
  const filterBtns = document.querySelectorAll('.filter-btn');
  const buildingCards = document.querySelectorAll('.building-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // 更新按钮状态
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // 获取过滤类别
      const filterValue = this.getAttribute('data-filter');
      
      // 显示/隐藏相应的建筑卡片
      buildingCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // 灯箱功能实现
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  // 为主图片添加点击事件，确保一次点击就能达到最大尺寸
  const mainImages = document.querySelectorAll('.main-image');
  mainImages.forEach(img => {
    img.addEventListener('click', function(e) {
      // 打开灯箱并显示图片
      e.stopPropagation(); // 阻止事件冒泡
      
      // 预加载图片以确保获得完整尺寸
      const fullImg = new Image();
      fullImg.onload = function() {
        // 图片加载完成后设置到灯箱
        lightboxImg.src = fullImg.src;
        lightboxImg.style.maxWidth = '100%';
        lightboxImg.style.maxHeight = '80vh';
        lightboxImg.style.width = 'auto';
        lightboxImg.style.height = 'auto';
        
        // 显示灯箱
        lightbox.style.display = 'flex';
      };
      fullImg.src = this.src;
      
      // 设置标题
      lightboxCaption.textContent = this.alt;
      document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
  });
  
  // 直接使用更可靠的方法为缩略图添加点击事件
  function setupThumbnailClicks() {
    console.log('Setting up thumbnail clicks');
    
    // 查找所有缩略图
    const thumbs = document.querySelectorAll('.thumb');
    console.log('Found', thumbs.length, 'thumbnails');
    
    // 为每个缩略图添加点击处理
    thumbs.forEach((thumb, index) => {
      // 移除旧的事件监听器（如果有）
      thumb.removeEventListener('click', thumbnailClickHandler);
      
      // 添加新的事件监听器
      thumb.addEventListener('click', thumbnailClickHandler);
      console.log('Added click handler to thumbnail', index + 1);
    });
  }
  
  // 缩略图点击处理函数
  function thumbnailClickHandler(e) {
    console.log('Thumbnail clicked:', this.src);
    e.preventDefault();
    e.stopPropagation();
    window.changeMainImage(this);
  }
  
  // 首次设置
  setupThumbnailClicks();
  
  // 如果有动态添加的缩略图，可以在需要时重新运行 setupThumbnailClicks()
  
  // 也直接添加内联事件处理 - 备用方法
  document.querySelectorAll('.thumb').forEach(thumb => {
    thumb.onclick = function(e) {
      e.stopPropagation();
      window.changeMainImage(this);
      return false;
    };
  });
  
  // 点击关闭按钮关闭灯箱
  lightboxClose.addEventListener('click', function() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // 恢复背景滚动
  });
  
  // 点击灯箱背景关闭灯箱
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
  
  // 按ESC键关闭灯箱
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
})
</script>

<style>
/* 整体样式 */
.intro-card {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  border-left: 4px solid var(--vp-c-brand);
}

/* 建筑过滤按钮 */
.building-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
}

.filter-btn {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 6px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background-color: var(--vp-c-gray-light-3);
}

.filter-btn.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* 建筑网格布局 */
.building-grid {
  display: grid;
  grid-template-columns: 1fr;  /* 修改为单列布局 */
  gap: 30px;
  margin-bottom: 40px;
  max-width: 900px;  /* 设置最大宽度，使卡片不会过宽 */
  margin-left: auto;  /* 使网格在页面中居中 */
  margin-right: auto;  /* 使网格在页面中居中 */
}

/* 建筑卡片样式 */
.building-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--vp-c-bg-soft);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.building-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.building-header {
  padding: 15px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.building-title {
  margin: 0 0 5px 0;
  font-size: 1.3rem;
  color: var(--vp-c-brand);
}

.building-author {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

/* 图片画廊样式 */
.building-gallery {
  position: relative;
  overflow: hidden;
}

.gallery-container {
  width: 100%;
}

.gallery-main {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-image:hover {
  transform: scale(1.05);
}

.gallery-thumbs {
  display: flex;
  gap: 8px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.05);
}

.thumb {
  width: 60px;
  height: 40px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.thumb:hover {
  transform: translateY(-2px);
}

.thumb.active {
  border-color: var(--vp-c-brand);
}

/* 建筑信息样式 */
.building-info {
  padding: 15px;
}

.building-coords {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: var(--vp-c-bg);
  border-radius: 4px;
  display: inline-block;
}

.building-desc {
  margin-bottom: 15px;
  line-height: 1.5;
}

.building-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

/* 提交指南样式 */
.submission-guide {
  background-color: var(--vp-c-bg-soft);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.submission-guide ol {
  padding-left: 20px;
}

.submission-guide li {
  margin-bottom: 10px;
}

.submission-note {
  margin-top: 15px;
  padding: 10px;
  background-color: var(--vp-c-warning-soft);
  border-left: 3px solid var(--vp-c-warning);
  border-radius: 4px;
}

/* 灯箱样式 */
.lightbox {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.lightbox-content {
  position: relative;
  max-width: 85%; /* 增加最大宽度比例 */
  max-height: 90%;
  margin: 0 auto; /* 确保内容居中 */
  animation: zoom 0.25s ease-out;
  /* 对于VitePress侧边栏，添加合适的左侧补偿 */
  margin-left: min(calc(var(--vp-sidebar-width, 12%) / 2), 150px);
  /* 增加灯箱内容区的最小宽度 */
  min-width: 50%;
}

@keyframes zoom {
  from {transform: scale(0.5); opacity: 0.8;}
  to {transform: scale(1); opacity: 1;}
}

.lightbox-img {
  display: block;
  max-width: 100%;
  max-height: 85vh; /* 增加最大高度比例 */
  width: auto;
  height: auto;
  object-fit: contain;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

/* 响应式调整，在小屏幕上不需要边距 */
@media (max-width: 960px) {
  .lightbox-content {
    margin-left: auto;
    max-width: 90%;
  }
}

/* 添加指针样式，提示图片可点击 */
.main-image, .thumb {
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .building-grid {
    grid-template-columns: 1fr;
  }
  
  .gallery-main {
    height: 180px;
  }
  
  .filter-btn {
    font-size: 0.8rem;
    padding: 5px 12px;
  }
}
</style>
