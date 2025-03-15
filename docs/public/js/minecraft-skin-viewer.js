/**
 * Minecraft 皮肤查看器工具
 * 用于在网站中显示 Minecraft 玩家皮肤模型
 */

(function() {
  // Use IIFE to avoid polluting global scope
  class MinecraftSkinViewer {
    constructor() {
      this.skinViewers = [];
      this.initialized = false;
    }

    /**
     * 初始化皮肤查看器
     */
    initialize() {
      if (this.initialized) return;
      
      // 加载 skinview3d 库
      this.loadSkinViewLibrary().then(() => {
        // 页面内容变化时重新检查
        this.setupMutationObserver();
        
        // 等待DOM完全加载后执行
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => {
            this.initWhenReady();
          });
        } else {
          // DOM已加载完成，直接执行
          this.initWhenReady();
        }
        
        this.initialized = true;
      }).catch(error => {
        console.error('Failed to load skinview3d library:', error);
      });
    }
    
    /**
     * 当DOM准备好时初始化
     */
    initWhenReady() {
      // 延迟执行以确保VitePress已完成渲染
      setTimeout(() => {
        this.bindViewToggleButtons();
        this.showStaticView();
      }, 500);
    }
    
    /**
     * 设置MutationObserver来监听DOM变化
     * 这有助于在VitePress路由变化时重新初始化
     */
    setupMutationObserver() {
      // 监听页面内容变化
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList' && 
              document.getElementById('staticViewBtn') && 
              !document.getElementById('staticViewBtn').hasAttribute('data-initialized')) {
            this.bindViewToggleButtons();
            this.showStaticView();
            break;
          }
        }
      });
      
      // 监听VitePress内容容器的变化
      const target = document.querySelector('main') || document.body;
      observer.observe(target, { childList: true, subtree: true });
    }
    
    /**
     * 动态加载 skinview3d 库
     */
    loadSkinViewLibrary() {
      return new Promise((resolve, reject) => {
        // 检查是否已经加载
        if (window.skinview3d) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/skinview3d@3.0.0-alpha.1/dist/skinview3d.min.js';
        script.type = 'text/javascript'; // Ensure correct MIME type
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load skinview3d'));
        document.head.appendChild(script);
      });
    }
    
    /**
     * 绑定视图切换按钮事件
     */
    bindViewToggleButtons() {
      const staticViewBtn = document.getElementById('staticViewBtn');
      const threeDViewBtn = document.getElementById('3dViewBtn');
      
      if (staticViewBtn && threeDViewBtn) {
        // 防止重复绑定事件
        if (staticViewBtn.hasAttribute('data-initialized')) return;
        
        staticViewBtn.setAttribute('data-initialized', 'true');
        threeDViewBtn.setAttribute('data-initialized', 'true');
        
        staticViewBtn.addEventListener('click', () => this.showStaticView());
        threeDViewBtn.addEventListener('click', () => this.show3DView());
      }
    }
    
    /**
     * 显示静态皮肤视图
     */
    showStaticView() {
      const staticViewBtn = document.getElementById('staticViewBtn');
      const threeDViewBtn = document.getElementById('3dViewBtn');
      const staticSkins = document.querySelectorAll('.static-skin');
      const skin3DContainers = document.querySelectorAll('.skin-3d-container');
      
      staticViewBtn.classList.add('active');
      threeDViewBtn.classList.remove('active');
      
      staticSkins.forEach(skin => {
        skin.style.display = 'block';
      });
      
      skin3DContainers.forEach(container => {
        container.style.display = 'none';
      });
    }
    
    /**
     * 显示3D皮肤视图
     */
    show3DView() {
      const staticViewBtn = document.getElementById('staticViewBtn');
      const threeDViewBtn = document.getElementById('3dViewBtn');
      const staticSkins = document.querySelectorAll('.static-skin');
      const skin3DContainers = document.querySelectorAll('.skin-3d-container');
      
      staticViewBtn.classList.remove('active');
      threeDViewBtn.classList.add('active');
      
      staticSkins.forEach(skin => {
        skin.style.display = 'none';
      });
      
      skin3DContainers.forEach(container => {
        container.style.display = 'block';
      });
      
      // 初始化3D皮肤查看器
      this.initSkinViewers();
    }
    
    /**
     * 初始化所有3D皮肤查看器
     */
    initSkinViewers() {
      // 确保skinview3d已加载
      if (!window.skinview3d) {
        console.error('skinview3d library not loaded');
        return;
      }
      
      // 清除旧的查看器
      this.skinViewers.forEach(viewer => viewer.dispose());
      this.skinViewers = [];
      
      // 获取所有皮肤容器
      const containers = document.querySelectorAll('.skin-3d-container');
      
      containers.forEach(container => {
        const username = container.getAttribute('data-username');
        if(!username) return;
        
        try {
          // 创建皮肤查看器
          const skinViewer = new skinview3d.SkinViewer({
            domElement: container,
            width: 100,
            height: 200,
            skin: `https://minotar.net/skin/${username}`,
            cape: `https://minotar.net/cape/${username}`,
            model: "auto"
          });
          
          // 设置相机位置和控制
          skinViewer.camera.position.z = 70;
          skinViewer.controls.enableRotate = true;
          skinViewer.controls.enableZoom = true;
          
          // 添加行走动画和更多动画效果
          const walk = skinViewer.animations.add(skinview3d.WalkingAnimation);
          walk.speed = 0.6;
          
          // 添加挥手动画，交替播放
          const wave = skinViewer.animations.add(skinview3d.WavingRightArmAnimation);
          wave.speed = 0.8;
          
          // 添加鼠标悬停效果
          container.addEventListener('mouseenter', () => {
            walk.speed = 1.0;
            wave.paused = false;
          });
          
          container.addEventListener('mouseleave', () => {
            walk.speed = 0.6;
            wave.paused = true;
          });
          
          // 保存查看器引用
          this.skinViewers.push(skinViewer);
        } catch (error) {
          console.error(`Failed to create skin viewer for ${username}:`, error);
        }
      });
    }
  }

  // 创建并初始化皮肤查看器实例
  // 等待页面完全加载后初始化
  window.addEventListener('load', () => {
    const skinViewer = new MinecraftSkinViewer();
    skinViewer.initialize();
  });
})();
