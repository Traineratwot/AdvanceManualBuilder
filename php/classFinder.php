<?

	class converterUnits
	{
		public
			$converterRule = [
			'byte' => [
				0 => [
					'bit' => [0.125, 'b'],
				],
				1 => [
					'kb' => [1024, 'b'],
					'mb' => [1024, 'kb'],
					'gb' => [1024, 'mb'],
					'tb' => [1024, 'gb'],
				],
				'SI' => [1, 'b'],
			],
			'mass' => [
				0 => [
					'g' => [0.001, 'kg'],
					'mg' => [0.001, 'g'],
				],
				1 => [
					'T' => [1000, 'kg'],
				],
				'SI' => [1, 'kg'],
			],
			'length' => [
				0 => [
					'mm' => [0.001, 'm'],
					'cm' => [10, 'mm'],
					'dm' => [10, 'dm'],
				],
				1 => [
					'km' => [1000, 'm'],
				],
				'SI' => [1, 'm'],
			],
			'time' => [
				0 => [
					'ms' => [0.001, 's'],
				],
				1 => [
					'min' => [60, 's'],
					'h' => [60, 'min'],
					'day' => [24, 'h'],
				],
				'SI' => [1, 's'],
			],
		];


		public function convert($n = 0, $type = 'byte', $from = 'SI', $to = 'best')
		{
			try {
				//validate input start
				$out = FALSE;
				$size = [];
				$i = 1;
				$n = (float)$n;
				if (!$n) {
					throw new Exception('invalid number', 0);
				}
				if (isset($this->converterRule[$type])) {
					$converterRule = $this->converterRule[$type];
					$SI = $converterRule['SI'][1];

				} else {
					throw new Exception('invalid type', 0);
				}
				if ($to != 'best' and $to != 'SI') {
					if (!in_array($to, array_keys($converterRule[0])) and !in_array($to, array_keys($converterRule[1]))
						and $to != $SI) {
						$to = 'best';
					}
				}
				//validate input end
				if ($to == $from and $to != 'SI') {
					throw new Exception('easy )', 1);
				}
				$n = $this->ToSi($n, $type, $from);
				if (!$n) {
					throw new Exception('invalid "from" unit', 2);
				}
				if ($to == 'SI' or $to == $SI) {
					throw new Exception('easy )', 2);
				}

				if ($to != 'best') {
					if (in_array($to, array_keys($converterRule[0]))) {
						$g = 0;
					} elseif (in_array($to, array_keys($converterRule[1]))) {
						$g = 1;
					} else {
						throw new Exception('invalid "to" unit', 2);
					}
				} else {
					if ($n >= $converterRule['SI'][0]) {
						$g = 1;
					} else {
						$g = 0;
					}
				}
				foreach ($converterRule[$g] as $key => $rule) {
					if ($n >= $rule[0]) {
						$n /= $rule[0];
						$size = [round($n, $i), $key];
					} else {
						if ($to == 'best') {
							break;
						}
					}
					if ($to != 'best' and $to == $key) {
						break;
					}
					$i++;
				}
				if (!$out and !empty($size)) {
					$out = $size;
				} else {
					$out = [$n, $SI];
				}

			} catch (Exception $e) {
				echo $this->console('log', $e->getMessage());
				switch ($e->getCode()) {
					case 1:
						return [round($n, $i), $from];
					case 2:
						return [round($n, $i), $SI];
					default:
						return $e->getMessage();
				}
			}
			return $out;
		}

		public function ToSi($n, $type = 'byte', $from = 'SI')
		{
			if (isset($this->converterRule[$type])) {
				$converterRule = $this->converterRule[$type];
				$SI = $converterRule['SI'][1];
			} else {
				return FALSE;
			}
			if ($from == 'SI' or $from == $SI) {
				return $n;
			}
			if (in_array($from, array_keys($converterRule[0]))) {
				$g = 0;
			} elseif (in_array($from, array_keys($converterRule[1]))) {
				$g = 1;
			} else {
				return FALSE;
			}
			while ($from != $SI and isset($converterRule[$g][$from])) {
				$f_ = $converterRule[$g][$from];
				$n *= $f_[0];
				$from = $f_[1];
			}
			return $n;
		}
	}