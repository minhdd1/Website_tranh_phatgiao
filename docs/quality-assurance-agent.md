# Quality Assurance Agent Rules

## Purpose

No task is considered complete until:

1. Implementation is finished.
2. Application builds successfully.
3. Visual testing is completed.
4. Responsive testing is completed.
5. Accessibility review is completed.
6. Screenshots are captured.
7. Findings are documented.
8. Issues are fixed.
9. Final verification passes.

---

# Definition of Done

A task is NOT complete when:

* Code compiles.
* Page renders.
* Feature appears to work.

A task is complete ONLY when:

* Build passes.
* Tests pass.
* Screenshots are reviewed.
* No critical UI defects remain.

---

# Mandatory Verification Workflow

For every completed task:

Step 1:
Implement feature.

Step 2:
Run lint.

Step 3:
Run type checking.

Step 4:
Run production build.

Step 5:
Launch local preview.

Step 6:
Perform responsive testing.

Step 7:
Capture screenshots.

Step 8:
Review screenshots.

Step 9:
Fix issues.

Step 10:
Retest.

Step 11:
Generate completion report.

---

# Build Verification

Required:

npm run lint

npm run type-check

npm run build

All commands must pass.

No warnings should be ignored.

---

# Browser Testing

Required browsers:

* Chrome
* Edge
* Safari
* Firefox

If browser automation is unavailable:

Use Chromium testing and document limitation.

---

# Responsive Testing

Required viewports:

## Mobile Small

320 × 568

Example:

iPhone SE

---

## Mobile Standard

390 × 844

Example:

iPhone 14

---

## Android Large

412 × 915

Example:

Pixel 8

---

## Tablet

768 × 1024

Example:

iPad

---

## Laptop

1366 × 768

---

## Desktop

1920 × 1080

---

# Mandatory Screenshot Capture

Capture screenshots for every viewport.

Store screenshots under:

/qa/screenshots

Example:

/qa/screenshots/home-mobile.png

/qa/screenshots/home-tablet.png

/qa/screenshots/home-desktop.png

---

# Screenshot Review Checklist

Verify:

* No overlapping text
* No clipped content
* No overflow
* No horizontal scroll
* No broken images
* No layout shifts
* No duplicate navigation
* No hidden buttons
* No inaccessible controls

---

# OCD-Friendly Validation

Because this project follows OCD-Friendly Design Principles:

Every screenshot must verify:

* Symmetrical layout
* Equal spacing
* Consistent alignment
* Consistent card height
* Consistent image ratios
* Visual balance

Reject any page that appears visually messy.

---

# Navigation Testing

Verify:

Desktop Navigation

* Visible
* Aligned
* Clickable

Mobile Navigation

* Opens correctly
* Closes correctly
* Covers screen correctly
* Does not overlap hero content
* No duplicate menu

---

# Hero Section Testing

Verify:

* Headline visible
* Subtitle readable
* CTA visible
* No overlap
* No clipping

---

# Gallery Testing

Verify:

* Equal image ratios
* Equal card heights
* Proper spacing
* Lightbox works

Reject:

* Masonry layouts
* Uneven grids
* Cropped artwork

---

# Form Testing

Verify:

Contact Form

* Validation works
* Submit works
* Success state appears
* Error state appears

---

# Accessibility Review

Verify:

* Semantic HTML
* Keyboard navigation
* Focus states
* Contrast ratio
* Screen reader labels

Target:

WCAG AA

---

# Performance Review

Run Lighthouse.

Targets:

Performance ≥ 90

Accessibility ≥ 95

Best Practices ≥ 95

SEO ≥ 95

---

# Visual Regression Review

Compare:

Before Screenshot

vs

After Screenshot

Verify:

* No unintended changes
* No broken layouts
* No spacing regressions

---

# Completion Report

Every task must generate:

## Task

Description

## Build Status

PASS / FAIL

## Responsive Status

PASS / FAIL

## Accessibility Status

PASS / FAIL

## Screenshot Review

PASS / FAIL

## Lighthouse Scores

Performance:

Accessibility:

Best Practices:

SEO:

## Issues Found

List all issues.

## Issues Fixed

List all fixes.

## Final Result

PASS / FAIL

---

# Completion Policy

Never claim:

"Task completed"

unless:

All verification steps pass.

If any verification fails:

Continue fixing until resolved.

Only then mark task complete.
