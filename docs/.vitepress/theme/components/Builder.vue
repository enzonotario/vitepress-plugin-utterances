<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import { inBrowser, useData } from 'vitepress'
import { computed, ref } from 'vue'

const isDark = useData().isDark

const repo = ref('enzonotario/vitepress-plugin-utterances')
const issueTerm = ref<'pathname' | 'url' | 'title' | 'og:title' | string>('custom')
const customIssueTerm = ref('homepage')
const label = ref('')
const theme = ref('')
const customTheme = ref('')
const crossorigin = ref<'anonymous' | 'use-credentials'>('anonymous')

const DEBOUNCE_MS = 300

const repoDeb = refDebounced(repo, DEBOUNCE_MS)
const issueTermDeb = refDebounced(issueTerm, DEBOUNCE_MS)
const customIssueTermDeb = refDebounced(customIssueTerm, DEBOUNCE_MS)
const labelDeb = refDebounced(label, DEBOUNCE_MS)
const themeDeb = refDebounced(theme, DEBOUNCE_MS)
const customThemeDeb = refDebounced(customTheme, DEBOUNCE_MS)
const crossoriginDeb = refDebounced(crossorigin, DEBOUNCE_MS)

const presetIssueTerms = ['pathname', 'url', 'title', 'og:title', 'custom'] as const
const presetThemes = [
  '',
  'github-light',
  'github-dark',
  'preferred-color-scheme',
  'github-dark-orange',
  'icy-dark',
  'dark-blue',
  'photon-dark',
  'boxy-light',
  'gruvbox-dark',
  'custom',
] as const

const effectiveIssueTerm = computed(() => {
  return issueTerm.value === 'custom' ? customIssueTerm.value.trim() : issueTerm.value
})

const effectiveTheme = computed(() => {
  return theme.value === 'custom' ? customTheme.value.trim() : theme.value
})

const effectiveIssueTermDeb = computed(() => {
  return issueTermDeb.value === 'custom' ? customIssueTermDeb.value.trim() : issueTermDeb.value
})

const effectiveThemeDeb = computed(() => {
  return themeDeb.value === 'custom' ? customThemeDeb.value.trim() : themeDeb.value
})

const validRepoDeb = computed(() => /.+\/.+/.test(repoDeb.value))

const code = computed(() => {
  const parts: string[] = [
    `<Utterances repo="${repo.value}"`,
  ]

  if (effectiveIssueTerm.value && effectiveIssueTerm.value !== 'pathname') {
    parts.push(`issue-term="${effectiveIssueTerm.value}"`)
  }

  if (label.value.trim()) {
    parts.push(`label="${label.value.trim()}"`)
  }

  if (effectiveTheme.value) {
    parts.push(`theme="${effectiveTheme.value}"`)
  }

  if (crossorigin.value !== 'anonymous') {
    parts.push(`crossorigin="${crossorigin.value}"`)
  }

  return `${parts.join(' ')} />`
})

const copied = ref(false)

async function copy() {
  try {
    if (inBrowser) {
      await navigator.clipboard.writeText(code.value)
      copied.value = true
      setTimeout(() => (copied.value = false), 1200)
    }
  }
  catch {}
}
</script>

<template>
  <div class="grid gap-4 bg-transparent" :data-theme="isDark ? 'dark' : 'light'">
    <div class="grid gap-2">
      <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-2 items-center">
        <label class="label-text">Repo</label>
        <input v-model="repo" type="text" placeholder="owner/repo" class="input input-bordered w-full">
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr_1fr_auto] gap-2 items-center">
        <label class="label-text">Issue Term</label>
        <select v-model="issueTerm" class="select select-bordered w-full">
          <option v-for="it in presetIssueTerms" :key="it" :value="it">
            {{ it || 'default' }}
          </option>
        </select>
        <input v-if="issueTerm === 'custom'" v-model="customIssueTerm" type="text" placeholder="custom value" class="input input-bordered w-full">
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-2 items-center">
        <label class="label-text">Label</label>
        <input v-model="label" type="text" placeholder="optional" class="input input-bordered w-full">
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr_1fr_auto] gap-2 items-center">
        <label class="label-text">Theme</label>
        <select v-model="theme" class="select select-bordered w-full">
          <option v-for="t in presetThemes" :key="t" :value="t">
            {{ t || 'auto (light/dark)' }}
          </option>
        </select>
        <input v-if="theme === 'custom'" v-model="customTheme" type="text" placeholder="e.g. github-light" class="input input-bordered w-full">
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] gap-2 items-center">
        <label class="label-text">Crossorigin</label>
        <select v-model="crossorigin" class="select select-bordered w-full">
          <option value="anonymous">
            anonymous
          </option>
          <option value="use-credentials">
            use-credentials
          </option>
        </select>
      </div>
    </div>

    <code class="flex items-center gap-2 !p-3 font-mono whitespace-pre-wrap break-words">
      <pre class="flex-1">{{ code }}</pre>

      <button class="btn btn-outline btn-sm" :disabled="!inBrowser" @click="copy">
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </code>

    <ClientOnly>
      <div class="card card-bordered rounded-lg p-2.5">
        <div v-if="validRepoDeb" class="p-1">
          <Utterances
            :key="`${repoDeb}|${effectiveIssueTermDeb || 'pathname'}|${labelDeb}|${effectiveThemeDeb}|${crossoriginDeb}`"
            :repo="repoDeb"
            :issue-term="effectiveIssueTermDeb || 'pathname'"
            :label="labelDeb || undefined"
            :theme="effectiveThemeDeb || undefined"
            :crossorigin="crossoriginDeb"
          />
        </div>
        <p v-else class="text-base-content/70 my-1">
          Enter a valid repo in the form of owner/repo to preview.
        </p>
      </div>
    </ClientOnly>
  </div>
</template>
