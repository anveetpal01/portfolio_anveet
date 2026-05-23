# Selenium — cheatsheet

## When to reach for it

- **End-to-end UI testing** against real browsers — cross-browser, cross-OS coverage.
- **Browser automation / web scraping** when the target site needs JS to render.
- **Legacy & enterprise QA suites** — Selenium is mature, polyglot, and supported everywhere.

## Mental model

Selenium WebDriver is a **W3C-standard API** for driving browsers programmatically. Your test code (Python / Java / C# / JS) talks to a **browser driver** (chromedriver, geckodriver) via HTTP / JSON Wire / WebDriver BiDi; the driver talks to the actual browser. Most pain in Selenium comes from **timing** (the DOM changes faster than your script expects) — almost every flaky test is fixed by replacing sleeps with proper waits and using stable locators.

## Key concepts

| Concept | One-line meaning |
|---|---|
| **WebDriver** | The W3C API; the main thing you write code against. |
| **Selenium IDE** | Browser-extension recorder for non-programmers. |
| **Selenium Grid** | Hub + nodes to run tests on many browsers/OS in parallel. |
| **Locators** | `By.id` / `name` / `className` / `tagName` / `linkText` / `cssSelector` / `xpath`. |
| **Implicit wait** | Global polling on every `find_element` (set once). |
| **Explicit wait** | `WebDriverWait(...).until(EC.condition)` — preferred. |
| **Fluent wait** | Explicit wait + custom polling + ignored exceptions. |
| **`StaleElementReferenceException`** | Element reference no longer valid (DOM re-rendered). Re-find it. |
| **`switch_to.frame()`** | Required before interacting with iframe content. |
| **Page Object Model** | Pattern — one class per page; tests call methods, not locators. |
| **Headless mode** | Run browser with no UI — required for CI. |
| **Modern competitors** | Playwright (auto-waits, fast) · Cypress (in-browser, JS only). |

## Minimum example

```python
# Python: log in, assert dashboard visible. Uses explicit waits + POM lite.
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.url = "https://example.com/login"
        self.email = (By.CSS_SELECTOR, "[data-testid='email']")
        self.password = (By.CSS_SELECTOR, "[data-testid='password']")
        self.submit = (By.CSS_SELECTOR, "[data-testid='submit']")

    def login(self, email, password, timeout=10):
        self.driver.get(self.url)
        wait = WebDriverWait(self.driver, timeout)
        wait.until(EC.element_to_be_clickable(self.email)).send_keys(email)
        self.driver.find_element(*self.password).send_keys(password)
        self.driver.find_element(*self.submit).click()


options = webdriver.ChromeOptions()
options.add_argument("--headless=new")        # required in CI
options.add_argument("--window-size=1280,800")

driver = webdriver.Chrome(options=options)
try:
    LoginPage(driver).login("user@x.com", "secret")
    WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "[data-testid='dashboard']"))
    )
    print("login OK")
finally:
    driver.quit()                              # always quit, even on failure
```

## Common pitfalls

- **`time.sleep(5)`** scattered through tests → flaky + slow. Replace with `WebDriverWait` + `expected_conditions`.
- **Mixing implicit + explicit waits** → they compound; behaviour is hard to predict. Pick one strategy.
- **Brittle XPaths** like `/html/body/div[3]/section/div[2]/...` → breaks on any DOM change. Use stable `data-testid` + CSS selectors.
- **Holding element references across actions** → `StaleElementReferenceException`. Re-find after navigation / re-render.
- **Forgetting `driver.quit()` in `finally`** → orphaned browser processes eat CI minutes and RAM.
- **Tests pass locally, fail in CI** — almost always *headless mode + smaller window* + missing waits. Run headless locally to match.

## What to learn next

- **Page Object Model** (or Page Component Model) for any suite > 50 tests
- **pytest-xdist / TestNG** for parallel execution
- **Selenium Grid** + cloud farms (BrowserStack, Sauce Labs)
- **Visual regression** tools (Percy, Applitools) layered on Selenium
- **Playwright / Cypress** as modern alternatives for new projects
- **WebDriver BiDi** — the next-gen bidirectional protocol replacing the old wire format

> **Personal note:** _<TODO: where you've used Selenium (e.g. browser automation scripts) and your favourite stability trick.>_

## Sources

- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [WebDriver W3C Specification](https://www.w3.org/TR/webdriver2/)
- [Selenium on Wikipedia](https://en.wikipedia.org/wiki/Selenium_(software))
- [Selenium GitHub](https://github.com/SeleniumHQ/selenium)
