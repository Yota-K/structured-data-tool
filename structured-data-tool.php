<?php
  if (!class_exists('StructuredDataTool')):

  class StructuredDataTool
  {
    const TABLE_NAME = "structured_data_table"; 

    // チェックがついていない時は0が、チェックがついているときは1が返却される
    const NOT_CHECKED_VALUE = '0';
    const CHECKED_VALUE = '1';

    public function __construct()
    {
      // プラグインが停止されたときに実行される処理
      // register_deactivation_hook(__FILE__, [$this, 'deactivation']);

      // プラグインのアンインストール時に呼び出される処理
      // register_uninstall_hook(__FILE__, ['StructuredDataTool::uninstall']);

      add_action('admin_menu', [$this, 'admin_menu']);
      add_action('admin_menu', [$this, 'sub_menu']);
      add_action('admin_enqueue_scripts', [$this, 'add_my_files']);
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

    // プラグインで使用するCSS・JSを読み込ませる
    public function add_my_files()
    {
      $plugin_url = plugin_dir_url(__FILE__);
      $current_page_url = (empty($_SERVER['HTTPS']) ? 'http://' : 'https://') . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

      // プラグインのホーム画面でのみCSS・JSを読み込ませる
      if (preg_match('/admin\.php\?page=structured-data-tool$/u', $current_page_url)) {
        wp_enqueue_style('structured-data-tool-css', $plugin_url . 'package/dist/assets/index.css');
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
      // true のとき、公開された（public な）投稿タイプのみが返される
      $args = [
        'public' => true
      ];

      $output = 'names'; // （文字列） （オプション） 戻り値の型を指定します。'names'（名前）または 'objects'（オブジェクト）。
      $operator = 'and'; //（文字列） （オプション） $args で複数の条件を指定する場合の演算子（'and' または 'or'）。
      $post_types = get_post_types($args, $output, $operator);

      $post_infos = [];

      foreach ($post_types as $post_type) {
        $object = get_post_type_object( $post_type );

        // メディアは除外する
        if ($object->name === 'attachment') continue;

        $post_infos[] = [
          'label' => $object->label,
          'name' => $object->name,
        ];
      }

      return $post_infos;
    }

    // DBのデータを取得する
    // prepareを使ってSQLインジェクションの危険性を回避する
    public static function get_table_data()
    {
      global $wpdb;

      $table_name = $wpdb->prefix . StructuredDataTool::TABLE_NAME;
      $query = "SELECT * FROM $table_name";
      $results = $wpdb->get_results($query, 'ARRAY_A');

      return $results;
    }
  }

  // instantiate
  $structuredDataTool = new StructuredDataTool();

  endif;
?>
