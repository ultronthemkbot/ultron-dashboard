# Lessons Learned & Rules

## Technical
- Groq free tier: very low TPM — never use in fallback chain for large system prompts
- Check `/tmp/openclaw/openclaw-YYYY-MM-DD.log` for real errors
- OpenAI quota exhausted — use Gemini/HF/DuckDuckGo
- Filter YouTube searches by channelId always
- `trash` > `rm` for destructive ops
- MEMORY.md must exist or startup errors
- Multiple cron instances can run simultaneously
- edge_tts: plain text only (no SSML), pitch must be `+15Hz` not `+10%`
- `pip install f5-tts` too large for this machine — SIGTERM killed
- Delivery queue stale files cause gateway timeout cycles — clean them

## Group Chat Rules
- React with emoji instead of short text replies
- Don't respond to casual banter
- Spawn sub-agents for tasks >5s
- Mukesh said: NO images (wastes tokens) — text only
- Cron sub-agents: NEVER use message tool, use announce delivery

## Architecture
- Orchestrator pattern: quick reply → spawn sub-agent → main stays free
- Sub-agent gets: sender name, question, group JID, channel
- Sub-agent replies directly via announce when done

## Pending
- [ ] Brave Search API key
- [ ] Install `nmem` neural memory
- [ ] PulseBoard messages 9-10
