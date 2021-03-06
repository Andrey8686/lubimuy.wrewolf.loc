<?php
  
  require_once 'JSMinPlus.php';
  
  use Symfony\Component\HttpFoundation\Request;
  use Symfony\Component\Debug\Debug;
  
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Headers: *');
  
  if (isset($_SERVER['HTTP_CLIENT_IP'])
    || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
    || !(in_array(@$_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1', '5.228.5.133'], true) || PHP_SAPI === 'cli-server')
  ) {
    header('HTTP/1.0 403 Forbidden');
    exit('You are not allowed to access this file.');
  }
  
  /** @var \Composer\Autoload\ClassLoader $loader */
  $loader = require __DIR__ . '/../app/autoload.php';
  Debug::enable();
  
  $kernel = new AppKernel('dev', true);
  $kernel->loadClassCache();
  $request = Request::createFromGlobals();
  $response = $kernel->handle($request);
  $response->send();
  $kernel->terminate($request, $response);