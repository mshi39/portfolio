# Task 2 Report - Completed Media Acquisition

## Status

**COMPLETE.** Thirteen unique media files now exist under `site/public/portfolio` for fourteen placements. The hero-insights asset is intentionally reused by the AI-generated-insight placement.

Twelve files were fetched through the authenticated connected Google Drive account. The original prototype Drive video (`1zRTVv9g3lUGR2deDsiGGZWq6YCb-YHQW`) is 363,625,769 bytes and exceeds the connector's 104,857,600-byte limit, so the user explicitly approved the exact existing Webflow-hosted MP4 as the prototype source. No unapproved substitution was made.

## Source and local inventory

| Placement label | Drive ID / approved source | Original name | MIME type | Local filename | Bytes | Dimensions | Video duration |
| --- | --- | --- | --- | --- | ---: | --- | ---: |
| thumbnail | `116Tmkc_Tg7Jvxu4BtinCHVLFrLSTnv_D` | `Thumbnail.png` | `image/png` | `feedback-intelligence-thumbnail.png` | 117,141 | 653x453 | - |
| hero insights / AI-generated insight (shared source) | `10Mv8gWIbIxOvBuJD1n0rKtKwmIxIrDM5` | `Vid 1 - AI Powered Insight Generation.mp4` | `video/mp4` | `feedback-intelligence-hero-insights.mp4` | 11,795,048 | 1914x908 | 13.525 s |
| workshop Miro board | `1dS3IVuqkWVD6pZvuyFkjcKCE_djvsCcb` | `Workshop Miro Board.png` | `image/png` | `feedback-intelligence-workshop-map.png` | 742,754 | 2871x1381 | - |
| full user-flow map | `17npGjc_PQgMbvbPdJ5C8OwVLcDZO7dHQ` | `VOC Webex Integration New Journey Map.jpg` | `image/jpeg` | `feedback-intelligence-user-flow.jpg` | 196,055 | 3615x443 | - |
| product-model comparison | `1k2hvKp7D8fTTCptKgOTyR57Nc2NKPMjJ` | `3 Approaches Comparison.png` | `image/png` | `feedback-intelligence-product-models.png` | 173,888 | 1721x641 | - |
| prototype video | [user-approved Webflow CDN MP4](https://cdn.prod.website-files.com/622969137c899198c2060268%2F6a3021e597f243afeeeda3ba_VOC%20Webex%20Integration%20Low%20Fi%20Testing_mp4.mp4) (replaces oversized Drive ID `1zRTVv9g3lUGR2deDsiGGZWq6YCb-YHQW`) | `VOC Webex Integration Low Fi Testing_mp4.mp4` | `video/mp4` | `feedback-intelligence-prototype.mp4` | 3,264,038 | 1280x720 | 117.300 s |
| lower-barrier video | `1hINrdblRwCqlwN2-55EW3VPOss7aM6Kx` | `Vid 1 - Lower Barriers to Entry.mp4` | `video/mp4` | `feedback-intelligence-lower-barrier.mp4` | 15,480,218 | 1914x910 | 17.472 s |
| scheduling experience | `1KNbiUpOBMbuzdFgt1MqZmJdDnBTeAQ1L` | `Vid 1 - Flexible Scheduling.mp4` | `video/mp4` | `feedback-intelligence-scheduling.mp4` | 25,114,579 | 1918x908 | 27.776 s |
| source-verification interaction | `15MOTFhMrbRcQu8ZajVV54njZkdTlQvOY` | `Vid 1 - Human-in-the-Loop Control.mp4` | `video/mp4` | `feedback-intelligence-source-verification.mp4` | 6,944,581 | 1920x1080 | 28.164 s |
| central-feedback video | `13NgIONyN_LtKuigr4sImqrDE13L9nflK` | `Vid 1 - Centralize Feedback.mp4` | `video/mp4` | `feedback-intelligence-central-feedback.mp4` | 15,025,819 | 1916x910 | 16.967 s |
| insight-to-Jira workflow | `1ajxBYPR012MqkGxgX7bBc0CTIhBEzsP_` | `Vid 1 - End-to-End Workflow Integration.mp4` | `video/mp4` | `feedback-intelligence-jira.mp4` | 15,447,568 | 1916x910 | 17.259 s |
| AI presentation-generation flow | `16B7NqHIcczM-eWVlIPUJ_m68zOLwrG3s` | `Vid 1 - Communicate Findings Efficiently.mp4` | `video/mp4` | `feedback-intelligence-presentation.mp4` | 2,107,438 | 1920x1080 | 5.107 s |
| customer-portal video | `1wtRlbrU2PN_cxkGpF2TTd0ew2ojurDGd` | `Vid 1 - Simple and Control for Customers.mp4` | `video/mp4` | `feedback-intelligence-customer-portal.mp4` | 11,202,673 | 1438x942 | 16.213 s |

## Validation evidence

- Exactly 13 project-prefixed local files exist: three PNGs, one JPEG, and nine MP4s.
- Every local file is nonempty and its size matches the authenticated Drive metadata or, for the approved Webflow exception, the HTTP `Content-Length` header.
- PNGs have the `89 50 4E 47 0D 0A 1A 0A` signature and nonzero IHDR dimensions.
- The JPEG has the `FF D8` start marker and a valid SOF dimension record.
- Every MP4 has an `ftyp` signature plus parseable `moov`, `mdat`, `mvhd`, and nonzero video-track dimensions. All nine expose an `avc1` H.264 sample entry and nonzero duration.
- The approved Webflow URL returned HTTP 200, `Content-Type: video/mp4`, and `Content-Length: 3264038`; the local byte count matches.
- SHA-256 hashes were calculated for every file to make the checked inventory reproducible.

| Local filename | SHA-256 |
| --- | --- |
| `feedback-intelligence-central-feedback.mp4` | `c7e4bcac4c1dc9f94a83e893bbfe9bed61667a0526d003bfdc02ebf7e25c6a11` |
| `feedback-intelligence-customer-portal.mp4` | `9e238aecd8fe873306101fa76d5a391dd2dedff9293c2445162ee4426d978f3a` |
| `feedback-intelligence-hero-insights.mp4` | `09555ab52b67ba97e0bcd455dda0f1b3b94f67736a9ca557afcd4537e9e6b1df` |
| `feedback-intelligence-jira.mp4` | `0a11fb4a57ed457baf58ae7024c52376ee36a2bc50b0085e0031a75fda93dcd1` |
| `feedback-intelligence-lower-barrier.mp4` | `b0177fa4f2a1f1ab9c8dd9a55911f3183f1c82414194573a2ddc4e6e1353d1c7` |
| `feedback-intelligence-presentation.mp4` | `c070ad3413cd5528eb2435e3fc7132976c21c9ed34178af93f48e464c602ee2f` |
| `feedback-intelligence-product-models.png` | `4d2d4ab07e06718eb23e6deb04267f42133dbb05dd390868a0d704e74acb572c` |
| `feedback-intelligence-prototype.mp4` | `6e56e838267357bb7f507d3e86b2e63bced4e241b5f6af6a00d6202720c81393` |
| `feedback-intelligence-scheduling.mp4` | `3b363a4dd74ae0627f8f35efaaf8a859f81a3af1885da375bb2ac4f79878adc1` |
| `feedback-intelligence-source-verification.mp4` | `7e249dd347f40052fa8dbe04933bf1da699ab581b9456789e0ee90b7fe348f4e` |
| `feedback-intelligence-thumbnail.png` | `b9681343a6374c86130a00c399cf774a6911874e252c503511cda8b70a397433` |
| `feedback-intelligence-user-flow.jpg` | `305c45289a9855d19e3e6953dc01cfe26235e7bc0a50d4722de78a7ffe236666` |
| `feedback-intelligence-workshop-map.png` | `f9850df071e4f4e3eb7834c58c56cec856bd0e48d192978322a427455730da5f` |

## Operations and commands

Connected Drive operation, issued for each of the 12 approved Drive sources:

```text
google_drive_fetch(url=<approved Drive URL>, download_raw_file=true, include_base64=true)
```

The authenticated connector bytes were decoded directly into their final project-prefixed paths. No temporary base64 staging files were created.

Approved Webflow exception acquisition and metadata check:

```powershell
Invoke-WebRequest -Uri <approved Webflow URL> -OutFile site\public\portfolio\feedback-intelligence-prototype.mp4
curl.exe -I <approved Webflow URL>
```

Local verification parsed file signatures, image dimensions, MP4 box structure, duration, video dimensions, codec sample entries, sizes, and SHA-256 hashes. Final repository checks used:

```powershell
Get-Item site\public\portfolio\feedback-intelligence-*
git diff --check
git status --short
```

## Commit

The completion commit hash is supplied in the task handoff. The earlier blocker report commit is `6bf3327c573ff2cf37d6eeb1ffc7105f5121ff1e`.

## Concerns

The prototype uses the exact user-approved existing Webflow CDN MP4 rather than the oversized Drive source. Container-level readability was validated locally; no browser playback session was required. No page code was modified.
