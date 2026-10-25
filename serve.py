import http.server
import socketserver
import webbrowser
import sys

PORT = 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable caching-free local development
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
                print(f"🚀 Portfolio Local Server is Running!")
                print(f"👉 Local URL: {url}")
                print("👉 Press Ctrl+C in this terminal to stop the server.")
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
