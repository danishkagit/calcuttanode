# Build Mobile App APK
# ======================
# This script builds the Android APK from the React Native (Expo) app
# and places it in the server's public folder for download.

Write-Host "=== Calcutta Node. Mobile App Builder ===" -ForegroundColor Cyan
Write-Host ""

$APPS_DIR = "..\CalcuttaNode Apps"
$SERVER_PUBLIC_DIR = "public\app"

# Check which app to build
Write-Host "Choose which app to build:" -ForegroundColor Yellow
Write-Host "1) React Native (Expo) - app/"
Write-Host "2) Flutter - flutter_app/"
$choice = Read-Host "Enter 1 or 2"

if ($choice -eq "1") {
    $APP_DIR = "$APPS_DIR\app"
    
    if (-not (Test-Path $APP_DIR)) {
        Write-Host "Error: React Native app not found at $APP_DIR" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "`nBuilding React Native APK..." -ForegroundColor Green
    Set-Location $APP_DIR
    
    # Check if EAS CLI is installed
    $easCheck = Get-Command "eas" -ErrorAction SilentlyContinue
    if (-not $easCheck) {
        Write-Host "Installing EAS CLI..." -ForegroundColor Yellow
        npm install -g eas-cli
    }
    
    Write-Host "`n1. Log in to Expo (if not already logged in):" -ForegroundColor Cyan
    Write-Host "   eas login"
    
    Write-Host "`n2. Build the APK:" -ForegroundColor Cyan
    Write-Host "   eas build -p android --profile preview"
    
    Write-Host "`n3. After build completes, download the APK and place it at:" -ForegroundColor Cyan
    Write-Host "   $SERVER_PUBLIC_DIR\calcuttanode-app.apk"
    
} elseif ($choice -eq "2") {
    $APP_DIR = "$APPS_DIR\flutter_app"
    
    if (-not (Test-Path $APP_DIR)) {
        Write-Host "Error: Flutter app not found at $APP_DIR" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "`nBuilding Flutter APK..." -ForegroundColor Green
    Set-Location $APP_DIR
    
    Write-Host "`n1. Ensure ANDROID_HOME is set" -ForegroundColor Cyan
    Write-Host "2. Run: flutter build apk --release"
    
    Write-Host "`n3. After build, copy the APK:" -ForegroundColor Cyan
    Write-Host "   Copy build\app\outputs\flutter-apk\app-release.apk"
    Write-Host "   To: $SERVER_PUBLIC_DIR\calcuttanode-app.apk"
    
} else {
    Write-Host "Invalid choice. Enter 1 or 2." -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan
