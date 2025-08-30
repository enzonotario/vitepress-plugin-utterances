<script setup lang="ts">
import { refDebounced } from '@vueuse/core'
import { inBrowser } from 'vitepress'
import { computed, ref } from 'vue'

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
  <div>
    <div class="builder">
      <div class="fields">
        <div class="row">
          <label>Repo</label>
          <input v-model="repo" type="text" placeholder="owner/repo">
        </div>

        <div class="row">
          <label>Issue Term</label>
          <select v-model="issueTerm">
            <option v-for="it in presetIssueTerms" :key="it" :value="it">
              {{ it || 'default' }}
            </option>
          </select>
          <input v-if="issueTerm === 'custom'" v-model="customIssueTerm" type="text" placeholder="custom value">
        </div>

        <div class="row">
          <label>Label</label>
          <input v-model="label" type="text" placeholder="optional">
        </div>

        <div class="row">
          <label>Theme</label>
          <select v-model="theme">
            <option v-for="t in presetThemes" :key="t" :value="t">
              {{ t || 'auto (light/dark)' }}
            </option>
          </select>
          <input v-if="theme === 'custom'" v-model="customTheme" type="text" placeholder="e.g. github-light">
        </div>

        <div class="row">
          <label>Crossorigin</label>
          <select v-model="crossorigin">
            <option value="anonymous">
              anonymous
            </option>
            <option value="use-credentials">
              use-credentials
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="code">
      <pre>{{ code }}</pre>

      <button class="btn" :disabled="!inBrowser" @click="copy">
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>

    <ClientOnly>
      <div class="card">
        <div v-if="validRepoDeb" class="inner">
          <Utterances
            :key="`${repoDeb}|${effectiveIssueTermDeb || 'pathname'}|${labelDeb}|${effectiveThemeDeb}|${crossoriginDeb}`"
            :repo="repoDeb"
            :issue-term="effectiveIssueTermDeb || 'pathname'"
            :label="labelDeb || undefined"
            :theme="effectiveThemeDeb || undefined"
            :crossorigin="crossoriginDeb"
          />
        </div>
        <p v-else class="note">
          Enter a valid repo in the form of owner/repo to preview.
        </p>
      </div>
    </ClientOnly>
  </div>
</template>
