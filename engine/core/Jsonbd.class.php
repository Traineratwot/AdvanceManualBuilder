<?php
class JsonBd
{
	public $log = [];
	private $model = "Information_Shema.json";
	private $currentDb = null;
	private $shema =  [
		"config" => [],
		"databases" => []
	];
	private $TablePatern = [
		"AutoIncrements" => [],
		"rows" => []
	];
	public function __construct($path, $database = null)
	{
		$this->prefix = $prefix;
		if (!is_dir($path)) {
			if (!mkdir($path)) {
				$this->log[] = [__LINE__, __FUNCTION__, "Не удалось создать папку"];
				return false;
			}
		}
		$this->path = preg_replace("@/$@", "", $path);
		$this->model = $path . "/" . $this->model;
		if (!$this->checkModel()) {
			return false;
		}
		$this->shema = json_decode(file_get_contents($this->model), 1);
		if (!$this->shema or gettype($this->shema) != 'array') {
			$this->shema =  [
				"config" => [],
				"databases" => []
			];
			$this->shema_save();
		}
		if ($database) {
			$this->setDb($database);
		}
	}

	public function setDb($database)
	{
		if ($this->invalidName($database)) {
			$this->log[] = [__LINE__, __FUNCTION__, "Не правильное имя базы данных <<$database>>"];
			return false;
		}
		if (@array_key_exists($database, $this->shema["databases"]) === false) {
			$this->log[] = [__LINE__, __FUNCTION__, "<<$database>> Не существует"];
			return false;
		}
		$this->currentDb = $database;
		return $this;
	}

	/**
	 * INSERT
	 *
	 * @param mixed $bdtb
	 * @param mixed $values [fieldname=>value,]
	 * @return void
	 */
	public function INSERT($bdtb, $values)
	{
		$args = func_get_args();
		$bdtb = array_shift($args);
		$_bdtb = explode('.', $bdtb);
		if (count($_bdtb) == 2) {
			$Table = $_bdtb[1];
			if (!$this->setDb($_bdtb[0])) {
				return false;
			}
		} else if ($this->currentDb) {
			$Table = $_bdtb;
		}
		$row = [];
		$tb = json_decode(file_get_contents("$this->path/$this->currentDb/$Table.json"), 1);
		$keyfieldVal = null;
		foreach ($args as $values) {
			# code...
			foreach ($this->shema['databases'][$this->currentDb][$Table]['fields'] as $key => $FieldShema) {
				if ($FieldShema["index"] and $FieldShema["auto_increment"] and isset($values[$key])) {
					$fieldname  = $key;
					$value 		= $values[$key];
					if (gettype($value) != $FieldShema['type'] and ($FieldShema['type'] != "date" or gettype($value) != "integer")) {
						$this->log[] = [__LINE__, __FUNCTION__, "Не верный тип данных <<$value>> в <<$fieldname>> ожидалось <<" . $FieldShema['type'] . ">>"];
						continue;
					}
					foreach ($tb['rows'] as $k => $v) {
						if ($k == $key and $v == $value) {
							$this->log[] = [__LINE__, __FUNCTION__, "Не запись с таки ключом уже существует"];
							return false;
						}
					}
					if ((int) $value > (int) $tb['AutoIncrements'][$key]) {
						$row[$key] = (int) $value;
						$tb['AutoIncrements'][$key] = (int) $value;
					} else {
						(int) $tb['AutoIncrements'][$key]++;
						$this->log[] = [__LINE__, __FUNCTION__, "Перестань баловаться c AutoIncrement! убери поле или поставь " . (string) $tb['AutoIncrements'][$key]];
						return false;
					}
				} else {
					if (isset($values[$key]) and gettype($values) == 'array') {
						$fieldname  = $key;
						$value 		= $values[$key];
						if (gettype($value) != $FieldShema['type'] and ($FieldShema['type'] != "date" or gettype($value) != "integer")) {
							$this->log[] = [__LINE__, __FUNCTION__, "Не верный тип данных <<$value>> в <<$fieldname>> ожидалось <<" . $FieldShema['type'] . ">>"];
							$value = $FieldShema['defult_value'];
						}
						$row[$key] = $value;
					} else {
						if ($FieldShema["auto_increment"]) {
							(int) $tb['AutoIncrements'][$key]++;
							$row[$key] = (int) $tb['AutoIncrements'][$key];
						} else {
							if ($FieldShema['type'] == "date" and $FieldShema['defult_value'] = -1) {
								$row[$key] = date("U");
							} else {
								$row[$key] = $FieldShema['defult_value'];
							}
						}
					}
				}
				if ($FieldShema["index"] and !$FieldShema["auto_increment"]) {
					if (!isset($values[$key])) {
						$this->log[] = [__LINE__, __FUNCTION__, "отсутствует index"];
						return false;
					}
					foreach ($tb['rows'] as $k => $v) {
						if ($v[$key] == $values[$key]) {
							$this->log[] = [__LINE__, __FUNCTION__, "запись с таким ключом уже существует"];
							return false;
						}
					}
				}
				if ($FieldShema["index"]) {
					$keyfieldVal = $row[$key];
				}
			}
			if ($keyfieldVal) {
				$tb["rows"][$keyfieldVal] = $row;
			} else {
				$tb["rows"][] = $row;
			}
			$this->tableSave($bdtb, $tb);
		}

		return $this;
	}

	private function tableSave($bdtb, $td)
	{
		$_bdtb = explode('.', $bdtb);
		if (count($_bdtb) == 2) {
			$Table = $_bdtb[1];
			if (!$this->setDb($_bdtb[0])) {
				return false;
			}
		} else if ($this->currentDb) {
			$Table = $_bdtb;
		}
		if (!$td = json_encode($td, 256)) {
			return false;
		}
		if (!file_put_contents("$this->path/$this->currentDb/$Table.json", $td)) {
			return false;
		}
		return true;
	}

	private function checkModel()
	{
		if (!is_file($this->model)) {
			if (!file_put_contents($this->model, json_encode($this->shema, 256))) {
				$this->log[] = [__LINE__, __FUNCTION__, "Не удалось создать Information_Shema"];
				return false;
			}
		}
		$this->shema = json_decode(file_get_contents($this->model), 1);
		return true;
	}

	public function createBd($name)
	{
		if ($this->invalidName($name)) {
			$this->log[] = [__LINE__, __FUNCTION__, "не удалось создать недопустимое имя: <<" . $name . ">>"];
			return false;
		}
		if (!is_dir($this->path . "/" . $name)) {
			if (!mkdir($this->path . "/" . $name)) {
				return false;
			}
		}
		if (array_key_exists($name, $this->shema["databases"]) === false) {
			$this->shema["databases"][$name] = [];
			return $this->shema_save();
		}
		$this->log[] = [__LINE__, __FUNCTION__, "<<$name>> уже существует"];
		return true;
	}
	private function shema_save()
	{
		if (!file_put_contents($this->model, json_encode($this->shema, 256))) {
			$this->log[] = [__LINE__, __FUNCTION__, "Не удалось сохранить Information_Shema"];
			return false;
		}
		return $this;
	}
	/**
	 * createTable
	 *
	 * @param  string $name
	 * @param  array $fields = [
	 * "name"=>""
	 * "type"=>""
	 * "defult_value"=>""
	 * "index"=>false
	 * "auto_increment"=>false
	 * ]
	 *
	 * @return void
	 */
	public function createTable($bdtb, $fields)
	{
		$args = func_get_args();
		$bdtb = array_shift($args);
		$_bdtb = explode('.', $bdtb);
		if (count($_bdtb) == 2) {
			$name = $_bdtb[1];
			if (!$this->setDb($_bdtb[0])) {
				return false;
			}
		} else if ($this->currentDb) {
			$name = $_bdtb;
		}
		$pattern = $this->TablePatern;
		$database = $this->currentDb;
		if (@array_key_exists($database, $this->shema["databases"]) === false) {
			$this->log[] = [__LINE__, __FUNCTION__, "<<$database>> Не существует"];
			return false;
		}
		if (@array_key_exists($name, $this->shema["databases"][$database])) {
			$this->log[] = [__LINE__, __FUNCTION__, "<<$name>> Уже существует "];
			return false;
		}
		foreach ($args as $key => $value) {
			$feild_pattern = [
				"name" => "",
				"type" => "",
				"defult_value" => "",
				"index" => false,
				"auto_increment" => false,
			];
			if (!isset($value["name"]) or !isset($value["type"])) {
				$this->log[] = [__LINE__, __FUNCTION__, "не удалось добавить поле <<$key>> нет типа или имени"];
				continue;
			}

			if ($this->invalidName($value["name"])) {
				$this->log[] = [__LINE__, __FUNCTION__, "не удалось добавить поле <<$key>> недопустимое имя: <<" . $value["name"] . ">>"];
				continue;
			}
			$feild_pattern["name"] = $value['name'];
			$feild_pattern["type"] = $value["type"];
			switch ($value["type"]) {
				case "string":
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = "";
					}
					break;
				case "int":
				case "integer":
					$feild_pattern["type"] = "integer";
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = 0;
					}
					break;
				case "float":
				case "double":
					$feild_pattern["type"] = "double";
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = 0.0;
					}
					break;
				case "bool":
				case "boolean":
					$feild_pattern["type"] = "boolean";
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = false;
					}
					break;
				case "date": //timesamp
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = -1;
					}
					break;
				case "array":
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = [];
					}
					break;

				default:
					$this->log[] = ["не удалось добавить поле $key неверный тип данных"];
					continue 2;
					break;
			}

			$feild_pattern["index"] = (bool) $value["index"] ?: false;
			$feild_pattern["auto_increment"] = (bool) $value["auto_increment"] ?: false;
			if ((bool) $value["auto_increment"]) {
				if ($feild_pattern["type"] == "integer") {
					$pattern["AutoIncrements"][$value["name"]] = 0;
				} else {
					$this->log[] = [__LINE__, __FUNCTION__, "не верный тип данных для autoIncrement должно быть integer"];
					return false;
				}
			}
			if ($value["index"]) {
				$Table["index"] = $value['name'];
			}
			$Table["fields"][$value['name']] = $feild_pattern;
		}
		$this->shema["databases"][$database][$name] = $Table;
		if (!$this->shema_save()) {
			return false;
		}

		if (is_dir("$this->path/$database")) {
			if (!file_put_contents("$this->path/$database/$name.json", json_encode($pattern, 256))) {
				return false;
			};
		}
		return $this;
	}
	/**
	 * SELECT
	 *
	 * @param  string $bdtb
	 * @param  array $fields = ["name"]
	 * @param  array $where = index
	 *
	 * @return void
	 */
	public function SELECT($bdtb, $fields = [], $where = null)
	{
		$_bdtb = explode('.', $bdtb);
		if (count($_bdtb) == 2) {
			$Table = $_bdtb[1];
			if (!$this->setDb($_bdtb[0])) {
				return false;
			}
		} else if ($this->currentDb) {
			$Table = $_bdtb;
		}
		$database = $this->currentDb;
		$result = [];
		$tb = json_decode(file_get_contents("$this->path/$this->currentDb/$Table.json"), 1);
		$tb = $tb['rows'];
		if ($where === null) {
			if ($fields) {
				foreach ($tb as $key => $value) {
					foreach ($value as $k => $val) {
						if (array_search($k, $fields) !== false) {
							$result[$key][$k] = $value[$k];
						}
					}
				}
				return $result;
			} else {
				$result[$key] = $value;
			}
			return $tb;
		}
		foreach ($tb as $key => $value) {
			if ($key == $where) {
				if ($fields) {
					foreach ($value as $k => $val) {
						if (array_search($k, $fields) !== false) {
							$result[$key][$k] = $value[$k];
						}
					}
				} else {
					$result[$key] = $value;
				}
			}
		}
		return $result;
	}

	private function invalidName($name)
	{
		if (preg_match('/[^A-Za-z0-9_]+/', $name)) {
			return true;
		}
		return false;
	}
}
