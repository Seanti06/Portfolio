import sys
import os
import shutil
from playwright.sync_api import sync_playwright

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
CONV_DIR = r"C:\Users\SEAN\.gemini\antigravity\brain\4eb555b2-a19a-44bc-b8aa-e69ce8b93f0c"
WORKSPACE_DIR = r"C:\Users\SEAN\Portfolio"

def capture():
    index_url = f"file:///{WORKSPACE_DIR.replace(os.sep, '/')}/index.html"
    out_desktop = os.path.join(WORKSPACE_DIR, "assets", "preview-desktop.png")
    out_mobile = os.path.join(WORKSPACE_DIR, "assets", "preview-mobile.png")
    
    os.makedirs(os.path.join(WORKSPACE_DIR, "assets"), exist_ok=True)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=EDGE_PATH, headless=True)
        
        # 1. Desktop capture (1440 x 900)
        context = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page = context.new_page()
        page.goto(index_url, wait_until="networkidle")
        page.wait_for_timeout(600)  # wait for animations / icons
        page.screenshot(path=out_desktop, full_page=False)
        
        # Also capture full page view
        out_full = os.path.join(WORKSPACE_DIR, "assets", "preview-full.png")
        page.screenshot(path=out_full, full_page=True)
        brain_full = os.path.join(CONV_DIR, "preview-full.png")
        shutil.copyfile(out_full, brain_full)
        
        # Copy to brain artifact directory for display
        brain_preview = os.path.join(CONV_DIR, "preview-desktop.png")
        shutil.copyfile(out_desktop, brain_preview)
        
        # 2. Mobile capture (390 x 844 iPhone size)
        mobile_context = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2)
        mobile_page = mobile_context.new_page()
        mobile_page.goto(index_url, wait_until="networkidle")
        mobile_page.wait_for_timeout(400)
        mobile_page.screenshot(path=out_mobile, full_page=False)
        
        browser.close()
        print(f"Captured: {out_desktop} and copied to {brain_preview}")

if __name__ == "__main__":
    capture()
