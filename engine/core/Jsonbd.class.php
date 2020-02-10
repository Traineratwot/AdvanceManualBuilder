<?php
class JsonBd
{
	public $log = [];
	public $prefix;
	private $model = "Information_Shema.json";
	private $shema =  [
		"config" => [],
		"databases" => []
	];
	public function __construct($path, $prefix = "jbd_")
	{
		$this->prefix = $prefix;
		if (!is_dir($path)) {
			if (!mkdir($path)) {
				$this->log[] = [__LINE__, "Не удалось создать папку"];
				return false;
			}
		}
		$this->path = preg_replace("@/$@", "", $path);
		$this->model = $path . "/" . $this->model;
		if (!$this->checkModel()) {
			return false;
		}
		$this->shema = json_decode(file_get_contents($this->model), 1);
	}
	public function checkModel()
	{
		if (!is_file($this->model)) {
			if (!file_put_contents($this->model, json_encode($this->shema, 256))) {
				$this->log[] = [__LINE__, "Не удалось создать Information_Shema"];
				return false;
			}
		}
		return true;
	}

	public function createBd($name)
	{
		if (!is_dir($this->path . "/" . $name)) {
			if (!mkdir($this->path . "/" . $name)) {
				return false;
			}
		}
		if (!array_search($name, $this->shema["databases"]) === false) {
			$this->shema["databases"][] = $name;
			return $this->shema_save();
		}
		$this->log[] = [__LINE__, "$name уже существует"];
		return true;
	}
	private function shema_save()
	{
		if (!file_put_contents($this->model, json_encode($this->shema, 256))) {
			$this->log[] = [__LINE__, "Не удалось сохранить Information_Shema"];
			return false;
		}
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
		if (array_search($database, $this->shema["databases"]) === false) {
			$this->log[] = [__LINE__, "$database Не существует пробую создать"];
			if (!$this->createBd($database)) {
				return false;
			}
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
				$this->log[] = ["не удалось добавить поле $key нет типа или имени"];
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
			$Table["fields"][] = $feild_pattern;
		}
		$this->shema["databases"][$database][$name] = $Table;
		return $this->shema_save();
	}
}
