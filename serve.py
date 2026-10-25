import http.server
import socketserver
import webbrowser
import sys
import os

# Ensure UTF-8 output on Windows console
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

PORT = 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Disable cache for local development
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run():
    global PORT
    for attempt_port in [3000, 8000, 8080, 5000]:
        try:
            with socketserver.TCPServer(("", attempt_port), Handler) as httpd:
                PORT = attempt_port
                url = f"http://localhost:{PORT}"
                print("=" * 60)
                print(f"[PORTFOLIO LOCAL SERVER RUNNING]")
                print(f"Local URL: {url}")
                print("Press Ctrl+C in this terminal window to stop the server.")
                print("=" * 60)
                
                try:
                    webbrowser.open(url)
                except Exception:
                    pass

                httpd.serve_forever()
                break
        except OSError:
            continue

if __name__ == "__main__":
    try:
        run()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
