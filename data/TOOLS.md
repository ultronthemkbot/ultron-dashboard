# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

### Twitter / X
- Credentials: `~/.openclaw/credentials/twitter.json`
- Consumer Key + Secret + Bearer Token: ✅ saved
- Access Token + Secret: ✅ saved
- Account: @MukeshUtmani (verified working)

---

### GitHub (ULTRON's own account)
- Account: `ultronthemkbot`
- Classic PAT: `ghp_***REDACTED***`
- Fine-grained PAT: `github_pat_***REDACTED***`
- Repos: `ultronthemkbot/ultron-dashboard`

### Vercel
- Not yet linked — deploy via GitHub import (one-click deploy link)
- Dashboard deploy URL: https://vercel.com/new/clone?repository-url=https://github.com/ultronthemkbot/ultron-dashboard

Add whatever helps you do your job. This is your cheat sheet.

---

### YouTube Channel IDs (verified)
- **Nikhil Kamath** (official): `UCnC8SAZzQiBGYVSKZ_S3y4Q` — "People by WTF"
- **Nikhil Kamath Clips**: `UCRv4waLxgUN0Z-yb2I1Fq4A`
- **Nikhil Kamath हिन्दी** (Hindi, NOT the main channel): `UCm4htuSg43-MJpwf9t9lvEQ`
- **YouTube API Key**: `***REDACTED***` (My First Project — YouTube Data API v3 enabled)

### YouTube Search Pattern
Always filter by channelId when searching for a known creator's videos:
```
curl "https://www.googleapis.com/youtube/v3/search?part=snippet&q=TOPIC&channelId=CHANNEL_ID&type=video&order=date&maxResults=3&key=***REDACTED***"
```

---

### Bot Bhai TTS Config (finalized by Mukesh)
- Library: edge_tts (Python)
- Voice: `ur-PK-AsadNeural` (Pakistani male Urdu)
- Rate: `-5%`
- Pitch: `+0Hz` (default — do NOT change)
- No ffmpeg post-processing (sounds most natural without it)
- Format: OGG/Opus for WhatsApp voice notes
- Output path: `/home/mktwopointzero/.openclaw/workspace/`

```python
tts = edge_tts.Communicate(urdu_text, voice='ur-PK-AsadNeural', rate='-5%')
```
