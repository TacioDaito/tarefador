<script setup>
const { name, email, message, loading, success, response, send } = useContactAction()
</script>

<template>
  <div>
    <nav
      class="fixed top-2 left-1/2 -translate-x-1/2 w-2xl rounded-2xl z-50 grid grid-cols-3 items-center px-6 py-3 bg-(--bg-surface-raised) shadow-md">
      <span class="text-xl font-bold text-(--text-heading) justify-self-start">Tarefador</span>
      <div class="flex items-center gap-6 justify-self-center">
        <a href="#inicio" class="text-(--text-nav) hover:text-emerald-400 transition-colors duration-200">Início</a>
        <a href="#funcionalidades"
          class="text-(--text-nav) hover:text-emerald-400 transition-colors duration-200">Recursos</a>
        <a href="#contato"
          class="text-(--text-nav) hover:text-emerald-400 transition-colors duration-200">Contato</a>
      </div>
      <div class="justify-self-end">
        <Button label="Entrar" size="small" severity="primary" outlined @click="navigateTo('/login')" />
      </div>
    </nav>

    <main>
      <!-- ==================== SECAO HERO ==================== -->
      <section id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden 
          bg-linear-to-br from-(--hero-from) via-(--hero-via) to-(--hero-to) pt-16">

        <!-- Conteudo Hero -->
        <div class="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold text-(--text-heading) mb-4 leading-tight">
            Crie Fluxos de Trabalho Melhores
          </h1>
          <p class="font-medium text-lg md:text-xl text-(--text-body) opacity-80 mb-8 max-w-xl mx-auto">
            Gerencie tarefas, colabore com sua equipe e entregue projetos mais rapido do que nunca.
          </p>
          <div class="flex flex-col items-center gap-4">
            <Button label="Começar" size="large" severity="primary" @click="navigateTo('/login')" />
            <p class="font-medium text-sm text-(--text-body) opacity-60 mt-2">
              Simples e fácil
            </p>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg viewBox="0 0 1440 850" preserveAspectRatio="none" class="w-full h-160 bg-transparent opacity-10">
            <path d="M 0 832 C 127 610 1381 906 1444 0 L 1440 850 L 0 850 Z" fill="var(--svg-wave-dark)" />
          </svg>
        </div>

        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg viewBox="0 0 1440 850" preserveAspectRatio="none" class="w-full h-120 bg-transparent opacity-20">
            <path d="M 0 832 C 127 610 1381 906 1444 0 L 1440 850 L 0 850 Z" fill="var(--svg-wave-dark)" />
          </svg>
        </div>

        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg viewBox="0 0 1440 850" preserveAspectRatio="none" class="w-full h-60 bg-transparent">
            <path d="M 0 832 C 127 610 1381 906 1444 0 L 1440 850 L 0 850 Z" fill="var(--svg-wave)" />
          </svg>
        </div>

      </section>

      <!-- ==================== SECAO RECURSOS ==================== -->
      <section id="funcionalidades"
        class="relative min-h-screen flex items-center justify-center py-20 px-4 bg-(--bg-surface)">

        <div class="max-w-6xl mx-auto w-full">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-(--text-heading) mb-3">
              Tudo que Você Precisa
            </h2>
            <p class="text-(--text-body) text-lg max-w-lg mx-auto">
              Recursos poderosos para manter seus projetos no rumo certo.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Card 1 -->
            <Card class="transition-all duration-300 hover:-translate-y-1">
              <template #header>
                <div class="flex justify-center pt-6">
                  <i class="pi pi-list text-emerald-400" style="font-size: 3rem;"></i>
                </div>
              </template>
              <template #title>
                <div class="text-center text-xl font-semibold text-(--text-heading)">Gerenciamento de Tarefas</div>
              </template>
              <template #content>
                <p class="text-center text-(--text-body) leading-relaxed">
                  Crie, atribua e acompanhe tarefas com facilidade. Fique por dentro dos prazos e nunca perca o ritmo
                  com
                  atualizações de status em tempo real.
                </p>
              </template>
            </Card>

            <!-- Card 2 -->
            <Card class="transition-all duration-300 hover:-translate-y-1">
              <template #header>
                <div class="flex justify-center pt-6">
                  <i class="pi pi-users text-emerald-400" style="font-size: 3rem;"></i>
                </div>
              </template>
              <template #title>
                <div class="text-center text-xl font-semibold text-(--text-heading)">Colaboração em Equipe</div>
              </template>
              <template #content>
                <p class="text-center text-(--text-body) leading-relaxed">
                  Trabalhem juntos em tempo real. Compartilhem comentários, anexem arquivos e mantenham todos na mesma
                  página durante todo o ciclo de vida do projeto.
                </p>
              </template>
            </Card>

            <!-- Card 3 -->
            <Card class="transition-all duration-300 hover:-translate-y-1">
              <template #header>
                <div class="flex justify-center pt-6">
                  <i class="pi pi-chart-bar text-emerald-400" style="font-size: 3rem;"></i>
                </div>
              </template>
              <template #title>
                <div class="text-center text-xl font-semibold text-(--text-heading)">Análises</div>
              </template>
              <template #content>
                <p class="text-center text-(--text-body) leading-relaxed">
                  Obtenha insights com painéis de análise detalhados. Acompanhe o progresso, meça a velocidade e tome
                  decisões baseadas em dados com confiança.
                </p>
              </template>
            </Card>
          </div>
        </div>

        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
          <svg viewBox="0 0 1440 442" preserveAspectRatio="none" class="w-full h-20 md:h-40 bg-transparent">
            <path d="M 0 86 C 11 286 564 540 1440 0 L 1440 442 L 0 442 Z" fill="var(--svg-wave-dark)" />
          </svg>
        </div>

      </section>

      <!-- ==================== SECAO CONTATO ==================== -->
      <section id="contato" class="relative min-h-screen flex items-center py-20 px-4 bg-(--bg-surface-contact)">
        <div class="max-w-lg mx-auto w-full flex flex-col items-center text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-(--text-heading) mb-3">
            Entre em Contato
          </h2>
          <p class="text-(--text-body) mb-10">
            Tem uma pergunta ou quer colaborar? Envie-nos uma mensagem abaixo.
          </p>

          <form class="flex flex-col w-full gap-6" @submit.prevent="send">
            <InputText id="name" v-model="name" placeholder="Seu nome" />
            <InputText id="email" v-model="email" type="email" placeholder="Seu email" />
            <Textarea id="message" v-model="message" rows="5" placeholder="Sua mensagem" />
            <Button label="Enviar Mensagem" severity="primary" size="large" type="submit" class="w-full" :loading="loading" />

            <Message v-if="response" :severity="success ? 'success' : 'error'" :life="5000">
              {{ response }}
            </Message>
          </form>

          <p class="absolute bottom-4 text-sm text-(--text-body)">
            &copy; 2026
            <a href="https://taciodaito.github.io/portfolio/" target="_blank" rel="noopener noreferrer"
              class="text-emerald-400 hover:text-(--p-primary-700) underline underline-offset-2">
              Tacio Kikuchi
            </a>
          </p>
        </div>
      </section>
    </main>
  </div>
</template>