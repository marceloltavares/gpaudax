from playwright.sync_api import sync_playwright, expect
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Get absolute path to index.html
        cwd = os.getcwd()
        file_path = f"file://{cwd}/index.html"
        print(f"Loading {file_path}")

        page.goto(file_path)

        # Wait for page to load
        page.wait_for_load_state("networkidle")

        # Screenshot Hero Section
        print(" taking screenshot of Hero section...")
        page.screenshot(path="verification/hero.png")

        # Scroll to first separator
        print("Scrolling to separator-1...")
        separator1 = page.locator(".separator-1")
        separator1.scroll_into_view_if_needed()
        # Add a small delay to let scrolling settle
        page.wait_for_timeout(500)
        page.screenshot(path="verification/separator1.png")

        # Scroll to second separator
        print("Scrolling to separator-2...")
        separator2 = page.locator(".separator-2")
        separator2.scroll_into_view_if_needed()
        page.wait_for_timeout(500)
        page.screenshot(path="verification/separator2.png")

        browser.close()

if __name__ == "__main__":
    run()
