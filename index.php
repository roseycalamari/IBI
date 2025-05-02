<?php
/**
 * Main entry point
 */

// Redirect mobile.html requests to index.html
$requestUri = $_SERVER['REQUEST_URI'];
if (strpos($requestUri, 'mobile.html') !== false) {
    $redirectUrl = str_replace('mobile.html', 'index.html', $requestUri);
    header("Location: $redirectUrl", true, 301);
    exit;
}

// Include the main website
include 'index.html';
?> 