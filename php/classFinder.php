<?php
	$dir = dirname(__DIR__) . '\core\js';
	$rDir = new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS);
//	$rDir = scandir($dir);
	$re = '@class\s+([^\s=]+)@';
	$Result = [];
	foreach ($rDir as $jsFile) {
		$path = $jsFile->getRealPath();
		$content = file_get_contents($path);
		preg_match_all($re, $content, $matches);
		$Result = array_merge($Result, $matches[1]);
	}
	sort($Result);
	file_put_contents(dirname(__DIR__) . '\core\data\classList.json', json_encode($Result));
	var_dump($Result);
