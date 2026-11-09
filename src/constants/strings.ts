/**
 * Centralized string constants for the HappyDose landing page
 * Mirrors binate-app pattern: all user-facing text lives here
 */

export const strings = {
  // Brand
  brand: {
    name: "HappyDose",
    tagline: "The supplement compliance app",
    supportEmail: "elhussali@gmail.com",
    privacyEmail: "privacy@gethappydose.app",
    legalEmail: "legal@gethappydose.app",
    url: "https://gethappydose.app",
  },

  // Navigation
  nav: {
    features: "How it works",
    waitlist: "Get Early Access",
  },

  // Hero
  hero: {
    badge: "AI Insights inside — join the first wave",
    titleBefore: "Finally feel what your supplements",
    titleHighlight: "were supposed to do.",
    subtitle:
      "Your \"wellness routine\" is a shelf full of half-empty bottles and the quiet, confused feeling of trying. HappyDose is the AI that finally turns the supplements you already paid for into results you can actually feel.",
    goalsLabel: "Built around what you're actually chasing",
    goals: [
      { emoji: "⚡", label: "Energy" },
      { emoji: "🌙", label: "Sleep" },
      { emoji: "💪", label: "Muscle Gain" },
      { emoji: "🌿", label: "General Health" },
    ],
    cta: "Get Early Access",
    emailPlaceholder: "Your email",
  },

  // Problem section
  problem: {
    title: "Let's be honest about what's actually in your cabinet.",
    subtitle:
      "You're not new to this. You've been buying supplements for years — every one of them promised something. Some of them probably even worked, for a minute. But nobody ever sat you down and explained how this actually works. So you did what every smart person does when nobody is teaching them: you guessed. And you've been quietly paying for that guess ever since.",
    items: [
      {
        pain: "Half the things in your stack are quietly fighting each other, and you're the one losing.",
        solution:
          "Zinc and calcium cancel each other out. Iron and coffee? Expensive placebo. HappyDose catches the fight the second you add a new bottle — and shows you a better set of timings to accept or ignore, so your money actually reaches your bloodstream.",
      },
      {
        pain: "You've been on it for months. Is it working? You honestly couldn't tell me.",
        solution:
          "How long until it kicks in? What should you feel? You can't answer any of it — because you've been flying blind. HappyDose builds you the timeline that finally turns \"is it working?\" into a fact.",
      },
      {
        pain: "You're quietly losing the one thing supplements are supposed to give you: momentum.",
        solution:
          "It takes about four weeks to start absorbing properly. That's usually the week you give up. So no — you didn't just waste money. You paid full price to stop right before it was going to work, losing data, trust and more...With HappyDose - the story finally turns around.",
      }
    ],
  },

  // Pharmacokinetics section — the "took it ≠ absorbed" wake-up call
  absorption: {
    eyebrow: "The one fact nobody selling supplements wants you to know",
    title: "Yes, you took the supplement.",
    titleHighlight: "But does that mean it got absorbed?",
    body:
      "Or did you just assume that because it's in your system, *it's in your system*? Those are not the same sentence. A pill can travel through you completely undigested — blocked by the wrong food, sabotaged by the wrong timing, or canceled out by the wrong neighbor in the same dose. This isn't opinion. It's basic _pharmacokinetics_. It's in every first-year nutrition textbook, every clinical absorption study, and every honest conversation between a pharmacist and a patient who finally asks the right question. The supplement industry has spent twenty years making sure you never ask it. HappyDose is built around it.",
  },

  // Mid-page reframe section (Option 3 — loss aversion / "you already paid")
  reframe: {
    eyebrow: "The math nobody does",
    title: "You're already paying for results.",
    titleHighlight: "It's time to actually get them.",
    body:
      "The average serious supplement buyer spends between $80 and $300 a month on bottles that never reach their bloodstream. Yes — inside the body doesn't mean absorbed. Pills can pass through you completely undigested, blocked by the wrong food, the wrong timing, or the wrong neighbor in the same dose. You wouldn't buy a gym membership and never go. You wouldn't order food and throw half of it in the bin. Stop doing it with the supplements you already swiped your card for.",
  },

  // How it works
  howItWorks: {
    eyebrow: "Bring us your bottles. We'll build you the schedule that turns them into results.",
    title: "Three things we do that nobody else is doing properly.",
    subtitle:
      "We didn't build another reminder app. We built the thing that should have existed the whole time — a real method, designed around your body, your routine, and your doctor. Not a replacement for either of them. The missing layer in between. Here's exactly what that looks like.",
    steps: [
      {
        number: "01",
        title: "We turn your shelf into a schedule that actually holds up.",
        description:
          "Scan a bottle — takes five seconds. Then you choose where the timing comes from: the manufacturer's label, your doctor's advice, your own research, or our AI. We handle the rest — empty stomach, away from your morning coffee, away from the calcium in your breakfast. In under a minute, your shelf stops being decoration and starts being a schedule built around your actual day.",
      },
      {
        number: "02",
        title: "Our AI watches every dose and tells you the truth.",
        description:
          "First-of-its-kind. Our in-app AI is live today — it flags absorption conflicts the second you add a bottle, suggests better timings for you to accept or ignore, and spots the patterns you'd miss in your own data. This is the layer every other supplement app will try to add in two years — you get it on day one. It never lies to make you feel good. If something isn't working, it will say so out loud.",
      },
      {
        number: "03",
        title: "We complete your doctor's plan. We don't replace it.",
        description:
          "Your physician has the final word. HappyDose logs your doctor's recommendations and turns your daily intake into a clean timeline. The AI flags what changed and suggests what to ask next — but your physician decides what you take.",
      },
    ],
  },

  // Features section — DEFERRED until we have app screenshots and real visuals.
  // When the MVP is built, populate this with feature cards (icon, title, description)
  // and render them on the page. For now this section is intentionally omitted.
  features: null,

  // Closing pitch (replaces the "quote" section — this is HappyDose's manifesto)
  manifesto: {
    eyebrow: "What this app actually believes",
    titleLines: [
      "Taking your supplements",
      "is the part you already paid for.",
      "Getting results from them",
      "is the part everyone skips.",
    ],
    body:
      "You wouldn't take a course and never finish it. You wouldn't sign up for the gym and never go. But every year, billions of dollars in supplements rot in medicine cabinets — bought with intention, abandoned without a system. HappyDose is for people who are done buying hope and ready to buy a method. One that respects the doctor who prescribed it, and the body that has to live with it.",
  },

  // Waitlist
  waitlist: {
    title: "Get inside AI Insights before anyone else does.",
    subtitle:
      "We're letting in a small batch of founding users before public launch. If you're on the list, you get: first access the moment we open the doors, a permanent founding-member price nobody after you will ever see again, a direct line to us while we shape AI Insights around real people like you, and the slightly unfair advantage of being on the inside of something that's going to become the standard in this space. No spam. No fluff. Just the email that says \"you're in.\"",
    namePlaceholder: "Your name (optional)",
    emailPlaceholder: "Your email",
    submitButton: "Claim My Spot",
    submitting: "Joining...",
    successMessage: "You're in. Welcome to the inside. We'll be in touch soon.",
    alreadyOnList: "You're already on the list — and your spot is safe.",
    errorMessage: "Something went wrong. Please try again.",
  },

  // Auth confirmation intermediary page (/auth/confirm)
  authConfirm: {
    headingRecovery: "Reset your password",
    headingVerified: "Email Verified!",
    headingOpening: "Opening HappyDose...",
    bodyTapToOpen:
      "Tap the button below to open the HappyDose app and continue.",
    bodyError:
      "Something went wrong. Please open the HappyDose app manually and try again.",
    bodyAutoRedirect: "You should be redirected to the app automatically.",
    openButton: "Open HappyDose",
  },

  // Footer
  footer: {
    tagline: [
      "Taking your supplements is the part you already paid for.",
      "Getting results from them is the part everyone skips.",
    ],
    copyright: (year: number) =>
      `\u00A9 ${year} HappyDose. All rights reserved.`,
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    deleteAccount: "Delete Account",
  },

  // Admin
  admin: {
    title: "Admin",
    subtitle: "Enter the admin password to continue.",
    passwordPlaceholder: "Password",
    signIn: "Sign in",
    checking: "Checking...",
    wrongPassword: "Wrong password.",
    genericError: "Something went wrong.",
    networkError: "Network error. Try again.",

    // Tabs
    tabWaitlist: "Waitlist",
    tabFeedback: "Feedback",

    // Waitlist
    waitlistTitle: "Waitlist",
    signup: "signup",
    signups: "signups",
    noSignups: "No signups yet.",
    columnEmail: "Email",
    columnName: "Name",
    columnJoined: "Joined",
    noName: "—",

    // Feedback
    feedbackTitle: "Feedback",
    noFeedback: "No feedback from users yet.",
    noFeedbackMatching: "No feedback matches the current filters.",
    feedbackCount: (n: number) =>
      `${n} ${n === 1 ? "feedback" : "feedbacks"}`,
    filterAll: "All",
    sortNewest: "Newest first",
    sortMostHearts: "Most hearts",
    sortMostComments: "Most comments",
    sortLabel: "Sort",
    categoryLabel: "Category",
    statusLabel: "Status",
    priorityLabel: "Priority",
    commentsLabel: (n: number) => `${n} ${n === 1 ? "comment" : "comments"}`,
    heartsLabel: (n: number) => `${n} ${n === 1 ? "heart" : "hearts"}`,
    attachmentsLabel: (n: number) =>
      `${n} ${n === 1 ? "attachment" : "attachments"}`,
    replyPlaceholder: "Reply as HappyDose Team...",
    sendReply: "Send reply",
    sending: "Sending...",
    deleteConfirm: "Delete this feedback? This cannot be undone.",
    deleteCommentConfirm: "Delete this comment?",
    deleteFeedback: "Delete feedback",
    adminReplyLabel: "HappyDose Team",
    openComments: "View comments",
    closeComments: "Hide comments",
  },

  // Meta / SEO
  meta: {
    title: "HappyDose — Actually take your supplements correctly",
    description:
      "Stop forgetting. Stop mixing the wrong things. Stop buying bottles you never finish. HappyDose is the supplement system that turns intention into measurable results.",
    ogDescription:
      "The supplement compliance app for people who are done buying hope.",
  },

  // Privacy Policy
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "April 8, 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: null,
        intro: "We collect the following information when you use HappyDose:",
        list: [
          "Account information: email address, name, and profile details when you sign in (via Apple, Google, or email)",
          "Supplement stack data: the supplements you add, dosages, timing, meal context, and notes",
          "Intake logs: when you took each dose, whether you took it on time, deferred it, or missed it",
          "Doctor profile data: any doctor names, recommendation dates, and overrides you choose to log",
          "Health context (optional): goal, experience level, and biometrics (age, weight, height, sex) if you provide them",
          "Blood test uploads (optional, V2 feature): any test results you choose to upload for AI-assisted observations",
          "Waitlist information: email address and name if you join our waitlist before launch",
        ],
      },
      {
        heading: "2. How We Use Your Information",
        body: null,
        intro: "We use the information we collect to:",
        list: [
          "Provide and personalize the HappyDose app experience",
          "Send reminders and notifications for your scheduled supplement doses",
          "Calculate consistency scores, streaks, and pattern insights from your intake history",
          "Detect supplement interaction conflicts and warn you in real time",
          "Process payments and manage your subscription",
          "Improve the product based on aggregated, anonymized usage data",
          "Communicate with you about product updates and account-related notices",
        ],
      },
      {
        heading: "3. Health Data & Sensitivity",
        body: "HappyDose collects information that could be considered health data — including supplements you take, when you take them, and any optional biometrics or blood test results you upload. We treat this information with elevated care: it is encrypted in transit and at rest, never sold, and never shared with advertisers. HappyDose is not a medical device and does not provide medical advice.",
      },
      {
        heading: "4. Data Storage",
        body: "Your data is stored securely using Supabase, which provides enterprise-grade security with row-level security (RLS) policies and encrypted connections. Reminder schedules and intake logs may also be stored locally on your device using encrypted storage so the app works offline. Your data is hosted in data centers that comply with industry security standards.",
      },
      {
        heading: "5. Third-Party Services",
        body: null,
        intro: "We use the following third-party services to operate HappyDose:",
        list: [
          "Supabase: database, authentication, and file storage",
          "Apple & Google: optional one-tap sign-in providers",
          "RevenueCat: payment processing and subscription management (we never store your card details)",
          "Sentry: error tracking and performance monitoring",
          "PostHog: product analytics (opt-out available; no personally identifying info is shared)",
          "Resend: transactional email delivery",
          "Expo: app build, push notification delivery, and over-the-air updates",
          "Open Food Facts: open-source supplement product database (used to enrich barcode scans)",
        ],
      },
      {
        heading: "6. Data Sharing",
        body: "We do not sell, trade, or rent your personal information to third parties. We share data only with the service providers listed above, solely to operate the app, and only to the minimum extent necessary. These providers are contractually obligated to keep your information confidential.",
      },
      {
        heading: "7. Your Rights",
        body: null,
        intro: "You have the right to:",
        list: [
          "Request access to the personal data we hold about you",
          "Request correction or deletion of your personal data",
          "Export your data in a portable format",
          "Delete your account and all associated data",
          "Withdraw your consent for optional features at any time",
          "Lodge a complaint with your local data protection authority",
        ],
      },
      {
        heading: "8. Data Retention",
        body: "We retain your data for as long as your account is active. If you delete your account, all personal data is permanently removed within 30 days. Anonymized, aggregated data may be retained for product improvement purposes.",
      },
      {
        heading: "9. GDPR & International Users",
        body: "HappyDose is operated from Spain and complies with the EU General Data Protection Regulation (GDPR). If you are located in the European Economic Area, you have additional rights under GDPR including the right to data portability and the right to object to processing.",
      },
      {
        heading: "10. Cookies & Local Storage",
        body: "Our website uses local storage only to remember your theme preference. The mobile app uses on-device encrypted storage for offline functionality and preferences. We do not use tracking cookies or third-party advertising cookies.",
      },
      {
        heading: "11. Children's Privacy",
        body: "HappyDose is not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe a child has provided us with personal information, please contact us and we will delete it.",
      },
      {
        heading: "12. Changes to This Policy",
        body: "We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the app or website after changes constitutes acceptance.",
      },
      {
        heading: "13. Contact",
        body: null,
        contactEmail: "privacy@gethappydose.app",
        contactEmailAlt: "elhussali@gmail.com",
        contactIntro:
          "If you have any questions about this privacy policy or wish to exercise your rights, please contact us at",
      },
    ],
  },

  // Terms of Service
  terms: {
    title: "Terms of Service",
    lastUpdated: "September 16, 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By creating an account or using the HappyDose application or website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
      },
      {
        heading: "2. Description of Service",
        body: "HappyDose is a supplement tracking and compliance application that helps users build, manage, and stay consistent with their supplement routines. The service includes a mobile application (iOS and Android), a companion website, and supporting backend services.",
      },
      {
        heading: "3. Not Medical Advice",
        body: "HappyDose is a tracking and information tool — it is not a medical device, healthcare provider, or a substitute for professional medical advice, diagnosis, or treatment. All supplement information, scores, timing suggestions, interaction warnings, and AI-generated recommendations are provided for general informational purposes only, are based on publicly available data, curated rules, and automated analysis, and may be incomplete or inaccurate. A qualified healthcare practitioner has the final say. You should always consult a qualified healthcare professional — and do your own research — before starting, stopping, or changing any supplement regimen, especially if you have a medical condition, are pregnant or nursing, or are taking prescription medication.",
      },
      {
        heading: "4. Account Registration",
        body: "You may sign in to HappyDose using Apple, Google, or email. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information.",
      },
      {
        heading: "5. Subscription & Payments",
        body: "HappyDose offers a free trial followed by paid subscription tiers. Subscriptions are processed through Apple App Store or Google Play and auto-renew unless cancelled. Refunds are handled in accordance with the applicable platform's policies. We reserve the right to change pricing with reasonable notice to existing subscribers.",
      },
      {
        heading: "6. User Content",
        body: "You retain ownership of all content you create in HappyDose, including your supplement stack, intake logs, doctor profiles, notes, and any uploaded blood test results. By submitting feedback through the app, you grant us permission to use it for product improvement purposes. You may delete your content at any time.",
      },
      {
        heading: "7. User Conduct",
        body: null,
        intro: "You agree not to:",
        list: [
          "Use the service for any unlawful purpose",
          "Submit false, misleading, or harmful information",
          "Attempt to interfere with the proper operation of the service",
          "Reverse-engineer, decompile, or disassemble the application",
          "Use automated systems to access the service without permission",
          "Share your account credentials with others",
          "Use the app to make medical decisions without consulting a qualified healthcare professional",
        ],
      },
      {
        heading: "8. Health & Safety Disclaimer",
        body: "Supplement interactions, dosage information, scores, and timing recommendations in HappyDose are sourced from manufacturer labels, public databases, curated rules, and automated (AI) analysis. They are not exhaustive and may not apply to your specific situation. Your use of, and any reliance on, the app and its information is entirely at your own risk and discretion, and you are solely responsible for your own health decisions. To the maximum extent permitted by law, HappyDose accepts no liability and no responsibility for any adverse effects, injury, loss, missed doses, or health outcomes arising from your use of — or reliance on — the app. Always read supplement labels, follow your doctor's instructions, and seek immediate medical attention if you experience an adverse reaction.",
      },
      {
        heading: "9. Intellectual Property",
        body: "All content, branding, design, and code in the HappyDose application and website are the property of HappyDose and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.",
      },
      {
        heading: "10. Limitation of Liability",
        body: 'HappyDose is provided "as is" without warranties of any kind, either express or implied. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services, including but not limited to missed reminders, lost data, inaccurate interaction warnings, or health outcomes.',
      },
      {
        heading: "11. Termination",
        body: "We may suspend or terminate your account if you violate these terms. You may delete your account at any time from within the app or by contacting us. Upon termination, your data will be handled in accordance with our Privacy Policy.",
      },
      {
        heading: "12. Changes to Terms",
        body: "We reserve the right to modify these terms at any time. We will notify users of significant changes via email or in-app notification. Continued use of the service after changes constitutes acceptance of the updated terms.",
      },
      {
        heading: "13. Governing Law",
        body: "These terms are governed by the laws of Spain, where HappyDose is operated. Any disputes shall be resolved in the courts of Spain, except where local consumer protection laws grant you additional rights.",
      },
      {
        heading: "14. Contact",
        body: null,
        contactEmail: "legal@gethappydose.app",
        contactEmailAlt: "elhussali@gmail.com",
        contactIntro: "For questions about these terms, please contact us at",
      },
    ],
  },

  // Delete Account
  deleteAccount: {
    title: "Delete Your Account",
    subtitle:
      "Request permanent deletion of your HappyDose account and all associated data.",
    backToHome: "← Back to home",
    inAppHeading: "In-App Deletion",
    inAppIntro:
      "The fastest way to delete your account is directly from the HappyDose app:",
    inAppSteps: [
      "Open the HappyDose app",
      "Go to the Profile tab",
      "Tap Account Settings",
      "Tap Delete Account and confirm",
    ],
    inAppFooter:
      "Your account and all associated data will be permanently deleted within 30 days.",
    emailHeading: "Request via Email",
    emailIntro: "If you cannot access the app, send a deletion request to:",
    emailPrimary: "privacy@gethappydose.app",
    emailAlt: "elhussali@gmail.com",
    emailFooter:
      "Include the email address associated with your HappyDose account in your request. We will process your deletion within 30 days and confirm via email when complete.",
    whatGetsDeletedHeading: "What Gets Deleted",
    whatGetsDeleted: [
      "Account information (email, name, profile)",
      "Your full supplement stack (supplements, dosages, schedules)",
      "All intake logs and consistency history",
      "Doctor profiles and recommendation overrides",
      "Any biometric data or blood test uploads",
      "Streaks, scores, and analytics history",
      "Notification preferences and settings",
      "All feedback and submitted content",
    ],
    retentionHeading: "Data Retention",
    retentionBody:
      "Anonymized, aggregated data may be retained for product improvement purposes. Active subscriptions should be cancelled before account deletion to avoid further charges.",
  },
} as const;
