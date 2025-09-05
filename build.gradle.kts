plugins {
  id("com.android.application")
  id("com.google.gms.google-services")
}

buildscript {
  repositories {
    mavenCentral()
    // other repositories if needed
  }
  // rest of the buildscript
}

android {
  // current Android block configurations (e.g., compileSdk, defaultConfig, etc.)
}

dependencies {
  // Updated Firebase BoM to the latest stable version
  implementation(platform("com.google.firebase:firebase-bom:33.16.0"))
  
  // Firebase products (version inferred from BoM)
  implementation("com.google.firebase:firebase-analytics")
  // Add other Firebase libraries as needed (e.g., auth, firestore)

  // Facebook Login SDK (latest release)
  implementation("com.facebook.android:facebook-login:latest.release")

  // Other dependencies...
}

// Required Google Services plugin applied at the bottom for readability
apply plugin: 'com.google.gms.google-services'
