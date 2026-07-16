param(
  [ValidateSet("deploy-check", "security-audit", "seo-audit", "code-review", "ui-audit", "content-review", "full-audit")]
  [string]$Workflow = "full-audit"
)

$ProjectRoot = "D:\Calcutta Node"
$ReportDir = "$ProjectRoot\reports"
New-Item -ItemType Directory -Path $ReportDir -Force | Out-Null

function Write-Step { param([string]$Step, [string]$Status)
  $icon = switch ($Status) { "OK" { "[OK]" } "WARN" { "[!!]" } default { "[--]" } }
  $color = switch ($Status) { "OK" { "Green" } "WARN" { "Yellow" } default { "Cyan" } }
  Write-Host "$icon $Step" -ForegroundColor $color
}

function Invoke-AgentTask {
  param([string]$Agent, [string]$Task, [string]$OutputFile)
  Write-Step -Step "Invoking $Agent..." -Status "RUN"
  opencode run --agent "$Agent" "$Task" *>> "$OutputFile"
  Write-Step -Step "$Agent finished -> $OutputFile" -Status "OK"
}

function Invoke-SecurityAudit {
  param([string]$ReportFile)
  Write-Step -Step "Security Audit" -Status "RUN"
  Invoke-AgentTask -Agent "Application Security Engineer" -Task "Audit D:\Calcutta Node for security vulnerabilities. Check auth middleware, JWT handling, Razorpay integration, input validation, API security headers, and MongoDB injection risks in both client/ and server/." -OutputFile $ReportFile
}

function Invoke-SEOAudit {
  param([string]$ReportFile)
  Write-Step -Step "SEO Audit" -Status "RUN"
  Invoke-AgentTask -Agent "SEO Specialist" -Task "Audit the Calcutta Node website for SEO. Check meta tags, headings, alt text, structured data, sitemap, robots.txt, Core Web Vitals, and content optimization in client/src/pages/ and client/src/components/." -OutputFile $ReportFile
}

function Invoke-UIAudit {
  param([string]$ReportFile)
  Write-Step -Step "UI/UX Audit" -Status "RUN"
  Invoke-AgentTask -Agent "UI Designer" -Task "Review the UI components in D:\Calcutta Node\client\src\components\ and pages in D:\Calcutta Node\client\src\pages\ for design consistency, responsiveness, accessibility, and user experience." -OutputFile $ReportFile
}

function Invoke-ContentReview {
  param([string]$ReportFile)
  Write-Step -Step "Content Review" -Status "RUN"
  Invoke-AgentTask -Agent "Content Creator" -Task "Review the content in D:\Calcutta Node\client\src\data\ for quality, SEO optimization, and engagement. Check blogs.js, services.js, products.js, and works.js." -OutputFile $ReportFile
}

function Invoke-CodeReview {
  param([string]$ReportFile)
  Write-Step -Step "Code Review" -Status "RUN"
  Invoke-AgentTask -Agent "Code Reviewer" -Task "Review the recent changes in D:\Calcutta Node for code quality, security issues, and best practices. Check both client/ and server/ directories." -OutputFile $ReportFile
}

function Invoke-DeployCheck {
  param([string]$ReportFile)
  Write-Step -Step "Deploy Readiness Check" -Status "RUN"
  Invoke-AgentTask -Agent "DevOps Automator" -Task "Check D:\Calcutta Node for deploy readiness. Verify vercel.json, render.yaml, .env.example, package.json dependencies, and ensure no hardcoded secrets or localhost URLs remain." -OutputFile $ReportFile
}

function Invoke-FullAudit {
  param([string]$ReportDir)
  $timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
  $reportBase = "$ReportDir\audit-$timestamp"
  New-Item -ItemType Directory -Path $reportBase -Force | Out-Null
  Write-Host "`n============================================" -ForegroundColor Cyan
  Write-Host "  CALCUTTA NODE — FULL AUDIT" -ForegroundColor Cyan
  Write-Host "  Started: $(Get-Date)" -ForegroundColor Cyan
  Write-Host "============================================`n" -ForegroundColor Cyan

  Invoke-SecurityAudit -ReportFile "$reportBase\security-audit.md"
  Invoke-SEOAudit -ReportFile "$reportBase\seo-audit.md"
  Invoke-UIAudit -ReportFile "$reportBase\ui-audit.md"
  Invoke-ContentReview -ReportFile "$reportBase\content-review.md"
  Invoke-DeployCheck -ReportFile "$reportBase\deploy-check.md"

  Write-Host "`n============================================" -ForegroundColor Green
  Write-Host "  AUDIT COMPLETE" -ForegroundColor Green
  Write-Host "  Reports: $reportBase" -ForegroundColor Green
  Write-Host "============================================`n" -ForegroundColor Green
}

switch ($Workflow) {
  "deploy-check" {
    $report = "$ReportDir\deploy-check-$(Get-Date -Format 'yyyy-MM-dd_HH-mm').md"
    Invoke-DeployCheck -ReportFile $report
  }
  "security-audit" {
    $report = "$ReportDir\security-$(Get-Date -Format 'yyyy-MM-dd_HH-mm').md"
    Invoke-SecurityAudit -ReportFile $report
  }
  "seo-audit" {
    $report = "$ReportDir\seo-$(Get-Date -Format 'yyyy-MM-dd_HH-mm').md"
    Invoke-SEOAudit -ReportFile $report
  }
  "code-review" {
    $report = "$ReportDir\code-review-$(Get-Date -Format 'yyyy-MM-dd_HH-mm').md"
    Invoke-CodeReview -ReportFile $report
  }
  "ui-audit" {
    $report = "$ReportDir\ui-$(Get-Date -Format 'yyyy-MM-dd_HH-mm').md"
    Invoke-UIAudit -ReportFile $report
  }
  "content-review" {
    $report = "$ReportDir\content-$(Get-Date -Format 'yyyy-MM-dd_HH-mm').md"
    Invoke-ContentReview -ReportFile $report
  }
  "full-audit" {
    Invoke-FullAudit -ReportDir $ReportDir
  }
}
