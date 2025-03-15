# 🖥️ 服务器信息

## 🔧 基本配置

<div class="server-info-grid fade-in">
  <div class="server-info-card">
    <div class="card-header">🎮 基本信息</div>
    <div class="card-body">
      <table>
        <tbody>
          <tr>
            <td>📋 版本</td>
            <td><code class="badge badge-green">1.21.4</code></td>
          </tr>
          <tr>
            <td>💀 难度</td>
            <td><code class="badge badge-red">困难</code></td>
          </tr>
          <tr>
            <td>🏆 模式</td>
            <td><code class="badge badge-blue">生存</code></td>
          </tr>
          <tr>
            <td>🔑 是否需要正版</td>
            <td><code class="badge badge-gray">否</code></td>
          </tr>
          <tr>
            <td>📝 是否需要白名单</td>
            <td><code class="badge badge-gray">否</code></td>
          </tr>
          <tr>
            <td>⚙️ 服务端类型</td>
            <td><code class="badge badge-purple">Paper</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

## 📊 游戏设置

<div class="mc-card fade-in">
  <h3>⚠️ 重要游戏限制</h3>
  
  <div class="limit-info">
    <div class="limit-item">
      <span class="limit-icon">👁️</span>
      <span class="limit-title">最大视距：</span>
      <code class="badge badge-red">12区块</code>
      <span class="limit-note">（这项配置会随着玩家数量动态变化）</span>
    </div>
    <div class="limit-item">
      <span class="limit-icon">🔒</span>
      <span class="limit-title">单个IP最大限制注册数量：</span>
      <code class="badge badge-red">2</code>
    </div>
  </div>
  
  <div class="server-stats">
    <h3>📈 服务器性能</h3>
    <div class="stat-grid">
      <div class="stat-item">
        <div class="stat-icon">🧠</div>
        <div class="stat-label">内存</div>
        <div class="stat-value">16GB</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">💻</div>
        <div class="stat-label">CPU</div>
        <div class="stat-value">Ryzen 9 5950X</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">💾</div>
        <div class="stat-label">存储</div>
        <div class="stat-value">NVMe SSD</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">🔌</div>
        <div class="stat-label">网络</div>
        <div class="stat-value">千兆宽带</div>
      </div>
    </div>
  </div>
</div>

<style>
/* 服务器信息页面特定样式 */
.stat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat-item {
  background: var(--vp-c-bg);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.3rem;
}

.stat-value {
  font-weight: 600;
}

.server-stats {
  margin-top: 2rem;
}

.server-stats h3 {
  margin-bottom: 1rem;
}

.server-info-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.server-info-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-header {
  background-color: #f0f0f0;
  padding: 10px 15px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.card-body {
  padding: 15px;
}

.card-body table {
  width: 100%;
}

.card-body td {
  padding: 8px 0;
}

.card-body td:first-child {
  font-weight: 500;
  width: 40%;
}

code.version-badge {
  background-color: #4CAF50;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
}

code.difficulty-badge {
  background-color: #f44336;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
}

code.mode-badge {
  background-color: #2196F3;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
}

code.server-badge {
  background-color: #9C27B0;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
}

code.yes-badge {
  background-color: #4CAF50;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
}

code.no-badge {
  background-color: #607D8B;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
}

.limit-info {
  padding: 10px;
}

.limit-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.limit-icon {
  margin-right: 10px;
  font-size: 1.2em;
}

.limit-title {
  font-weight: bold;
  margin-right: 5px;
}

.limit-value {
  background-color: #ff5252;
  color: white;
  padding: 3px 6px;
  border-radius: 4px;
  margin-right: 5px;
}
</style>