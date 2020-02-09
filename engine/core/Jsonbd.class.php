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
				$this->log[date("H:i:s")] = [__LINE__, "Не удалось создать папку"];
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
				$this->log[date("H:i:s")] = [__LINE__, "Не удалось создать Information_Shema"];
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
		if(!array_search($name, $this->shema["databases"]) === false){
			$this->shema["databases"][] = $name;
			return $this->shema_save();
		}
		$this->log[date("H:i:s")] = [__LINE__, "$name уже существует"];
		return true;
	}
	private function shema_save()
	{
		if (!file_put_contents($this->model, json_encode($this->shema, 256))) {
			$this->log[date("H:i:s")] = [__LINE__, "Не удалось сохранить Information_Shema"];
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
	 * "deful_valuet"=>""
	 * "index"=>false
	 * "auto_increment"=>false
	 * ]
	 *
	 * @return void
	 */
	public function createTable($database, $name, $fields)
	{
		$args = func_get_args();
		$database = array_shift($args);
		$name = array_shift($args);
		if (array_search($database, $this->shema["databases"]) === false) {
			$this->log[date("H:i:s")] = [__LINE__, "$database Не существует пробую создать"];
			if (!$this->createBd($database)) {
				return false;
			}
		}
		foreach ($args as $key => $value) {
		}
	}
}
