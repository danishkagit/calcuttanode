# OpenCode Multi-Provider Setup (FREE Models Only)

## Overview

This setup configures OpenCode with **5 free providers** and **25+ models** including vision-capable models, code-specialized models, and fast inference models.

**ALL MODELS ARE 100% FREE - NO PREPAID CHARGES REQUIRED**

| Provider   | Free Tier                     | Vision | Notes            |
|------------|-------------------------------|--------|------------------|
| Google     | 250 req/day                   | Yes    | Best vision      |
| Groq       | Rate-limited, no charge       | No     | Ultra-fast       |
| Mistral    | Free tier                     | No     | Code specialist  |
| Cohere     | Free tier                     | No     | General purpose  |
| OpenRouter | 23+ free models               | Yes    | Llama/DeepSeek   |

---

## Quick Start

### Step 1: Get Free API Keys

| Provider   | Where to Get                                              |
|------------|-----------------------------------------------------------|
| Google     | https://aistudio.google.com/api-keys                     |
| Groq       | https://console.groq.com/keys                             |
| Mistral    | https://console.mistral.ai/api-keys                       |
| Cohere     | https://dashboard.cohere.com/api-keys                     |
| OpenRouter | https://openrouter.ai/keys                                |

### Step 2: Set Environment Variables

The keys live in `~/.config/opencode/.env` **and are also exported as persistent User/system environment variables** (most reliable — OpenCode reads `{env:KEY}` from the real environment). If you regenerate a key, update BOTH the `.env` file and the system variable:

```powershell
[System.Environment]::SetEnvironmentVariable("OPENROUTER_API_KEY", "sk-or-...", "User")
```

Required variables: `GOOGLE_API_KEY`, `GROQ_API_KEY`, `MISTRAL_API_KEY`, `COHERE_API_KEY`, `OPENROUTER_API_KEY`.

---

## Model Switching

### Windows (PowerShell)

```powershell
cd ~/.config/opencode

# List all available models
.\switch-model.ps1 list

# Switch to a model
.\switch-model.ps1 vision       # Gemini 3.1 Pro (Vision)
.\switch-model.ps1 code         # DeepSeek Chat V3 (Code)
.\switch-model.ps1 fast         # Llama 3.1 8B on Groq
```

### Linux/macOS (Bash)

```bash
cd ~/.config/opencode

# List all available models
./switch-model.sh list

# Switch to a model
./switch-model.sh vision
./switch-model.sh code
./switch-model.sh fast
```

### Windows (Batch - Simple)

```cmd
cd %USERPROFILE%\.config\opencode

switch vision
switch code
switch fast
switch list
```

---

## All Free Models (25+)

> **Note:** In OpenCode the model picker uses the full `provider/model` ID (e.g. `groq/llama-3.1-8b-instant`), not the alias. The aliases below are just labels.

### Vision Models (Support Image Input)

| Alias         | Full Model ID                                     | Provider    | Notes                   |
|---------------|---------------------------------------------------|-------------|-------------------------|
| `vision`      | `google/antigravity-gemini-3.1-pro`               | Antigravity | Best vision, 1M context |
| `vision-flash`| `google/antigravity-gemini-3-flash`               | Antigravity | Fast vision             |
| `vision-pro`  | `google/antigravity-gemini-3.1-pro`               | Antigravity | Latest Gemini           |
| `claude-v`    | `google/antigravity-claude-sonnet-4-6`            | Antigravity | Claude with vision      |
| `claude-opus` | `google/antigravity-claude-opus-4-6-thinking`     | Antigravity | Top-tier reasoning      |
| `gemini-free` | `google/gemini-2.5-flash`                         | Google      | Free Gemini tier        |
| `llama4v`     | `openrouter/nvidia/nemotron-nano-12b-v2-vl:free`  | OpenRouter  | Free vision model       |
| `gemma3v`     | `openrouter/google/gemma-4-26b-a4b-it:free`       | OpenRouter  | Free Gemma Vision       |

### Code-Specialized Models

| Alias          | Full Model ID                                         | Provider    | Notes                 |
|----------------|-------------------------------------------------------|-------------|-----------------------|
| `codestral`    | `mistral/codestral-latest`                            | Mistral     | Mistral code model    |
| `qwen-code`    | `openrouter/qwen/qwen3-coder:free`                   | OpenRouter  | Qwen code specialist  |
| `nemotron-s`   | `openrouter/nvidia/nemotron-3-super-120b-a12b:free`  | OpenRouter  | 1M context, code-capable |

### Fast Inference Models (Low Latency)

| Alias          | Full Model ID                                  | Provider    | Notes                |
|----------------|------------------------------------------------|-------------|----------------------|
| `fast`         | `groq/llama-3.1-8b-instant`                   | Groq        | Ultra-fast (Groq)    |
| `fast-mistral` | `mistral/ministral-8b-latest`                  | Mistral     | Fast Mistral         |
| `fast-groq`    | `groq/gemma2-9b-it`                           | Groq        | Fast Gemma           |
| `nemotron`     | `openrouter/nvidia/nemotron-3-nano-30b-a3b:free`| OpenRouter | Fast NVIDIA model    |
| `command-r7b`  | `cohere/command-r7b-12-2024`                   | Cohere      | Fast Cohere          |

### General / Large Models

| Alias          | Full Model ID                                       | Provider    | Notes                |
|----------------|-----------------------------------------------------|-------------|----------------------|
| `general`      | `groq/llama-3.3-70b-versatile`                     | Groq        | Balanced general     |
| `qwen-big`     | `openrouter/qwen/qwen3-next-80b-a3b-instruct:free`  | OpenRouter  | Huge MoE model       |
| `gpt-oss`      | `openrouter/openai/gpt-oss-120b:free`              | OpenRouter  | OpenAI open model    |
| `command-a`    | `cohere/command-a-03-2025`                          | Cohere      | Cohere flagship      |
| `mistral-s`    | `mistral/mistral-small-latest`                      | Mistral     | Mistral general      |
| `aya`          | `cohere/c4ai-aya-expanse-32b`                       | Cohere      | Multilingual         |
| `mixtral`      | `groq/mixtral-8x7b-32768`                          | Groq        | Mixtral MoE          |
| `llama-3.3`    | `openrouter/meta-llama/llama-3.3-70b-instruct:free`| OpenRouter  | Llama general        |
| `hy3`          | `openrouter/tencent/hy3:free`                      | OpenRouter  | Hunyuan free         |

---

## Recommended Usage by Task

| Task                          | Recommended Model         | Alias        |
|-------------------------------|---------------------------|--------------|
| Analyzing screenshots/UI      | Gemini 3.1 Pro Vision     | `vision`     |
| Generating code               | DeepSeek Chat V3          | `code`       |
| Quick questions               | Llama 3.1 8B (Groq)       | `fast`       |
| Complex reasoning             | Claude Opus 4.6           | `claude-opus`|
| Multi-file refactoring        | Qwen3 Coder               | `qwen-code`  |
| Large context (1M tokens)     | Nemotron 3 Super          | `nemotron-s` |
| Multilingual tasks            | Aya Expanse 32B           | `aya`        |

---

## Free Tier Limits

| Provider   | Rate Limit           | Daily Limit |
|------------|----------------------|-------------|
| Google     | 15 RPM               | 250/day     |
| Groq       | 30 RPM               | Unlimited   |
| Mistral    | 60 RPM               | 1B tok/mo   |
| Cohere     | 20 RPM               | 1000/day    |
| OpenRouter | 20 RPM (free tier)   | 50/day      |

**Tip:** Rotate between providers to stay within free limits.

---

## Configuration Files

| File                                                     | Purpose                          |
|----------------------------------------------------------|----------------------------------|
| `~/.config/opencode/opencode.json`                       | Main config with all providers   |
| `~/.config/opencode/.env.example`                        | Template for API keys            |
| `~/.config/opencode/.env`                                | Your actual API keys (mirrored to system env vars) |

> **Model switching:** No shell switcher scripts are needed. Just start OpenCode with a model, e.g. `opencode --model groq/llama-3.1-8b-instant`, or pick a model from the in-terminal `/model` picker.

---

## Troubleshooting

### "This service is restricted to the official Claude Code client"
- Caused by pointing an `anthropic` provider at a restricted endpoint (e.g. `opencode.ai/zen/v1`). Remove any `opencode.jsonc` that defines such a provider; the main `opencode.json` uses the `opencode-antigravity-auth` plugin instead.

### "Missing authentication header" / 401 from a provider
- The `{env:KEY}` in `opencode.json` reads from the **real** environment, not the `.env` file. Export the keys as system env vars (see Step 2), then **restart the terminal** so the new session picks them up.

### "Model not found" / "Invalid model"
- The model ID in the config no longer exists (providers retire models). Use the verified IDs in the tables above, or run `opencode models` to list everything currently available.

### OpenRouter 429 "temporarily rate-limited upstream"
- This is OpenRouter's **shared free tier** throttle, NOT a prepaid requirement. It clears on its own (retry-after a few seconds) and rarely hits during normal one-at-a-time use. If it persists, switch to Google/Groq/Cohere/Mistral, which have their own reliable free tiers.

### Rate limits (provider free tiers)
- Google: 250 req/day · Groq: ~30 RPM · Mistral: free tier · Cohere: free tier · OpenRouter: shared free-tier, ~20 RPM per model
