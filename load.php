<?php
/*
  Plugin Name: Structured data tool
  Plugin URI:
  Description: 構造化データを生成して、各ページに簡単に設定できるツールです。
  Version: 1.0.0
  Author: Yota-K
  Author URI: https://github.com/Yota-K
  License:
 */

   // 外部からPHPが直接実行された時は処理を終了する
  // ABSPATH・・・WordPressディレクトリへの絶対パス
  if (!defined('ABSPATH')) exit;

  require_once(__DIR__ . '/structured-data-tool.php');
  require_once(__DIR__ . '/custom-field.php');

  // プラグインが有効化されたときに実行される処理
  // MEMO: StructuredDataTool classに処理を書くとテーブルの作成が行われなかった
  // ファイルを分割すると処理が実行されなくなる
  function structured_data_tool_install()
  {
    global $wpdb;

    $db_version= '1.0';
    $table_name = $wpdb->prefix . StructuredDataTool::TABLE_NAME;

    // テーブルが存在しない時は作成する
    if (is_null($wpdb->get_var("SHOW TABLES LIKE '" .$table_name. "'"))) {
      $sql = "CREATE TABLE ".$table_name." (
        `id` bigint(11) UNSIGNED NOT NULL AUTO_INCREMENT,
        `post_name` varchar(255) CHARACTER SET utf8 NOT NULL,
        `post_type` varchar(255) CHARACTER SET utf8 NOT NULL,
        `value` tinyint(1) NOT NULL,
        PRIMARY KEY  (id)
      ) " .$wpdb->get_charset_collate(). ";";

      require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
      dbDelta($sql); 

      add_option('my_db_version', $db_version);

      // 初期データの投入
      insert_data($wpdb, $table_name);
    }
  }
  register_activation_hook( __FILE__, 'structured_data_tool_install');


  // プラグインの初期データをDBにインサート
  function insert_data($wpdb, $table_name)
  {
    $structuredDataTool = new StructuredDataTool();
    $post_types = $structuredDataTool->get_all_post_types();

    // テーブルが存在する時はデータをインサートする
    if (!is_null($wpdb->get_var("SHOW TABLES LIKE '" .$table_name. "'"))) {
      foreach ($post_types as $arr) {
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
