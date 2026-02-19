<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav>
      <div class="nav-left">
        <div class="logo">
          <span class="logo-icon"></span>
          <span class="logo-text">TeamTasks</span>
        </div>
        <div class="links">
          <RouterLink to="/">
            <span class="icon">🏠︎</span> Accueil
          </RouterLink>
          <RouterLink to="/tasks">
            <span class="icon">📌</span> Tableau
          </RouterLink>
          <RouterLink to="/members">
            <span class="icon">🧑🏾‍🤝‍🧑🏽</span> Équipe
          </RouterLink>
        </div>
      </div>
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body { 
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #0079bf, #5067c5);
  min-height: 100vh;
}

.app { min-height: 100vh; }

nav {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon { font-size: 1.5rem; }

.logo-text {
  color: white;
  font-size: 1.3rem;
  font-weight: bold;
}

.links { display: flex; gap: 5px; }

.links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
}

.links a:hover,
.links a.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

main { min-height: calc(100vh - 50px); }
</style>
