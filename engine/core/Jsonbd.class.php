<?php
class JsonBd
{
	public $log = [];
	public $prefix;
	private $model = "Information_Shema.json";
	private $currentDb = null;
	private $shema =  [
		"config" => [],
		"databases" => []
	];
	public function __construct($path, $prefix = "jbd_")
	{
		$this->prefix = $prefix;
		if (!is_dir($path)) {
			if (!mkdir($path)) {
				$this->log[] = [__LINE__,__FUNCTION__, "Не удалось создать папку"];
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
	}

	public function setDb($database) 
	{
		if ($this->invalidName($database)) {
			$this->log[] = [__LINE__,__FUNCTION__, "Не правильное имя базы данных <<$database>>"];
			return false;
		}
		if (@array_key_exists($database, $this->shema["databases"]) === false) {
			$this->log[] = [__LINE__,__FUNCTION__, "<<$database>> Не существует"];
			return false;
		}
		$this->currentDb = $database;
		return $this;
	}

	/**
	 * INSERT
	 *
	 * @param mixed $bdtb
	 * @param mixed $values [fieldname,value]
	 * @return void
	 */
	public function INSERT($bdtb,$values) 
	{
		$args = func_get_args();
		$bdtb = array_shift($args);
		$Table = $bdtb;
		if (!$this->currentDb) {
			$_bdtb = explode('.',$bdtb);
			$Table = $_bdtb[1];
			if (!$this->setDb($_bdtb[0])) {
				return false;
			}
		}
		foreach ($values as $key => $val) {
			if (gettype($val) != 'array') {
				$this->log[] = [__LINE__,__FUNCTION__, "не верный формат"];
				continue;
				$fieldname  = $val[0];
				$value 		= $val[1];
				if ($this->invalidName($fieldname)) {
					$this->log[] = [__LINE__,__FUNCTION__, "Не правильное имя базы данных <<$fieldname>>"];
					return false;
				}
				$shema = $this->shema[$this->currentDb][$Table][$fieldname];
				if()$shema['type'];
			}
			
		}
	}

	public function checkModel()
	{
		if (!is_file($this->model)) {
			if (!file_put_contents($this->model, json_encode($this->shema, 256))) {
				$this->log[] = [__LINE__,__FUNCTION__, "Не удалось создать Information_Shema"];
				return false;
			}
		}
		$this->shema = json_decode(file_get_contents($this->model), 1);
		return true;
	}

	public function createBd($name)
	{
		if ($this->invalidName($name)){
			$this->log[] = [__LINE__,__FUNCTION__,"не удалось создать недопустимое имя: <<".$name.">>"];
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
		$this->log[] = [__LINE__,__FUNCTION__, "<<$name>> уже существует"];
		return true;
	}
	private function shema_save()
	{
		if (!file_put_contents($this->model, json_encode($this->shema, 256))) {
			$this->log[] = [__LINE__,__FUNCTION__, "Не удалось сохранить Information_Shema"];
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
	public function createTable($database, $name, $fields)
	{
		$Table = [];
		$args = func_get_args();
		$database = array_shift($args);
		$name = array_shift($args);
		if (@array_key_exists($database, $this->shema["databases"]) === false) {
			$this->log[] = [__LINE__,__FUNCTION__, "<<$database>> Не существует"];
			return false;
		}
		if (@array_key_exists($name, $this->shema["databases"][$database])) {
			$this->log[] = [__LINE__,__FUNCTION__, "<<$name>> Уже существует "];
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
				$this->log[] = ["не удалось добавить поле <<$key>> нет типа или имени"];
				continue;
			}
			
			if ($this->invalidName($value["name"])){
				$this->log[] = ["не удалось добавить поле <<$key>> недопустимое имя: <<".$value["name"].">>"];
				continue;
			}
			$feild_pattern["name"] = $value['name'];
			switch ($value["type"]) {
				case 'string':
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = '';
					}
					break;
				case 'int':
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = 0;
					}
					break;
				case 'float':
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = 0.0;
					}
					break;
				case 'bool':
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = false;
					}
					break;
				case 'date': //timesamp
					if (!isset($value["defult_value"])) {
						$feild_pattern["defult_value"] = date('U');
					}
					break;

				default:
					$this->log[] = ["не удалось добавить поле $key неверный тип данных"];
					continue 2;
					break;
			}
			$feild_pattern["type"] = $value["type"];
			$feild_pattern["index"] = $value["index"];
			$feild_pattern["auto_increment"] = $value["auto_increment"];
			if ($value["index"]) {
				$Table["index"] = $value['name'];
			}
			$Table["fields"][$value['name']] = $feild_pattern;
		}
		$this->shema["databases"][$database][$name] = $Table;
		$this->shema_save();
		return $this;
	}


	
	private function invalidName($name){
		if (preg_match('/[^A-Za-z0-9_]+/', $name)){
			return true;
		}
		return false;
	}
}
