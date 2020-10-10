<?php

	echo '<pre>';
	$t = 0.1+0.2;
	$y = 0.3;
	var_dump([$t,$y,$t == $y]); die;

	$dir = dirname(__DIR__) . '\core\js';
	$rDir = new RecursiveDirectoryIterator($dir, FilesystemIterator::SKIP_DOTS);
//	$rDir = scandir($dir);
	$re = '@class\s+([^\s=]+)@';
	$Result = [];
	foreach ($rDir as $jsFile) {
		$path = $jsFile->getRealPath();
		$content = file_get_contents($path);

	}
	sort($Result);
	file_put_contents(dirname(__DIR__) . '\core\data\classList.json', json_encode($Result));
	var_dump($Result);
