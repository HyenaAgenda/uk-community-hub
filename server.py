#!/usr/bin/env python3
"""
Simple HTTP server with client-side routing support for single-page applications.
Serves all requests to index.html so the frontend can handle routing.
"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 8000
HANDLER = http.server.SimpleHTTPRequestHandler

class SPAHandler(HANDLER):
    """Handler that routes all requests to index.html for SPA routing."""
    
    def do_GET(self):
        # Serve actual files if they exist
        if os.path.isfile(self.translate_path(self.path)):
            return super().do_GET()
        
        # Otherwise, serve index.html for client-side routing
        self.path = '/index.html'
        return super().do_GET()

def run_server():
    """Start the development server."""
    with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
        print(f"Server running at http://127.0.0.1:{PORT}/")
        print("Press Ctrl+C to stop the server")
        httpd.serve_forever()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    run_server()
