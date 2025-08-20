<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Http\Middleware\TrustProxies as Middleware;

class TrustProxies extends Middleware
{
    // Trust all proxies
    protected $proxies = '*';

    // Use the X-Forwarded-* headers to detect scheme and client IP
    protected $headers = Request::HEADER_X_FORWARDED_ALL;
}
