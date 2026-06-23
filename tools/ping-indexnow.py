#!/usr/bin/env python3
"""
IndexNow Auto-Ping Script
Run this after every deploy: python3 ping-indexnow.py
Notifies Google, Bing and Yandex of all new/updated pages instantly.
"""
import urllib.request, json, datetime

KEY  = "cc02b558a0bd4a69ae052b226cbe50e5"
HOST = "ahsan-jannat.netlify.app"
BASE = "https://ahsan-jannat.netlify.app"

URLS = [
    f"{BASE}/index.html",
    f"{BASE}/about.html",
    f"{BASE}/services.html",
    f"{BASE}/experience.html",
    f"{BASE}/case-studies.html",
    f"{BASE}/blog.html",
    f"{BASE}/contact.html",
    f"{BASE}/free-audit.html",
    f"{BASE}/blog/meta-ads-complete-guide-2026.html",
    f"{BASE}/blog/meta-ads-targeting-options-2026.html",
    f"{BASE}/blog/meta-ads-campaign-objectives-2026.html",
    f"{BASE}/blog/meta-ads-retargeting-setup-2026.html",
    f"{BASE}/blog/meta-ads-creative-strategy-2026.html",
    f"{BASE}/blog/how-to-use-ai-in-content-writing.html",
    f"{BASE}/blog/how-to-do-keyword-research-for-seo.html",
    f"{BASE}/blog/on-page-seo-complete-guide.html",
    f"{BASE}/blog/seo-vs-sem.html",
    f"{BASE}/blog/seo-vs-aeo-vs-geo.html",
    f"{BASE}/blog/how-to-rank-in-ai-overviews.html",
    f"{BASE}/blog/technical-seo-checklist-2026.html",
    f"{BASE}/blog/what-is-geo.html",
    f"{BASE}/blog/google-business-profile-optimization.html",
    f"{BASE}/blog/link-building-2026.html",
    f"{BASE}/blog/core-web-vitals-2026.html",
    f"{BASE}/blog/how-to-win-paa-boxes.html",
    f"{BASE}/blog/website-security-seo-factor.html",
    f"{BASE}/blog/website-security-checklist-2026.html",
    f"{BASE}/blog/https-ssl-mistakes-seo.html",
    f"{BASE}/blog/recover-seo-after-hack.html",
    f"{BASE}/blog/wordpress-security-basics-2026.html",
]

def ping_indexnow():
    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": f"{BASE}/{KEY}.txt",
        "urlList": URLS
    }
    data = json.dumps(payload).encode("utf-8")
    req  = urllib.request.Request(
        "https://api.indexnow.org/indexnow",
        data=data,
        headers={"Content-Type":"application/json; charset=utf-8"},
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            print(f"IndexNow → {r.status} {r.reason}")
    except Exception as e:
        print(f"IndexNow error: {e}")

def ping_google_sitemap():
    url = f"https://www.google.com/ping?sitemap={BASE}/sitemap.xml"
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            print(f"Google sitemap ping → {r.status}")
    except Exception as e:
        print(f"Google ping error: {e}")

def ping_bing_sitemap():
    url = f"https://www.bing.com/ping?sitemap={BASE}/sitemap.xml"
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            print(f"Bing sitemap ping → {r.status}")
    except Exception as e:
        print(f"Bing ping error: {e}")

if __name__ == "__main__":
    print(f"\n🚀 Pinging search engines — {datetime.datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"   URLs: {len(URLS)} pages")
    print(f"   Key:  {KEY[:8]}...\n")
    ping_indexnow()
    ping_google_sitemap()
    ping_bing_sitemap()
    print("\n✅ Done — pages will be crawled and indexed within minutes to hours.")
    print("   Check: https://search.google.com/search-console")
