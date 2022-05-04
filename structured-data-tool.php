<?php
if (!class_exists('StructuredDataTool')):

class StructuredDataTool
{
  const TABLE_NAME = 'structured_data_table'; 

  // チェックがついていない時は0が、チェックがついているときは1が返却される
  const NOT_CHECKED_VALUE = '0';
  const CHECKED_VALUE = '1';

  public function __construct()
  {
    if (is_admin()) {
      add_action('admin_menu', [$this, 'admin_menu']);
      add_action('admin_menu', [$this, 'sub_menu']);
      add_action('admin_enqueue_scripts', [$this, 'include_home_resources']);
    }
  }
  
  // メインメニュー
  public function admin_menu()
  {
    add_menu_page(
      '構造化データツール', /* ページタイトル*/
      '構造化データツール', /* メニュータイトル */
      'manage_options', /* 権限 */
      'structured-data-tool', /* ページを開いたときのurl */
      [$this, 'home_page'], /* メニューに紐づく画面を描画するcallback関数 */
      'dashicons-media-text', /* アイコン */
      3, /* 表示位置の優先度 */
    );
  }

  // メインメニュー
  public function sub_menu()
  {
    add_submenu_page(
      'structured-data-tool', /* 親メニューのスラッグ */
      '設定', /* ページタイトル*/
      '設定', /* メニュータイトル */
      'manage_options', /* 権限 */
      'settings', /* ページを開いたときのURL */
      [$this, 'settings_page'], /* メニューに紐づく画面を描画するcallback関数 */
      'dashicons-media-text', /* アイコン */
    );
  }


  // 関数実行時に呼び出し元のクラスのインスタンスを生成する
  // これを行うことで、静的メソッドの中でもクラス内のメソッドにアクセスできるようになる
  public static function get_instance() 
  {
    // メンバ変数を使用すると継承された際にエラーになるため、メソッド内でstatic変数を使用する必要がある
    static $instance;

    if (!$instance) {
      $instance = new static();
    }

    return $instance;
  }

  // ホーム画面で使用するCSS・JSを読み込ませる
  public function include_home_resources()
  {
    $plugin_url = plugin_dir_url(__FILE__);
    $current_page_url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

    // プラグインのホーム画面でのみCSS・JSを読み込ませる
    if (preg_match('/admin\.php\?page=structured-data-tool$/u', $current_page_url)) {
      wp_enqueue_style('structured-data-tool-css', $plugin_url . 'package/dist/assets/index.css', [], wp_rand());
      wp_enqueue_script('structured-data-tool-js', $plugin_url . 'package/dist/assets/index.js', ['jquery', 'wp-element'], wp_rand(), true);
    }
  }

  // ホーム画面
  public function home_page()
  {
    echo '<div id="structured-data-tool"></div>';
  }

  // 設定画面
  public function settings_page()
  {
    $plugin_path = plugin_dir_path(__FILE__);
    include_once("{$plugin_path}/views/settings.php");
  }

  // 全ての投稿タイプを取得する
  public function get_all_post_types()
  {
    // 公開された済みの投稿タイプのみ取得する
    $post_types = get_post_types([
      'public' => true
    ]);

    $post_infos = [];

    foreach ($post_types as $post_type) {
      $object = get_post_type_object($post_type);

      // メディアは除外する
      if ($object->name === 'attachment') continue;

      $post_infos[] = [
        'label' => $object->label,
        'name' => $object->name,
      ];
    }

    return $post_infos;
  }

  // 初期データをプラグインインストール時に作成したテーブルに登録
  public static function insert_init_data($wpdb, $table_name)
  {
    // テーブルが存在する時はデータをインサートする
    if (!is_null($wpdb->get_var("SHOW TABLES LIKE '" . $table_name . "'"))) {
      foreach (static::get_instance()->get_all_post_types() as $arr) {
        $wpdb->insert(
          $table_name,
          [
            'post_name' => $arr['label'], 
            'post_type' => $arr['name'],
            'value' => 0,
          ],
          [
            '%s', 
            '%s',
            '%d' 
          ] 
        );
      }
    }
  }

  // DBのデータを取得する
  public static function get_table_data()
  {
    global $wpdb;

    $table_name = $wpdb->prefix . StructuredDataTool::TABLE_NAME;
    $query = "SELECT * FROM $table_name";
    $results = $wpdb->get_results($query, 'ARRAY_A');

    return $results;
  }

  // プラグインインストール後に追加した投稿タイプの情報をテーブルに登録する
  public static function add_new_post_type_info($wpdb)
  {
    $table_name = $wpdb->prefix . StructuredDataTool::TABLE_NAME;
    $query = "SELECT * FROM $table_name WHERE post_type = %s";

    foreach (static::get_instance()->get_all_post_types() as $arr) {
      $find_data = $wpdb->query($wpdb->prepare($query, $arr['name']));

      if (!$find_data) {
        $wpdb->insert(
          $table_name,
          [
            'post_name' => $arr['label'], 
            'post_type' => $arr['name'],
            'value' => 0,
          ],
          [
            '%s', 
            '%s',
            '%d' 
          ] 
        );
      }
    }
  }
}

$structuredDataTool = new StructuredDataTool();

endif;
