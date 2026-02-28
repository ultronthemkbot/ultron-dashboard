# Technical Setup & Config

## System
- Running on: OpenClaw, WSL2, DESKTOP-MA9V6U6
- Setup date: Feb 22, 2026
- Primary model: anthropic/claude-sonnet-4-6
- Fallback chain: gemini-flash → openrouter models

## Config Fixes
- Removed ALL Groq models from fallbacks (10k TPM < system prompt 15k tokens)
- Compaction reserveTokensFloor: 200k → 80k
- WORKFLOW_AUTO.md fixes post-compaction audit warnings

## Image Generation
- ✅ `multimodalart/FLUX.1-merged` HF Space via `gradio_client`
- ✅ Fallback: Python/Pillow coded logo generator
- Script: `scripts/image-gen.py`
- ❌ OpenAI API quota exhausted
- ❌ HF api-inference FLUX.1-schnell: 410 Gone

## Web Search
- ✅ SearXNG: `http://localhost:8888/search?q=QUERY&format=json` (shared with ClawBot)
- ✅ DuckDuckGo: `duckduckgo-search` package
- Script: `scripts/search.py`
- ❌ Brave API key not configured

## Memory / Embeddings
- ✅ Gemini for memory embeddings (OpenAI quota exhausted)

## Transcription
- ✅ `yt-dlp` + Groq Whisper (model: whisper-large-v3)

## Voice Cloning Pipeline
- F5-TTS via `mrfakename/E2-F5-TTS` (best, GPU quota limited)
- StyleTTS2 via `styletts2/styletts2` (no GPU issues) ✅
- edge-tts fallback (always works)
- Script: `scripts/voice_clone.py`
- Faisal voice: atempo=0.85, slow steady calm
- Mukesh voice clone: approved ✅

## Bot Bhai (Urdu TTS)
- Voice: `ur-PK-AsadNeural` (edge_tts), rate=`-5%`, pitch=`+0Hz`
- Format: OGG/Opus, no ffmpeg post-processing
- No religious phrases — formal Pakistani speech only

## HuggingFace Spaces (Feb 26)
- ✅ mrfakename/E2-F5-TTS, styletts2/styletts2, nari-labs/Dia-1.6B
- ❌ OpenVoiceV2, fish-speech-1, CosyVoice2-0.5B

## Installed Packages
- duckduckgo-search, gradio-client, pillow, openpyxl, websockets (v16.0)

## WhatsApp
- Gateway restart fixes heartbeat issues: `openclaw gateway restart`
- Credentials re-linked twice (Feb 22), stable since
- Delivery queue cleanup: delete stale files from `~/.openclaw/delivery-queue/`
