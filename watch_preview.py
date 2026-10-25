import time
import os
import sys
import subprocess
from capture_preview import capture

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

WATCH_FILES = ["index.html", "styles.css", "script.js"]

def get_mtimes():
    mtimes = {}
    for f in WATCH_FILES:
        if os.path.exists(f):
            mtimes[f] = os.path.getmtime(f)
    return mtimes

def main():
    print("=" * 60)
    print("[PLAYWRIGHT LIVE WATCHER ACTIVE]")
    print("Watching index.html, styles.css, script.js for changes...")
    print("Whenever you save a file, Playwright will capture a fresh screenshot.")
    print("Press Ctrl+C to stop.")
    print("=" * 60)
    
    last_mtimes = get_mtimes()
    
    while True:
        try:
            time.sleep(1)
            current_mtimes = get_mtimes()
            changed = False
            for f, mtime in current_mtimes.items():
                if f not in last_mtimes or mtime > last_mtimes[f]:
                    changed = True
                    print(f"\n[DETECTED CHANGE] in {f} -> Triggering Playwright capture...")
                    break
            
            if changed:
                last_mtimes = current_mtimes
                capture()
                print("[OK] Screenshot updated in assets/preview-desktop.png and assets/preview-full.png")
        except KeyboardInterrupt:
            print("\nWatcher stopped.")
            break
        except Exception as e:
            print(f"Error during capture: {e}")

if __name__ == "__main__":
    main()
