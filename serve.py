#!/usr/bin/env python3
"""
Stellar Atlas — local dev server.

Just run:  python3 serve.py
Then visit:  http://localhost:8000

Why a server is needed:
    Browsers refuse to fetch sibling files (data.js, app.jsx) when you open
    src/index.html via file:// — they treat each file as a different origin
    and block cross-origin requests. This is a security feature, not a bug.
    A 5-line HTTP server is the simplest fix. No npm, no dependencies.

To stop:  Ctrl+C
"""
import http.server
import socketserver
import os
import webbrowser

PORT = 8000
DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)
    def end_headers(self):
        # Set MIME type for .jsx so Babel picks it up correctly
        if self.path.endswith(".jsx"):
            self.send_header("Content-Type", "application/javascript")
        super().end_headers()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"\n  Stellar Atlas serving at:  {url}")
        print(f"  Files from:                {DIR}")
        print(f"  Press Ctrl+C to stop.\n")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n  Bye.")
