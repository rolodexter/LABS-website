## 🛠️ URGENT: SITE MUST BE STABLE FOR EXTERNAL REVIEW

Your immediate objective is to **ensure a clean, production-ready deploy** of the `rolodexterLABS` website. The site is now live but exhibits several key issues that must be addressed ASAP.

---

### 🚨 CRITICAL FIXES (BLOCKING DEPLOY)

1. **Dashboard Access Placement**
   - ❌ Currently front and center on homepage.
   - ✅ Move the "Login" or dashboard access link to the **top-right corner**, very subtle (text link: `login`) — minimalist and not the primary CTA.

2. **Footer Duplication**
   - ❌ Some pages render **duplicate footers**.
   - ✅ Identify and **remove extra `<Footer />`** instances — ensure global layout applies it only once.

3. **Dashboard Render Failure**
   - ❌ Dashboard fails due to type mismatch:
     ```ts
     Type 'string | Email' is not assignable to type 'ReactNode'
     ```
   - ✅ Cast to string or extract only email strings:
     ```ts
     const displayName = String(user?.email || user?.twitter?.username || user?.github?.username || 'User')
     ```
     And use:
     ```tsx
     <h2>Welcome, {displayName}</h2>
     ```

4. **Login Button**
   - ✅ Ensure login route is working (`/login`) and connect to Privy/GitHub/Twitter/Web3 per intended logic.

---

### 🧩 PRODUCTS & SERVICES PAGE

Create a clean **Products** or **What We Offer** page, showcasing these **service categories**:

- **Operating Systems**
  - LinuxAI
- **Software Products**
  - rolodexterGPT, rolodexterVS, rolodexterGIT, rolodexterAPI
- **Services**
  - Model Development
  - Worker Design / Work-as-a-Service
  - Creative & Content Agents
  - Executive & Decision Support Tools
  - Knowledge Systems
  - Metascience, Scientific Pipelines
  - Synthetic Discovery Labs

Use uploaded markdown docs as content templates — build dynamic pages or markdown-driven components (e.g. `/services/model-development`, etc).

---

### 🧪 SECONDARY TO-DOs (NEXT AFTER FIXES)

- [ ] Unify black/white minimalist aesthetic — some pages deviate.
- [ ] Hide or comment out broken routes temporarily if not needed yet (e.g., broken `/dashboard` pages).
- [ ] Add meta tags + description (minimal SEO hygiene).
- [ ] Set default landing CTA to **explore rolodexterLABS**, not login.

---

Once the above is addressed, **commit changes to GitHub** to trigger Railway redeploy. Tag commit clearly:
```bash
git commit -m "Hotfix: Dashboard UX + Footer + Login Positioning + Build Errors"
```
