<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <div>
    <nav class="fixed top-2 left-1/2 -translate-x-1/2 w-2xl rounded-2xl z-50 grid grid-cols-3 items-center px-6 py-3 bg-stone-900/80 shadow-md">
      <span class="text-xl font-bold text-stone-100 justify-self-start">Tarefador</span>
      <div class="flex items-center gap-6 justify-self-center">
        <a href="#hero" class="text-stone-200 hover:text-(--p-primary-600) transition-colors duration-200">Início</a>
        <a href="#features"
          class="text-stone-200 hover:text-(--p-primary-600) transition-colors duration-200">Recursos</a>
        <a href="#contact"
          class="text-stone-200 hover:text-(--p-primary-600) transition-colors duration-200">Contato</a>
      </div>
      <div class="justify-self-end">
        <Button label="Entrar" size="small" outlined @click="navigateTo('/login')" />
      </div>
    </nav>

    <main>
      <!-- ==================== SECAO HERO ==================== -->
      <section id="hero"
        class="relative min-h-screen flex items-center justify-center overflow-hidden 
          bg-linear-to-br from-emerald-600 via-emerald-800 to-emerald-950">

        <!-- Conteudo Hero -->
        <div class="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold text-stone-100 mb-4 leading-tight">
            Crie Fluxos de Trabalho Melhores
          </h1>
          <p class="text-lg md:text-xl text-stone-300 opacity-80 mb-8 max-w-xl mx-auto">
            Gerencie tarefas, colabore com sua equipe e entregue projetos mais rapido do que nunca.
          </p>
          <div class="flex flex-col items-center gap-4">
            <Button label="Começar" size="large" severity="primary" @click="navigateTo('/login')"/>
            <p class="text-sm text-stone-300 opacity-60 mt-2">
              Simples e fácil
            </p>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg viewBox="0 0 1440 850" preserveAspectRatio="none" class="w-full h-160 bg-transparent opacity-10">
            <path d="M 0 832 C 127 610 1381 906 1444 0 L 1440 850 L 0 850 Z" fill="black" />
          </svg>
        </div>

        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg viewBox="0 0 1440 850" preserveAspectRatio="none" class="w-full h-120 bg-transparent opacity-20">
            <path d="M 0 832 C 127 610 1381 906 1444 0 L 1440 850 L 0 850 Z" fill="black" />
          </svg>
        </div>

        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg viewBox="0 0 1440 850" preserveAspectRatio="none" class="w-full h-60 bg-transparent">
            <path d="M 0 832 C 127 610 1381 906 1444 0 L 1440 850 L 0 850 Z" fill="var(--color-stone-900)" />
          </svg>
        </div>

      </section>

      <!-- ==================== SECAO RECURSOS ==================== -->
      <section id="features" class="relative min-h-screen flex items-center justify-center py-20 px-4 bg-stone-900">

        <div class="max-w-6xl mx-auto w-full">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-stone-100 mb-3">
              Tudo que Voce Precisa
            </h2>
            <p class="text-stone-300 text-lg max-w-lg mx-auto">
              Recursos poderosos para manter seus projetos no rumo certo.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Card 1 -->
            <Card class="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg bg-(--p-surface-0)">
              <template #header>
                <div class="flex justify-center pt-6">
                  <svg class="w-12 h-12 text-(--p-primary-600)" fill="none" stroke="currentColor" stroke-width="1.5"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12h6m-6 4h6m-6-8h6M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                  </svg>
                </div>
              </template>
              <template #title>
                <div class="text-center text-xl font-semibold text-stone-100">Gerenciamento de Tarefas</div>
              </template>
              <template #content>
                <p class="text-center text-stone-300 leading-relaxed">
                  Crie, atribua e acompanhe tarefas com facilidade. Fique por dentro dos prazos e nunca perca o ritmo com
                  atualizacoes de status em tempo real.
                </p>
              </template>
            </Card>

            <!-- Card 2 -->
            <Card class="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg bg-(--p-surface-0)">
              <template #header>
                <div class="flex justify-center pt-6">
                  <svg class="w-12 h-12 text-(--p-primary-600)" fill="none" stroke="currentColor" stroke-width="1.5"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </template>
              <template #title>
                <div class="text-center text-xl font-semibold text-stone-100">Colaboracao em Equipe</div>
              </template>
              <template #content>
                <p class="text-center text-stone-300 leading-relaxed">
                  Trabalhem juntos em tempo real. Compartilhem comentarios, anexem arquivos e mantenham todos na mesma
                  pagina durante todo o ciclo de vida do projeto.
                </p>
              </template>
            </Card>

            <!-- Card 3 -->
            <Card class="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg bg-(--p-surface-0)">
              <template #header>
                <div class="flex justify-center pt-6">
                  <svg class="w-12 h-12 text-(--p-primary-600)" fill="none" stroke="currentColor" stroke-width="1.5"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
              </template>
              <template #title>
                <div class="text-center text-xl font-semibold text-stone-100">Analises</div>
              </template>
              <template #content>
                <p class="text-center text-stone-300 leading-relaxed">
                  Obtenha insights com paineis de analise detalhados. Acompanhe o progresso, meca a velocidade e tome
                  decisoes baseadas em dados com confianca.
                </p>
              </template>
            </Card>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg viewBox="0 0 1440 442" preserveAspectRatio="none" class="w-full h-40 bg-transparent">
            <path d="M 0 86 C 11 286 564 540 1440 0 L 1440 442 L 0 442 Z" fill="var(--color-stone-800)" />
          </svg>
        </div>

      </section>

      <!-- ==================== SECAO CONTATO ==================== -->
      <section id="contact" class="relative min-h-screen flex items-center py-20 px-4 bg-stone-800">
        <div class="max-w-lg mx-auto w-full flex flex-col items-center text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-stone-100 mb-3">
            Entre em Contato
          </h2>
          <p class="text-stone-300 mb-10">
            Tem uma pergunta ou quer colaborar? Envie-nos uma mensagem abaixo.
          </p>

          <form class="flex flex-col w-full gap-6" @submit.prevent>
            <Textarea id="message" v-model="message" rows="5" placeholder="Responderemos agilmente!"/>
            <Button label="Enviar Mensagem" severity="primary" size="large" type="submit" class="w-full" />
          </form>

          <p class="absolute bottom-4 text-sm text-stone-300">
            &copy; 2026
            <a href="https://taciodaito.github.io/portfolio/" target="_blank" rel="noopener noreferrer"
              class="text-(--p-primary-600) hover:text-(--p-primary-700) underline underline-offset-2">
              Tacio Kikuchi
            </a>
          </p>
        </div>
      </section>
    </main>
  </div>
</template>